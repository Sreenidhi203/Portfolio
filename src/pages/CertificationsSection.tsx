import { motion } from 'framer-motion'
import { ExternalLink, ShieldCheck, Calendar, Award } from 'lucide-react'
import { fadeUp, stagger, VIEWPORT } from '@/utils/motion'
import { certifications } from '@/data'
import type { Certification } from '@/types'

const certStagger = stagger(0, 0.08)

const COLORS: Record<
  string,
  { grad: string; glow: string; badge: string; ring: string; accent: string }
> = {
  amber: {
    grad: 'from-amber-400  to-orange-500',
    glow: 'rgba(251,191,36,0.25)',
    badge:
      'bg-amber-50  text-amber-700  dark:bg-amber-950/40  dark:text-amber-300',
    ring: 'ring-amber-200 dark:ring-amber-800',
    accent: 'from-amber-400 to-orange-500',
  },
  sky: {
    grad: 'from-sky-400    to-blue-500',
    glow: 'rgba(56,189,248,0.25)',
    badge:
      'bg-sky-50    text-sky-700    dark:bg-sky-950/40    dark:text-sky-300',
    ring: 'ring-sky-200 dark:ring-sky-800',
    accent: 'from-sky-400 to-blue-500',
  },
  emerald: {
    grad: 'from-emerald-400 to-teal-500',
    glow: 'rgba(52,211,153,0.25)',
    badge:
      'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
    ring: 'ring-emerald-200 dark:ring-emerald-800',
    accent: 'from-emerald-400 to-teal-500',
  },
  violet: {
    grad: 'from-violet-500 to-indigo-600',
    glow: 'rgba(139,92,246,0.25)',
    badge:
      'bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300',
    ring: 'ring-violet-200 dark:ring-violet-800',
    accent: 'from-violet-500 to-indigo-600',
  },
  indigo: {
    grad: 'from-indigo-500 to-blue-600',
    glow: 'rgba(99,102,241,0.25)',
    badge:
      'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300',
    ring: 'ring-indigo-200 dark:ring-indigo-800',
    accent: 'from-indigo-500 to-blue-600',
  },
  rose: {
    grad: 'from-rose-400   to-pink-600',
    glow: 'rgba(251,113,133,0.25)',
    badge:
      'bg-rose-50   text-rose-700   dark:bg-rose-950/40   dark:text-rose-300',
    ring: 'ring-rose-200 dark:ring-rose-800',
    accent: 'from-rose-400 to-pink-600',
  },
}

function CertCard({ cert }: { cert: Certification }) {
  const c = COLORS[cert.color] ?? COLORS.violet

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] shadow-sm transition-all duration-300 hover:shadow-lg hover:border-[rgb(var(--border))]/80"
    >
      {/* Hover glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 0 0 1px ${c.glow}, 0 16px 48px -8px ${c.glow}` }}
      />

      {/* Top accent bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${c.grad}`} aria-hidden />

      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          {/* Logo circle */}
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${c.grad} shadow-lg ring-4 ${c.ring}`}
          >
            <span className="text-sm font-black tracking-tight text-white">
              {cert.abbr}
            </span>
          </div>

          {/* Verified badge */}
          <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40">
            <ShieldCheck
              size={11}
              className="text-emerald-600 dark:text-emerald-400"
              aria-hidden
            />
            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
              Verified
            </span>
          </div>
        </div>

        {/* Org badge */}
        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${c.badge}`}
        >
          <Award size={11} aria-hidden />
          {cert.org}
        </span>

        {/* Title */}
        <p
          className="text-[13px] font-bold leading-snug text-[rgb(var(--text))]"
          style={{ letterSpacing: '-0.01em' }}
        >
          {cert.title}
        </p>

        {/* Skills gained */}
        {cert.skills && cert.skills.length > 0 && (
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[rgb(var(--text-muted))]">
              Skills Validated
            </p>
            <div className="flex flex-wrap gap-1.5">
              {cert.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--bg-subtle))] px-2.5 py-0.5 text-[10px] font-medium text-[rgb(var(--text-muted))]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between border-t border-[rgb(var(--border))] pt-2.5">
          <div className="flex items-center gap-1.5 text-xs text-[rgb(var(--text-muted))]">
            <Calendar size={11} aria-hidden />
            <span>Issued {cert.issued}</span>
          </div>
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Verify ${cert.title} credential (opens in new tab)`}
            className="group/link flex items-center gap-1.5 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--bg-subtle))] px-2.5 py-1 text-xs font-semibold text-[rgb(var(--text-muted))] transition-all hover:border-blue-500/50 hover:text-blue-500 hover:shadow-sm"
          >
            Verify <ExternalLink size={11} aria-hidden />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="section-sm relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-indigo-50/50 to-transparent dark:via-indigo-950/10"
      />

      <div className="container-main">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mb-8 text-center"
        >
          <div
            className="mb-4 flex items-center justify-center gap-3"
            aria-hidden="true"
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-violet-500" />
            <span className="text-xs font-bold uppercase tracking-widest text-violet-600 dark:text-violet-400">
              Credentials
            </span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-violet-500" />
          </div>
          <h2
            className="text-3xl font-extrabold tracking-tight text-[rgb(var(--text))] sm:text-4xl"
            style={{ letterSpacing: '-0.025em' }}
          >
            <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
              Certifications
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[rgb(var(--text-muted))]">
            Industry-recognised credentials from Microsoft and Google Cloud,
            validating expertise in AI and cloud engineering.
          </p>
        </motion.div>

        <motion.div
          variants={certStagger}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {certifications.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
