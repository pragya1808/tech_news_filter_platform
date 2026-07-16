import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PAGINATION_DEFAULTS } from '@/constants'

export type SortOrder = 'newest' | 'oldest'

export interface ArticleFilters {
  search: string
  topic: string
  source: string
  sort: SortOrder
  skip: number
  limit: number
}

const DEFAULT_LIMIT = PAGINATION_DEFAULTS.limit

export function useArticleFilters() {
  const [params, setParams] = useSearchParams()

  const filters: ArticleFilters = useMemo(() => ({
    search: params.get('q') ?? '',
    topic: params.get('topic') ?? '',
    source: params.get('source') ?? '',
    sort: (params.get('sort') ?? 'newest') as SortOrder,
    skip: Number(params.get('skip')) || 0,
    limit: Number(params.get('limit')) || DEFAULT_LIMIT,
  }), [params])

  const setFilters = useCallback((updates: Partial<ArticleFilters>) => {
    setParams(prev => {
      const next = new URLSearchParams(prev)
      // Reset pagination on any filter change (except explicit skip updates)
      const resetsPage = Object.keys(updates).some(k => k !== 'skip' && k !== 'limit')
      if (resetsPage) next.set('skip', '0')

      for (const [key, val] of Object.entries(updates)) {
        if (val === '' || val === null || val === undefined) {
          next.delete(key)
        } else {
          next.set(key, String(val))
        }
      }
      return next
    }, { replace: true })
  }, [setParams])

  const clearFilters = useCallback(() => {
    setParams(new URLSearchParams(), { replace: true })
  }, [setParams])

  const hasActiveFilters = filters.search !== '' || filters.topic !== '' || filters.source !== ''

  return { filters, setFilters, clearFilters, hasActiveFilters }
}
