export const SITE = {
  name: 'Sreenidhii',
  tagline: 'Full-Stack Developer · AI-First Builder',
  url: 'https://sreenidhii.dev',
  description:
    'Full-Stack Developer & AI-First Builder specialising in Gen AI, RAG pipelines, and multi-agent systems.',
  email: 'sreenidhi202505@gmail.com',
  github: 'https://github.com/Sreenidhi203',
  linkedin: 'https://linkedin.com/in/sree-n-04b590348',
  resume: 'https://drive.google.com/file/d/your-resume-id/view',
} as const

/** True only when a real resume URL has been configured */
export const HAS_RESUME = !SITE.resume.includes('your-resume-id')

export const BIO = [
  'I build full-stack web applications with an AI-first approach — from Gen AI and RAG pipelines to multi-agent systems. I turn complex ideas into production-ready solutions.',
  "I'm a Computer Science student at Institute of Aeronautical Engineering (2021–2025), joining Capgemini as a Software Engineer in September 2025.",
  "I believe in learning by building. Every project I take on is an opportunity to push boundaries — whether it's integrating LLMs into real workflows or crafting intuitive user experiences.",
  "I'm driven by curiosity and a bias toward shipping.",
] as const

export const HERO_STATS = [
  { value: 10, suffix: '+', label: 'Projects Shipped' },
  { value: 3, suffix: '', label: 'Cloud Certs' },
  { value: 20, suffix: '+', label: 'Technologies' },
  { value: 5, suffix: '+', label: 'AI Agents Built' },
] as const

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
] as const

export const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1)) as [
  'about',
  'skills',
  'experience',
  'projects',
  'certifications',
  'contact',
]

export const FOOTER_LINKS = [
  {
    heading: 'Navigate',
    links: NAV_LINKS.map(({ label, href }) => ({ label, href })),
  },
  {
    heading: 'Connect',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/Sreenidhi203',
        external: true,
      },
      {
        label: 'LinkedIn',
        href: 'https://linkedin.com/in/sree-n-04b590348',
        external: true,
      },
      {
        label: 'Email',
        href: 'mailto:sreenidhi202505@gmail.com',
        external: true,
      },
    ],
  },
] as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const
