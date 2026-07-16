export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string
export const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10_000

export const QUERY_KEYS = {
  articles: ['articles'] as const,
  article: (id: number) => ['articles', id] as const,
  latestArticles: ['articles', 'latest'] as const,
  searchArticles: (q: string) => ['articles', 'search', q] as const,
  topics: ['topics'] as const,
  stats: ['stats'] as const,
  analyticsOverview: ['analytics', 'overview'] as const,
  analyticsSources: ['analytics', 'sources'] as const,
  analyticsTopics: ['analytics', 'topics'] as const,
  analyticsDaily: ['analytics', 'daily'] as const,
} as const

export const PAGINATION_DEFAULTS = {
  skip: 0,
  limit: 20,
  maxLimit: 100,
} as const

export const NAV_ITEMS = [
  { label: 'Dashboard', path: '/', icon: 'LayoutDashboard' },
  { label: 'Articles', path: '/articles', icon: 'Newspaper' },
  { label: 'Analytics', path: '/analytics', icon: 'BarChart2' },
  { label: 'Pipeline', path: '/pipeline', icon: 'GitBranch' },
] as const
