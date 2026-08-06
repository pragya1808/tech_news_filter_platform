# TechNews Platform

A production-ready, full-stack tech news aggregation platform with real-time analytics and ETL pipeline monitoring.

---

## Overview

TechNews continuously scrapes tech articles from RSS feeds, Hacker News, and Reddit, enriches them with topic tags, deduplicates them, and exposes them through a FastAPI backend and a polished React dashboard.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Data Sources                            │
│          RSS Feeds        Hacker News        Reddit             │
└────────────────────────────┬────────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   ETL Pipeline  │
                    │  Extract        │
                    │  Transform      │
                    │  Deduplicate    │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │   PostgreSQL    │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │    FastAPI      │
                    │  (openapi.json) │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │  React Frontend │
                    │  (this project) │
                    └─────────────────┘
```

---

## Tech Stack

| Layer       | Technology                                      |
|-------------|-------------------------------------------------|
| Frontend    | React 19, TypeScript, Vite, Tailwind CSS v4     |
| Routing     | React Router DOM v7                             |
| Data        | TanStack React Query v5, Axios                  |
| Charts      | Recharts                                        |
| Icons       | Lucide React                                    |
| Backend     | FastAPI, Python, SQLAlchemy                     |
| Database    | PostgreSQL                                      |
| Deployment  | Vercel, Docker + Nginx                          |

---

## Folder Structure

```
src/
├── assets/                  Static assets
├── components/
│   ├── analytics/           Chart and analytics widgets
│   ├── articles/            Article grid, cards, toolbar
│   ├── common/              ErrorBoundary
│   ├── dashboard/           Dashboard-specific widgets
│   ├── layout/              Sidebar, TopNav
│   ├── pipeline/            ETL pipeline monitor widgets
│   └── ui/                  Design system components
├── constants/               App-wide constants and query keys
├── contexts/                ThemeContext
├── hooks/                   React Query data hooks
├── layouts/                 MainLayout
├── lib/                     Axios client, QueryClient, theme tokens
├── pages/                   Route-level page components
├── routes/                  Lazy-loaded route config
├── services/                API service layer
├── styles/                  Global CSS and design tokens
├── types/                   TypeScript interfaces (from openapi.json)
└── utils/                   cn, formatDate, analytics derivations
```

---

## API Endpoints

Defined in `openapi.json`. Base URL: `VITE_API_BASE_URL`.

| Method | Path                    | Description                          |
|--------|-------------------------|--------------------------------------|
| GET    | `/articles`             | Paginated articles with filters      |
| GET    | `/articles/search`      | Full-text article search             |
| GET    | `/articles/latest`      | Most recent articles                 |
| GET    | `/articles/{id}`        | Single article by ID                 |
| GET    | `/topics`               | All available topics                 |
| GET    | `/stats`                | Platform statistics (schema TBD)     |
| GET    | `/analytics/overview`   | Analytics overview (schema TBD)      |
| GET    | `/analytics/sources`    | Source breakdown (schema TBD)        |
| GET    | `/analytics/topics`     | Topic breakdown (schema TBD)         |
| GET    | `/analytics/daily`      | Daily trend (schema TBD)             |
| GET    | `/health`               | Health check                         |

---

## Pages

| Route        | Description                                      |
|--------------|--------------------------------------------------|
| `/`          | Dashboard — KPIs, charts, latest articles        |
| `/articles`  | Article browser with search, filters, pagination |
| `/analytics` | Charts and source ranking table                  |
| `/pipeline`  | ETL pipeline monitor and stage overview          |
| `*`          | 404 page                                         |

---

## Screenshots

> _Screenshots to be added once the backend is running._

---

## Installation

```bash
git clone <repo>
cd frontend
npm install
cp .env.example .env
# Set VITE_API_BASE_URL in .env
```

---

## Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

---

## Environment Variables

| Variable            | Default                  | Description              |
|---------------------|--------------------------|--------------------------|
| `VITE_API_BASE_URL` | `http://localhost:8000`  | FastAPI backend URL      |
| `VITE_API_TIMEOUT`  | `10000`                  | Request timeout (ms)     |

---

## Production Build

```bash
npm run build       # Vite production build → dist/
npm run typecheck   # TypeScript check
npm run lint        # ESLint
```

---

## Deployment

### Vercel

```bash
vercel --prod
```

`vercel.json` handles SPA routing rewrites automatically.

### Docker

```bash
docker build -t technews-frontend .
docker run -p 3000:80 \
  -e VITE_API_BASE_URL=https://your-api.example.com \
  technews-frontend
```

> Note: Vite env vars are baked in at build time. Pass them as build args or rebuild inside Docker.

---

## Future Roadmap

- [ ] Real pipeline monitoring endpoints
- [ ] User authentication and saved searches
- [ ] Article bookmarking
- [ ] Email digest subscriptions
- [ ] Full-text search with highlighting
- [ ] Mobile app (React Native)
- [ ] Dark/light mode per-user persistence in backend

---

## License

MIT
