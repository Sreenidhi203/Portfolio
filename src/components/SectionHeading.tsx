import type { ReactNode } from 'react'

interface SectionLabelProps {
  children: ReactNode
}

export function SectionLabel({ children }: SectionLabelProps) {
  return (
    <div className="mb-4 flex items-center justify-center gap-3" aria-hidden="true">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-violet-500" />
      <span className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
        {children}
      </span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-violet-500" />
    </div>
  )
}

interface SectionHeadingProps {
  label: string
  title: ReactNode
  subtitle?: string
}

export function SectionHeading({ label, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12 text-center">
      <SectionLabel>{label}</SectionLabel>
      <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-xl text-base text-gray-500 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  )
}
