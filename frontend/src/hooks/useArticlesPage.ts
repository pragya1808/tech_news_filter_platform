import { useMemo } from 'react'
import { useArticles, useSearchArticles } from './useArticles'
import { useTopics } from './useTopics'
import { useSources } from './useSources'
import type { ArticleFilters, SortOrder } from './useArticleFilters'
import type { ArticleResponse } from '@/types'

function sortArticles(
  items: ArticleResponse[],
  sort: SortOrder
): ArticleResponse[] {
  const copy = [...items]

  return copy.sort((a, b) => {
    const da = new Date(a.published_at ?? a.extracted_at).getTime()
    const db = new Date(b.published_at ?? b.extracted_at).getTime()

    return sort === 'newest'
      ? db - da
      : da - db
  })
}

export function useArticlesPage(filters: ArticleFilters) {
  const isSearching = filters.q.trim().length > 0

  // Browse mode
  const browseQuery = useArticles({
    topic: filters.topic || undefined,
    source: filters.source || undefined,
    skip: filters.skip,
    limit: filters.limit,
  })

  // Search mode
  const searchQuery = useSearchArticles({
    q: filters.q,
    skip: filters.skip,
    limit: filters.limit,
  })

  // Topics
  const topicsQuery = useTopics()

  // Sources
  const sourcesQuery = useSources()

  // Articles
  const articles = useMemo(() => {
    const raw = isSearching
      ? (searchQuery.data?.items ?? [])
      : (browseQuery.data?.items ?? [])

    return sortArticles(raw, filters.sort)
  }, [
    isSearching,
    searchQuery.data,
    browseQuery.data,
    filters.sort,
  ])

  // Pagination
  const pagination = useMemo(() => {
    if (isSearching) {
      return {
        total: searchQuery.data?.total ?? 0,
        skip: searchQuery.data?.skip ?? filters.skip,
        limit: searchQuery.data?.limit ?? filters.limit,
      }
    }

    return {
      total: browseQuery.data?.total ?? 0,
      skip: browseQuery.data?.skip ?? 0,
      limit: browseQuery.data?.limit ?? filters.limit,
    }
  }, [
    isSearching,
    searchQuery.data,
    browseQuery.data,
    filters.skip,
    filters.limit,
  ])

  const isLoading = isSearching
    ? searchQuery.isLoading
    : browseQuery.isLoading

  const isFetching = isSearching
    ? searchQuery.isFetching
    : browseQuery.isFetching

  const isError = isSearching
    ? searchQuery.isError
    : browseQuery.isError

  const refetch = isSearching
    ? searchQuery.refetch
    : browseQuery.refetch

  return {
    articles,
    pagination,
    isLoading,
    isFetching,
    isError,
    refetch,
    topicsQuery,
    sourcesQuery,
    isSearching,
  }
}