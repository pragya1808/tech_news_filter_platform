import { RefreshCw, Sun, Moon, Search } from 'lucide-react'
import { Button } from '@/components/ui'
import { useTheme } from '@/contexts/ThemeContext'

interface DashboardHeaderProps {
  onRefresh: () => void
  isRefreshing: boolean
}

function formatCurrentDate(): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date())
}

export function DashboardHeader({ onRefresh, isRefreshing }: DashboardHeaderProps) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
      role="banner"
      aria-label="Dashboard header"
    >
      {/* Title + date */}
      <div>
        <h1
          className="text-xl font-semibold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Dashboard
        </h1>
        <p
          className="text-xs mt-0.5"
          style={{ color: 'var(--color-text-secondary)' }}
          aria-label="Current date"
        >
          {formatCurrentDate()}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Search shortcut */}
        <button
          aria-label="Search articles (shortcut: Ctrl+K)"
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs transition-base"
          style={{
            color: 'var(--color-text-muted)',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-surface-2)',
          }}
          onClick={() => {/* TODO: open global search */ }}
        >
          <Search className="h-3.5 w-3.5" aria-hidden />
          <span>Search</span>
          <kbd
            className="ml-1 px-1.5 py-0.5 rounded text-xs font-mono"
            style={{
              backgroundColor: 'var(--color-surface-3)',
              color: 'var(--color-text-muted)',
            }}
          >
            ⌘K
          </kbd>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="p-2 rounded-lg transition-base"
          style={{
            color: 'var(--color-text-secondary)',
            border: '1px solid var(--color-border)',
          }}
        >
          {theme === 'dark'
            ? <Sun className="h-4 w-4" aria-hidden />
            : <Moon className="h-4 w-4" aria-hidden />
          }
        </button>

        {/* Refresh */}
        <Button
          variant="secondary"
          size="sm"
          onClick={onRefresh}
          isLoading={isRefreshing}
          leftIcon={<RefreshCw className="h-3.5 w-3.5" aria-hidden />}
          aria-label="Refresh dashboard data"
        >
          Refresh
        </Button>
      </div>
    </header>
  )
}
