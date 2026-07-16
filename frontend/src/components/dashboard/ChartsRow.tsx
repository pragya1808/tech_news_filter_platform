import { DailyTrendChart } from '@/components/analytics/DailyTrendChart'
import { SourcePieChart } from '@/components/analytics/SourcePieChart'
import { TopicsBarChart } from '@/components/analytics/TopicsBarChart'
import type { DailyDataPoint } from '@/components/analytics/DailyTrendChart'
import type { SourceDataPoint } from '@/components/analytics/SourcePieChart'
import type { TopicDataPoint } from '@/components/analytics/TopicsBarChart'

interface ChartsRowProps {
  dailyData: DailyDataPoint[]
  isDailyLoading: boolean
  isDailyError: boolean
  onDailyRetry: () => void
  sourcesData: SourceDataPoint[]
  isSourcesLoading: boolean
  isSourcesError: boolean
  onSourcesRetry: () => void
  topicsData: TopicDataPoint[]
  isTopicsLoading: boolean
  isTopicsError: boolean
  onTopicsRetry: () => void
}

export function ChartsRow(props: ChartsRowProps) {
  const {
    dailyData, isDailyLoading, isDailyError, onDailyRetry,
    sourcesData, isSourcesLoading, isSourcesError, onSourcesRetry,
    topicsData, isTopicsLoading, isTopicsError, onTopicsRetry,
  } = props

  return (
    <div className="space-y-4">
      <DailyTrendChart
        data={dailyData}
        isLoading={isDailyLoading}
        isError={isDailyError}
        onRetry={onDailyRetry}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SourcePieChart
          data={sourcesData}
          isLoading={isSourcesLoading}
          isError={isSourcesError}
          onRetry={onSourcesRetry}
        />
        <TopicsBarChart
          data={topicsData}
          isLoading={isTopicsLoading}
          isError={isTopicsError}
          onRetry={onTopicsRetry}
        />
      </div>
    </div>
  )
}
