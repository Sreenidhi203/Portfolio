import {
  Code2, Coffee, Music, BookOpen, Rocket, MapPin,
} from 'lucide-react'
import type { ComponentType } from 'react'

export interface EducationEntry {
  id: string
  degree: string
  school: string
  year: string
  grade: string
}

export interface InterestEntry {
  id: string
  label: string
  icon: ComponentType<{ size?: number; className?: string; 'aria-hidden'?: boolean | 'true' }>
}

export const education: EducationEntry[] = [
  {
    id: 'edu-btech',
    degree: 'B.Tech in Computer Science',
    school: 'Sreenidhi Institute of Science & Technology',
    year: '2021 – 2025',
    grade: 'CGPA: 8.2 / 10',
  },
  {
    id: 'edu-hsc',
    degree: 'Higher Secondary (MPC)',
    school: 'Narayana Junior College',
    year: '2016 – 2018',
    grade: 'Score: 96.4%',
  },
]

export const interests: InterestEntry[] = [
  { id: 'opensource',   label: 'Open Source',   icon: Code2 },
  { id: 'coffee',       label: 'Coffee & Code', icon: Coffee },
  { id: 'music',        label: 'Music',         icon: Music },
  { id: 'reading',      label: 'Reading',       icon: BookOpen },
  { id: 'travel',       label: 'Travel',        icon: MapPin },
  { id: 'sideprojects', label: 'Side Projects', icon: Rocket },
]
