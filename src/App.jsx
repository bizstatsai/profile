import { lazy, Suspense } from 'react'
import Header from './components/layout/Header'
import SectionContainer from './components/layout/SectionContainer'
import HeroSection from './components/hero/HeroSection'
import ConceptSection from './sections/ConceptSection'
import PhilosophySection from './sections/PhilosophySection'

const ArchitectureSection = lazy(() => import('./sections/ArchitectureSection'))
const DataIntelligenceSection = lazy(() => import('./sections/DataIntelligenceSection'))
const AISection = lazy(() => import('./sections/AISection'))
const ExperienceTimeline = lazy(() => import('./components/timeline/ExperienceTimeline'))
const ProjectShowcase = lazy(() => import('./components/projects/ProjectShowcase'))
const PublicationLibrary = lazy(() => import('./components/publications/PublicationLibrary'))
const CredentialsSection = lazy(() => import('./components/credentials/CredentialsSection'))
const PrinciplesSection = lazy(() => import('./sections/PrinciplesSection'))
const ContactSection = lazy(() => import('./sections/ContactSection'))
const SiteArchive = lazy(() => import('./sections/SiteArchive'))
const Footer = lazy(() => import('./components/layout/Footer'))

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main-content">
        <HeroSection />
        <div className="story">
          <div className="through-line" aria-hidden="true"><span /></div>
          <ConceptSection />
          <SectionContainer id="philosophy" nav="philosophy" band>
            <PhilosophySection />
          </SectionContainer>
          <SectionContainer id="architecture" nav="architecture">
            <ArchitectureSection />
          </SectionContainer>
          <SectionContainer id="data-journey" nav="ai-data" band>
            <DataIntelligenceSection />
          </SectionContainer>
          <SectionContainer id="ai" nav="ai-data">
            <AISection />
          </SectionContainer>
          <SectionContainer id="journey" nav="journey" band>
            <ExperienceTimeline />
          </SectionContainer>
          <SectionContainer id="projects" nav="projects">
            <ProjectShowcase />
          </SectionContainer>
          <SectionContainer id="publications" nav="publications" band>
            <PublicationLibrary />
          </SectionContainer>
          <SectionContainer id="recognition" nav="publications">
            <CredentialsSection />
          </SectionContainer>
          <SectionContainer id="principles" nav="publications" band>
            <PrinciplesSection />
          </SectionContainer>
          <SectionContainer id="contact" nav="contact">
            <ContactSection />
          </SectionContainer>
        </div>
      </main>
      <Suspense fallback={null}>
        <SiteArchive />
        <Footer />
      </Suspense>
    </>
  )
}
