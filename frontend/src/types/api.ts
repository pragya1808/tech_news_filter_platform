// ─────────────────────────────────────────────────────────────────────────────
// API Response Types
// ─────────────────────────────────────────────────────────────────────────────

export interface TopicResponse {
  id: number
  name: string
}

export interface ArticleResponse {
  id: number
  title: string
  summary: string | null
  author: string | null
  source: string
  url: string
  published_at: string | null
  extracted_at: string
  topics: TopicResponse[]
}

export interface ArticleListResponse {
  total: number
  skip: number
  limit: number
  items: ArticleResponse[]
}

// ─────────────────────────────────────────────────────────────────────────────
// Statistics
// ─────────────────────────────────────────────────────────────────────────────

export interface StatsResponse {
  total_articles: number
  total_topics: number
  total_sources: number
  articles_today: number
  last_updated: string | null
}

// ─────────────────────────────────────────────────────────────────────────────
// Analytics
// ─────────────────────────────────────────────────────────────────────────────

export interface AnalyticsOverviewResponse {
  total_articles: number
  total_sources: number
  total_topics: number

  avg_articles_per_day: number

  first_article: string | null
  latest_article: string | null
}

export interface SourceAnalytics {
  source: string
  count: number
}

export type AnalyticsSourcesResponse = SourceAnalytics[]

export interface TopicAnalytics {
  topic: string
  count: number
}

export type AnalyticsTopicsResponse = TopicAnalytics[]

export interface DailyAnalytics {
  date: string
  count: number
}

export type AnalyticsDailyResponse = DailyAnalytics[]

// ─────────────────────────────────────────────────────────────────────────────
// Health
// ─────────────────────────────────────────────────────────────────────────────

export interface HealthResponse {
  status: string
}

// ─────────────────────────────────────────────────────────────────────────────
// Validation Errors
// ─────────────────────────────────────────────────────────────────────────────

export interface ValidationError {
  loc: (string | number)[]
  msg: string
  type: string
  input?: unknown
  ctx?: Record<string, unknown>
}

export interface HTTPValidationError {
  detail: ValidationError[]
}

// ─────────────────────────────────────────────────────────────────────────────
// Query Parameters
// ─────────────────────────────────────────────────────────────────────────────

export interface GetArticlesParams {
  topic?: string
  source?: string

  from_date?: string
  to_date?: string
  days?: number

  sort?: "published_at" | "title" | "source"
  order?: "asc" | "desc"

  skip?: number
  limit?: number
}

export interface SearchArticlesParams {
  q: string
  skip?: number
  limit?: number
}

export interface LatestArticlesParams {
  limit?: number
}