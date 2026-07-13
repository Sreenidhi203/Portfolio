import { lazy, Suspense } from 'react'
import HeroSection from './HeroSection'

const AboutSection          = lazy(() => import('./AboutSection'))
const SkillsSection         = lazy(() => import('./SkillsSection'))
const ExperienceSection     = lazy(() => import('./ExperienceSection'))
const ProjectsSection       = lazy(() => import('./ProjectsSection'))
const CertificationsSection = lazy(() => import('./CertificationsSection'))
const ContactSection        = lazy(() => import('./ContactSection'))

// Skeleton placeholder prevents CLS while lazy chunks load
function SectionFallback() {
  return (
    <div className="section container-main" aria-hidden>
      <div className="mb-12 flex flex-col items-center gap-4">
        <div className="h-3 w-24 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="h-8 w-64 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
        <div className="h-4 w-96 max-w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-48 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800" />
        ))}
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<SectionFallback />}>
        <AboutSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <SkillsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ExperienceSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ProjectsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <CertificationsSection />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <ContactSection />
      </Suspense>
    </>
  )
}
