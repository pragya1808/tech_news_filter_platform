import {
  Rss, Terminal, MessageCircle, Download,
  Shuffle, Copy, Database, Zap, Monitor, ArrowDown,
} from 'lucide-react'
import { Card } from '@/components/ui'
import { cn } from '@/utils/cn'

const ICON_MAP = {
  Rss, Terminal, MessageCircle, Download,
  Shuffle, Copy, Database, Zap, Monitor,
} as const

type IconName = keyof typeof ICON_MAP

interface FlowNode {
  id: string
  label: string
  icon: IconName
  group: 'source' | 'etl' | 'storage' | 'api' | 'frontend'
}

const GROUP_STYLES: Record<FlowNode['group'], { bg: string; border: string; text: string }> = {
  source: { bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.3)', text: '#8b5cf6' },
  etl: { bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.3)', text: '#3b82f6' },
  storage: { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)', text: '#10b981' },
  api: { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', text: '#f59e0b' },
  frontend: { bg: 'rgba(236,72,153,0.1)', border: 'rgba(236,72,153,0.3)', text: '#ec4899' },
}

const SOURCE_NODES: FlowNode[] = [
  { id: 'rss', label: 'RSS Feeds', icon: 'Rss', group: 'source' },
  { id: 'hn', label: 'Hacker News', icon: 'Terminal', group: 'source' },
  { id: 'reddit', label: 'Reddit', icon: 'MessageCircle', group: 'source' },
]

const ETL_NODES: FlowNode[] = [
  { id: 'extract', label: 'Extract', icon: 'Download', group: 'etl' },
  { id: 'transform', label: 'Transform', icon: 'Shuffle', group: 'etl' },
  { id: 'dedupe', label: 'Deduplicate', icon: 'Copy', group: 'etl' },
]

const SINK_NODES: FlowNode[] = [
  { id: 'postgres', label: 'PostgreSQL', icon: 'Database', group: 'storage' },
  { id: 'api', label: 'FastAPI', icon: 'Zap', group: 'api' },
  { id: 'frontend', label: 'Dashboard', icon: 'Monitor', group: 'frontend' },
]

function FlowNode({ node }: { node: FlowNode }) {
  const style = GROUP_STYLES[node.group]
  const IconComponent = ICON_MAP[node.icon]
  return (
    <div
      className="flex flex-col items-center gap-2 px-4 py-3 rounded-xl transition-base card-interactive"
      style={{
        backgroundColor: style.bg,
        border: `1px solid ${style.border}`,
        minWidth: 88,
      }}
      role="listitem"
    >
      <IconComponent className="h-5 w-5" style={{ color: style.text }} aria-hidden />
      <span className="text-xs font-medium whitespace-nowrap" style={{ color: style.text }}>
        {node.label}
      </span>
    </div>
  )
}

function Connector({ label, animated = true }: { label?: string; animated?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-0.5 py-1" aria-hidden>
      <div
        className={cn('w-px bg-gradient-to-b from-transparent to-transparent', animated && 'animate-pulse')}
        style={{
          height: 20,
          background: 'linear-gradient(to bottom, var(--color-border), var(--color-brand))',
        }}
      />
      <ArrowDown className="h-3.5 w-3.5" style={{ color: 'var(--color-brand)' }} />
      {label && (
        <span className="text-xs px-1.5" style={{ color: 'var(--color-text-muted)' }}>
          {label}
        </span>
      )}
    </div>
  )
}

export function PipelineFlowDiagram() {
  return (
    <Card className="overflow-x-auto">
      <div className="mb-4">
        <h2 className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          ETL Pipeline Flow
        </h2>
        <p className="mt-0.5 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
          End-to-end data flow from source to dashboard
        </p>
      </div>

      {/* Desktop: horizontal flow inside columns; Mobile: vertical */}
      <div className="flex flex-col items-center gap-0 min-w-[320px]" role="list" aria-label="Pipeline stages">
        {/* Sources row */}
        <div className="flex items-center gap-3 flex-wrap justify-center" role="group" aria-label="Data sources">
          {SOURCE_NODES.map(n => <FlowNode key={n.id} node={n} />)}
        </div>

        <Connector label="fetch" />

        {/* ETL row */}
        <div className="flex items-center gap-3 flex-wrap justify-center" role="group" aria-label="ETL processing">
          {ETL_NODES.map((n, i) => (
            <div key={n.id} className="flex items-center gap-3">
              {i > 0 && (
                <div
                  className="hidden sm:block h-px w-6"
                  style={{ backgroundColor: 'var(--color-border)' }}
                  aria-hidden
                />
              )}
              <FlowNode node={n} />
            </div>
          ))}
        </div>

        <Connector label="write" />

        {/* Storage → API → Frontend */}
        <div className="flex items-center gap-3 flex-wrap justify-center" role="group" aria-label="Storage and serving">
          {SINK_NODES.map((n, i) => (
            <div key={n.id} className="flex items-center gap-3">
              {i > 0 && (
                <div
                  className="hidden sm:block h-px w-6"
                  style={{ backgroundColor: 'var(--color-border)' }}
                  aria-hidden
                />
              )}
              <FlowNode node={n} />
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
