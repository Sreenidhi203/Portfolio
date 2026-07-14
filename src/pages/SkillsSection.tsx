import { useRef, useState, type CSSProperties } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { SKILL_CATEGORIES } from '@/data/skills'
import { fadeUp, stagger, VIEWPORT } from '@/utils/motion'
import { SectionHeading, PillTabs } from '@/components'
import type { Skill } from '@/types'

const grid = stagger(0, 0.04)

// Core technologies to spotlight with glow treatment
const SPOTLIGHT_TECHS = [
  'Java',
  'Spring Boot',
  'Angular',
  'Azure OpenAI',
  'Docker',
  'Microservices',
  'React',
  'TypeScript',
]

function SkillBadge({ skill }: { skill: Skill }) {
  const { name, icon: Icon, color } = skill
  const isSpotlight = SPOTLIGHT_TECHS.includes(name)

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -5, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={`group relative flex flex-col items-center gap-2 rounded-xl border p-3 text-center shadow-sm transition-all duration-300 hover:shadow-lg overflow-hidden ${
        isSpotlight
          ? 'border-[rgb(var(--border))] bg-[rgb(var(--surface))] hover:border-blue-500/40'
          : 'border-[rgb(var(--border))] bg-[rgb(var(--surface))]'
      }`}
    >
      {/* Glow bg for spotlight techs */}
      {isSpotlight && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${color}15, transparent 70%)`,
          }}
          aria-hidden
        />
      )}

      {/* Icon */}
      <div
        className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-subtle))] transition-all duration-300 group-hover:border-transparent group-hover:shadow-md"
        style={{ boxShadow: 'none' }}
      >
        <Icon size={18} style={{ color }} aria-hidden />
        {/* Icon glow on hover */}
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ boxShadow: `0 0 16px ${color}40` }}
          aria-hidden
        />
      </div>

      {/* Name */}
      <p className="text-xs font-semibold leading-tight text-[rgb(var(--text))]">
        {name}
      </p>
    </motion.div>
  )
}

export default function SkillsSection() {
  const [activeId, setActiveId] = useState('frontend')
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const animate = inView ? 'show' : 'hidden'
  const active =
    SKILL_CATEGORIES.find((c) => c.id === activeId) ?? SKILL_CATEGORIES[0]

  const featuredSkills = SKILL_CATEGORIES.flatMap((c) => c.skills).filter(
    (s) => s.featured
  )

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[rgb(var(--bg-subtle))]/60 via-transparent to-transparent"
      />

      <div className="container-main">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={animate}
          viewport={VIEWPORT}
        >
          <SectionHeading
            label="My Skills"
            title={
              <>
                Technologies &amp;{' '}
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                  Expertise
                </span>
              </>
            }
            subtitle="A curated stack of technologies I use to build modern, scalable, AI-powered applications."
          />
        </motion.div>

        {/* Core Technologies Spotlight */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={animate}
          viewport={VIEWPORT}
          className="mb-6"
        >
          <div className="relative rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6 overflow-hidden">
            {/* Background shimmer */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-2xl"
            />

            <div className="relative flex items-center gap-2 mb-5">
              <Sparkles size={14} className="text-amber-400" aria-hidden />
              <p className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--text-muted))]">
                Core Technologies
              </p>
            </div>

            <div className="relative flex flex-wrap items-center gap-2.5">
              {featuredSkills.map(({ name, icon: Icon, color }) => (
                <motion.div
                  key={name}
                  whileHover={{ y: -3, scale: 1.06 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="group flex items-center gap-2 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--bg-subtle))] px-3.5 py-2 shadow-sm transition-all duration-200 hover:border-transparent hover:shadow-md cursor-default"
                  style={{ '--tech-color': color } as CSSProperties}
                >
                  <Icon size={15} style={{ color }} aria-hidden />
                  <span className="text-xs font-semibold text-[rgb(var(--text))]">
                    {name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={animate}
          viewport={VIEWPORT}
        >
          <PillTabs
            tabs={SKILL_CATEGORIES.map((c) => ({
              id: c.id,
              label: c.label,
              count: c.skills.length,
            }))}
            activeId={activeId}
            onChange={setActiveId}
            layoutId="skill-tab-pill"
            role="tablist"
            ariaLabel="Skill categories"
            className="mb-8"
          />
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            variants={grid}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
            {active.skills.map((skill) => (
              <SkillBadge key={skill.name} skill={skill} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
