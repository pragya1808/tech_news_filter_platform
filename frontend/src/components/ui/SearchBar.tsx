import { Search, X, Loader2 } from 'lucide-react'
import { useState, useCallback, useEffect, useRef } from 'react'
import { cn } from '@/utils/cn'

interface SearchBarProps {
  placeholder?: string
  onSearch: (value: string) => void
  /** Controlled value — pass this to sync with URL params */
  value?: string
  defaultValue?: string
  debounceMs?: number
  isLoading?: boolean
  className?: string
}

export function SearchBar({
  placeholder = 'Search...',
  onSearch,
  value: controlledValue,
  defaultValue = '',
  debounceMs = 0,
  isLoading = false,
  className,
}: SearchBarProps) {
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState(defaultValue)
  const value = isControlled ? controlledValue : internalValue
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // When debounceMs > 0, fire onSearch after the delay
  useEffect(() => {
    if (debounceMs <= 0) return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => onSearch(value), debounceMs)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, debounceMs])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value)
    if (debounceMs <= 0) onSearch(e.target.value)
  }

  const handleClear = useCallback(() => {
    if (!isControlled) setInternalValue('')
    onSearch('')
  }, [isControlled, onSearch])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        if (timerRef.current) clearTimeout(timerRef.current)
        onSearch(value)
      }
      if (e.key === 'Escape') handleClear()
    },
    [onSearch, value, handleClear],
  )

  return (
    <div className={cn('relative flex items-center', className)}>
      {isLoading ? (
        <Loader2
          className="absolute left-3 h-4 w-4 animate-spin pointer-events-none"
          style={{ color: 'var(--color-brand)' }}
          aria-hidden
        />
      ) : (
        <Search
          className="absolute left-3 h-4 w-4 pointer-events-none"
          style={{ color: 'var(--color-text-muted)' }}
          aria-hidden
        />
      )}
      <input
        type="search"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-label={placeholder}
        className={cn(
          'w-full rounded-lg pl-9 pr-9 py-2 text-sm transition-base',
          'bg-[var(--color-surface-2)] border border-[var(--color-border)]',
          'text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]',
          'focus:outline-none focus:ring-1 focus:ring-[var(--color-brand)] focus:border-[var(--color-brand)]',
        )}
      />
      {value && (
        <button
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-3 transition-base hover:opacity-70"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
