import { useState, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, stagger, VIEWPORT } from '@/utils/motion'
import { http } from '@/services'
import { SITE } from '@/constants'
import { inputCls } from '@/utils'
const contactStagger = stagger(0, 0.08)

interface Fields { name: string; email: string; subject: string; message: string }
type Errors = Partial<Fields>
type Status = 'idle' | 'sending' | 'success' | 'error'

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (!f.name.trim())                                          e.name    = 'Name is required.'
  else if (f.name.trim().length > 100)                         e.name    = 'Name must be under 100 characters.'
  if (!f.email.trim())                                         e.email   = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))       e.email   = 'Enter a valid email.'
  else if (f.email.length > 254)                               e.email   = 'Email must be under 254 characters.'
  if (!f.subject.trim())                                       e.subject = 'Subject is required.'
  else if (f.subject.trim().length > 150)                      e.subject = 'Subject must be under 150 characters.'
  if (!f.message.trim())                                       e.message = 'Message is required.'
  else if (f.message.trim().length < 20)                       e.message = 'Message must be at least 20 characters.'
  else if (f.message.trim().length > 2000)                     e.message = 'Message must be under 2000 characters.'
  return e
}

const LINKS = [
  {
    label: 'Email',
    value: SITE.email,
    href:  `mailto:${SITE.email}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0-9.75 6.75L2.25 6.75" />
      </svg>
    ),
    color: 'text-violet-600 dark:text-violet-400',
    bg:    'bg-violet-50 dark:bg-violet-950/40',
  },
  {
    label: 'LinkedIn',
    value: SITE.linkedin.replace('https://', ''),
    href:  SITE.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: 'text-sky-600 dark:text-sky-400',
    bg:    'bg-sky-50 dark:bg-sky-950/40',
  },
  {
    label: 'GitHub',
    value: SITE.github.replace('https://', ''),
    href:  SITE.github,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    color: 'text-gray-700 dark:text-gray-300',
    bg:    'bg-gray-100 dark:bg-gray-800/60',
  },
]

/* ── Field: label + input + error linked via aria-describedby ─── */
function Field({
  id, label, error, required, children,
}: { id: string; label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-semibold text-[rgb(var(--text-muted))] uppercase tracking-wide">
        {label}
        {required && <span aria-hidden="true" className="ml-0.5 text-rose-500">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            key="err"
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400"
          >
            <svg className="h-3 w-3 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ContactSection() {
  const uid    = useId()
  const id     = (name: string) => `${uid}-${name}`

  const [fields,  setFields]  = useState<Fields>({ name: '', email: '', subject: '', message: '' })
  const [errors,  setErrors]  = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [status,  setStatus]  = useState<Status>('idle')

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.value
    setFields((f) => ({ ...f, [k]: val }))
    if (touched[k]) setErrors((prev) => ({ ...prev, [k]: validate({ ...fields, [k]: val })[k] }))
  }

  const blur = (k: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrors((prev) => ({ ...prev, [k]: validate(fields)[k] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(fields)
    setErrors(errs)
    setTouched({ name: true, email: true, subject: true, message: true })
    if (Object.keys(errs).length) return
    setStatus('sending')
    try {
      await http.post('/api/contact', fields)
      setStatus('success')
      setFields({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-violet-50/20 to-transparent dark:via-violet-950/10" />

      <div className="container-main">

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={VIEWPORT} className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-violet-500" />
            <span className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">Get in touch</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-violet-500" />
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Let&apos;s{' '}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
              Connect
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[rgb(var(--text-muted))]">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">

          {/* ── Left panel ── */}
          <motion.div variants={contactStagger} initial="hidden" whileInView="show" viewport={VIEWPORT} className="flex flex-col gap-6 lg:col-span-2">
            {LINKS.map((link) => (
              <motion.a
                key={link.label}
                variants={fadeUp}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={`${link.label}: ${link.value}${!link.href.startsWith('mailto') ? ' (opens in new tab)' : ''}`}
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="group flex items-center gap-4 rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-4 shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
              >
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${link.bg} ${link.color}`} aria-hidden="true">
                  {link.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--text-muted))]">{link.label}</p>
                  <p className="truncate text-sm font-medium text-[rgb(var(--text))] group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                    {link.value}
                  </p>
                </div>
                <svg className="ml-auto h-4 w-4 shrink-0 text-[rgb(var(--text-muted))] opacity-0 transition-opacity group-hover:opacity-100" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                </svg>
              </motion.a>
            ))}

            <motion.a
              variants={fadeUp}
              href="/resume.pdf"
              download
              aria-label="Download resume as PDF"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className="group flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 font-semibold text-white shadow-lg shadow-violet-500/25 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
            >
              <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download Resume
            </motion.a>
          </motion.div>

          {/* ── Contact form ── */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={VIEWPORT} className="lg:col-span-3">
            <div className="relative overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6 shadow-sm sm:p-8">
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

              <AnimatePresence mode="wait">

                {/* ── Success ── */}
                {status === 'success' && (
                  <motion.div
                    key="success"
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center gap-4 py-12 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50" aria-hidden="true">
                      <svg className="h-8 w-8 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">Message sent!</p>
                      <p className="mt-1 text-sm text-[rgb(var(--text-muted))]">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                    </div>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-2 rounded-xl border border-[rgb(var(--border))] px-5 py-2 text-sm font-medium text-[rgb(var(--text))] transition-colors hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}

                {/* ── Form ── */}
                {status !== 'success' && (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    noValidate
                    aria-label="Contact form"
                    className="flex flex-col gap-5"
                  >
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <Field id={id('name')} label="Full name" error={errors.name} required>
                        <input
                          id={id('name')} type="text" placeholder="Jane Smith"
                          value={fields.name} onChange={set('name')} onBlur={blur('name')}
                          aria-required="true"
                          aria-invalid={!!errors.name || undefined}
                          aria-describedby={errors.name ? `${id('name')}-error` : undefined}
                          className={inputCls(!!errors.name)}
                        />
                      </Field>
                      <Field id={id('email')} label="Email address" error={errors.email} required>
                        <input
                          id={id('email')} type="email" placeholder="jane@example.com"
                          value={fields.email} onChange={set('email')} onBlur={blur('email')}
                          aria-required="true"
                          aria-invalid={!!errors.email || undefined}
                          aria-describedby={errors.email ? `${id('email')}-error` : undefined}
                          className={inputCls(!!errors.email)}
                        />
                      </Field>
                    </div>

                    <Field id={id('subject')} label="Subject" error={errors.subject} required>
                      <input
                        id={id('subject')} type="text" placeholder="Project inquiry / Collaboration / Just saying hi"
                        value={fields.subject} onChange={set('subject')} onBlur={blur('subject')}
                        aria-required="true"
                        aria-invalid={!!errors.subject || undefined}
                        aria-describedby={errors.subject ? `${id('subject')}-error` : undefined}
                        className={inputCls(!!errors.subject)}
                      />
                    </Field>

                    <Field id={id('message')} label="Message" error={errors.message} required>
                      <textarea
                        id={id('message')} rows={5} placeholder="Tell me about your project or idea..."
                        value={fields.message} onChange={set('message')} onBlur={blur('message')}
                        aria-required="true"
                        aria-invalid={!!errors.message || undefined}
                        aria-describedby={errors.message ? `${id('message')}-error` : undefined}
                        className={`${inputCls(!!errors.message)} resize-none`}
                      />
                    </Field>

                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.div
                          key="net-err"
                          role="alert"
                          aria-live="assertive"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          className="flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600 dark:border-rose-800/50 dark:bg-rose-950/30 dark:text-rose-400"
                        >
                          <svg className="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                          </svg>
                          <span>Something went wrong. Please try again or email me directly.</span>
                          <button
                            type="button"
                            onClick={() => setStatus('idle')}
                            aria-label="Dismiss error"
                            className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-rose-400 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                          >
                            <span aria-hidden="true">✕</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      aria-disabled={status === 'sending'}
                      whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                      whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                      className="flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-md shadow-violet-500/20 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
                    >
                      {status === 'sending' ? (
                        <>
                          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                          </svg>
                          <span>Sending…</span>
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.269 20.876L5.999 12zm0 0h7.5" />
                          </svg>
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}

              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
