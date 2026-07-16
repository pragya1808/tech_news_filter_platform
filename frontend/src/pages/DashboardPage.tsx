import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import {
  DashboardHeader,
  KPIGrid,
  ChartsRow,
  LatestArticlesFeed,
} from '@/components/dashboard'
import { useDashboardKPIs, useDashboardCharts } from '@/hooks/useDashboard'
import { useLatestArticles } from '@/hooks'
import {
  normalizeDailyData,
  normalizeSourcesData,
  normalizeTopicsData,
  sourcesFromArticles,
  topicsFromArticles,
} from '@/utils'
import { QUERY_KEYS } from '@/constants'

export default function DashboardPage() {
  const queryClient = useQueryClient()
  const [isRefreshing, setIsRefreshing] = useState(false)

  // KPI data
  const { latest, topics, derived } = useDashboardKPIs()

  // Chart data
  const { daily, sources, topics: topicsAnalytics } = useDashboardCharts()

  // Latest articles feed (limit 8)
  const latestFeed = useLatestArticles(8)

  // Normalize analytics data; fall back to deriving from article list
  const dailyData = normalizeDailyData(daily.data)
  const sourcesData = normalizeSourcesData(sources.data).length > 0
    ? normalizeSourcesData(sources.data)
    : sourcesFromArticles(latest.data ?? [])
  const topicsData = normalizeTopicsData(topicsAnalytics.data).length > 0
    ? normalizeTopicsData(topicsAnalytics.data)
    : topicsFromArticles(latest.data ?? [])

  async function handleRefresh() {
    setIsRefreshing(true)
    await queryClient.invalidateQueries()
    setIsRefreshing(false)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <DashboardHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} />

      {/* KPI row */}
      <KPIGrid
        latestArticles={latest.data}
        topics={topics.data}
        articlesToday={derived.totalArticlesToday}
        totalSources={derived.totalSources}
        isLoading={latest.isLoading || topics.isLoading}
      />

      {/* Charts */}
      <ChartsRow
        dailyData={dailyData}
        isDailyLoading={daily.isLoading}
        isDailyError={daily.isError}
        onDailyRetry={() => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.analyticsDaily })}

        sourcesData={sourcesData}
        isSourcesLoading={sources.isLoading || latest.isLoading}
        isSourcesError={sources.isError && latest.isError}
        onSourcesRetry={() => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.analyticsSources })}

        topicsData={topicsData}
        isTopicsLoading={topicsAnalytics.isLoading || latest.isLoading}
        isTopicsError={topicsAnalytics.isError && latest.isError}
        onTopicsRetry={() => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.analyticsTopics })}
      />

      {/* Latest articles feed */}
      <LatestArticlesFeed
        articles={latestFeed.data}
        isLoading={latestFeed.isLoading}
        isError={latestFeed.isError}
        onRetry={() => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.latestArticles })}
      />
    </div>
  )
}
