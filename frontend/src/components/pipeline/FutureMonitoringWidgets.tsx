import { Lock, Wind, Clock, Layers, HardDrive, Server, Activity } from 'lucide-react'
import { Card, Badge } from '@/components/ui'
import { FUTURE_WIDGETS } from '@/constants/pipeline'

const WIDGET_ICONS: Record<string, React.ReactNode> = {
  airflow: <Wind className="h-5 w-5" aria-hidden />,
  scheduler: <Clock className="h-5 w-5" aria-hidden />,
  worker: <Layers className="h-5 w-5" aria-hidden />,
  queue: <Activity className="h-5 w-5" aria-hidden />,
  db: <HardDrive className="h-5 w-5" aria-hidden />,
  apih: <Server className="h-5 w-5" aria-hidden />,
}

export function FutureMonitoringWidgets() {
  return (
    <section aria-labelledby="future-widgets-heading">
      <div className="mb-4">
        <h2
          id="future-widgets-heading"
          className="text-base font-semibold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Monitoring Widgets
        </h2>
        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
          Planned widgets — available once backend monitoring endpoints are implemented
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FUTURE_WIDGETS.map((widget) => (
          <Card
            key={widget.id}
            className="relative flex flex-col gap-3 opacity-50 select-none"
            aria-label={`${widget.label} — coming soon`}
          >
            {/* Coming soon overlay badge */}
            <div className="absolute top-3 right-3">
              <Badge variant="default">
                <Lock className="h-2.5 w-2.5 mr-1" aria-hidden />
                Coming Soon
              </Badge>
            </div>

            {/* Icon + title */}
            <div className="flex items-center gap-3">
              <span
                className="p-2 rounded-lg"
                style={{
                  backgroundColor: 'var(--color-surface-2)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {WIDGET_ICONS[widget.id]}
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {widget.label}
              </span>
            </div>

            {/* Description */}
            <p
              className="text-xs leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {widget.description}
            </p>

            {/* Placeholder chart bar */}
            <div
              className="h-12 rounded-lg flex items-end gap-1 px-2 pb-2"
              style={{ backgroundColor: 'var(--color-surface-2)' }}
              aria-hidden
            >
              {[40, 65, 30, 80, 55, 70, 45].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    backgroundColor: 'var(--color-surface-3)',
                  }}
                />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
