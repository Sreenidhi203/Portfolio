import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects } from '@/data'
import type { Project } from '@/types'
import { fadeUp, stagger, VIEWPORT } from '@/utils/motion'
import { SectionHeading, PillTabs } from '@/components'

const cardStagger = stagger(0, 0.08)

const PROJECT_THEME: Record<string, { grad: string; glow: string }> = {
  violet:  { grad: 'from-violet-600 via-purple-500 to-indigo-600', glow: 'rgba(124,58,237,0.35)' },
  sky:     { grad: 'from-sky-500 via-cyan-400 to-blue-600',        glow: 'rgba(14,165,233,0.35)' },
  emerald: { grad: 'from-emerald-500 via-teal-400 to-green-600',   glow: 'rgba(16,185,129,0.35)' },
  amber:   { grad: 'from-amber-500 via-orange-400 to-yellow-500',  glow: 'rgba(245,158,11,0.35)' },
  rose:    { grad: 'from-rose-500 via-pink-400 to-fuchsia-600',    glow: 'rgba(244,63,94,0.35)' },
  indigo:  { grad: 'from-indigo-600 via-blue-500 to-violet-600',   glow: 'rgba(99,102,241,0.35)' },
}

const ALL_TAGS = ['All', ...Array.from(new Set(projects.flatMap((p) => p.tags))).sort()]

function ProjectCard({ project }: { project: Project }) {
  const theme = PROJECT_THEME[project.image] ?? PROJECT_THEME.violet
  const { grad, glow } = theme

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      style={{ ['--glow' as string]: glow }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] shadow-md transition-shadow duration-300 hover:shadow-2xl"
      >
      {/* Glow border — CSS only, no JS state */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 0 0 1.5px ${glow}, 0 20px 60px -10px ${glow}` }}
      />

        <div className={`relative h-36 sm:h-44 w-full overflow-hidden bg-gradient-to-br ${grad}`}>
          <div
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-gradient-to-tr from-white/0 via-white/10 to-white/0 transition-transform duration-700 group-hover:translate-x-full"
          />
          <span aria-hidden className="absolute bottom-3 left-4 select-none text-3xl font-black tracking-tight text-white/20">
            {project.title.split(' ')[0]}
          </span>
          {project.liveHref && (
            <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              <span aria-hidden className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Live
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-4 p-5">
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">{project.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-[rgb(var(--text-muted))] line-clamp-2">{project.description}</p>
          </div>

          <ul className="space-y-1" aria-label="Features">
            {project.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-xs text-[rgb(var(--text-muted))]">
                <svg aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                {f}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-[rgb(var(--border))] bg-[rgb(var(--bg-subtle))] px-2 py-0.5 text-xs font-medium text-[rgb(var(--text-muted))]"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-auto flex gap-2 pt-1">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-subtle))] px-3 py-2 text-xs font-semibold text-[rgb(var(--text))] transition-colors hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400"
            >
              <svg aria-hidden className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              GitHub
            </a>
            {project.liveHref ? (
              <a
                href={project.liveHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r ${grad} px-3 py-2 text-xs font-semibold text-white shadow-sm transition-opacity hover:opacity-90`}
              >
                <svg aria-hidden className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                Live Demo
              </a>
            ) : (
              <span className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-dashed border-[rgb(var(--border))] px-3 py-2 text-xs text-[rgb(var(--text-muted))]">
                Coming Soon
              </span>
            )}
          </div>
        </div>
      </motion.article>
  )
}

export default function ProjectsSection() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? projects
    : projects.filter((p) => p.tags.includes(active))

  return (
    <section id="projects" className="section relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-violet-50/30 to-transparent dark:via-violet-950/10" />

      <div className="container-main">
        <SectionHeading
          label="Portfolio"
          title={<>Featured{' '}<span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">Projects</span></>}
          subtitle="A selection of things I've built — from full-stack apps to developer tools."
        />

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={VIEWPORT}>
          <PillTabs
            tabs={ALL_TAGS.map((t) => ({ id: t, label: t }))}
            activeId={active}
            onChange={setActive}
            layoutId="proj-pill"
            role="group"
            ariaLabel="Filter by technology"
            className="mb-10"
          />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            variants={cardStagger}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="mt-16 text-center text-[rgb(var(--text-muted))]">No projects match this filter.</p>
        )}
      </div>
    </section>
  )
}
