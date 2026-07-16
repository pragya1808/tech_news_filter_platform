import { cn } from '@/utils/cn'

function Pulse({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse rounded-md', className)}
      style={{ backgroundColor: 'var(--color-surface-3)' }}
      aria-hidden="true"
    />
  )
}

function SkeletonCard() {
  return (
    <div className="card-base p-4 flex flex-col gap-3" aria-busy="true">
      <div className="flex items-center justify-between">
        <Pulse className="h-5 w-20" />
        <Pulse className="h-3.5 w-14" />
      </div>
      <Pulse className="h-4 w-full" />
      <Pulse className="h-4 w-4/5" />
      <Pulse className="h-3 w-full" />
      <Pulse className="h-3 w-3/4" />
      <Pulse className="h-3 w-2/3" />
      <div className="flex gap-2 items-center pt-1">
        <Pulse className="h-3 w-16" />
        <Pulse className="h-3 w-20" />
      </div>
      <div className="flex gap-1.5 pt-1">
        <Pulse className="h-5 w-16" />
        <Pulse className="h-5 w-14" />
        <Pulse className="h-5 w-12" />
      </div>
      <div className="pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <Pulse className="h-4 w-20" />
      </div>
    </div>
  )
}

interface ArticleGridSkeletonProps {
  count?: number
}

export function ArticleGridSkeleton({ count = 9 }: ArticleGridSkeletonProps) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      aria-label="Loading articles"
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
