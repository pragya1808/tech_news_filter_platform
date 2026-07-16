import { useState, useEffect, useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useAnalyticsPage } from '@/hooks/useAnalyticsPage'
import { ErrorState } from '@/components/ui'
import {
  AnalyticsPageHeader,
  AnalyticsKPIGrid,
  DailyTrendChart,
  SourcePieChart,
  TopicsBarChart,
  SourceRankTable,
} from '@/components/analytics'
import { QUERY_KEYS } from '@/constants'

export default function AnalyticsPage() {
  const queryClient = useQueryClient()
  const {
    dailyData,
    sourcesData,
    topicsData,
    sourceRank,
    kpis,
    daily,
    sources,
    topics,
    isLoading,
    isError,
    refetch,
  } = useAnalyticsPage()

  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null)

  useEffect(() => {
    if (!isLoading) setLastRefreshed(new Date())
  }, [isLoading])

  const handleRefresh = useCallback(async () => {
    await queryClient.invalidateQueries()
    refetch()
    setLastRefreshed(new Date())
  }, [queryClient, refetch])

  const retryDaily = useCallback(() => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.analyticsDaily }), [queryClient])
  const retrySources = useCallback(() => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.analyticsSources }), [queryClient])
  const retryTopics = useCallback(() => queryClient.invalidateQueries({ queryKey: QUERY_KEYS.analyticsTopics }), [queryClient])

  if (isError) {
    return (
      <div className="animate-fade-in">
        <ErrorState
          title="Failed to load analytics"
          message="Could not fetch article data. Check your connection and try again."
          onRetry={handleRefresh}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <AnalyticsPageHeader
        lastRefreshed={lastRefreshed}
        isFetching={!isLoading && (daily.isFetching || sources.isFetching || topics.isFetching)}
        onRefresh={handleRefresh}
      />

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--color-border)' }} />

      {/* Overview KPI cards */}
      <AnalyticsKPIGrid kpis={kpis} isLoading={isLoading} />

      {/* Daily trend — full width */}
      <DailyTrendChart
        data={dailyData}
        isLoading={isLoading}
        isError={daily.isError}
        onRetry={retryDaily}
      />

      {/* Source + Topic charts side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SourcePieChart
          data={sourcesData}
          isLoading={isLoading}
          isError={sources.isError}
          onRetry={retrySources}
        />
        <TopicsBarChart
          data={topicsData}
          isLoading={isLoading}
          isError={topics.isError}
          onRetry={retryTopics}
        />
      </div>

      {/* Source ranking table */}
      <SourceRankTable rows={sourceRank} isLoading={isLoading} />
    </div>
  )
}
