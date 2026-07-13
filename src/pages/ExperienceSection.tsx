import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, stagger, VIEWPORT } from '@/utils/motion'
import { SectionHeading } from '@/components'
import { timelineData, TYPE_CONFIG } from '@/data/experience'

/* ── Detail list variants ─────────────────────────────────────── */
const detailsVariants = {
  closed: { height: 0, opacity: 0 },
  open:   { height: 'auto', opacity: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
}

const detailItem = {
  hidden: { opacity: 0, x: -8 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.25 } },
}

/* ── Single timeline card ─────────────────────────────────────── */
function TimelineItem({ item, index }: { item: typeof timelineData[0]; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      className="relative pl-8 sm:pl-10"
    >
      {/* Animated dot */}
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 300, damping: 18, delay: index * 0.12 }}
        className={`absolute left-0 top-5 h-4 w-4 -translate-x-1/2 rounded-full ring-4 ring-white dark:ring-[rgb(var(--bg))] ${TYPE_CONFIG[item.type]?.dot}`}
      />

      {/* Card */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`${item.title} at ${item.org} — ${open ? 'collapse' : 'expand'} details`}
        whileHover={{ y: -3, boxShadow: '0 8px 30px -6px rgba(0,0,0,0.12)' }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="w-full cursor-pointer rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5 text-left shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      >
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <span className={`mb-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${TYPE_CONFIG[item.type]?.badge}`}>
              {item.type}
            </span>
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">{item.title}</h3>
            <p className="text-sm text-[rgb(var(--text-muted))]">{item.org}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[rgb(var(--text-muted))]">{item.period}</span>
            <motion.svg
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="h-4 w-4 shrink-0 text-[rgb(var(--text-muted))]"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              aria-hidden
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </motion.svg>
          </div>
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
              <motion.ul
                variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }}
                initial="hidden"
                animate="show"
                className="mt-3 space-y-1.5 border-t border-[rgb(var(--border))] pt-3"
              >
                {item.details.map((d) => (
                  <motion.li key={d} variants={detailItem} className="flex gap-2 text-sm text-[rgb(var(--text-muted))]">
                    <span aria-hidden="true" className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${TYPE_CONFIG[item.type]?.bullet}`} />
                    {d}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}

/* ── Section ──────────────────────────────────────────────────── */
export default function ExperienceSection() {
  return (
    <section id="experience" className="section-sm relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-sky-50/20 to-transparent dark:via-sky-950/10" />

      <div className="container-main">

        <SectionHeading
          label="Journey"
          title={<>My{' '}<span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">Experience</span></>}
          subtitle="Education, internships, and where I'm headed next."
        />

        <div className="relative mx-auto max-w-2xl">
          {/* Animated vertical line */}
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
            className="space-y-8"
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
