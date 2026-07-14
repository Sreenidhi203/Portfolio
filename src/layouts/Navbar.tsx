import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, FileText } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { NAV_LINKS, SITE, HAS_RESUME } from '@/constants'
import { ThemeToggle } from '@/components'
import { useActiveSection } from '@/hooks'
import { scrollToSection } from '@/utils'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleNavClick = (href: string) => {
    setOpen(false)
    scrollToSection(href)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-[rgb(var(--border))]/60 bg-[rgb(var(--bg))]/90 shadow-[0_1px_16px_rgba(0,0,0,0.07)] backdrop-blur-2xl dark:shadow-[0_1px_16px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
      }`}
    >
      <div ref={ref}>
        <div className="container-main flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#home')}
            aria-label={`${SITE.name} — go to top`}
            className="flex shrink-0 items-center gap-0.5 text-sm font-bold tracking-tight text-[rgb(var(--text))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded"
          >
            <span className="text-blue-500">&lt;</span>
            {SITE.name}
            <span className="text-blue-500">/&gt;</span>
          </button>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.slice(1)
              const isActive = active === id
              return (
                <li key={href}>
                  <button
                    onClick={() => handleNavClick(href)}
                    aria-current={isActive ? 'page' : undefined}
                    className="group relative px-3.5 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
                  >
                    <motion.span
                      className="absolute inset-0 rounded-lg bg-[rgb(var(--bg-subtle))]"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.15 }}
                    />
                    <span
                      className={`relative text-[13px] font-medium tracking-wide transition-colors duration-200 ${
                        isActive
                          ? 'text-blue-500 dark:text-blue-400'
                          : 'text-[rgb(var(--text-muted))] group-hover:text-[rgb(var(--text))]'
                      }`}
                    >
                      {label}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-3 right-3 h-px rounded-full bg-blue-500 dark:bg-blue-400"
                        transition={{
                          type: 'spring',
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            {/* Desktop socials */}
            <div className="hidden items-center gap-1 lg:flex">
              <a
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub (opens in new tab)"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[rgb(var(--text-muted))] transition-colors hover:bg-[rgb(var(--bg-subtle))] hover:text-[rgb(var(--text))]"
              >
                <FaGithub size={15} aria-hidden />
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn (opens in new tab)"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[rgb(var(--text-muted))] transition-colors hover:bg-[rgb(var(--bg-subtle))] hover:text-blue-500"
              >
                <FaLinkedin size={15} aria-hidden />
              </a>
              <div className="mx-1 h-4 w-px bg-[rgb(var(--border))]" />
            </div>

            <ThemeToggle />

            {/* Resume CTA — desktop */}
            {HAS_RESUME && (
              <a
                href={SITE.resume}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Resume (opens in new tab)"
                className="hidden items-center gap-1.5 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3.5 py-2 text-[13px] font-semibold text-[rgb(var(--text))] transition-all hover:border-blue-500/60 hover:bg-blue-500/5 hover:text-blue-500 lg:flex"
              >
                <FileText size={13} aria-hidden />
                Resume
              </a>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-nav"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-[rgb(var(--text-muted))] transition-colors hover:bg-[rgb(var(--bg-subtle))] lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
                  {open ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="drawer"
              id="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' as const }}
              className="overflow-hidden border-t border-[rgb(var(--border))] bg-[rgb(var(--bg))] lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              <ul className="container-main flex flex-col gap-1 py-3">
                {NAV_LINKS.map(({ label, href }, i) => {
                  const id = href.slice(1)
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
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                          isActive
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400'
                            : 'text-[rgb(var(--text-muted))] hover:bg-[rgb(var(--bg-subtle))] hover:text-[rgb(var(--text))]'
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full transition-colors ${
                            isActive ? 'bg-blue-500' : 'bg-[rgb(var(--border))]'
                          }`}
                        />
                        {label}
                      </button>
                    </motion.li>
                  )
                })}
              </ul>

              <div className="container-main flex items-center gap-3 border-t border-[rgb(var(--border))] py-4">
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex items-center gap-2 text-sm text-[rgb(var(--text-muted))] transition-colors hover:text-[rgb(var(--text))] rounded"
                >
                  <FaGithub size={14} aria-hidden /> GitHub
                </a>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex items-center gap-2 text-sm text-[rgb(var(--text-muted))] transition-colors hover:text-blue-500 rounded"
                >
                  <FaLinkedin size={14} aria-hidden /> LinkedIn
                </a>
                {HAS_RESUME && (
                  <a
                    href={SITE.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="View Resume (opens in new tab)"
                    className="ml-auto flex items-center gap-1.5 rounded-lg border border-[rgb(var(--border))] px-3 py-1.5 text-xs font-semibold text-[rgb(var(--text))] transition-colors hover:border-blue-500/50 hover:text-blue-500"
                  >
                    <FileText size={12} aria-hidden /> Resume
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
