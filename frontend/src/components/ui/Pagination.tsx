import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/utils/cn'

interface PaginationProps {
  total: number
  skip: number
  limit: number
  onPageChange: (skip: number) => void
  className?: string
}

export function Pagination({ total, skip, limit, onPageChange, className }: PaginationProps) {
  const currentPage = Math.floor(skip / limit) + 1
  const totalPages = Math.ceil(total / limit)

  if (totalPages <= 1) return null

  return (
    <nav
      aria-label="Pagination"
      className={cn('flex items-center justify-between text-sm', className)}
      style={{ color: 'var(--color-text-secondary)' }}
    >
      <span>
        Showing {skip + 1}–{Math.min(skip + limit, total)} of {total}
      </span>

      <div className="flex items-center gap-1">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(skip - limit)}
          aria-label="Previous page"
          className="p-1.5 rounded-lg transition-base hover:surface-2 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <span className="px-3 tabular-nums">
          {currentPage} / {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(skip + limit)}
          aria-label="Next page"
          className="p-1.5 rounded-lg transition-base hover:surface-2 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </nav>
  )
}
