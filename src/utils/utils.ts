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
    getComputedStyle(document.documentElement).getPropertyValue(
      '--nav-height'
    ) || '64'
  )
  const top = el.getBoundingClientRect().top + window.scrollY - navHeight
  window.scrollTo({ top, behavior: 'smooth' })
}

/** Returns Tailwind classes for a form input, varying on error state */
export function inputCls(hasError: boolean): string {
  const focus = hasError
    ? '[border-color:rgba(239,68,68,0.7)] [box-shadow:0_0_0_3px_rgba(239,68,68,0.12)]'
    : '[border-color:rgba(59,130,246,0.7)] [box-shadow:0_0_0_3px_rgba(59,130,246,0.12)]'
  return [
    'w-full rounded-xl border px-3.5 py-2.5 text-[13px] min-h-[42px]',
    'bg-[rgb(var(--bg-subtle))] text-[rgb(var(--text))]',
    'placeholder:text-[rgb(var(--text-muted))]/60 outline-none',
    'transition-[border-color,box-shadow] duration-200',
    hasError
      ? 'border-red-400/70'
      : 'border-[rgb(var(--border))] hover:border-[rgb(var(--text-muted))]/40',
    `focus-visible:${focus}`,
  ].join(' ')
}
