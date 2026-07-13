import { motion } from 'framer-motion'

interface Tab {
  id: string
  label: string
  count?: number
}

interface PillTabsProps {
  tabs: Tab[]
  activeId: string
  onChange: (id: string) => void
  layoutId: string
  role?: 'tablist' | 'group'
  ariaLabel?: string
  className?: string
}

export function PillTabs({
  tabs,
  activeId,
  onChange,
  layoutId,
  role = 'tablist',
  ariaLabel,
  className = '',
}: PillTabsProps) {
  return (
    <div
      role={role}
      aria-label={ariaLabel}
      className={`-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0 ${className}`}
    >
      <div className="flex w-max min-w-full justify-start gap-2 sm:w-auto sm:flex-wrap sm:justify-center">
      {tabs.map((tab) => {
        const isActive = activeId === tab.id
        return (
          <button
            key={tab.id}
            role={role === 'tablist' ? 'tab' : undefined}
            aria-selected={role === 'tablist' ? isActive : undefined}
            aria-pressed={role === 'group' ? isActive : undefined}
            onClick={() => onChange(tab.id)}
            className={`relative shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2
              ${isActive ? 'text-white' : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-xl bg-violet-600"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative">
              {tab.label}
              {tab.count !== undefined && (
                <span className="ml-1.5 text-xs opacity-80">({tab.count})</span>
              )}
            </span>
          </button>
        )
      })}
      </div>
    </div>
  )
}
