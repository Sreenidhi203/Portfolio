import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss,
  SiHtml5, SiCss, SiRedux, SiVite, SiFramer,
  SiNodedotjs, SiExpress, SiGraphql, SiNestjs, SiFastapi,
  SiMongodb, SiPostgresql, SiMysql, SiRedis, SiFirebase,
  SiPython, SiCplusplus, SiGo,
  SiGooglecloud, SiVercel, SiNetlify, SiRender,
  SiDocker, SiKubernetes, SiGit, SiGithubactions, SiJenkins,
  SiTensorflow, SiPytorch, SiAnthropic, SiLangchain, SiHuggingface,
  SiGithub, SiFigma, SiPostman, SiJira, SiLinux,
} from 'react-icons/si'
import { Cloud, Cpu, Layers, Database } from 'lucide-react'
import type { SkillCategory } from '@/types'

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'React',         icon: SiReact,       level: 'Expert',       color: '#61DAFB', description: 'Hooks, context, performance patterns & ecosystem' },
      { name: 'TypeScript',    icon: SiTypescript,  level: 'Expert',       color: '#3178C6', description: 'Advanced types, generics & strict mode' },
      { name: 'Next.js',       icon: SiNextdotjs,   level: 'Advanced',     color: '#a3a3a3', description: 'App router, SSR, ISR & edge functions' },
      { name: 'Tailwind CSS',  icon: SiTailwindcss, level: 'Expert',       color: '#06B6D4', description: 'Utility-first styling & design systems' },
      { name: 'JavaScript',    icon: SiJavascript,  level: 'Expert',       color: '#F7DF1E', description: 'ES2024+, async patterns & runtime APIs' },
      { name: 'Redux',         icon: SiRedux,       level: 'Advanced',     color: '#764ABC', description: 'RTK, slices, thunks & middleware' },
      { name: 'Framer Motion', icon: SiFramer,      level: 'Advanced',     color: '#6366f1', description: 'Animations, gestures & layout transitions' },
      { name: 'Vite',          icon: SiVite,        level: 'Advanced',     color: '#646CFF', description: 'Build tooling, plugins & optimisation' },
      { name: 'HTML5',         icon: SiHtml5,       level: 'Expert',       color: '#E34F26', description: 'Semantic markup & accessibility' },
      { name: 'CSS3',          icon: SiCss,         level: 'Expert',       color: '#1572B6', description: 'Grid, flexbox, animations & custom properties' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, level: 'Expert',       color: '#339933', description: 'REST APIs, streams & event-driven architecture' },
      { name: 'Express', icon: SiExpress,   level: 'Expert',       color: '#a3a3a3', description: 'Middleware, routing & API design patterns' },
      { name: 'NestJS',  icon: SiNestjs,    level: 'Advanced',     color: '#E0234E', description: 'Modular architecture, guards & interceptors' },
      { name: 'GraphQL', icon: SiGraphql,   level: 'Advanced',     color: '#E10098', description: 'Schema design, resolvers & Apollo Server' },
      { name: 'FastAPI', icon: SiFastapi,   level: 'Intermediate', color: '#009688', description: 'Python async APIs with auto-generated docs' },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    skills: [
      { name: 'MongoDB',    icon: SiMongodb,    level: 'Advanced',     color: '#47A248', description: 'Aggregation pipelines, indexing & Atlas' },
      { name: 'PostgreSQL', icon: SiPostgresql, level: 'Advanced',     color: '#4169E1', description: 'Complex queries, transactions & optimisation' },
      { name: 'MySQL',      icon: SiMysql,      level: 'Advanced',     color: '#4479A1', description: 'Schema design, stored procedures & replication' },
      { name: 'Redis',      icon: SiRedis,      level: 'Intermediate', color: '#DC382D', description: 'Caching, pub/sub & session management' },
      { name: 'Firebase',   icon: SiFirebase,   level: 'Advanced',     color: '#FFCA28', description: 'Firestore, Auth, Storage & Realtime DB' },
    ],
  },
  {
    id: 'salesforce',
    label: 'Salesforce',
    skills: [
      { name: 'Salesforce',   icon: Layers,   level: 'Advanced',     color: '#00A1E0', description: 'CRM platform, automation & app builder' },
      { name: 'Apex',         icon: Database, level: 'Advanced',     color: '#00A1E0', description: 'Server-side logic, triggers & batch jobs' },
      { name: 'LWC',          icon: Layers,   level: 'Advanced',     color: '#00A1E0', description: 'Lightning Web Components & Aura framework' },
      { name: 'SOQL / SOSL',  icon: Database, level: 'Advanced',     color: '#00A1E0', description: 'Salesforce query & search languages' },
      { name: 'Flow Builder', icon: Layers,   level: 'Intermediate', color: '#00A1E0', description: 'Declarative automation & process builder' },
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    skills: [
      { name: 'Python', icon: SiPython,    level: 'Advanced',     color: '#3776AB', description: 'Scripting, data processing & ML pipelines' },
      { name: 'Java',   icon: Cpu,         level: 'Intermediate', color: '#f97316', description: 'OOP, Spring Boot & enterprise patterns' },
      { name: 'C++',    icon: SiCplusplus, level: 'Intermediate', color: '#00599C', description: 'Data structures, algorithms & competitive programming' },
      { name: 'Go',     icon: SiGo,        level: 'Beginner',     color: '#00ADD8', description: 'Concurrent services & CLI tooling' },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    skills: [
      { name: 'AWS',     icon: Cloud,         level: 'Intermediate', color: '#FF9900', description: 'EC2, S3, Lambda, RDS & CloudFront' },
      { name: 'GCP',     icon: SiGooglecloud, level: 'Beginner',     color: '#4285F4', description: 'Cloud Run, BigQuery & Firebase hosting' },
      { name: 'Vercel',  icon: SiVercel,      level: 'Advanced',     color: '#a3a3a3', description: 'Edge deployments, preview envs & analytics' },
      { name: 'Netlify', icon: SiNetlify,     level: 'Advanced',     color: '#00C7B7', description: 'JAMstack deployments & serverless functions' },
      { name: 'Render',  icon: SiRender,      level: 'Advanced',     color: '#46E3B7', description: 'Zero-config deployments & background workers' },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps',
    skills: [
      { name: 'Docker',         icon: SiDocker,        level: 'Advanced',     color: '#2496ED', description: 'Containerisation, compose & multi-stage builds' },
      { name: 'Kubernetes',     icon: SiKubernetes,    level: 'Beginner',     color: '#326CE5', description: 'Orchestration, pods, services & Helm charts' },
      { name: 'Git',            icon: SiGit,           level: 'Expert',       color: '#F05032', description: 'Branching strategies, rebasing & workflows' },
      { name: 'GitHub Actions', icon: SiGithubactions, level: 'Advanced',     color: '#2088FF', description: 'CI/CD pipelines, matrix builds & secrets' },
      { name: 'Jenkins',        icon: SiJenkins,       level: 'Intermediate', color: '#D24939', description: 'Pipeline as code & automated deployments' },
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    skills: [
      { name: 'OpenAI API',   icon: Database,      level: 'Advanced',     color: '#10a37f', description: 'GPT-4, embeddings, function calling & fine-tuning' },
      { name: 'LangChain',    icon: SiLangchain,   level: 'Advanced',     color: '#4ade80', description: 'LLM chains, agents, RAG & vector stores' },
      { name: 'TensorFlow',   icon: SiTensorflow,  level: 'Intermediate', color: '#FF6F00', description: 'Neural networks, Keras & model deployment' },
      { name: 'PyTorch',      icon: SiPytorch,     level: 'Intermediate', color: '#EE4C2C', description: 'Custom models, training loops & ONNX export' },
      { name: 'Hugging Face', icon: SiHuggingface, level: 'Intermediate', color: '#FFD21E', description: 'Transformers, datasets & model hub' },
      { name: 'Anthropic',    icon: SiAnthropic,   level: 'Intermediate', color: '#d97706', description: 'Claude API, prompt engineering & safety' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    skills: [
      { name: 'GitHub',  icon: SiGithub,  level: 'Expert',   color: '#a3a3a3', description: 'Repos, PRs, code review & project boards' },
      { name: 'Figma',   icon: SiFigma,   level: 'Advanced', color: '#F24E1E', description: 'UI design, prototyping & design tokens' },
      { name: 'Postman', icon: SiPostman, level: 'Expert',   color: '#FF6C37', description: 'API testing, collections & mock servers' },
      { name: 'Jira',    icon: SiJira,    level: 'Advanced', color: '#0052CC', description: 'Agile boards, sprints & project tracking' },
      { name: 'Linux',   icon: SiLinux,   level: 'Advanced', color: '#FCC624', description: 'Shell scripting, system admin & server config' },
    ],
  },
]
