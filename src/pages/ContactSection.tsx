import {
  useState,
  useId,
  type ReactNode,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, MapPin, Clock } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { fadeUp, stagger, VIEWPORT } from '@/utils/motion'
import { SITE } from '@/constants'
import { inputCls } from '@/utils'
import { SectionHeading } from '@/components'

const contactStagger = stagger(0, 0.08)
const FORMSPREE = 'https://formspree.io/f/xrewjngp'

interface Fields {
  name: string
  email: string
  subject: string
  message: string
}
type Errors = Partial<Fields>
type Status = 'idle' | 'sending' | 'success' | 'error'

function validate(f: Fields): Errors {
  const e: Errors = {}
  if (!f.name.trim()) e.name = 'Name is required.'
  else if (f.name.trim().length > 100)
    e.name = 'Name must be under 100 characters.'
  if (!f.email.trim()) e.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    e.email = 'Enter a valid email.'
  if (!f.subject.trim()) e.subject = 'Subject is required.'
  else if (f.subject.trim().length > 150)
    e.subject = 'Subject must be under 150 characters.'
  if (!f.message.trim()) e.message = 'Message is required.'
  else if (f.message.trim().length < 20)
    e.message = 'Message must be at least 20 characters.'
  else if (f.message.trim().length > 2000)
    e.message = 'Message must be under 2000 characters.'
  return e
}

const QUICK_LINKS = [
  {
    label: 'Email',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        className="h-4 w-4"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0-9.75 6.75L2.25 6.75"
        />
      </svg>
    ),
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    border: 'hover:border-blue-500/40',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/sree-n-04b590348',
    href: SITE.linkedin,
    icon: <FaLinkedin className="h-4 w-4" aria-hidden />,
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-50 dark:bg-sky-950/40',
    border: 'hover:border-sky-500/40',
  },
  {
    label: 'GitHub',
    value: 'github.com/Sreenidhi203',
    href: SITE.github,
    icon: <FaGithub className="h-4 w-4" aria-hidden />,
    color: 'text-[rgb(var(--text))]',
    bg: 'bg-[rgb(var(--bg-subtle))]',
    border: 'hover:border-[rgb(var(--text-muted))]/40',
  },
]

