// TODO: Replace placeholder values with real data once GET /pipeline/status is available.
import { Newspaper, Globe, Clock, Activity } from 'lucide-react'
import { Card, Badge, CardSkeleton } from '@/components/ui'
import { formatRelativeDate } from '@/utils'
import type { PipelineOverview, PipelineStatus } from '@/types/pipeline'

function statusBadge(status: PipelineStatus) {
  const map: Record<PipelineStatus, { variant: 'success' | 'warning' | 'danger' | 'default'; label: string }> = {
    running: { variant: 'success', label: 'Running' },
    idle: { variant: 'default', label: 'Idle' },
    error: { variant: 'danger', label: 'Error' },
    paused: { variant: 'warning', label: 'Paused' },
  }
  const { variant, label } = map[status]
  return <Badge variant={variant}>{label}</Badge>
}

interface OverviewCardProps {
  label: string
  value: React.ReactNode
  icon: React.ReactNode
  sub?: React.ReactNode
}

function OverviewCard({ label, value, icon, sub }: OverviewCardProps) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span
          className="text-xs font-medium uppercase tracking-wider"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {label}
        </span>
        <span
          className="p-2 rounded-lg"
          style={{ backgroundColor: 'var(--color-surface-2)', color: 'var(--color-brand)' }}
        >
          {icon}
        </span>
      </div>
      <div className="text-2xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
        {value}
      </div>
      {sub && (
        <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {sub}
        </div>
      )}
    </Card>
  )
}

interface PipelineOverviewCardsProps {
  overview: PipelineOverview | undefined
  isLoading: boolean
}

export function PipelineOverviewCards({ overview, isLoading }: PipelineOverviewCardsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)}
      </div>
    )
  }

  const data = overview ?? {
    status: 'idle' as PipelineStatus,
    articlesProcessed: 0,
    activeSources: 0,
    lastRunAt: null,
    nextRunAt: null,
  }

  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      role="region"
      aria-label="Pipeline overview"
    >
      <OverviewCard
        label="Pipeline Status"
        value={statusBadge(data.status)}
        icon={<Activity className="h-4 w-4" aria-hidden />}
        sub="TODO: live status from backend"
      />
      <OverviewCard
        label="Articles Processed"
        value={data.articlesProcessed.toLocaleString()}
        icon={<Newspaper className="h-4 w-4" aria-hidden />}
        sub="TODO: cumulative count from backend"
      />
      <OverviewCard
        label="Active Sources"
        value={data.activeSources.toLocaleString()}
        icon={<Globe className="h-4 w-4" aria-hidden />}
        sub="TODO: source count from backend"
      />
      <OverviewCard
        label="Last Run"
        value={data.lastRunAt ? formatRelativeDate(data.lastRunAt) : '—'}
        icon={<Clock className="h-4 w-4" aria-hidden />}
        sub={data.nextRunAt ? `Next: ${formatRelativeDate(data.nextRunAt)}` : 'TODO: scheduler from backend'}
      />
    </div>
  )
}
