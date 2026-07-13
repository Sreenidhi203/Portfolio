/** Joins class names, filtering out falsy values */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

/** Smooth-scrolls to a section, accounting for the sticky nav height */
export function scrollToSection(hrefOrId: string): void {
  const id = hrefOrId.replace('#', '')
  const el = document.getElementById(id)
  if (!el) return
  const navHeight = parseInt(
    getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '64',
  )
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight
  window.scrollTo({ top, behavior: 'smooth' })
}

/** Returns Tailwind classes for a form input, varying on error state */
export function inputCls(hasError: boolean): string {
  return [
    'w-full rounded-xl border px-4 py-3 text-sm',
    'bg-[rgb(var(--bg-subtle))] text-[rgb(var(--text))]',
    'placeholder:text-[rgb(var(--text-muted))] outline-none',
    'transition-all duration-200',
    'focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:border-violet-500',
    hasError
      ? 'border-rose-400 focus-visible:ring-rose-400 focus-visible:border-rose-400'
      : 'border-[rgb(var(--border))] hover:border-violet-400/60',
  ].join(' ')
}
