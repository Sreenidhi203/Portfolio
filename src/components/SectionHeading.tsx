import type { ReactNode } from 'react'

interface SectionLabelProps {
  children: ReactNode
  align?: 'center' | 'left'
}

export function SectionLabel({
  children,
  align = 'center',
}: SectionLabelProps) {
  if (align === 'left') {
    return (
      <div className="mb-3 flex items-center gap-2">
        <span className="h-px w-8 bg-gradient-to-r from-blue-500 to-transparent" />
        <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          {children}
        </span>
      </div>
    )
  }
  return (
    <div
      className="mb-4 flex items-center justify-center gap-3"
      aria-hidden="true"
    >
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-blue-500" />
      <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
        {children}
      </span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-blue-500" />
    </div>
  )
}

interface SectionHeadingProps {
  label: string
  title: ReactNode
  subtitle?: string
  align?: 'center' | 'left'
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
}: SectionHeadingProps) {
  const isLeft = align === 'left'
  return (
    <div className={`mb-8 ${isLeft ? '' : 'text-center'}`}>
      <SectionLabel align={align}>{label}</SectionLabel>
      <h2
        className="text-3xl font-extrabold tracking-tight text-[rgb(var(--text))] sm:text-4xl"
        style={{ letterSpacing: '-0.025em' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-sm leading-relaxed text-[rgb(var(--text-muted))] ${isLeft ? 'max-w-xl' : 'mx-auto max-w-xl'}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
