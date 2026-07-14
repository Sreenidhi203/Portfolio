import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '@/utils'

const SPRING = { type: 'spring' as const, stiffness: 300, damping: 20 }

type ButtonProps = Omit<HTMLMotionProps<'button'>, 'children'> & {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'icon'
}

export function Button({
  children,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  if (variant === 'secondary') {
    return (
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={SPRING}
        className={cn(
          'rounded-lg border px-6 py-3 text-xs font-semibold',
          'border-[rgb(var(--border))] bg-transparent text-[rgb(var(--text-muted))]',
          'hover:bg-[rgb(var(--bg-subtle))] hover:text-[rgb(var(--text))]',
          'transition-colors duration-200',
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    )
  }

  if (variant === 'icon') {
    return (
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        transition={SPRING}
        className={cn(
          'flex h-11 w-11 items-center justify-center rounded-full',
          'border border-[rgb(var(--border))]',
          'text-[rgb(var(--text-muted))] hover:text-blue-600 dark:hover:text-blue-400',
          'hover:border-blue-500/40 hover:bg-[rgb(var(--bg-subtle))]',
          'transition-colors duration-200',
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    )
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={SPRING}
      className={cn(
        'group relative overflow-hidden rounded-lg px-6 py-3 text-xs font-semibold text-white',
        'bg-gradient-to-r from-blue-600 to-purple-700',
        'shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40',
        'transition-shadow duration-200',
        className
      )}
      {...props}
    >
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
      />
      <span className="relative">{children}</span>
    </motion.button>
  )
}
