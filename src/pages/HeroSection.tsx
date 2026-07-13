import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Download, ChevronDown, MapPin } from 'lucide-react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { SITE, BIO } from '@/constants'
import { fadeUp, stagger, BTN_TAP, EASE } from '@/utils/motion'
import { scrollToSection } from '@/utils'

/* ── Data ─────────────────────────────────────────────────────── */
const TITLES = [
  'Full-Stack Developer',
  'React Specialist',
  'UI/UX Enthusiast',
  'Problem Solver',
] as const

const SOCIALS = [
  { label: 'GitHub',   href: SITE.github,   icon: FaGithub,   hover: 'hover:text-gray-900 dark:hover:text-white' },
  { label: 'LinkedIn', href: SITE.linkedin, icon: FaLinkedin, hover: 'hover:text-blue-600 dark:hover:text-blue-400' },
  { label: 'Twitter',  href: SITE.twitter,  icon: FaTwitter,  hover: 'hover:text-sky-500 dark:hover:text-sky-400' },
] as const

const heroStagger = stagger(0.1, 0.12)

/* ── Rotating title hook ─────────────────────────────────────── */
function useRotatingTitle() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setIndex((i) => (i + 1) % TITLES.length), 2800)
    return () => clearInterval(id)
  }, [])
  return TITLES[index]
}

/* ── Component ───────────────────────────────────────────────── */
export default function HeroSection() {
  const title = useRotatingTitle()

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* ── Animated background orbs ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="orb h-[300px] w-[300px] sm:h-[520px] sm:w-[520px] bg-violet-500 -top-32 -left-24" />
        <div className="orb orb-delay h-[250px] w-[250px] sm:h-[400px] sm:w-[400px] bg-indigo-500 top-1/2 -right-32" />
        <div className="orb h-[300px] w-[300px] bg-fuchsia-500 bottom-0 left-1/3 opacity-10 dark:opacity-5" />
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(rgb(124 58 237 / 0.4) 1px, transparent 1px), linear-gradient(90deg, rgb(124 58 237 / 0.4) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(124,58,237,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(124,58,237,0.15),transparent)]" />
      </div>

      <div className="container-main w-full py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ── Left — text content ── */}
          <motion.div
            variants={heroStagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start gap-6"
          >
            {/* Availability badge */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 dark:border-violet-800/50 dark:bg-violet-950/40"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-violet-500" aria-hidden />
              <span className="text-xs font-medium text-violet-700 dark:text-violet-300">
                Available for opportunities
              </span>
            </motion.div>

            {/* Greeting + name */}
            <motion.div variants={fadeUp}>
              <p className="mb-2 text-base font-medium text-gray-500 dark:text-gray-400">
                Hello, I&apos;m
              </p>
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-6xl lg:text-7xl">
                {SITE.name}
                <span className="text-violet-600 dark:text-violet-400" aria-hidden>.</span>
              </h1>
            </motion.div>

            {/* Rotating title */}
            <motion.div variants={fadeUp} className="min-h-[2.25rem] overflow-hidden" aria-live="polite" aria-atomic="true">
              <AnimatePresence mode="wait">
                <motion.p
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="text-xl font-semibold text-gray-500 dark:text-gray-400 sm:text-2xl"
                >
                  {title}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={fadeUp}
              className="max-w-lg text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg"
            >
              {BIO[0]}
            </motion.p>

            {/* Location */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
            >
              <MapPin size={14} className="text-violet-500" aria-hidden />
              <span>Hyderabad, India</span>
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={fadeUp} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
              <motion.a
                href="#projects"
                onClick={(e) => { e.preventDefault(); scrollToSection('#projects') }}
                {...BTN_TAP}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-colors hover:bg-violet-700 dark:shadow-violet-900/40 sm:w-auto"
              >
                View My Work <ArrowRight size={16} aria-hidden />
              </motion.a>

              <motion.a
                href="/resume.pdf"
                download
                {...BTN_TAP}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:border-violet-400 hover:text-violet-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:border-violet-500 dark:hover:text-violet-400 sm:w-auto"
              >
                <Download size={15} aria-hidden /> Download Resume
              </motion.a>
            </motion.div>

            {/* Social icons */}
            <motion.div variants={fadeUp} className="flex items-center gap-2">
              {SOCIALS.map(({ label, href, icon: Icon, hover }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${label} (opens in new tab)`}
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 ${hover}`}
                >
                  <Icon size={18} aria-hidden />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right — profile image ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-indigo-500/30 blur-2xl" aria-hidden />
              <div
                className="absolute -inset-3 rounded-full border-2 border-dashed border-violet-400/30 dark:border-violet-600/30"
                aria-hidden
              />

              {/* Profile image */}
              <img
                src="/hero.png"
                alt={`${SITE.name} profile photo`}
                width={320}
                height={320}
                fetchPriority="high"
                decoding="async"
                loading="eager"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex' }}
                className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-white object-cover shadow-2xl shadow-violet-500/20 dark:border-gray-900 sm:h-80 sm:w-80"
              />
              {/* Fallback avatar shown if image missing */}
              <div
                aria-hidden
                style={{ display: 'none' }}
                className="relative h-56 w-56 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-600 shadow-2xl shadow-violet-500/20 dark:border-gray-900 sm:h-80 sm:w-80"
              >
                <span className="text-6xl font-extrabold text-white/90 sm:text-7xl">
                  {SITE.name.charAt(0)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => scrollToSection('#about')}
          aria-label="Scroll to About section"
          className="flex flex-col items-center gap-1.5 text-gray-400 transition-colors hover:text-violet-500 dark:text-gray-600 dark:hover:text-violet-400"
        >
          <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          >
            <ChevronDown size={20} />
          </motion.div>
        </button>
      </motion.div>
    </section>
  )
}
