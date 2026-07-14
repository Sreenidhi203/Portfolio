import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Star, Layers } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { projects } from '@/data'
import type { Project } from '@/types'
import { fadeUp, stagger, VIEWPORT } from '@/utils/motion'
import { SectionHeading, PillTabs } from '@/components'

const cardStagger = stagger(0, 0.07)

const PROJECT_THEME: Record<
  string,
  { grad: string; glow: string; accent: string; text: string }
> = {
  violet: {
    grad: 'from-blue-600 via-purple-500 to-cyan-500',
    glow: 'rgba(99,102,241,0.30)',
    accent: '#6366f1',
    text: 'AI / ML',
  },
  sky: {
    grad: 'from-cyan-500 via-blue-400 to-purple-500',
    glow: 'rgba(6,182,212,0.30)',
    accent: '#06b6d4',
    text: 'Full-Stack',
  },
  emerald: {
    grad: 'from-emerald-500 via-teal-400 to-green-600',
    glow: 'rgba(16,185,129,0.30)',
    accent: '#10b981',
    text: 'E-Commerce',
  },
  amber: {
    grad: 'from-amber-500 via-orange-400 to-yellow-500',
    glow: 'rgba(245,158,11,0.30)',
    accent: '#f59e0b',
    text: 'Frontend',
  },
  rose: {
    grad: 'from-rose-500 via-pink-400 to-fuchsia-600',
    glow: 'rgba(244,63,94,0.30)',
    accent: '#f43f5e',
    text: 'Productivity',
  },
  indigo: {
    grad: 'from-blue-700 via-blue-500 to-purple-600',
    glow: 'rgba(99,102,241,0.30)',
    accent: '#4f46e5',
    text: 'Security',
  },
}

const ALL_TAGS = [
  'All',
  ...Array.from(new Set(projects.flatMap((p) => p.tags))).sort(),
]

/* ── Featured Project Card ─────────────────────────────────────── */
function FeaturedCard({ project }: { project: Project }) {
  const theme = PROJECT_THEME[project.image] ?? PROJECT_THEME.violet

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="group relative overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] shadow-md transition-all duration-300 hover:shadow-xl hover:border-[rgb(var(--border))]/80"
    >
      {/* Glow on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow: `0 0 0 1px ${theme.glow}, 0 24px 64px -12px ${theme.glow}`,
        }}
      />

      <div className="grid lg:grid-cols-5">
        {/* Visual panel — wider */}
        <div
          className={`relative h-44 overflow-hidden bg-gradient-to-br ${theme.grad} lg:col-span-2 lg:h-auto lg:min-h-[240px]`}
        >
          {/* Shimmer sweep */}
          <div
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-gradient-to-tr from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
          {/* Grid overlay */}
          <div aria-hidden className="absolute inset-0 bg-grid opacity-20" />
          {/* Watermark */}
          <span
            aria-hidden
            className="absolute bottom-4 left-5 select-none text-6xl font-black tracking-tight text-white/10"
          >
            {project.title.split(' ')[0]}
          </span>
          {/* Featured badge */}
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 backdrop-blur-sm">
            <Star
              size={11}
              className="text-amber-300"
              fill="currentColor"
              aria-hidden
            />
            <span className="text-xs font-semibold text-white">
              Featured Project
            </span>
          </div>
          {/* Impact badge */}
          {project.impact && (
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-1.5 rounded-xl bg-black/35 px-3 py-2 backdrop-blur-sm">
              <Zap size={12} className="text-yellow-300 shrink-0" aria-hidden />
              <span className="text-xs font-semibold text-white/95">
                {project.impact}
              </span>
            </div>
          )}
        </div>

        {/* Content panel */}
        <div className="flex flex-col gap-3 p-4 lg:col-span-3 lg:p-6">
          <div>
            {project.category && (
              <span className="mb-2 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[rgb(var(--text-muted))]">
                <Layers size={11} aria-hidden /> {project.category}
              </span>
            )}
            <h3
              className="text-lg font-bold text-[rgb(var(--text))] leading-snug"
              style={{ letterSpacing: '-0.015em' }}
            >
              {project.title}
            </h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-[rgb(var(--text-muted))]">
              {project.description}
            </p>
          </div>

          {/* Feature highlights */}
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[rgb(var(--text-muted))]">
              Key Features
            </p>
            <ul className="space-y-2" aria-label="Key features">
              {project.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-[13px] text-[rgb(var(--text-muted))]"
                >
                  <svg
                    aria-hidden
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg-subtle))] px-2.5 py-0.5 text-[10px] font-semibold text-[rgb(var(--text-muted))]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-auto flex gap-2.5 pt-1">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-subtle))] px-4 py-2.5 text-xs font-semibold text-[rgb(var(--text))] transition-all hover:border-blue-500/50 hover:text-blue-500 hover:shadow-sm"
            >
              <FaGithub size={14} aria-hidden /> GitHub
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

