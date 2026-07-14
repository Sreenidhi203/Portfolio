import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Rocket,
  GraduationCap,
  Briefcase,
  Zap,
  Code2,
  Brain,
} from 'lucide-react'
import { useCountUp } from '@/hooks'
import { fadeUp, stagger } from '@/utils/motion'
import { SectionHeading } from '@/components'
import { BIO } from '@/constants'

const STATS = [
  {
    label: 'Projects Shipped',
    value: 10,
    suffix: '+',
    icon: Rocket,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    ring: 'ring-blue-500/20',
  },
  {
    label: 'Cloud Certs',
    value: 3,
    suffix: '',
    icon: GraduationCap,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    ring: 'ring-purple-500/20',
  },
  {
    label: 'Technologies',
    value: 20,
    suffix: '+',
    icon: Code2,
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
    ring: 'ring-cyan-500/20',
  },
  {
    label: 'AI Agents Built',
    value: 5,
    suffix: '+',
    icon: Brain,
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
    ring: 'ring-rose-500/20',
  },
] as const

const HIGHLIGHTS = [
  {
    icon: Briefcase,
    accent: 'from-blue-500 to-cyan-500',
    iconBg: 'bg-blue-500/10 text-blue-500',
    title: 'What I Do',
    text: 'Build full-stack applications with an AI-first approach — from Gen AI and RAG pipelines to multi-agent systems. End-to-end ownership from architecture to deployment.',
  },
  {
    icon: GraduationCap,
    accent: 'from-purple-500 to-indigo-500',
    iconBg: 'bg-purple-500/10 text-purple-500',
    title: 'Education',
    text: 'B.Tech Computer Science, Institute of Aeronautical Engineering (2021–2025). CGPA 8.9/10. Joining Capgemini as Software Engineer, Sep 2025.',
  },
  {
    icon: Zap,
    accent: 'from-amber-500 to-orange-500',
    iconBg: 'bg-amber-500/10 text-amber-500',
    title: 'What Drives Me',
    text: 'Curiosity and a bias toward shipping. Every project is a chance to push boundaries — integrating LLMs into real workflows, crafting intuitive UX, and staying on the cutting edge.',
  },
] as const

function StatCard({
  value,
  suffix,
  label,
  icon: Icon,
  color,
  bg,
  ring,
}: (typeof STATS)[number]) {
  const { count, ref } = useCountUp(value)
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -5, scale: 1.04 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative flex flex-col items-center gap-3 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5 text-center shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[rgb(var(--border))]/80 overflow-hidden"
    >
      {/* Subtle gradient bg on hover */}
      <div
        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${bg} rounded-2xl`}
        aria-hidden
      />
      <div
        className={`relative flex h-11 w-11 items-center justify-center rounded-xl ring-2 ${ring} ${bg}`}
      >
        <Icon size={20} className={color} aria-hidden />
      </div>
      <dl className="relative">
        <dd
          ref={ref}
          className="text-2xl font-black tabular-nums text-[rgb(var(--text))]"
          style={{ letterSpacing: '-0.03em' }}
        >
          {count}
          {suffix}
        </dd>
        <dt className="mt-0.5 text-[11px] font-semibold uppercase tracking-widest text-[rgb(var(--text-muted))]">
          {label}
        </dt>
      </dl>
    </motion.div>
  )
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const animate = inView ? 'show' : 'hidden'

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-blue-50/40 to-transparent dark:via-blue-950/8"
      />

      <div className="container-main">
        <motion.div variants={fadeUp} initial="hidden" animate={animate}>
          <SectionHeading
            label="About Me"
            title={
              <>
                The Engineer{' '}
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                  Behind the Code
                </span>
              </>
            }
            subtitle="Full-stack developer with an AI-first mindset — I build production-ready systems that scale."
          />
        </motion.div>

        {/* Bio + Stats */}
        <motion.div
          variants={stagger(0, 0.1)}
          initial="hidden"
          animate={animate}
          className="mb-10 grid gap-10 lg:grid-cols-5 lg:gap-14"
        >
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-5 lg:col-span-3"
          >
            <p className="text-base leading-[1.8] text-[rgb(var(--text-muted))]">
              I'm a{' '}
              <strong className="font-semibold text-[rgb(var(--text))]">
                full-stack developer
              </strong>{' '}
              who builds with an AI-first mindset. From designing responsive
              frontends to architecting scalable backends, I bring end-to-end
              ownership to every project. My focus areas include{' '}
              <strong className="font-semibold text-[rgb(var(--text))]">
                Generative AI, RAG pipelines, agentic AI,
              </strong>{' '}
              and multi-agent systems.
            </p>
            <p className="text-base leading-[1.8] text-[rgb(var(--text-muted))]">
              {BIO[2]}
            </p>

            {/* Core tech strip */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                'Java',
                'Spring Boot',
                'Angular',
                'React',
                'Azure OpenAI',
                'Docker',
                'Microservices',
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-blue-500/20 bg-blue-500/8 px-3 py-1 text-xs font-semibold text-blue-600 dark:border-blue-400/20 dark:bg-blue-400/8 dark:text-blue-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={stagger(0, 0.08)}
            initial="hidden"
            animate={animate}
            className="grid grid-cols-2 gap-3 content-start lg:col-span-2"
          >
            {STATS.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </motion.div>
        </motion.div>

        {/* Highlight cards */}
        <motion.div
          variants={stagger(0, 0.1)}
          initial="hidden"
          animate={animate}
          className="grid gap-4 sm:grid-cols-3"
        >
          {HIGHLIGHTS.map(({ icon: Icon, accent, iconBg, title, text }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              className="group relative flex flex-col gap-3 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[rgb(var(--border))]/80 overflow-hidden"
            >
              {/* Top accent line */}
              <div
                className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                aria-hidden
              />
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg}`}
              >
                <Icon size={16} aria-hidden />
              </div>
              <div>
                <p className="text-sm font-bold tracking-tight text-[rgb(var(--text))]">
                  {title}
                </p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[rgb(var(--text-muted))]">
                  {text}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
