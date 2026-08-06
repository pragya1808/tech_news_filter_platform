import { Menu } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const PAGE_TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/articles': 'Articles',
  '/analytics': 'Analytics',
  '/pipeline': 'Pipeline',
}

interface TopNavProps {
  onMenuClick: () => void
}

export function TopNav({ onMenuClick }: TopNavProps) {
  const { pathname } = useLocation()
  const pageTitle = PAGE_TITLES[pathname] ?? 'TechNews'

  return (
    <header
      className="flex items-center px-4 gap-3 shrink-0"
      style={{
        height: 'var(--topnav-height)',
        backgroundColor: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <button
        onClick={onMenuClick}
        aria-label="Open navigation"
        className="lg:hidden p-1.5 rounded-md transition-base hover:surface-2"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Page breadcrumb — visible on mobile only (desktop has sidebar) */}
      <span
        className="text-sm font-medium lg:hidden"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {pageTitle}
      </span>

      <div className="flex-1" />

      <span
        className="hidden sm:block text-xs font-mono px-2 py-1 rounded-md"
        style={{
          backgroundColor: 'var(--color-surface-2)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-text-muted)',
        }}
      >
        Tech News Platform
      </span>
    </header>
  )
}
