import type { PipelineStage, FutureWidget } from '@/types/pipeline'

// ── ETL flow nodes ────────────────────────────────────────────────────────
// Each entry in this list renders as one node in the flow diagram.
export const PIPELINE_FLOW_NODES = [
  { id: 'rss', label: 'RSS Feeds', icon: 'Rss', group: 'source' },
  { id: 'hn', label: 'Hacker News', icon: 'Terminal', group: 'source' },
  { id: 'reddit', label: 'Reddit', icon: 'MessageCircle', group: 'source' },
  { id: 'extract', label: 'Extract', icon: 'Download', group: 'etl' },
  { id: 'transform', label: 'Transform', icon: 'Shuffle', group: 'etl' },
  { id: 'dedupe', label: 'Deduplicate', icon: 'Copy', group: 'etl' },
  { id: 'postgres', label: 'PostgreSQL', icon: 'Database', group: 'storage' },
  { id: 'api', label: 'FastAPI', icon: 'Zap', group: 'api' },
  { id: 'frontend', label: 'Dashboard', icon: 'Monitor', group: 'frontend' },
] as const

// ── Pipeline stages (detail cards) ────────────────────────────────────────
export const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: 'extraction',
    label: 'Extraction',
    description: 'Fetches raw articles from RSS feeds, Hacker News, and Reddit using scheduled scrapers.',
    technology: 'Python · Feedparser · PRAW',
    status: 'active',
  },
  {
    id: 'transformation',
    label: 'Transformation',
    description: 'Cleans HTML, normalises dates, extracts metadata, and enriches articles with topic tags.',
    technology: 'Python · BeautifulSoup · spaCy',
    status: 'active',
  },
  {
    id: 'deduplication',
    label: 'Deduplication',
    description: 'Detects and removes near-duplicate articles using content hashing and similarity scoring.',
    technology: 'Python · MinHash · SimHash',
    status: 'active',
  },
  {
    id: 'storage',
    label: 'Storage',
    description: 'Persists processed articles, topics, and source metadata to a relational database.',
    technology: 'PostgreSQL · SQLAlchemy',
    status: 'active',
  },
  {
    id: 'api',
    label: 'API Layer',
    description: 'Serves structured article data and analytics via a RESTful JSON API with automatic docs.',
    technology: 'FastAPI · Pydantic · Uvicorn',
    status: 'active',
  },
  {
    id: 'frontend',
    label: 'Frontend',
    description: 'Renders the live dashboard, article browser, analytics charts, and pipeline monitor.',
    technology: 'React 19 · Vite · TanStack Query',
    status: 'active',
  },
]

// ── Future monitoring widgets ─────────────────────────────────────────────
export const FUTURE_WIDGETS: FutureWidget[] = [
  { id: 'airflow', label: 'Airflow DAG', description: 'DAG run history and task status' },
  { id: 'scheduler', label: 'Scheduler', description: 'Next scheduled run and cron config' },
  { id: 'worker', label: 'Worker Health', description: 'Worker CPU, memory, and task queue' },
  { id: 'queue', label: 'Queue Length', description: 'Pending and in-flight message count' },
  { id: 'db', label: 'Database Health', description: 'Connection pool and query latency' },
  { id: 'apih', label: 'API Health', description: 'Uptime, error rate, and p95 latency' },
]
