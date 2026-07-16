import { AlertTriangle, RefreshCw } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-20 text-center px-6',
        className,
      )}
      role="alert"
      aria-live="assertive"
    >
      <div
        className="mb-5 p-4 rounded-2xl"
        style={{
          backgroundColor: 'var(--color-danger-muted)',
          border: '1px solid rgba(248,81,73,0.2)',
        }}
      >
        <AlertTriangle
          className="h-8 w-8"
          style={{ color: 'var(--color-danger)' }}
          aria-hidden
        />
      </div>
      <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
        {title}
      </p>
      {message && (
        <p
          className="mt-2 text-sm leading-relaxed max-w-[280px]"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {message}
        </p>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-lg transition-base"
          style={{
            backgroundColor: 'var(--color-surface-2)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-primary)',
          }}
        >
          <RefreshCw className="h-3.5 w-3.5" aria-hidden />
          Try again
        </button>
      )}
    </div>
  )
}
