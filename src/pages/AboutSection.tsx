import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, GraduationCap, Heart, Rocket } from 'lucide-react'
import { useCountUp } from '@/hooks'
import { fadeUp, stagger, VIEWPORT, BTN_TAP } from '@/utils/motion'
import { SectionHeading, SubHeading } from '@/components'
import { scrollToSection } from '@/utils'
import { BIO } from '@/constants'
import { education, interests } from '@/data/about'

/* ── Data ─────────────────────────────────────────────────────── */
const STATS = [
  { label: 'Years Experience', value: 1,  suffix: '+' },
  { label: 'Projects Shipped', value: 20, suffix: '+' },
  { label: 'Certifications',   value: 6,  suffix: '' },
  { label: 'GitHub Repos',     value: 15, suffix: '+' },
] as const


function StatCard({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value)
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="flex flex-col items-center gap-1 rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <dl>
        <dd ref={ref} className="text-4xl font-extrabold text-gray-900 dark:text-white">
          {count}{suffix}
        </dd>
        <dt className="text-sm text-gray-500 dark:text-gray-400">{label}</dt>
      </dl>
    </motion.div>
  )
}

/* ── Main component ───────────────────────────────────────────── */
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' })
  const animate    = inView ? 'show' : 'hidden'

  return (
    <section id="about" ref={sectionRef} className="section relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-violet-50/30 to-transparent dark:via-violet-950/10" />

      <div className="container-main">

        {/* Heading */}
        <motion.div variants={stagger(0)} initial="hidden" animate={animate} viewport={VIEWPORT} className="mb-12">
          <motion.div variants={fadeUp}>
            <SectionHeading
              label="About Me"
              title={
                <>
                  Crafting digital experiences{' '}
                  <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
                    with purpose
                  </span>
                </>
              }
            />
          </motion.div>
        </motion.div>

        {/* Intro + Stats */}
        <motion.div variants={stagger(0.1)} initial="hidden" animate={animate} className="mb-10 grid gap-10 lg:grid-cols-5 lg:gap-16">
          <motion.div variants={fadeUp} className="flex flex-col gap-6 lg:col-span-3">
            <SubHeading
              icon={Rocket}
              label="Who I Am"
              color="bg-violet-100 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400"
            />
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">
              I&apos;m a <strong className="font-semibold text-gray-900 dark:text-white">Computer Science student</strong> at Sreenidhi Institute of Science &amp; Technology (2021–2025),
              joining <strong className="font-semibold text-gray-900 dark:text-white">Capgemini</strong> as an Associate Software Engineer in August 2025.
              I specialise in React, TypeScript, and Node.js ecosystems.
            </p>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">{BIO[2]}</p>
            <p className="text-base leading-relaxed text-gray-600 dark:text-gray-400">{BIO[3]}</p>
            <motion.a
              href="#skills"
              onClick={(e) => { e.preventDefault(); scrollToSection('#skills') }}
              {...BTN_TAP}
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition-colors hover:bg-violet-700 dark:shadow-violet-900/40"
            >
              View My Skills <ArrowRight size={15} aria-hidden />
            </motion.a>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 content-start lg:col-span-2">
            {STATS.map((s) => <StatCard key={s.label} {...s} />)}
          </motion.div>
        </motion.div>

        {/* Career Journey removed — accurate timeline lives in ExperienceSection */}

        {/* Education + Interests */}
        <motion.div variants={stagger(0.2)} initial="hidden" animate={animate} className="grid gap-8 lg:grid-cols-2">

          {/* Education */}
          <motion.div variants={fadeUp}>
            <SubHeading icon={GraduationCap} label="Education" color="bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400" />
            <div className="flex flex-col gap-4">
              {education.map((edu) => (
                <motion.div
                  key={edu.id}
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-[rgb(var(--surface))]"
                >
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <p className="font-semibold text-gray-900 dark:text-white">{edu.degree}</p>
                    <span className="shrink-0 rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400">
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{edu.school}</p>
                  <p className="mt-2 text-xs font-medium text-gray-500 dark:text-gray-500">{edu.grade}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Interests */}
          <motion.div variants={fadeUp}>
            <SubHeading icon={Heart} label="Personal Interests" color="bg-fuchsia-100 text-fuchsia-600 dark:bg-fuchsia-950/60 dark:text-fuchsia-400" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {interests.map(({ id, label, icon: Icon }) => (
                <motion.div
                  key={id}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex cursor-default flex-col items-center gap-2 rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm dark:border-gray-800 dark:bg-[rgb(var(--surface))]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-violet-950/60 dark:to-indigo-950/60">
                    <Icon size={18} className="text-violet-600 dark:text-violet-400" aria-hidden />
                  </div>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{label}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-5 dark:border-violet-800/40 dark:from-violet-950/30 dark:to-indigo-950/30">
              <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                <strong className="font-semibold text-violet-700 dark:text-violet-300">Fun fact:</strong>{' '}
                I&apos;ve written over 100,000 lines of TypeScript and still get excited every time a complex type resolves correctly. ☕
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
