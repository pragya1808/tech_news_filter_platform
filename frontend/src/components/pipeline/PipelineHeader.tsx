import { GitBranch, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui'

interface PipelineHeaderProps {
  onRefresh: () => void
  isRefreshing: boolean
}

export function PipelineHeader({ onRefresh, isRefreshing }: PipelineHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: 'var(--color-brand-muted)' }}
        >
          <GitBranch className="h-5 w-5" style={{ color: 'var(--color-brand)' }} aria-hidden />
        </div>
        <div>
          <h1 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Pipeline
          </h1>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
            Monitor the Tech News ETL pipeline and data ingestion process
          </p>
        </div>
      </div>
      <Button
        variant="secondary"
        size="sm"
        onClick={onRefresh}
        isLoading={isRefreshing}
        leftIcon={<RefreshCw className="h-3.5 w-3.5" aria-hidden />}
        aria-label="Refresh pipeline status"
      >
        Refresh
      </Button>
    </div>
  )
}
