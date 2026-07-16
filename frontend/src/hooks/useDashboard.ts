import { useMemo } from 'react'
import { useLatestArticles } from './useArticles'
import { useTopics } from './useTopics'
import { useStats, useAnalyticsDaily, useAnalyticsSources, useAnalyticsTopics } from './useAnalytics'
import type { ArticleResponse } from '@/types'

/** Derive "articles today" from latest articles since /stats has no defined schema */
function countArticlesToday(articles: ArticleResponse[]): number {
  const today = new Date().toDateString()
  return articles.filter(a => {
    const d = a.published_at ?? a.extracted_at
    return new Date(d).toDateString() === today
  }).length
}

/** Derive unique sources from article list */
function countUniqueSources(articles: ArticleResponse[]): number {
  return new Set(articles.map(a => a.source)).size
}

export function useDashboardKPIs() {
  const latest = useLatestArticles(100) // fetch 100 to get better coverage
  const topics = useTopics()
  const stats = useStats()

  const derived = useMemo(() => {
    const articles = latest.data ?? []
    return {
      totalArticlesToday: countArticlesToday(articles),
      totalSources: countUniqueSources(articles),
    }
  }, [latest.data])

  return { latest, topics, stats, derived }
}

export function useDashboardCharts() {
  const daily = useAnalyticsDaily()
  const sources = useAnalyticsSources()
  const topics = useAnalyticsTopics()
  return { daily, sources, topics }
}
