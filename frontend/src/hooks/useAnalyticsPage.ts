// Analytics page data hook.
// Uses backend overview endpoint for KPI cards.
// Uses backend chart endpoints when available.
// Falls back to deriving analytics from /articles until backend schemas mature.

import { useMemo } from 'react'

import {
  useAnalyticsOverview,
  useAnalyticsDaily,
  useAnalyticsSources,
  useAnalyticsTopics,
} from './useAnalytics'

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
  // Backend analytics endpoints
  const overviewQuery = useAnalyticsOverview()
  const dailyQuery = useAnalyticsDaily()
  const sourcesQuery = useAnalyticsSources()
  const topicsQuery = useAnalyticsTopics()

  // Fallback data
  const articlesQuery = useArticles({ limit: 100 })
  const topicListQuery = useTopics()

  const articles = useMemo(
    () => articlesQuery.data?.items ?? [],
    [articlesQuery.data]
  )

  const topicCount = topicListQuery.data?.length ?? 0

  // ------------------------------------------------------------------
  // Daily Trend
  // ------------------------------------------------------------------

  const dailyData = useMemo(() => {
    const backend = normalizeDailyData(dailyQuery.data)

    return backend.length > 0
      ? backend
      : dailyFromArticles(articles)
  }, [dailyQuery.data, articles])

  // ------------------------------------------------------------------
  // Sources
  // ------------------------------------------------------------------

  const sourcesData = useMemo(() => {
    const backend = normalizeSourcesData(sourcesQuery.data)

    return backend.length > 0
      ? backend
      : sourcesFromArticles(articles)
  }, [sourcesQuery.data, articles])

  // ------------------------------------------------------------------
  // Topics
  // ------------------------------------------------------------------

  const topicsData = useMemo(() => {
    const backend = normalizeTopicsData(topicsQuery.data)

    return backend.length > 0
      ? backend
      : topicsFromArticles(articles)
  }, [topicsQuery.data, articles])

  // ------------------------------------------------------------------
  // Source Ranking
  // ------------------------------------------------------------------

  const sourceRank = useMemo(
    () => sourceRankFromArticles(articles),
    [articles]
  )

  // ------------------------------------------------------------------
  // KPI Cards
  // ------------------------------------------------------------------

  const kpis = useMemo(() => {
    const overview = overviewQuery.data

    if (overview) {
      return {
        totalArticles: overview.total_articles,
        totalTopics: overview.total_topics,
        totalSources: overview.total_sources,
        avgPerDay: overview.avg_articles_per_day,
      }
    }

    return kpisFromArticles(articles, topicCount)
  }, [overviewQuery.data, articles, topicCount])

  // ------------------------------------------------------------------
  // Page State
  // ------------------------------------------------------------------

  const isLoading =
    overviewQuery.isLoading ||
    articlesQuery.isLoading ||
    topicListQuery.isLoading

  const isError =
    overviewQuery.isError &&
    articlesQuery.isError &&
    topicListQuery.isError

  const refetch = async () => {
    await Promise.all([
      overviewQuery.refetch(),
      dailyQuery.refetch(),
      sourcesQuery.refetch(),
      topicsQuery.refetch(),
      articlesQuery.refetch(),
      topicListQuery.refetch(),
    ])
  }

  return {
    // KPI cards
    kpis,

    // Charts
    dailyData,
    sourcesData,
    topicsData,
    sourceRank,

    // Individual queries
    overview: overviewQuery,
    daily: dailyQuery,
    sources: sourcesQuery,
    topics: topicsQuery,
    articles: articlesQuery,
    topicList: topicListQuery,

    // Page state
    isLoading,
    isError,
    refetch,
  }
}