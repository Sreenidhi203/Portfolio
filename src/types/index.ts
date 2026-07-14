import type { IconType } from 'react-icons'

export interface Project {
  id: string
  title: string
  description: string
  tags: string[] // used for filtering
  stack: string[] // full tech stack display
  features: string[]
  href: string // GitHub
  liveHref?: string // Live demo
  image: string // image URL or gradient fallback key
  featured?: boolean // flagship project
  impact?: string // one-line impact metric
  category?: string // e.g. 'AI / ML', 'Full-Stack'
}

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'

export interface Skill {
  name: string
  icon: IconType
  level: SkillLevel
  description: string
  color: string
  featured?: boolean
}

export interface Certification {
  id: string
  title: string
  org: string
  issued: string // e.g. 'Mar 2024'
  credentialUrl: string
  color: string // accent color key
  abbr: string // 2-3 letter logo fallback
  skills?: string[] // skills validated by cert
}

export interface SkillCategory {
  id: string
  label: string
  skills: Skill[]
}
