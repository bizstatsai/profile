import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'

// Lazy load below-the-fold sections
const Experience = lazy(() => import('./components/Experience'))
const CaseStudies = lazy(() => import('./components/CaseStudies'))
const Products = lazy(() => import('./components/Products'))
const Methodology = lazy(() => import('./components/Methodology'))
const MaturityPyramid = lazy(() => import('./components/MaturityPyramid'))
const Books = lazy(() => import('./components/Books'))
const Skills = lazy(() => import('./components/Skills'))
const TechRadar = lazy(() => import('./components/TechRadar'))
const ArchitecturePatterns = lazy(() => import('./components/ArchitecturePatterns'))
const Services = lazy(() => import('./components/Services'))
const Certifications = lazy(() => import('./components/Certifications'))
const Timeline = lazy(() => import('./components/Timeline'))
const FAQ = lazy(() => import('./components/FAQ'))
const ThoughtLeadership = lazy(() => import('./components/ThoughtLeadership'))
const Speaking = lazy(() => import('./components/Speaking'))
const SpeakerKit = lazy(() => import('./components/SpeakerKit'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function SectionFallback() {
  return (
    <div style={{ minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: '32px',
        height: '32px',
        border: '3px solid var(--border)',
        borderTopColor: 'var(--accent)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3 },
}

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <motion.main id="main-content" {...fadeIn}>
        <Hero />
        <About />
        <Suspense fallback={<SectionFallback />}>
          <Experience />
          <CaseStudies />
          <Products />
          <Methodology />
          <MaturityPyramid />
          <Books />
          <Skills />
          <TechRadar />
          <ArchitecturePatterns />
          <Services />
          <Certifications />
          <Timeline />
          <FAQ />
          <ThoughtLeadership />
          <Speaking />
          <SpeakerKit />
          <Contact />
          <Footer />
        </Suspense>
      </motion.main>
    </>
  )
}
