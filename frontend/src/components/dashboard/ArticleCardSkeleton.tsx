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

export function ArticleCardSkeleton() {
  return (
    <div
      className="card-base p-4 flex flex-col gap-3"
      aria-label="Loading article"
      aria-busy="true"
    >
      <div className="flex items-center justify-between">
        <Pulse className="h-5 w-20" />
        <Pulse className="h-3.5 w-14" />
      </div>
      <Pulse className="h-4 w-full" />
      <Pulse className="h-4 w-4/5" />
      <Pulse className="h-3 w-full" />
      <Pulse className="h-3 w-3/4" />
      <Pulse className="h-3 w-2/3" />
      <div className="flex gap-1.5 pt-1">
        <Pulse className="h-5 w-16" />
        <Pulse className="h-5 w-14" />
      </div>
      <div className="pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <Pulse className="h-4 w-20" />
      </div>
    </div>
  )
}
