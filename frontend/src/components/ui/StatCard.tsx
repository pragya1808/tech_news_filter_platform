import type { ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/utils/cn'
import { Card } from './Card'

interface StatCardProps {
  label: string
  value: ReactNode
  icon?: ReactNode
  trend?: { value: number; label?: string }
  className?: string
}

export function StatCard({ label, value, icon, trend, className }: StatCardProps) {
  const isPositive = trend && trend.value >= 0

  return (
    <Card className={cn('flex flex-col gap-3', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-secondary uppercase tracking-wider">
          {label}
        </span>
        {icon && (
          <span className="p-2 rounded-lg surface-2 text-[var(--color-brand)]">
            {icon}
          </span>
        )}
      </div>

      <div className="text-2xl font-semibold text-primary">{value}</div>

      {trend && (
        <div
          className={cn(
            'flex items-center gap-1 text-xs font-medium',
            isPositive ? 'text-[var(--color-success)]' : 'text-[var(--color-danger)]',
          )}
        >
          {isPositive
            ? <TrendingUp className="h-3 w-3" aria-hidden />
            : <TrendingDown className="h-3 w-3" aria-hidden />
          }
          <span>{isPositive ? '+' : ''}{trend.value}%</span>
          <span className="text-muted font-normal">{trend.label ?? 'vs last period'}</span>
        </div>
      )}
    </Card>
  )
}
