import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { SKILL_CATEGORIES } from '@/data/skills'
import { fadeUp, stagger, VIEWPORT } from '@/utils/motion'
import { SectionHeading, PillTabs } from '@/components'
import type { Skill } from '@/types'

const LEVEL = {
  Beginner:     { pct: '25%',  track: 'bg-sky-400',     badge: 'bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-400' },
  Intermediate: { pct: '50%',  track: 'bg-amber-400',   badge: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400' },
  Advanced:     { pct: '75%',  track: 'bg-violet-500',  badge: 'bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-400' },
  Expert:       { pct: '100%', track: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400' },
} as const

const grid = stagger(0, 0.055)

function SkillCard({ skill }: { skill: Skill }) {
  const { name, icon: Icon, level, description, color } = skill
  const cfg = LEVEL[level]

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6, scale: 1.025 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      aria-label={`${name} — ${level}`}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[rgb(var(--surface))]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% -10%, ${color}22, transparent)` }}
      />

      <div className="flex items-start justify-between gap-2">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
          <Icon size={22} style={{ color }} color={color} aria-hidden />
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${cfg.badge}`}>
          {level}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-semibold text-gray-900 dark:text-white">{name}</p>
        <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">{description}</p>
      </div>

      <div
        role="progressbar"
        aria-label={`${name} proficiency`}
        aria-valuenow={parseInt(cfg.pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="mt-auto h-1 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800"
      >
        <motion.div
          className={`h-full rounded-full ${cfg.track}`}
          initial={{ width: 0 }}
          whileInView={{ width: cfg.pct }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
        />
      </div>
    </motion.article>
  )
}

export default function SkillsSection() {
  const [activeId, setActiveId] = useState('frontend')
  const sectionRef = useRef<HTMLElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' })
  const animate    = inView ? 'show' : 'hidden'
  const active     = SKILL_CATEGORIES.find((c) => c.id === activeId) ?? SKILL_CATEGORIES[0]

  return (
    <section id="skills" ref={sectionRef} className="section relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-gray-50/80 via-transparent to-transparent dark:from-gray-900/50" />

      <div className="container-main">

        <motion.div variants={fadeUp} initial="hidden" animate={animate} viewport={VIEWPORT}>
          <SectionHeading
            label="Tech Stack"
            title={
              <>
                Skills &amp;{' '}
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
                  Technologies
                </span>
              </>
            }
            subtitle="A curated overview of the tools and technologies I work with across the full stack."
          />
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate={animate} viewport={VIEWPORT}>
          <PillTabs
            tabs={SKILL_CATEGORIES.map((c) => ({ id: c.id, label: c.label, count: c.skills.length }))}
            activeId={activeId}
            onChange={setActiveId}
            layoutId="tab-pill"
            role="tablist"
            ariaLabel="Skill categories"
            className="mb-10"
          />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            variants={grid}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {active.skills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </motion.div>
        </AnimatePresence>

        <motion.div
          role="group"
          variants={fadeUp} initial="hidden" animate={animate} viewport={VIEWPORT}
          className="mt-6 flex flex-wrap items-center justify-center gap-6"
          aria-label="Skill level legend"
        >
          {(Object.entries(LEVEL) as [keyof typeof LEVEL, typeof LEVEL[keyof typeof LEVEL]][]).map(([lvl, cfg]) => (
            <div key={lvl} className="flex items-center gap-2">
              <div className={`h-2 w-6 rounded-full ${cfg.track}`} aria-hidden />
              <span className="text-xs text-gray-500 dark:text-gray-400">{lvl}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
