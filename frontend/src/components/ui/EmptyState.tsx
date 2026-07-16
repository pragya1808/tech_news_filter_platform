import type { ReactNode } from 'react'
import { Inbox } from 'lucide-react'
import { cn } from '@/utils/cn'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: ReactNode
  action?: ReactNode
  className?: string
}

export function EmptyState({
  title = 'Nothing here yet',
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-20 text-center px-6',
        className,
      )}
      role="status"
    >
      {/* Icon container with subtle glow ring */}
      <div
        className="mb-5 p-4 rounded-2xl"
        style={{
          backgroundColor: 'var(--color-surface-2)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-text-muted)',
        }}
      >
        {icon ?? <Inbox className="h-8 w-8" aria-hidden />}
      </div>
      <p
        className="text-sm font-semibold"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {title}
      </p>
      {description && (
        <p
          className="mt-2 text-sm leading-relaxed max-w-[280px]"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {description}
        </p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
