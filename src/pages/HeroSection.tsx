import { motion } from 'framer-motion'
import { ChevronDown, Send, ArrowRight } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { SITE } from '@/constants'
import { heroContainer, heroWord, fadeUp, BTN_TAP, EASE } from '@/utils/motion'
import { scrollToSection } from '@/utils'
import profileImg from '@/assets/hero.png'

export default function HeroSection() {
  return (
    <section
      id="home"
      aria-label="Hero"
      className="section-hero relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="orb h-[520px] w-[520px] bg-blue-500 -top-32 -left-24" />
        <div className="orb orb-delay h-[400px] w-[400px] bg-purple-600 top-1/2 -right-32" />
        <div className="orb h-[300px] w-[300px] bg-cyan-500 bottom-0 left-1/3 opacity-10 dark:opacity-5" />
        <div className="bg-grid absolute inset-0 opacity-[0.06] dark:opacity-[0.06]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.08),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.15),transparent)]" />
      </div>

      <div className="container-main w-full">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left — text */}
          <motion.div
            variants={heroContainer}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start gap-5"
          >
            {/* Availability badge */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3.5 py-1.5 dark:border-green-800/50 dark:bg-green-950/40"
            >
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-xs font-semibold tracking-wide text-green-700 dark:text-green-300">
                Available for Opportunities
              </span>
            </motion.div>

            {/* Headline */}
            <div>
              <motion.div
                variants={heroContainer}
                initial="hidden"
                animate="show"
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
              >
                <motion.span
                  variants={heroWord}
                  className="text-4xl font-extrabold tracking-tight text-[rgb(var(--text))] sm:text-5xl lg:text-6xl"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  Hi, I&apos;m
                </motion.span>
                <motion.span
                  variants={heroWord}
                  className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-blue-400"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  Sreenidhi
                </motion.span>
              </motion.div>

              {/* Role line */}
              <motion.p
                variants={fadeUp}
                className="mt-2 text-[15px] font-semibold tracking-wide text-[rgb(var(--text-muted))] sm:text-base"
              >
                Full-Stack Engineer &nbsp;·&nbsp; AI-First Builder
              </motion.p>
            </div>

            {/* Value proposition */}
            <motion.p
              variants={fadeUp}
              className="max-w-lg text-[13px] leading-[1.85] text-[rgb(var(--text-muted))] sm:text-sm"
            >
              I build{' '}
              <strong className="font-semibold text-[rgb(var(--text))]">
                production-ready full-stack systems
              </strong>{' '}
              with an AI-first approach — from{' '}
              <strong className="font-semibold text-[rgb(var(--text))]">
                RAG pipelines and multi-agent architectures
              </strong>{' '}
              to scalable microservices. I turn complex ideas into shipped
              products.
            </motion.p>

            {/* Tech highlights */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-1.5">
              {[
                'Java',
                'Spring Boot',
                'Angular',
                'Azure OpenAI',
                'Docker',
                'Microservices',
                'React',
              ].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-blue-500/20 bg-blue-500/8 px-2.5 py-0.5 text-[11px] font-semibold text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/8 dark:text-blue-400"
                >
                  {t}
                </span>
              ))}
            </motion.div>

            {/* Primary CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex w-full flex-wrap gap-2.5 sm:w-auto"
            >
              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('#contact')
                }}
                {...BTN_TAP}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-shadow"
              >
                Get in Touch <Send size={13} aria-hidden />
              </motion.a>

              <motion.a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToSection('#projects')
                }}
                {...BTN_TAP}
                className="inline-flex items-center gap-2 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-5 py-2.5 text-xs font-semibold text-[rgb(var(--text-muted))] transition-colors hover:border-blue-500/50 hover:text-blue-500"
              >
                View Projects <ArrowRight size={13} aria-hidden />
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={fadeUp} className="flex items-center gap-2">
              <motion.a
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub (opens in new tab)"
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-[rgb(var(--text-muted))] transition-all hover:border-[rgb(var(--text-muted))]/40 hover:text-[rgb(var(--text))] hover:shadow-md"
              >
                <FaGithub size={17} aria-hidden />
              </motion.a>
              <motion.a
                href={SITE.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn (opens in new tab)"
                whileHover={{ y: -3, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-[rgb(var(--text-muted))] transition-all hover:border-blue-500/40 hover:text-blue-500 hover:shadow-md"
              >
                <FaLinkedin size={17} aria-hidden />
              </motion.a>
              <span className="ml-1 text-xs text-[rgb(var(--text-muted))]">
                Let&apos;s connect
              </span>
            </motion.div>
          </motion.div>

          {/* Right — profile image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-full bg-gradient-to-br from-blue-500/25 via-purple-500/15 to-cyan-500/25 blur-2xl"
                aria-hidden
              />
              <div
                className="absolute -inset-3 rounded-full border-2 border-dashed border-blue-400/40"
                aria-hidden
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-6 rounded-full"
                aria-hidden
              >
                <span className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-blue-500/60" />
                <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-purple-500/60" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <img
                  src={profileImg}
                  alt={`${SITE.name} profile photo`}
                  width={320}
                  height={320}
                  fetchPriority="high"
                  decoding="async"
                  loading="eager"
                  className="h-44 w-44 overflow-hidden rounded-full border-4 border-[rgb(var(--surface))] object-cover shadow-2xl shadow-blue-500/20 sm:h-64 sm:w-64"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          onClick={() => scrollToSection('#about')}
          aria-label="Scroll to About section"
          className="flex flex-col items-center gap-1.5 text-[rgb(var(--text-muted))] transition-colors hover:text-blue-500"
        >
          <span className="text-[10px] font-semibold uppercase tracking-widest">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          >
            <ChevronDown size={18} />
          </motion.div>
        </button>
      </motion.div>
    </section>
  )
}
