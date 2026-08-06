import { X } from 'lucide-react'
import { SearchBar, FilterPanel, FilterSelect, Button } from '@/components/ui'
import type { ArticleFilters, SortOrder } from '@/hooks/useArticleFilters'
import type { TopicResponse } from '@/types'

interface ArticlesToolbarProps {
  filters: ArticleFilters
  topics: TopicResponse[]
  sources: string[]
  isSearchLoading: boolean
  hasActiveFilters: boolean
  onSearchChange: (q: string) => void
  onTopicChange: (topic: string) => void
  onSourceChange: (source: string) => void
  onSortChange: (sort: SortOrder) => void
  onClearFilters: () => void
}

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
]

export function ArticlesToolbar({
  filters,
  topics,
  sources,
  isSearchLoading,
  hasActiveFilters,
  onSearchChange,
  onTopicChange,
  onSourceChange,
  onSortChange,
  onClearFilters,
}: ArticlesToolbarProps) {
  const topicOptions = [
    { value: '', label: 'All topics' },
    ...topics.map(t => ({ value: t.name, label: t.name })),
  ]

  const sourceOptions = [
    { value: '', label: 'All sources' },
    ...sources.map(s => ({ value: s, label: s })),
  ]

  return (
    <div className="flex flex-col gap-3">
      {/* Search */}
      <SearchBar
        placeholder="Search articles…"
        value={filters.search}
        onSearch={onSearchChange}
        debounceMs={350}
        isLoading={isSearchLoading}
        className="w-full sm:max-w-md"
      />

      {/* Filters row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <FilterPanel label="Filter">
          <FilterSelect
            label="Filter by topic"
            value={filters.topic}
            onChange={onTopicChange}
            options={topicOptions}
          />
          <FilterSelect
            label="Filter by source"
            value={filters.source}
            onChange={onSourceChange}
            options={sourceOptions}
          />
          <FilterSelect
            label="Sort order"
            value={filters.sort}
            onChange={v => onSortChange(v as SortOrder)}
            options={SORT_OPTIONS}
          />
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              leftIcon={<X className="h-3.5 w-3.5" aria-hidden />}
              aria-label="Clear all filters"
            >
              Clear
            </Button>
          )}
        </FilterPanel>
      </div>
    </div>
  )
}
