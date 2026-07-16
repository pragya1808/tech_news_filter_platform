import { Newspaper, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui'
import { formatRelativeDate } from '@/utils'

interface ArticlesPageHeaderProps {
  total: number
  lastRefreshed: Date | null
  isFetching: boolean
  onRefresh: () => void
}

export function ArticlesPageHeader({
  total,
  lastRefreshed,
  isFetching,
  onRefresh,
}: ArticlesPageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: 'var(--color-brand-muted)' }}
        >
          <Newspaper className="h-5 w-5" style={{ color: 'var(--color-brand)' }} aria-hidden />
        </div>
        <div>
          <h1 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Articles
          </h1>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
            {total > 0 ? (
              <><span className="font-medium tabular-nums">{total.toLocaleString()}</span> articles indexed</>
            ) : (
              'Browse and search tech news'
            )}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {lastRefreshed && (
          <span className="text-xs hidden sm:block" style={{ color: 'var(--color-text-muted)' }}>
            Updated {formatRelativeDate(lastRefreshed.toISOString())}
          </span>
        )}
        <Button
          variant="secondary"
          size="sm"
          onClick={onRefresh}
          isLoading={isFetching}
          leftIcon={<RefreshCw className="h-3.5 w-3.5" aria-hidden />}
          aria-label="Refresh articles"
        >
          Refresh
        </Button>
      </div>
    </div>
  )
}
