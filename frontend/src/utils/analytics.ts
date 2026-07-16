// Helpers to safely derive chart data from the untyped analytics endpoints.
// All functions are defensive — they return empty arrays/objects if the shape is unexpected.
//
// TODO: Once the backend defines response schemas for:
//   GET /analytics/daily, /analytics/sources, /analytics/topics, /analytics/overview, /stats
// replace the normalize* functions with properly typed parsers and remove fallback derivations.

import type { DailyDataPoint } from '@/components/analytics/DailyTrendChart'
import type { SourceDataPoint } from '@/components/analytics/SourcePieChart'
import type { TopicDataPoint } from '@/components/analytics/TopicsBarChart'
import type { ArticleResponse } from '@/types'

// ─── Normalize backend responses (defensive — schema unknown) ────────────────

/** Normalize /analytics/daily response when backend defines it. */
export function normalizeDailyData(raw: unknown): DailyDataPoint[] {
  if (!Array.isArray(raw)) return []
  return raw
    .filter(r => r && typeof r.date === 'string' && typeof r.count === 'number')
    .map(r => ({ date: r.date as string, count: r.count as number }))
}

/** Normalize /analytics/sources response when backend defines it. */
export function normalizeSourcesData(raw: unknown): SourceDataPoint[] {
  if (!Array.isArray(raw)) return []
  return raw
    .filter(r => r && typeof r.name === 'string' && typeof r.value === 'number')
    .map(r => ({ name: r.name as string, value: r.value as number }))
}

/** Normalize /analytics/topics response when backend defines it. */
export function normalizeTopicsData(raw: unknown): TopicDataPoint[] {
  if (!Array.isArray(raw)) return []
  return raw
    .filter(r => r && typeof r.name === 'string' && typeof r.count === 'number')
    .map(r => ({ name: r.name as string, count: r.count as number }))
}

// ─── Fallback: derive from article list ─────────────────────────────────────

/** Fallback: derive source distribution directly from article list. */
export function sourcesFromArticles(articles: ArticleResponse[]): SourceDataPoint[] {
  const map = new Map<string, number>()
  for (const a of articles) {
    map.set(a.source, (map.get(a.source) ?? 0) + 1)
  }
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, value]) => ({ name, value }))
}

/** Fallback: derive topic distribution directly from article list. */
export function topicsFromArticles(articles: ArticleResponse[]): TopicDataPoint[] {
  const map = new Map<string, number>()
  for (const a of articles) {
    for (const t of a.topics) {
      map.set(t.name, (map.get(t.name) ?? 0) + 1)
    }
  }
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }))
}

/** Fallback: derive daily publishing trend from article list (last 14 days). */
export function dailyFromArticles(articles: ArticleResponse[]): DailyDataPoint[] {
  const map = new Map<string, number>()
  const today = new Date()
  // Seed last 14 days so the chart line is continuous even for zero-count days
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    map.set(key, 0)
  }
  for (const a of articles) {
    const iso = a.published_at ?? a.extracted_at
    const d = new Date(iso)
    const diff = Math.floor((today.getTime() - d.getTime()) / 86_400_000)
    if (diff >= 0 && diff < 14) {
      const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      map.set(key, (map.get(key) ?? 0) + 1)
    }
  }
  return Array.from(map.entries()).map(([date, count]) => ({ date, count }))
}

// ─── Source ranking table ────────────────────────────────────────────────────

export interface SourceRankRow {
  source: string
  count: number
  percentage: number
  lastArticleDate: string | null
}

/** Build source ranking table from article list. */
export function sourceRankFromArticles(articles: ArticleResponse[]): SourceRankRow[] {
  const countMap = new Map<string, number>()
  const lastDateMap = new Map<string, string>()

  for (const a of articles) {
    countMap.set(a.source, (countMap.get(a.source) ?? 0) + 1)
    const date = a.published_at ?? a.extracted_at
    const existing = lastDateMap.get(a.source)
    if (!existing || date > existing) lastDateMap.set(a.source, date)
  }

  const total = articles.length || 1
  return Array.from(countMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([source, count]) => ({
      source,
      count,
      percentage: Math.round((count / total) * 100),
      lastArticleDate: lastDateMap.get(source) ?? null,
    }))
}

// ─── Overview KPI derivation ─────────────────────────────────────────────────

export interface AnalyticsKPIs {
  totalArticles: number
  totalTopics: number
  totalSources: number
  avgPerDay: number
}

/** Derive overview KPIs from article + topic lists. */
export function kpisFromArticles(articles: ArticleResponse[], topicCount: number): AnalyticsKPIs {
  const sources = new Set(articles.map(a => a.source))
  const days = 14
  const recentCount = articles.filter(a => {
    const d = new Date(a.published_at ?? a.extracted_at)
    return Date.now() - d.getTime() < days * 86_400_000
  }).length
  return {
    totalArticles: articles.length,
    totalTopics: topicCount,
    totalSources: sources.size,
    avgPerDay: Math.round(recentCount / days),
  }
}
