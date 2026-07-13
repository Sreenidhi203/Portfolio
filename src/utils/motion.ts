import type { Variants } from 'framer-motion'

export const EASE = [0.22, 1, 0.36, 1] as const

/* ── Entrance variants ────────────────────────────────────────── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.5, ease: EASE } },
}

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
}

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE } },
}

/* ── Container stagger ────────────────────────────────────────── */
export const stagger = (delay = 0, staggerChildren = 0.08): Variants => ({
  hidden: {},
  show:   { transition: { staggerChildren, delayChildren: delay } },
})

/* ── Shared viewport config ───────────────────────────────────── */
export const VIEWPORT = { once: true, margin: '-60px' } as const

/* ── Card hover spring ────────────────────────────────────────── */
export const CARD_HOVER = {
  whileHover: { y: -6, scale: 1.02 },
  transition: { type: 'spring' as const, stiffness: 260, damping: 20 },
  style: { willChange: 'transform' },
}

/* ── Button tap spring ────────────────────────────────────────── */
export const BTN_TAP = {
  whileHover: { scale: 1.03 },
  whileTap:   { scale: 0.97 },
  transition: { type: 'spring' as const, stiffness: 300, damping: 22 },
}
