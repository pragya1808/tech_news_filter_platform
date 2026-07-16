import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/components/layout/Sidebar'
import { TopNav } from '@/components/layout/TopNav'

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      {/* Accessibility skip link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div
        className="flex h-screen overflow-hidden"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <TopNav onMenuClick={() => setSidebarOpen(true)} />

          <main
            id="main-content"
            role="main"
            className="flex-1 overflow-y-auto p-5 md:p-7"
            style={{ backgroundColor: 'var(--color-bg)' }}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}
