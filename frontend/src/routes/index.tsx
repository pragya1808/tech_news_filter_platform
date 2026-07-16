import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import { LoadingSkeleton } from '@/components/ui'

const DashboardPage = lazy(() => import('@/pages/DashboardPage'))
const ArticlesPage = lazy(() => import('@/pages/ArticlesPage'))
const ArticleDetailPage = lazy(() => import('@/pages/ArticleDetailPage'))
const AnalyticsPage = lazy(() => import('@/pages/AnalyticsPage'))
const PipelinePage = lazy(() => import('@/pages/PipelinePage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

function PageLoader() {
  return (
    <div className="p-6">
      <LoadingSkeleton rows={5} />
    </div>
  )
}

export function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="articles/:id" element={<ArticleDetailPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="pipeline" element={<PipelinePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
