import { BarChart2, RefreshCw, Download, CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui'
import { formatRelativeDate } from '@/utils'

interface AnalyticsPageHeaderProps {
  lastRefreshed: Date | null
  isFetching: boolean
  onRefresh: () => void
}

export function AnalyticsPageHeader({ lastRefreshed, isFetching, onRefresh }: AnalyticsPageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      {/* Title */}
      <div className="flex items-center gap-3">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: 'var(--color-brand-muted)' }}
        >
          <BarChart2 className="h-5 w-5" style={{ color: 'var(--color-brand)' }} aria-hidden />
        </div>
        <div>
          <h1 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Analytics
          </h1>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
            Publishing trends, source and topic breakdown
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Date range — placeholder until backend supports filtering */}
        <button
          disabled
          aria-label="Date range filter — coming soon"
          title="Date range filtering will be available once the backend supports it"
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs opacity-40 cursor-not-allowed"
          style={{
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <CalendarDays className="h-3.5 w-3.5" aria-hidden />
          Last 14 days
        </button>

        {/* Export — placeholder */}
        <button
          disabled
          aria-label="Export data — coming soon"
          title="Export will be available in a future release"
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs opacity-40 cursor-not-allowed"
          style={{
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <Download className="h-3.5 w-3.5" aria-hidden />
          Export
        </button>

        {lastRefreshed && (
          <span className="text-xs hidden md:block" style={{ color: 'var(--color-text-muted)' }}>
            Updated {formatRelativeDate(lastRefreshed.toISOString())}
          </span>
        )}

        <Button
          variant="secondary"
          size="sm"
          onClick={onRefresh}
          isLoading={isFetching}
          leftIcon={<RefreshCw className="h-3.5 w-3.5" aria-hidden />}
          aria-label="Refresh analytics data"
        >
          Refresh
        </Button>
      </div>
    </div>
  )
}
