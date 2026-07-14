import { AnimatePresence, MotionConfig } from 'framer-motion'
import { useState, useEffect } from 'react'
import { RootLayout } from '@/layouts'
import { HomePage } from '@/pages'
import { PageLoader } from '@/components'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const exit = setTimeout(() => setExiting(true), 800)
    const done = setTimeout(() => setLoading(false), 1400)
    return () => {
      clearTimeout(exit)
      clearTimeout(done)
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {loading && <PageLoader key="loader" exiting={exiting} />}
      </AnimatePresence>
      <RootLayout>
        <HomePage />
      </RootLayout>
    </MotionConfig>
  )
}
