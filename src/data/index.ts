import type { Project, Certification } from '@/types'

export const projects: Project[] = [
  {
    id: '7',
    title: 'Portfolio',
    description:
      'Personal developer portfolio built with React 19, TypeScript, Vite, and Tailwind CSS v4 — featuring smooth animations, dark mode, and a fully responsive design.',
    tags: ['React', 'TypeScript'],
    stack: [
      'React 19',
      'TypeScript',
      'Vite 8',
      'Tailwind CSS v4',
      'Framer Motion 12',
      'ESLint',
      'Prettier',
    ],
    features: [
      'Dark / light theme with zero flash on load',
      'Framer Motion page and section animations',
      'Contact form with validation and Formspree',
      'Optimised Vite build with manual chunk splitting',
    ],
    href: 'https://github.com/Sreenidhi203/Portfolio',
    image: 'amber',
  },
  {
    id: '8',
    title: 'Task Manager',
    description:
      'Full-stack task management application with CRUD operations, priority levels, due dates, and a clean responsive UI for organising daily workflows.',
    tags: ['React', 'Node.js'],
    stack: [
      'Java 21',
      'Spring Boot 3.3',
      'Spring Security',
      'JWT',
      'MySQL 8',
      'React 18',
      'TypeScript',
      'Tailwind CSS',
      'Axios',
      'Zod',
    ],
    features: [
      'Create, update, delete and complete tasks',
      'Priority levels and due date tracking',
      'Filter and sort tasks by status or priority',
      'Persistent storage with MongoDB',
    ],
    href: 'https://github.com/Sreenidhi203/Task-Manager',
    image: 'rose',
  },
]

export const certifications: Certification[] = [
  {
    id: '1',
    title: 'Microsoft Certified: Azure AI Engineer Associate',
    org: 'Microsoft',
    issued: 'Mar 2026',
    credentialUrl:
      'https://learn.microsoft.com/en-us/users/me/credentials/9EAE5025DFCB0C7F',
    color: 'sky',
    abbr: 'AI-102',
    skills: [
      'Azure OpenAI',
      'Cognitive Services',
      'Bot Framework',
      'RAG Pipelines',
      'Responsible AI',
    ],
  },
  {
    id: '2',
    title: 'Microsoft Certified: Azure Developer Associate',
    org: 'Microsoft',
    issued: 'Mar 2026',
    credentialUrl:
      'https://learn.microsoft.com/en-us/users/me/credentials/A554B427C7A1F0E6',
    color: 'violet',
    abbr: 'AZ-204',
    skills: [
      'Azure Functions',
      'App Service',
      'Cosmos DB',
      'Azure DevOps',
      'ARM Templates',
    ],
  },
  {
    id: '3',
    title: 'Google Cloud Certified Generative AI Leader',
    org: 'Google Cloud',
    issued: 'Feb 2026',
    credentialUrl: 'https://cloud.google.com/learn/certification',
    color: 'emerald',
    abbr: 'GCP',
    skills: [
      'Vertex AI',
      'Gemini API',
      'Gen AI Strategy',
      'LLM Fine-tuning',
      'MLOps',
    ],
  },
]
