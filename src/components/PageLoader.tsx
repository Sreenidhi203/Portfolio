import { motion } from 'framer-motion'

interface PageLoaderProps {
  exiting?: boolean
}

export function PageLoader({ exiting = false }: PageLoaderProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-[rgb(var(--bg))]"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, filter: 'blur(8px)' }}
        animate={
          exiting
            ? { scale: 1.05, opacity: 0, filter: 'blur(12px)' }
            : { scale: 1, opacity: 1, filter: 'blur(0px)' }
        }
        transition={{
          duration: exiting ? 0.5 : 0.7,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="flex flex-col items-center gap-4"
      >
        <div className="flex items-center gap-1 text-xl font-bold tracking-tight text-[rgb(var(--text))]">
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            S
          </span>
          <span>reenidhi</span>
        </div>
        {/* Loading bar */}
        <div className="h-0.5 w-32 overflow-hidden rounded-full bg-[rgb(var(--border))]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            initial={{ x: '-100%' }}
            animate={{ x: exiting ? '100%' : ['-100%', '100%'] }}
            transition={{
              duration: 0.8,
              ease: 'easeInOut',
              repeat: exiting ? 0 : Infinity,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
