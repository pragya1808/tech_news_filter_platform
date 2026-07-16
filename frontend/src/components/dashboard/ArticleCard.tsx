import { ExternalLink, Clock } from 'lucide-react'
import { Card, Badge } from '@/components/ui'
import { formatRelativeDate } from '@/utils'
import type { ArticleResponse } from '@/types'

interface ArticleCardProps {
  article: ArticleResponse
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card
      interactive
      className="flex flex-col gap-3 h-full group"
    >
      {/* Source + time */}
      <div className="flex items-center justify-between gap-2">
        <Badge variant="primary">{article.source}</Badge>
        <span
          className="flex items-center gap-1 text-xs shrink-0"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <Clock className="h-3 w-3" aria-hidden />
          {formatRelativeDate(article.published_at)}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-sm font-semibold leading-snug line-clamp-2 group-hover:text-[var(--color-text-link)] transition-colors"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {article.title}
      </h3>

      {/* Summary */}
      {article.summary && (
        <p
          className="text-xs leading-relaxed line-clamp-3 flex-1"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {article.summary}
        </p>
      )}

      {/* Topics */}
      {article.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5" role="list" aria-label="Article topics">
          {article.topics.slice(0, 3).map(t => (
            <span role="listitem" key={t.id}>
              <Badge variant="default">{t.name}</Badge>
            </span>
          ))}
          {article.topics.length > 3 && (
            <span role="listitem">
              <Badge variant="default">+{article.topics.length - 3}</Badge>
            </span>
          )}
        </div>
      )}

      {/* Read more */}
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read more: ${article.title}`}
        className="flex items-center gap-1.5 text-xs font-medium mt-auto pt-2 border-t transition-colors"
        style={{
          borderColor: 'var(--color-border)',
          color: 'var(--color-brand)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        Read More
      </a>
    </Card>
  )
}