function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string
  label: string
  error?: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-bold uppercase tracking-wide text-[rgb(var(--text-muted))]"
      >
        {label}
        {required && (
          <span aria-hidden className="ml-0.5 text-rose-500">
            *
          </span>
        )}
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
            className="text-xs text-rose-600 dark:text-rose-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function ContactSection() {
  const uid = useId()
  const id = (n: string) => `${uid}-${n}`

  const [fields, setFields] = useState<Fields>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<
    Partial<Record<keyof Fields, boolean>>
  >({})
  const [status, setStatus] = useState<Status>('idle')

  const set =
    (k: keyof Fields) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val = e.target.value
      setFields((f) => ({ ...f, [k]: val }))
      if (touched[k])
        setErrors((prev) => ({
          ...prev,
          [k]: validate({ ...fields, [k]: val })[k],
        }))
    }

  const blur = (k: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [k]: true }))
    setErrors((prev) => ({ ...prev, [k]: validate(fields)[k] }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(fields)
    setErrors(errs)
    setTouched({ name: true, email: true, subject: true, message: true })
    if (Object.keys(errs).length) return
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ ...fields }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setFields({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-blue-50/40 to-transparent dark:via-blue-950/10"
      />

      <div className="container-main">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="mb-12"
        >
          <SectionHeading
            label="Get in Touch"
            title="Let's Work Together"
            subtitle="Open to full-time roles, freelance projects, and interesting collaborations. I typically respond within 24 hours."
          />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Left panel */}
          <motion.div
            variants={contactStagger}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="flex flex-col gap-4 lg:col-span-2"
          >
            {/* Info pills */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-1.5 text-xs font-medium text-[rgb(var(--text-muted))]">
                <MapPin size={11} aria-hidden /> Hyderabad, India
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--surface))] px-3 py-1.5 text-xs font-medium text-[rgb(var(--text-muted))]">
                <Clock size={11} aria-hidden /> Responds within 24h
              </div>
            </div>

            {/* Quick contact links */}
            <div className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <motion.a
                  key={link.label}
                  variants={fadeUp}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className={`group relative flex items-center gap-3 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-3.5 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[rgb(var(--border))]/80 ${link.border}`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${link.bg} ${link.color}`}
                    aria-hidden
                  >
                    {link.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[rgb(var(--text-muted))]">
                      {link.label}
                    </p>
                    <p className="truncate text-[13px] font-semibold text-[rgb(var(--text))]">
                      {link.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-6 shadow-sm sm:p-7">
              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    key="success"
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-4 py-12 text-center"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/50 ring-4 ring-emerald-200 dark:ring-emerald-800">
                      <svg
                        className="h-8 w-8 text-emerald-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.2}
                        aria-hidden
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[rgb(var(--text))]">
                        Message sent!
                      </p>
                      <p className="mt-1 text-sm text-[rgb(var(--text-muted))]">
                        I'll get back to you within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-2 rounded-xl border border-[rgb(var(--border))] px-5 py-2 text-sm font-semibold text-[rgb(var(--text))] transition-colors hover:border-blue-500/50 hover:text-blue-500"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}

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
                    <div className="mb-1">
                      <p
                        className="text-[15px] font-bold text-[rgb(var(--text))]"
                        style={{ letterSpacing: '-0.01em' }}
                      >
                        Send a Message
                      </p>
                      <p className="mt-1 text-[13px] text-[rgb(var(--text-muted))]">
                        Whether it's a job opportunity, project idea, or just a
                        hello — I'd love to hear from you.
                      </p>
                    </div>

                    <input
                      type="text"
                      name="_gotcha"
                      className="hidden"
                      aria-hidden
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <Field
                        id={id('name')}
                        label="Name"
                        error={errors.name}
                        required
                      >
                        <input
                          id={id('name')}
                          type="text"
                          placeholder="Your name"
                          value={fields.name}
                          onChange={set('name')}
                          onBlur={blur('name')}
                          aria-required
                          aria-invalid={!!errors.name || undefined}
                          aria-describedby={
                            errors.name ? `${id('name')}-error` : undefined
                          }
                          className={inputCls(!!errors.name)}
                        />
                      </Field>
                      <Field
                        id={id('email')}
                        label="Email"
                        error={errors.email}
                        required
                      >
                        <input
                          id={id('email')}
                          type="email"
                          placeholder="your@email.com"
                          value={fields.email}
                          onChange={set('email')}
                          onBlur={blur('email')}
                          aria-required
                          aria-invalid={!!errors.email || undefined}
                          aria-describedby={
                            errors.email ? `${id('email')}-error` : undefined
                          }
                          className={inputCls(!!errors.email)}
                        />
                      </Field>
                    </div>

                    <Field
                      id={id('subject')}
                      label="Subject"
                      error={errors.subject}
                      required
                    >
                      <input
                        id={id('subject')}
                        type="text"
                        placeholder="Job opportunity, project, or just saying hi..."
                        value={fields.subject}
                        onChange={set('subject')}
                        onBlur={blur('subject')}
                        aria-required
                        aria-invalid={!!errors.subject || undefined}
                        aria-describedby={
                          errors.subject ? `${id('subject')}-error` : undefined
                        }
                        className={inputCls(!!errors.subject)}
                      />
                    </Field>

                    <Field
                      id={id('message')}
                      label="Message"
                      error={errors.message}
                      required
                    >
                      <textarea
                        id={id('message')}
                        rows={5}
                        placeholder="Tell me about the role, project, or idea..."
                        value={fields.message}
                        onChange={set('message')}
                        onBlur={blur('message')}
                        aria-required
                        aria-invalid={!!errors.message || undefined}
                        aria-describedby={
                          errors.message ? `${id('message')}-error` : undefined
                        }
                        className={`${inputCls(!!errors.message)} resize-none`}
                      />
                    </Field>

                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.div
                          key="net-err"
                          role="alert"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600 dark:border-rose-800/50 dark:bg-rose-950/30 dark:text-rose-400"
                        >
                          Something went wrong. Please try again or email me
                          directly.
                          <button
                            type="button"
                            onClick={() => setStatus('idle')}
                            aria-label="Dismiss"
                            className="ml-auto text-rose-400 hover:text-rose-600"
                          >
                            ✕
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={status === 'sending'}
                      whileHover={{ scale: status === 'sending' ? 1 : 1.02 }}
                      whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 22,
                      }}
                      className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-[13px] font-bold text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-shadow disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === 'sending' ? (
                        <>
                          <svg
                            className="h-4 w-4 animate-spin"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                            />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message <Send size={15} aria-hidden />
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
