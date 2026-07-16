import { Link } from 'react-router-dom'
import { Home, Rss } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Animated SVG illustration */}
      <div className="relative mb-10 select-none" aria-hidden>
        <div
          className="text-[120px] font-black leading-none tracking-tighter gradient-text"
        >
          404
        </div>
        <div
          className="absolute inset-0 blur-3xl opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, var(--color-brand) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Icon */}
      <div
        className="mb-6 p-4 rounded-2xl animate-fade-in"
        style={{
          backgroundColor: 'var(--color-surface-2)',
          border: '1px solid var(--color-border)',
        }}
      >
        <Rss className="h-8 w-8" style={{ color: 'var(--color-brand)' }} aria-hidden />
      </div>

      <h1
        className="text-2xl font-bold mb-3 animate-fade-in"
        style={{ color: 'var(--color-text-primary)', animationDelay: '60ms' }}
      >
        Page not found
      </h1>
      <p
        className="text-sm leading-relaxed max-w-sm mb-8 animate-fade-in"
        style={{ color: 'var(--color-text-secondary)', animationDelay: '120ms' }}
      >
        The page you're looking for doesn't exist or has been moved.
        Head back to the dashboard to continue.
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-base animate-fade-in"
        style={{
          backgroundColor: 'var(--color-brand)',
          color: '#ffffff',
          animationDelay: '180ms',
        }}
      >
        <Home className="h-4 w-4" aria-hidden />
        Back to Dashboard
      </Link>
    </div>
  )
}
