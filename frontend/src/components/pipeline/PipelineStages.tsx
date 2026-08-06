import { Card, Badge } from '@/components/ui'
import { PIPELINE_STAGES } from '@/constants/pipeline'
import type { StageStatus } from '@/types/pipeline'
import {
  Download, Shuffle, Copy, Database, Zap, Monitor, CheckCircle2,
} from 'lucide-react'

const STAGE_ICONS: Record<string, React.ReactNode> = {
  extraction: <Download className="h-4 w-4" aria-hidden />,
  transformation: <Shuffle className="h-4 w-4" aria-hidden />,
  deduplication: <Copy className="h-4 w-4" aria-hidden />,
  storage: <Database className="h-4 w-4" aria-hidden />,
  api: <Zap className="h-4 w-4" aria-hidden />,
  frontend: <Monitor className="h-4 w-4" aria-hidden />,
}

const STATUS_BADGE: Record<StageStatus, { variant: 'success' | 'warning' | 'danger' | 'default'; label: string }> = {
  active: { variant: 'success', label: 'Active' },
  idle: { variant: 'default', label: 'Idle' },
  error: { variant: 'danger', label: 'Error' },
  pending: { variant: 'warning', label: 'Pending' },
}

export function PipelineStages() {
  return (
    <section aria-labelledby="pipeline-stages-heading">
      <div className="mb-4">
        <h2
          id="pipeline-stages-heading"
          className="text-base font-semibold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Pipeline Stages
        </h2>
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
          Each stage of the ETL process and its current status
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PIPELINE_STAGES.map((stage) => {
          const badge = STATUS_BADGE[stage.status]
          const icon = STAGE_ICONS[stage.id]
          return (
            <Card key={stage.id} interactive className="flex flex-col gap-3 group">
              {/* Header row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="p-2 rounded-lg transition-base"
                    style={{
                      backgroundColor: 'var(--color-surface-2)',
                      color: 'var(--color-brand)',
                    }}
                  >
                    {icon}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {stage.label}
                  </span>
                </div>
                <Badge variant={badge.variant}>{badge.label}</Badge>
              </div>

              {/* Description */}
              <p
                className="text-xs leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {stage.description}
              </p>

              {/* Technology row */}
              <div
                className="flex items-center gap-1.5 pt-2 border-t text-xs"
                style={{
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-muted)',
                }}
              >
                <CheckCircle2 className="h-3 w-3 shrink-0" aria-hidden />
                <span className="font-mono">{stage.technology}</span>
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
