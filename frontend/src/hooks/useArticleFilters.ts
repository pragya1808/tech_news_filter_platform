import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PAGINATION_DEFAULTS } from '@/constants'

export type SortOrder = 'newest' | 'oldest'

export interface ArticleFilters {
  q: string
  topic: string
  source: string
  sort: SortOrder
  skip: number
  limit: number
}

const DEFAULT_LIMIT = PAGINATION_DEFAULTS.limit

export function useArticleFilters() {
  const [params, setParams] = useSearchParams()

  const filters: ArticleFilters = useMemo(
    () => ({
      q: params.get('q') ?? '',
      topic: params.get('topic') ?? '',
      source: params.get('source') ?? '',
      sort: (params.get('sort') ?? 'newest') as SortOrder,
      skip: Number(params.get('skip')) || 0,
      limit: Number(params.get('limit')) || DEFAULT_LIMIT,
    }),
    [params],
  )

  const setFilters = useCallback(
    (updates: Partial<ArticleFilters>) => {
      setParams(
        prev => {
          const next = new URLSearchParams(prev)

          const resetsPage = Object.keys(updates).some(
            key => key !== 'skip' && key !== 'limit',
          )

          if (resetsPage) {
            next.set('skip', '0')
          }

          for (const [key, value] of Object.entries(updates)) {
            if (value === '' || value === null || value === undefined) {
              next.delete(key)
            } else {
              next.set(key, String(value))
            }
          }

          return next
        },
        { replace: true },
      )
    },
    [setParams],
  )

  const clearFilters = useCallback(() => {
    setParams(new URLSearchParams(), { replace: true })
  }, [setParams])

  const hasActiveFilters =
    filters.q !== '' ||
    filters.topic !== '' ||
    filters.source !== ''

  return {
    filters,
    setFilters,
    clearFilters,
    hasActiveFilters,
  }
}