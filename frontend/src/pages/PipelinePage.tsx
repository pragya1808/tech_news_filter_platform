import { useState, useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
  PipelineHeader,
  PipelineOverviewCards,
  PipelineFlowDiagram,
  PipelineStages,
  RecentPipelineRuns,
  FutureMonitoringWidgets,
} from '@/components/pipeline'
import { usePipelineOverview, usePipelineRuns } from '@/hooks/usePipeline'

export default function PipelinePage() {
  const queryClient = useQueryClient()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const overviewQuery = usePipelineOverview()
  const runsQuery = usePipelineRuns()

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await queryClient.invalidateQueries({ queryKey: ['pipeline'] })
    setIsRefreshing(false)
  }, [queryClient])

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <PipelineHeader onRefresh={handleRefresh} isRefreshing={isRefreshing} />

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--color-border)' }} />

      {/* KPI overview */}
      <PipelineOverviewCards
        overview={overviewQuery.data}
        isLoading={overviewQuery.isLoading}
      />

      {/* ETL flow diagram */}
      <PipelineFlowDiagram />

      {/* Stage detail cards */}
      <PipelineStages />

      {/* Recent runs table */}
      <RecentPipelineRuns
        runs={runsQuery.data}
        isLoading={runsQuery.isLoading}
      />

      {/* Future monitoring widgets */}
      <FutureMonitoringWidgets />
    </div>
  )
}
