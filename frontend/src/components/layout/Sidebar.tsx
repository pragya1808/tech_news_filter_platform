import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Newspaper, BarChart2, GitBranch, Rss, X,
} from 'lucide-react'
import { cn } from '@/utils/cn'

const navItems = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard, end: true },
  { label: 'Articles', path: '/articles', icon: Newspaper },
  { label: 'Analytics', path: '/analytics', icon: BarChart2 },
  { label: 'Pipeline', path: '/pipeline', icon: GitBranch },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 lg:hidden backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        aria-label="Main navigation"
        className={cn(
          'fixed top-0 left-0 z-30 h-full flex flex-col',
          'w-[var(--sidebar-width)]',
          'transition-transform duration-300 ease-in-out',
          'lg:translate-x-0 lg:static lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        style={{
          backgroundColor: 'var(--color-surface)',
          borderRight: '1px solid var(--color-border)',
        }}
      >
        {/* Logo */}
        <div
          className="flex items-center justify-between px-5 shrink-0"
          style={{
            height: 'var(--topnav-height)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <a
            href="/"
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] rounded-md"
            aria-label="TechNews home"
          >
            <div
              className="flex items-center justify-center w-7 h-7 rounded-lg"
              style={{ backgroundColor: 'var(--color-brand-muted)', border: '1px solid rgba(59,130,246,0.2)' }}
            >
              <Rss className="h-3.5 w-3.5" style={{ color: 'var(--color-brand)' }} aria-hidden />
            </div>
            <span
              className="text-sm font-bold tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              TechNews
            </span>
          </a>
          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="lg:hidden p-1.5 rounded-md transition-base hover:surface-2"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5" aria-label="Page navigation">
          <p
            className="px-3 pb-2 text-xs font-medium uppercase tracking-widest"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Menu
          </p>
          {navItems.map(({ label, path, icon: Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-base',
                  isActive
                    ? 'bg-[var(--color-brand-muted)] text-[var(--color-brand)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-2)] hover:text-[var(--color-text-primary)]',
                )
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className="h-4 w-4 shrink-0"
                    style={{ color: isActive ? 'var(--color-brand)' : undefined }}
                    aria-hidden
                  />
                  {label}
                  {isActive && (
                    <span
                      className="ml-auto w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: 'var(--color-brand)' }}
                      aria-hidden
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer version tag */}
        <div
          className="px-5 py-3 text-xs shrink-0"
          style={{
            borderTop: '1px solid var(--color-border)',
            color: 'var(--color-text-muted)',
          }}
        >
          v0.1.0 · Tech News Platform
        </div>
      </aside>
    </>
  )
}
