import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp } from '@/utils/motion'

interface AnimatedPageProps {
  children: ReactNode
}

export default function AnimatedPage({ children }: AnimatedPageProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
      aria-live="polite"
    >
      {children}
    </motion.div>
  )
}
