import { motion } from 'framer-motion'
import { fadeUp, stagger, VIEWPORT } from '@/utils/motion'
import { certifications } from '@/data'
import type { Certification } from '@/types'

const certStagger = stagger(0, 0.07)

/* ── Color tokens ─────────────────────────────────────────────── */
const COLORS: Record<string, { grad: string; glow: string; badge: string; dot: string }> = {
  amber:  {
    grad:  'from-amber-400  to-orange-500',
    glow:  'rgba(251,191,36,0.30)',
    badge: 'bg-amber-50  text-amber-700  dark:bg-amber-950/40  dark:text-amber-300',
    dot:   'bg-amber-400',
  },
  sky:    {
    grad:  'from-sky-400    to-blue-500',
    glow:  'rgba(56,189,248,0.30)',
    badge: 'bg-sky-50    text-sky-700    dark:bg-sky-950/40    dark:text-sky-300',
    dot:   'bg-sky-400',
  },
  emerald: {
    grad:  'from-emerald-400 to-teal-500',
    glow:  'rgba(52,211,153,0.30)',
    badge: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
    dot:   'bg-emerald-400',
  },
  violet: {
    grad:  'from-violet-500 to-indigo-600',
    glow:  'rgba(139,92,246,0.30)',
    badge: 'bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300',
    dot:   'bg-violet-500',
  },
  indigo: {
    grad:  'from-indigo-500 to-blue-600',
    glow:  'rgba(99,102,241,0.30)',
    badge: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300',
    dot:   'bg-indigo-500',
  },
  rose:   {
    grad:  'from-rose-400   to-pink-600',
    glow:  'rgba(251,113,133,0.30)',
    badge: 'bg-rose-50   text-rose-700   dark:bg-rose-950/40   dark:text-rose-300',
    dot:   'bg-rose-400',
  },
}

/* ── Card ─────────────────────────────────────────────────────── */
function CertCard({ cert }: { cert: Certification }) {
  const c = COLORS[cert.color] ?? COLORS.violet

  return (
    <motion.a
      variants={fadeUp}
      href={cert.credentialUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${cert.title} credential (opens in new tab)`}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-5 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
    >
      {/* Hover glow — pure CSS, no JS state */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ boxShadow: `0 0 0 1px ${c.glow}, 0 16px 48px -8px ${c.glow}` }}
      />

      {/* Top-right shimmer */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)` }}
      />

      {/* Logo circle + org badge row */}
      <div className="flex items-center justify-between gap-3">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${c.grad} shadow-md`}>
          <span className="text-xs font-black tracking-tight text-white">{cert.abbr}</span>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${c.badge}`}>
          {cert.org}
        </span>
      </div>

      {/* Title */}
      <p className="text-sm font-semibold leading-snug text-gray-900 dark:text-white">
        {cert.title}
      </p>

      {/* Footer: date + link cue */}
      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-[rgb(var(--text-muted))]">
          <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} aria-hidden="true" />
          Issued {cert.issued}
        </div>
        <span className="flex items-center gap-1 text-xs font-medium text-violet-600 opacity-40 transition-opacity duration-200 group-hover:opacity-100 dark:text-violet-400">
          View credential
          <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
          </svg>
        </span>
      </div>
    </motion.a>
  )
}

/* ── Section ──────────────────────────────────────────────────── */
export default function CertificationsSection() {
  return (
    <section id="certifications" className="section-sm relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-indigo-50/30 to-transparent dark:via-indigo-950/10" />

      <div className="container-main">

        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={VIEWPORT}
          className="mb-12 text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-violet-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">Credentials</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-violet-500" />
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
              Certifications
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[rgb(var(--text-muted))]">
            Verified credentials from industry-leading platforms and organisations.
          </p>
        </motion.div>

        <motion.div
          variants={certStagger} initial="hidden" whileInView="show" viewport={VIEWPORT}
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
