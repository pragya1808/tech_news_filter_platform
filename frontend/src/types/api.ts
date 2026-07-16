// ─── Typed schemas from openapi.json ────────────────────────────────────────

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
  published_at: string | null  // ISO datetime
  extracted_at: string         // ISO datetime
  topics: TopicResponse[]
}

export interface ArticleListResponse {
  total: number
  skip: number
  limit: number
  items: ArticleResponse[]
}

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

// ─── Query param types ───────────────────────────────────────────────────────

export interface GetArticlesParams {
  topic?: string
  source?: string
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

// ─── Placeholder interfaces for untyped endpoints ───────────────────────────
// TODO: Update these once the backend defines response schemas.

/** GET /stats — response schema is currently {} in openapi.json */
export interface StatsResponse {
  // TODO: populate when backend defines this schema
  [key: string]: unknown
}

/** GET /analytics/overview — response schema is currently {} in openapi.json */
export interface AnalyticsOverviewResponse {
  // TODO: populate when backend defines this schema
  [key: string]: unknown
}

/** GET /analytics/sources — response schema is currently {} in openapi.json */
export interface AnalyticsSourcesResponse {
  // TODO: populate when backend defines this schema
  [key: string]: unknown
}

/** GET /analytics/topics — response schema is currently {} in openapi.json */
export interface AnalyticsTopicsResponse {
  // TODO: populate when backend defines this schema
  [key: string]: unknown
}

/** GET /analytics/daily — response schema is currently {} in openapi.json */
export interface AnalyticsDailyResponse {
  // TODO: populate when backend defines this schema
  [key: string]: unknown
}

/** GET /health — response schema is currently {} in openapi.json */
export interface HealthResponse {
  // TODO: populate when backend defines this schema
  [key: string]: unknown
}
