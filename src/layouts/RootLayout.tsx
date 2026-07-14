import type { ReactNode } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { ErrorBoundary, CustomCursor, ScrollProgress } from '@/components'
import { ThemeProvider } from '@/context/ThemeContext'

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ThemeProvider>
      <CustomCursor />
      <ScrollProgress />
      <div className="flex min-h-screen flex-col">
        {/* Skip to content — WCAG 2.4.1 */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        <ErrorBoundary>
          <main id="main-content" className="flex-1">
            {children}
          </main>
        </ErrorBoundary>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
