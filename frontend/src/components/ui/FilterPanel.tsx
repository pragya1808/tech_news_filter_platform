import type { ReactNode } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { cn } from '@/utils/cn'

interface FilterPanelProps {
  children: ReactNode
  className?: string
  label?: string
}

export function FilterPanel({ children, className, label = 'Filters' }: FilterPanelProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <div
        className="flex items-center gap-1.5 text-xs shrink-0"
        style={{ color: 'var(--color-text-muted)' }}
      >
        <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden />
        <span>{label}</span>
      </div>
      {children}
    </div>
  )
}

interface FilterSelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  className?: string
}

export function FilterSelect({ label, value, onChange, options, className }: FilterSelectProps) {
  return (
    <div className={cn('relative', className)}>
      <label className="sr-only">{label}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label={label}
        className={cn(
          'h-8 pl-3 pr-7 rounded-lg text-xs appearance-none cursor-pointer transition-base',
          'bg-[var(--color-surface-2)] border border-[var(--color-border)]',
          'text-[var(--color-text-primary)]',
          'focus:outline-none focus:ring-1 focus:ring-[var(--color-brand)] focus:border-[var(--color-brand)]',
          !value && 'text-[var(--color-text-muted)]',
        )}
      >
        {options.map(o => (
          <option
            key={o.value}
            value={o.value}
            style={{ backgroundColor: 'var(--color-surface-2)' }}
          >
            {o.label}
          </option>
        ))}
      </select>
      {/* chevron */}
      <span
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
        style={{ color: 'var(--color-text-muted)' }}
        aria-hidden
      >
        ▾
      </span>
    </div>
  )
}
