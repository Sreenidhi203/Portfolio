import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { NAV_LINKS, SITE } from '@/constants'
import { fadeUp, stagger, VIEWPORT } from '@/utils/motion'
import { scrollToSection } from '@/utils'

const footerStagger = stagger(0, 0.06)

/* ── Socials ──────────────────────────────────────────────────── */
const SOCIALS = [
  { label: 'GitHub',   href: SITE.github,   icon: <FaGithub  size={16} aria-hidden /> },
  { label: 'LinkedIn', href: SITE.linkedin, icon: <FaLinkedin size={16} aria-hidden /> },
  { label: 'Twitter',  href: SITE.twitter,  icon: <FaTwitter  size={16} aria-hidden /> },
  {
    label: 'Email',
    href: `mailto:${SITE.email}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0-9.75 6.75L2.25 6.75" />
      </svg>
    ),
  },
]

const CURRENT_YEAR = new Date().getFullYear()

/* ── Component ────────────────────────────────────────────────── */
export default function Footer() {
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const handler = () => setShowTop(window.scrollY > 400)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <footer className="relative border-t border-[rgb(var(--border))] bg-[rgb(var(--bg-subtle))]">

      {/* Back-to-top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            key="btt"
            initial={{ opacity: 0, y: 12, scale: 0.85 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.85 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="absolute -top-5 left-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))] shadow-md text-[rgb(var(--text-muted))] hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <div className="container-main py-12 sm:py-14">
        <motion.div
          variants={footerStagger} initial="hidden" whileInView="show" viewport={VIEWPORT}
          className="grid grid-cols-1 gap-10 sm:grid-cols-3"
        >

          {/* Brand */}
          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <button
              onClick={() => scrollToSection('#home')}
              aria-label={`${SITE.name} — scroll to top`}
              className="flex w-fit items-center gap-0.5 text-lg font-bold tracking-tight text-gray-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded"
            >
              <span className="text-violet-600">&lt;</span>
              {SITE.name}
              <span className="text-violet-600">/&gt;</span>
            </button>

            <p className="max-w-[220px] text-sm leading-relaxed text-[rgb(var(--text-muted))]">
              {SITE.description}
            </p>

            <div className="flex items-center gap-1.5 pt-1">
              {SOCIALS.map(({ label, href, icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  aria-label={`${label}${!href.startsWith('mailto') ? ' (opens in new tab)' : ''}`}
                  whileHover={{ y: -3, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-[rgb(var(--text-muted))] transition-colors hover:bg-violet-100 hover:text-violet-600 dark:hover:bg-violet-950/50 dark:hover:text-violet-400"
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--text-muted))]">
              Navigate
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2" aria-label="Site navigation">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <motion.button
                    onClick={() => scrollToSection(href)}
                    whileHover={{ x: 3 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="text-sm text-[rgb(var(--text-muted))] transition-colors hover:text-violet-600 dark:hover:text-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-1 rounded"
                  >
                    {label}
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--text-muted))]">
              Connect
            </h3>
            <ul className="flex flex-col gap-2">
              {SOCIALS.map(({ label, href, icon }) => (
                <li key={label}>
                  <motion.a
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noreferrer"
                    aria-label={`${label}${!href.startsWith('mailto') ? ' (opens in new tab)' : ''}`}
                    whileHover={{ x: 4 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="group flex items-center gap-2 text-sm text-[rgb(var(--text-muted))] transition-colors hover:text-violet-600 dark:hover:text-violet-400"
                  >
                    <span className="opacity-60 group-hover:opacity-100 transition-opacity">{icon}</span>
                    {label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={VIEWPORT}
          className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-[rgb(var(--border))] pt-6 sm:flex-row"
        >
          <p className="text-xs text-[rgb(var(--text-muted))]">
            &copy; {CURRENT_YEAR} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs text-[rgb(var(--text-muted))]">
            Built with <span className="text-violet-500">&#9829;</span> using React, Vite &amp; Tailwind CSS
          </p>
        </motion.div>

      </div>
    </footer>
  )
}
