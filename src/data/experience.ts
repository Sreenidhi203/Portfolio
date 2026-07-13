export type TimelineType = 'Education' | 'Internship' | 'Capgemini'

export interface TimelineEntry {
  id: string
  type: TimelineType
  title: string
  org: string
  period: string
  details: string[]
}

export const timelineData: TimelineEntry[] = [
  {
    id: 'education',
    type: 'Education',
    title: 'B.Tech – Computer Science & Engineering',
    org: 'Sreenidhi Institute of Science and Technology',
    period: '2021 – 2025',
    details: [
      'CGPA: 8.2 / 10',
      'Relevant coursework: DSA, DBMS, OS, Computer Networks, Machine Learning',
      'Active member of the coding club and tech fest organiser',
    ],
  },
  {
    id: 'internship',
    type: 'Internship',
    title: 'Software Development Intern',
    org: 'Tech Solutions Company',
    period: 'Jun 2024 – Aug 2024',
    details: [
      'Built REST APIs with Node.js and Express, reducing average response time by 30%',
      'Developed reusable React component library consumed across 3 internal product teams',
      'Wrote unit tests with Jest, achieving 85% code coverage on assigned modules',
    ],
  },
  {
    id: 'capgemini',
    type: 'Capgemini',
    title: 'Associate Software Engineer',
    org: 'Capgemini',
    period: 'Aug 2025',
    details: [
      'Upcoming role — campus placement offer received (2025 batch)',
      'Focus area: full-stack development and cloud-native solutions',
      'Completed pre-joining training in Java, Spring Boot, and AWS fundamentals',
    ],
  },
]

export const TYPE_CONFIG: Record<TimelineType, { dot: string; badge: string; bullet: string }> = {
  Education: {
    dot:    'bg-violet-500 ring-violet-200 dark:ring-violet-800',
    badge:  'bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300',
    bullet: 'bg-violet-500',
  },
  Internship: {
    dot:    'bg-sky-500 ring-sky-200 dark:ring-sky-800',
    badge:  'bg-sky-100 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300',
    bullet: 'bg-sky-500',
  },
  Capgemini: {
    dot:    'bg-emerald-500 ring-emerald-200 dark:ring-emerald-800',
    badge:  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
    bullet: 'bg-emerald-500',
  },
}
