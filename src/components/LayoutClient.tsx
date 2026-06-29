'use client'

import { usePathname } from 'next/navigation'
import NavSidebar from './NavSidebar'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <div className="flex min-h-screen">
      <NavSidebar currentPath={pathname} />
      <main className="flex-1 pt-12 lg:pt-0 overflow-x-hidden">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
