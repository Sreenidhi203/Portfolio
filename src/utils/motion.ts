import type { Variants } from 'framer-motion'

/* ── Easing curves ────────────────────────────────────────────── */
export const ease = {
  smooth: [0.25, 0.1, 0.25, 1] as const,
  out: [0, 0, 0.2, 1] as const,
}

/* ── Duration constants ───────────────────────────────────────── */
export const duration = {
  section: 0.6,
  hero: 1.0,
} as const

/* ── Reveal variants ──────────────────────────────────────────── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: duration.section, ease: ease.out },
  },
}

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: duration.section, ease: ease.out },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: duration.section, ease: ease.out },
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30, filter: 'blur(4px)' },
  show: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: duration.section, ease: ease.out },
  },
}

export const heroWord: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: ease.smooth },
  },
}

/* ── Stagger containers ───────────────────────────────────────── */
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

export const heroContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
}

/** Backwards-compatible helper used across page components */
export const stagger = (delay = 0, staggerChildren = 0.08): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren: delay } },
})

/** Backwards-compatible easing alias */
export const EASE = [0, 0, 0.2, 1] as const

/* ── Shared viewport config ───────────────────────────────────── */
export const VIEWPORT = { once: true, margin: '-60px' } as const
export const VIEWPORT_REVEAL = { once: true, margin: '-80px' } as const

/* ── Spring configs ───────────────────────────────────────────── */
export const springs = {
  cursor: { type: 'spring' as const, stiffness: 200, damping: 25 },
  scroll: { type: 'spring' as const, stiffness: 200, damping: 30 },
  magnetic: { type: 'spring' as const, stiffness: 300, damping: 20 },
  parallax: { type: 'spring' as const, stiffness: 50, damping: 20 },
  navIndicator: { type: 'spring' as const, stiffness: 380, damping: 30 },
} as const

/* ── Hover / tap interactions ─────────────────────────────────── */
export const CARD_HOVER = {
  whileHover: { y: -4, scale: 1.02 },
  whileTap: { scale: 0.97 },
  transition: springs.magnetic,
  style: { willChange: 'transform' },
}

export const BTN_TAP = {
  whileHover: { scale: 1.05, y: -2 },
  whileTap: { scale: 0.95 },
  transition: springs.magnetic,
}
