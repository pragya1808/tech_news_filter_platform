// Analytics page data hook.
// Priority: use backend analytics endpoints when they return meaningful data.
// Fallback: derive all values from GET /articles + GET /topics.
// TODO: Simplify this hook once backend analytics schemas are defined.
import { useMemo } from 'react'
import { useAnalyticsDaily, useAnalyticsSources, useAnalyticsTopics } from './useAnalytics'
import { useArticles } from './useArticles'
import { useTopics } from './useTopics'
import {
  normalizeDailyData,
  normalizeSourcesData,
  normalizeTopicsData,
  dailyFromArticles,
  sourcesFromArticles,
  topicsFromArticles,
  sourceRankFromArticles,
  kpisFromArticles,
} from '@/utils/analytics'

export function useAnalyticsPage() {
  // Backend analytics endpoints (all return {} until backend defines schemas)
  const dailyQuery = useAnalyticsDaily()
  const sourcesQuery = useAnalyticsSources()
  const topicsQuery = useAnalyticsTopics()

  // Fallback data sources
  // Fetch max articles for richest possible derived analytics
  const articlesQuery = useArticles({ limit: 100 })
  const topicListQuery = useTopics()

  const articles = useMemo(() => articlesQuery.data?.items ?? [], [articlesQuery.data])
  const topicCount = topicListQuery.data?.length ?? 0

  // ── Daily trend ────────────────────────────────────────────────────────────
  const dailyData = useMemo(() => {
    const fromBackend = normalizeDailyData(dailyQuery.data)
    // TODO: remove fallback once /analytics/daily returns real data
    return fromBackend.length > 0 ? fromBackend : dailyFromArticles(articles)
  }, [dailyQuery.data, articles])

  // ── Sources distribution ───────────────────────────────────────────────────
  const sourcesData = useMemo(() => {
    const fromBackend = normalizeSourcesData(sourcesQuery.data)
    // TODO: remove fallback once /analytics/sources returns real data
    return fromBackend.length > 0 ? fromBackend : sourcesFromArticles(articles)
  }, [sourcesQuery.data, articles])

  // ── Topics distribution ────────────────────────────────────────────────────
  const topicsData = useMemo(() => {
    const fromBackend = normalizeTopicsData(topicsQuery.data)
    // TODO: remove fallback once /analytics/topics returns real data
    return fromBackend.length > 0 ? fromBackend : topicsFromArticles(articles)
  }, [topicsQuery.data, articles])

  // ── Source ranking table ───────────────────────────────────────────────────
  const sourceRank = useMemo(() => sourceRankFromArticles(articles), [articles])

  // ── Overview KPIs ──────────────────────────────────────────────────────────
  const kpis = useMemo(() => kpisFromArticles(articles, topicCount), [articles, topicCount])

  const isLoading = articlesQuery.isLoading || topicListQuery.isLoading
  const isError = articlesQuery.isError && topicListQuery.isError

  return {
    // chart data
    dailyData,
    sourcesData,
    topicsData,
    sourceRank,
    kpis,
    // per-query state for individual chart error/loading
    daily: dailyQuery,
    sources: sourcesQuery,
    topics: topicsQuery,
    articles: articlesQuery,
    // page-level state
    isLoading,
    isError,
    refetch: articlesQuery.refetch,
  }
}
