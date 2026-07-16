// TODO: Replace placeholder rows with real data once GET /pipeline/runs is available.
import { Card, Badge, EmptyState } from '@/components/ui'
import { LoadingSkeleton } from '@/components/ui'
import { formatRelativeDate } from '@/utils'
import type { PipelineRun, RunStatus } from '@/types/pipeline'
import { GitBranch } from 'lucide-react'

const STATUS_BADGE: Record<RunStatus, { variant: 'success' | 'warning' | 'danger' | 'info'; label: string }> = {
  success: { variant: 'success', label: 'Success' },
  running: { variant: 'info', label: 'Running' },
  failed: { variant: 'danger', label: 'Failed' },
  queued: { variant: 'warning', label: 'Queued' },
}

function formatDuration(ms: number | null): string {
  if (ms === null) return '—'
  if (ms < 1000) return `${ms}ms`
  const s = Math.floor(ms / 1000)
  if (s < 60) return `${s}s`
  return `${Math.floor(s / 60)}m ${s % 60}s`
}

// Placeholder rows shown until the backend exposes /pipeline/runs.
// TODO: Remove these once real data is available.
const PLACEHOLDER_ROWS: PipelineRun[] = [
  { id: 'run-001', status: 'success', durationMs: 142_000, articlesProcessed: 87, startedAt: new Date(Date.now() - 3_600_000).toISOString() },
  { id: 'run-002', status: 'success', durationMs: 98_000, articlesProcessed: 54, startedAt: new Date(Date.now() - 10_800_000).toISOString() },
  { id: 'run-003', status: 'failed', durationMs: 22_000, articlesProcessed: 0, startedAt: new Date(Date.now() - 21_600_000).toISOString() },
  { id: 'run-004', status: 'success', durationMs: 177_000, articlesProcessed: 112, startedAt: new Date(Date.now() - 86_400_000).toISOString() },
  { id: 'run-005', status: 'success', durationMs: 133_000, articlesProcessed: 73, startedAt: new Date(Date.now() - 172_800_000).toISOString() },
]

interface RecentPipelineRunsProps {
  runs: PipelineRun[] | undefined
  isLoading: boolean
}

export function RecentPipelineRuns({ runs, isLoading }: RecentPipelineRunsProps) {
  // Use real data when available; fall back to placeholder rows
  const rows = (runs && runs.length > 0) ? runs : PLACEHOLDER_ROWS
  const isPlaceholder = !runs || runs.length === 0

  return (
    <section aria-labelledby="recent-runs-heading">
      <Card className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2
              id="recent-runs-heading"
              className="text-sm font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Recent Pipeline Runs
            </h2>
            <p className="mt-0.5 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              {isPlaceholder
                ? 'Placeholder data — TODO: replace with GET /pipeline/runs'
                : 'Latest ETL pipeline executions'}
            </p>
          </div>
          {isPlaceholder && (
            <Badge variant="warning">Placeholder</Badge>
          )}
        </div>

        {isLoading ? (
          <LoadingSkeleton rows={5} />
        ) : rows.length === 0 ? (
          <EmptyState
            icon={<GitBranch className="h-10 w-10" aria-hidden />}
            title="No pipeline runs yet"
            description="Run history will appear here once the pipeline executes."
            className="py-8"
          />
        ) : (
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full text-sm min-w-[480px]" role="table">
              <thead>
                <tr
                  className="text-xs uppercase tracking-wide border-b"
                  style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}
                >
                  <th className="text-left py-2 pr-4 font-medium" scope="col">Run ID</th>
                  <th className="text-left py-2 pr-4 font-medium" scope="col">Status</th>
                  <th className="text-right py-2 pr-4 font-medium" scope="col">Duration</th>
                  <th className="text-right py-2 pr-4 font-medium" scope="col">Articles</th>
                  <th className="text-right py-2 font-medium" scope="col">Started</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
                {rows.map((run) => {
                  const badge = STATUS_BADGE[run.status]
                  return (
                    <tr
                      key={run.id}
                      className="transition-colors"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <td className="py-3 pr-4">
                        <span
                          className="font-mono text-xs"
                          style={{ color: 'var(--color-text-secondary)' }}
                        >
                          {run.id}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <Badge variant={badge.variant}>{badge.label}</Badge>
                      </td>
                      <td
                        className="py-3 pr-4 text-right tabular-nums text-xs"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {formatDuration(run.durationMs)}
                      </td>
                      <td
                        className="py-3 pr-4 text-right tabular-nums text-xs"
                        style={{ color: 'var(--color-text-primary)' }}
                      >
                        {run.articlesProcessed?.toLocaleString() ?? '—'}
                      </td>
                      <td
                        className="py-3 text-right text-xs"
                        style={{ color: 'var(--color-text-muted)' }}
                      >
                        {formatRelativeDate(run.startedAt)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </section>
  )
}
