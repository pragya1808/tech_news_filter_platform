import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface CardProps {
  children: ReactNode
  className?: string
  interactive?: boolean
  onClick?: () => void
}

export function Card({ children, className, interactive, onClick }: CardProps) {
  const isClickable = interactive || !!onClick

  return (
    <div
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onClick={onClick}
      onKeyDown={isClickable ? (e) => e.key === 'Enter' && onClick?.() : undefined}
      className={cn(
        'card-base p-4',
        isClickable && 'card-interactive cursor-pointer',
        className,
      )}
    >
      {children}
    </div>
  )
}
