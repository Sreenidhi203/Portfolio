export type TimelineType = 'Education' | 'Work'

export interface TimelineEntry {
  id: string
  type: TimelineType
  title: string
  org: string
  period: string
  description: string
  details: string[]
}

export const timelineData: TimelineEntry[] = [
  {
    id: 'education-hsc',
    type: 'Education',
    title: 'Higher Secondary (XII) \u2014 MPC',
    org: 'Sri Chaitanya Junior College',
    period: '2019 \u2013 2021',
    description:
      'Completed higher secondary education with focus on Mathematics, Physics, and Chemistry.',
    details: ['Scored 942/1000'],
  },
  {
    id: 'education-btech',
    type: 'Education',
    title: 'B.Tech in Computer Science',
    org: 'Institute Of Aeronautical Engineering',
    period: '2021 \u2013 2025',
    description:
      'Graduated with a strong foundation in computer science, data structures, and software engineering.',
    details: ['CGPA: 8.9/10'],
  },
  {
    id: 'capgemini',
    type: 'Work',
    title: 'Software Engineer',
    org: 'Capgemini',
    period: 'Sep 2025 \u2013 Present',
    description:
      'Building and maintaining enterprise-grade microservices and client-facing web applications for global financial services clients.',
    details: [],
  },
]

export const TYPE_CONFIG: Record<
  TimelineType,
  { dot: string; badge: string; bullet: string }
> = {
  Education: {
    dot: 'bg-purple-500 ring-purple-200 dark:ring-purple-800',
    badge:
      'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
    bullet: 'bg-purple-500',
  },
  Work: {
    dot: 'bg-emerald-500 ring-emerald-200 dark:ring-emerald-800',
    badge:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    bullet: 'bg-emerald-500',
  },
}