/* ── Regular Project Card ──────────────────────────────────────── */
function ProjectCard({ project }: { project: Project }) {
  const theme = PROJECT_THEME[project.image] ?? PROJECT_THEME.violet

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[rgb(var(--border))]/80"
    >
      {/* Glow border on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: `0 0 0 1px ${theme.glow}, 0 16px 48px -8px ${theme.glow}`,
        }}
      />

      {/* Header gradient */}
      <div
        className={`relative h-24 w-full overflow-hidden bg-gradient-to-br ${theme.grad}`}
      >
        <div
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-tr from-transparent via-white/8 to-transparent transition-transform duration-700 group-hover:translate-x-full"
        />
        <div aria-hidden className="absolute inset-0 bg-grid opacity-20" />
        <span
          aria-hidden
          className="absolute bottom-3 left-4 select-none text-4xl font-black tracking-tight text-white/10"
        >
          {project.title.split(' ')[0]}
        </span>
        {/* Category pill */}
        {project.category && (
          <div className="absolute left-3 top-3 rounded-full bg-black/25 px-2.5 py-0.5 backdrop-blur-sm">
            <span className="text-[10px] font-semibold text-white/90">
              {project.category}
            </span>
          </div>
        )}
        {project.impact && (
          <div className="absolute bottom-2.5 right-3 flex items-center gap-1 rounded-full bg-black/30 px-2 py-0.5 backdrop-blur-sm">
            <Zap size={9} className="text-yellow-300" aria-hidden />
            <span className="text-[10px] font-semibold text-white/90">
              {project.impact}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <h3
            className="text-[13px] font-bold text-[rgb(var(--text))] leading-snug"
            style={{ letterSpacing: '-0.01em' }}
          >
            {project.title}
          </h3>
          <p className="mt-1 text-xs leading-relaxed text-[rgb(var(--text-muted))] line-clamp-2">
            {project.description}
          </p>
        </div>

        <ul className="space-y-1.5" aria-label="Features">
          {project.features.slice(0, 3).map((f) => (
            <li
              key={f}
              className="flex items-start gap-1.5 text-xs text-[rgb(var(--text-muted))]"
            >
              <svg
                aria-hidden
                className="mt-0.5 h-3 w-3 shrink-0 text-blue-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                  clipRule="evenodd"
                />
              </svg>
              {f}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1">
          {project.stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg-subtle))] px-2 py-0.5 text-[10px] font-medium text-[rgb(var(--text-muted))]"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg-subtle))] px-2 py-0.5 text-[10px] font-medium text-[rgb(var(--text-muted))]">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto flex gap-2 border-t border-[rgb(var(--border))] pt-2.5">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-subtle))] px-3 py-2 text-[11px] font-semibold text-[rgb(var(--text))] transition-all hover:border-blue-500/50 hover:text-blue-500"
          >
            <FaGithub size={12} aria-hidden /> GitHub
          </a>
        </div>
      </div>
    </motion.article>
  )
}

/* ── Section ───────────────────────────────────────────────────── */
export default function ProjectsSection() {
  const [active, setActive] = useState('All')

  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)
  const filtered =
    active === 'All' ? rest : rest.filter((p) => p.tags.includes(active))

  return (
    <section id="projects" className="section relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent dark:via-blue-950/10"
      />

      <div className="container-main">
        <SectionHeading
          label="Portfolio"
          title={
            <>
              Featured{' '}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                Projects
              </span>
            </>
          }
          subtitle="A selection of things I've built — from full-stack apps to AI-powered tools and microservices."
        />

        {/* Featured project */}
        {featured && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="mb-8"
          >
            <FeaturedCard project={featured} />
          </motion.div>
        )}

        {/* Divider */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mb-5 flex items-center gap-4"
        >
          <div className="h-px flex-1 bg-[rgb(var(--border))]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--text-muted))]">
            More Projects
          </span>
          <div className="h-px flex-1 bg-[rgb(var(--border))]" />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          <PillTabs
            tabs={ALL_TAGS.map((t) => ({ id: t, label: t }))}
            activeId={active}
            onChange={setActive}
            layoutId="proj-pill"
            role="group"
            ariaLabel="Filter by technology"
            className="mb-5"
          />
        </motion.div>

        {/* Project grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={cardStagger}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-sm text-[rgb(var(--text-muted))]">
            No projects match this filter.
          </p>
        )}
      </div>
    </section>
  )
}
