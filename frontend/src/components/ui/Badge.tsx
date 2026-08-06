import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { badgeVariants, type BadgeVariant } from '@/lib/theme'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium',
        badgeVariants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
