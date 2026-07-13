export const SITE = {
  name: 'Sreenidhi',
  tagline: 'Full-Stack Developer',
  url: 'https://sreenidhi.dev',
  description: 'Full-Stack Developer specialising in React, TypeScript & Node.js.',
  email: 'hello@sreenidhi.dev',
  github: 'https://github.com/sreenidhi',
  linkedin: 'https://linkedin.com/in/sreenidhi',
  twitter: 'https://twitter.com/sreenidhi',
} as const

export const BIO = [
  'I craft fast, accessible, and pixel-perfect digital experiences. Passionate about clean architecture, thoughtful UI, and shipping products that make a real difference.',
  'I\'m a Computer Science student at Sreenidhi Institute of Science & Technology (2021–2025), joining Capgemini as an Associate Software Engineer in August 2025. I specialise in React, TypeScript, and Node.js ecosystems.',
  'I\'ve shipped 20+ personal and academic projects, contributed to open-source, and developed a deep appreciation for clean code, thoughtful design systems, and developer experience.',
  'I believe great software is built at the intersection of engineering rigour and design empathy — and I bring both to every project I work on.',
] as const

export const NAV_LINKS = [
  { label: 'About',          href: '#about' },
  { label: 'Skills',         href: '#skills' },
  { label: 'Experience',     href: '#experience' },
  { label: 'Projects',       href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact',        href: '#contact' },
] as const

export const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1)) as [
  'about', 'skills', 'experience', 'projects', 'certifications', 'contact'
]

export const FOOTER_LINKS = [
  {
    heading: 'Navigate',
    links: NAV_LINKS.map(({ label, href }) => ({ label, href })),
  },
  {
    heading: 'Connect',
    links: [
      { label: 'GitHub',      href: 'https://github.com/sreenidhi',         external: true },
      { label: 'LinkedIn',    href: 'https://linkedin.com/in/sreenidhi',    external: true },
      { label: 'Twitter / X', href: 'https://twitter.com/sreenidhi',        external: true },
      { label: 'Email',       href: 'mailto:hello@sreenidhi.dev',           external: true },
    ],
  },
] as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const
