import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { NAV_LINKS, SITE } from '@/constants'
import { ThemeToggle } from '@/components'
import { useActiveSection } from '@/hooks'
import { scrollToSection } from '@/utils'

export default function Navbar() {
  const [open, setOpen]         = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active                  = useActiveSection()
  const ref                     = useRef<HTMLDivElement>(null)

  // Scroll-aware glass effect
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close drawer on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleNavClick = (href: string) => {
    setOpen(false)
    scrollToSection(href)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-gray-200/70 bg-white/90 shadow-sm backdrop-blur-lg dark:border-gray-800/70 dark:bg-[#0a0a0f]/90'
          : 'bg-transparent'
      }`}
    >
      <div ref={ref}>

        {/* ── Main bar ── */}
        <div className="container-main flex h-16 items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => handleNavClick('#home')}
            aria-label={`${SITE.name} — go to top`}
            className="flex items-center gap-0.5 text-lg font-bold tracking-tight text-gray-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded"
          >
            <span className="text-violet-600">&lt;</span>
            {SITE.name}
            <span className="text-violet-600">/&gt;</span>
          </button>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map(({ label, href }) => {
              const id       = href.slice(1)
              const isActive = active === id
              return (
                <li key={href}>
                  <button
                    onClick={() => handleNavClick(href)}
                    aria-current={isActive ? 'page' : undefined}
                    className="group relative px-3 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded-lg"
                  >
                    {/* Hover pill background */}
                    <motion.span
                      className="absolute inset-0 rounded-lg bg-gray-100 dark:bg-gray-800"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.15 }}
                    />

                    {/* Label */}
                    <span
                      className={`relative text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? 'text-violet-600 dark:text-violet-400'
                          : 'text-gray-600 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
                      }`}
                    >
                      {label}
                    </span>

                    {/* Active underline — shared layout animation */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-px rounded-full bg-violet-600 dark:bg-violet-400"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Right — socials + theme + hamburger */}
          <div className="flex items-center gap-2">

            {/* Desktop socials */}
            <div className="hidden items-center gap-2 lg:flex">
              <a
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub (opens in new tab)"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
              >
                <FaGithub size={17} aria-hidden />
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn (opens in new tab)"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-blue-400"
              >
                <FaLinkedin size={17} aria-hidden />
              </a>
              <div className="mx-1 h-4 w-px bg-gray-200 dark:bg-gray-700" />
            </div>

            <ThemeToggle />

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="flex h-11 w-11 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                  className="absolute"
                >
                  {open ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="drawer"
              id="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' as const }}
              className="overflow-hidden border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-[#0a0a0f] lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <ul className="container-main flex flex-col gap-1 py-3">
                {NAV_LINKS.map(({ label, href }, i) => {
                  const id       = href.slice(1)
                  const isActive = active === id
                  return (
                    <motion.li
                      key={href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.2 }}
                    >
                      <button
                        onClick={() => handleNavClick(href)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 ${
                          isActive
                            ? 'bg-violet-50 text-violet-600 dark:bg-violet-950/50 dark:text-violet-400'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/60'
                        }`}
                      >
                        {/* Active dot indicator */}
                        <span
                          className={`h-1.5 w-1.5 rounded-full transition-colors ${
                            isActive
                              ? 'bg-violet-600 dark:bg-violet-400'
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        />
                        {label}
                      </button>
                    </motion.li>
                  )
                })}
              </ul>

              {/* Mobile socials row */}
              <div className="container-main flex items-center gap-4 border-t border-gray-100 py-4 dark:border-gray-800/60">
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub (opens in new tab)"
                  className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded"
                >
                  <FaGithub size={15} aria-hidden /> GitHub
                </a>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn (opens in new tab)"
                  className="flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 rounded"
                >
                  <FaLinkedin size={15} aria-hidden /> LinkedIn
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </header>
  )
}
