import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  TrendingUp,
  GraduationCap,
  Briefcase,
  MapPin,
} from 'lucide-react'
import { fadeUp, stagger, VIEWPORT } from '@/utils/motion'
import { SectionHeading } from '@/components'
import { timelineData, TYPE_CONFIG } from '@/data/experience'

const detailsVariants = {
  closed: { height: 0, opacity: 0 },
  open: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const detailItem = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.25 } },
}

const TYPE_ICON = {
  Education: GraduationCap,
  Work: Briefcase,
}

const TYPE_ACCENT = {
  Education: {
    line: 'from-purple-500 to-indigo-500',
    bullet: 'text-purple-500',
  },
  Work: {
    line: 'from-emerald-500 to-teal-500',
    bullet: 'text-emerald-500',
  },
}

function TimelineItem({
  item,
  index,
}: {
  item: (typeof timelineData)[0]
  index: number
}) {
  const [open, setOpen] = useState(index === timelineData.length - 1)
  const Icon = TYPE_ICON[item.type]
  const accent = TYPE_ACCENT[item.type]

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      className="relative pl-10 sm:pl-14"
    >
      {/* Animated dot */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 18,
          delay: index * 0.1,
        }}
        className={`absolute left-0 top-5 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full ring-4 ring-[rgb(var(--bg))] shadow-md ${TYPE_CONFIG[item.type]?.dot}`}
      >
        <Icon size={15} className="text-white" aria-hidden />
      </motion.div>

      {/* Card */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`${item.title} at ${item.org} — ${open ? 'collapse' : 'expand'} details`}
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="group w-full cursor-pointer rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5 text-left shadow-sm transition-all hover:border-[rgb(var(--text-muted))]/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 overflow-hidden"
      >
        {/* Top accent line on hover */}
        <div
          className={`absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r ${accent.line} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
          aria-hidden
        />

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${TYPE_CONFIG[item.type]?.badge}`}
              >
                {item.type}
              </span>
              <span className="flex items-center gap-1 text-xs text-[rgb(var(--text-muted))]">
                <MapPin size={10} aria-hidden /> {item.org}
              </span>
            </div>
            <h3 className="text-base font-bold text-[rgb(var(--text))] leading-snug">
              {item.title}
            </h3>
            <p className="mt-0.5 text-xs font-medium text-[rgb(var(--text-muted))]">
              {item.period}
            </p>
          </div>
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0 mt-1 text-[rgb(var(--text-muted))]"
            aria-hidden
          >
            <ChevronDown size={16} />
          </motion.div>
        </div>

        {/* Expandable details */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="details"
              variants={detailsVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="overflow-hidden"
            >
              <motion.div
                variants={{
                  show: {
                    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                  },
                }}
                initial="hidden"
                animate="show"
                className="mt-4 space-y-2.5 border-t border-[rgb(var(--border))] pt-4"
              >
                {'description' in item && (
                  <motion.p
                    variants={detailItem}
                    className="text-sm leading-relaxed text-[rgb(var(--text-muted))] pb-1"
                  >
                    {(item as { description: string }).description}
                  </motion.p>
                )}
                {item.details.map((d) => (
                  <motion.div
                    key={d}
                    variants={detailItem}
                    className="flex gap-3 text-sm text-[rgb(var(--text-muted))]"
                  >
                    <TrendingUp
                      size={13}
                      className={`mt-0.5 shrink-0 ${accent.bullet}`}
                      aria-hidden
                    />
                    <span className="leading-relaxed">{d}</span>
                  </motion.div>
                ))}

                {/* Achievement badges for work entries */}
                {item.type === 'Work' && (
                  <motion.div
                    variants={detailItem}
                    className="flex flex-wrap gap-2 pt-1"
                  >
                    {['Spring Boot', 'React', 'Docker', 'CI/CD', 'Agile'].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg-subtle))] px-2.5 py-0.5 text-[10px] font-medium text-[rgb(var(--text-muted))]"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}

export default function ExperienceSection() {
  return (
    <section id="experience" className="section-sm relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-sky-50/40 to-transparent dark:via-sky-950/10"
      />

      <div className="container-main">
        <SectionHeading
          label="My Journey"
          title={
            <>
              Experience &amp;{' '}
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                Education
              </span>
            </>
          }
          subtitle="A timeline of professional growth, academic milestones, and career achievements."
        />

        <div className="relative mx-auto max-w-2xl">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-violet-500 via-sky-400 to-emerald-500 opacity-40"
          />

          <motion.div
            variants={stagger(0, 0.15)}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="space-y-6"
          >
            {timelineData.map((item, i) => (
              <TimelineItem key={item.id} item={item} index={i} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
