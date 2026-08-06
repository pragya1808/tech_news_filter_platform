import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { Card } from './Card'
import { LoadingSkeleton } from './LoadingSkeleton'
import { ErrorState } from './ErrorState'

interface ChartContainerProps {
  title: string
  description?: string
  children: ReactNode
  isLoading?: boolean
  isError?: boolean
  onRetry?: () => void
  className?: string
  height?: number
  actions?: ReactNode
}

export function ChartContainer({
  title,
  description,
  children,
  isLoading,
  isError,
  onRetry,
  className,
  height = 280,
  actions,
}: ChartContainerProps) {
  return (
    <Card className={cn('flex flex-col gap-4', className)}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            {title}
          </h3>
          {description && (
            <p className="mt-0.5 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
              {description}
            </p>
          )}
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>

      <div style={{ height }} className="w-full min-w-0">
        {isLoading ? (
          <LoadingSkeleton rows={6} />
        ) : isError ? (
          <ErrorState title="Chart unavailable" onRetry={onRetry} className="py-8" />
        ) : (
          children
        )}
      </div>
    </Card>
  )
}
