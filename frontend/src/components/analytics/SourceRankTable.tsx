import { Card, EmptyState } from '@/components/ui'
import { LoadingSkeleton } from '@/components/ui'
import { formatDate } from '@/utils'
import { chartColors } from '@/lib/theme'
import type { SourceRankRow } from '@/utils/analytics'
import { Globe } from 'lucide-react'

interface SourceRankTableProps {
  rows: SourceRankRow[]
  isLoading: boolean
}

function PercentageBar({ value, color }: { value: number; color: string }) {
  return (
    <div
      className="relative w-full rounded-full overflow-hidden"
      style={{ height: 6, backgroundColor: 'var(--color-surface-3)' }}
      role="presentation"
    >
      <div
        className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  )
}

export function SourceRankTable({ rows, isLoading }: SourceRankTableProps) {
  return (
    <Card className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          Top Sources
        </h3>
        <p className="mt-0.5 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          Article count and share by source
        </p>
      </div>

      {isLoading ? (
        <LoadingSkeleton rows={6} />
      ) : rows.length === 0 ? (
        <EmptyState
          icon={<Globe className="h-10 w-10" aria-hidden />}
          title="No source data yet"
          description="Source rankings will appear once articles are indexed."
          className="py-8"
        />
      ) : (
        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full text-sm min-w-[400px]" role="table">
            <thead>
              <tr
                className="text-xs uppercase tracking-wide border-b"
                style={{ color: 'var(--color-text-muted)', borderColor: 'var(--color-border)' }}
              >
                <th className="text-left py-2 pr-4 font-medium" scope="col">#</th>
                <th className="text-left py-2 pr-4 font-medium" scope="col">Source</th>
                <th className="text-right py-2 pr-4 font-medium" scope="col">Articles</th>
                <th className="text-right py-2 pr-4 font-medium w-24" scope="col">Share</th>
                <th className="text-right py-2 font-medium hidden sm:table-cell" scope="col">
                  Last Article
                </th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
              {rows.map((row, i) => (
                <tr
                  key={row.source}
                  className="transition-colors group"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <td
                    className="py-3 pr-4 tabular-nums text-xs"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {i + 1}
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full shrink-0"
                        style={{ backgroundColor: chartColors[i % chartColors.length] }}
                        aria-hidden
                      />
                      <span
                        className="font-medium text-xs truncate max-w-[160px]"
                        style={{ color: 'var(--color-text-primary)' }}
                        title={row.source}
                      >
                        {row.source}
                      </span>
                    </div>
                  </td>
                  <td
                    className="py-3 pr-4 text-right tabular-nums text-xs font-medium"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {row.count.toLocaleString()}
                  </td>
                  <td className="py-3 pr-4 w-24">
                    <div className="flex items-center gap-2 justify-end">
                      <span
                        className="text-xs tabular-nums w-8 text-right"
                        style={{ color: 'var(--color-text-secondary)' }}
                      >
                        {row.percentage}%
                      </span>
                      <div className="w-16 hidden sm:block">
                        <PercentageBar
                          value={row.percentage}
                          color={chartColors[i % chartColors.length]}
                        />
                      </div>
                    </div>
                  </td>
                  <td
                    className="py-3 text-right text-xs hidden sm:table-cell"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {formatDate(row.lastArticleDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  )
}
