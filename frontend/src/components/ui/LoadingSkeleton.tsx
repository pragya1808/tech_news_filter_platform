import { cn } from '@/utils/cn'

interface LoadingSkeletonProps {
  className?: string
  rows?: number
}

function SkeletonLine({ className }: { className?: string }) {
  return (
    <div
      className={cn('shimmer rounded-md', className)}
      role="presentation"
      aria-hidden="true"
    />
  )
}

export function LoadingSkeleton({ className, rows = 3 }: LoadingSkeletonProps) {
  return (
    <div className={cn('space-y-3', className)} aria-label="Loading…" role="status">
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonLine
          key={i}
          className={cn('h-4', i === 0 ? 'w-3/4' : i % 2 === 0 ? 'w-1/2' : 'w-full')}
        />
      ))}
    </div>
  )
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('card-base p-4 space-y-3', className)}
      aria-label="Loading…"
      role="status"
    >
      <SkeletonLine className="h-4 w-3/4" />
      <SkeletonLine className="h-3 w-full" />
      <SkeletonLine className="h-3 w-2/3" />
    </div>
  )
}
