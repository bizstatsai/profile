import { Suspense, createContext, useContext } from 'react'
import DrawIn from '../animations/ScrollReveal'

const SectionTitle = createContext(undefined)

/** Sentence-by-sentence headline. The closing sentence is the point, so it reads brightest. */
export function Headline({ text, as: Tag = 'h2', className = '', id }) {
  const parts = Array.isArray(text) ? text : [text]
  return (
    <DrawIn as={Tag} id={id} className={`headline ${className}`}>
      {parts.map((part, i) => (
        <span key={part} className={i < parts.length - 1 ? 'headline__setup' : 'headline__point'}>
          {part}{i < parts.length - 1 ? ' ' : ''}
        </span>
      ))}
    </DrawIn>
  )
}

export function SectionHead({ n, label, headline, lead, children }) {
  const titleId = useContext(SectionTitle)
  return (
    <header className="section-head">
      <p className="section-marker tech">
        <span className="section-marker__n">{n}</span>
        <span>{label}</span>
      </p>
      <Headline text={headline} id={titleId} />
      {lead && <p className="lead section-head__lead">{lead}</p>}
      {children}
    </header>
  )
}

/**
 * The stable outer shell of a section. It stays mounted while its content loads, so
 * in-page links and the active-section tracking always have something to find.
 */
export default function SectionContainer({ id, nav, band, children, minHeight = 600 }) {
  const titleId = `${id}-title`
  return (
    <section id={id} data-nav={nav} className={`section ${band ? 'section--band' : ''}`} aria-labelledby={titleId}>
      <div className="sheet">
        <SectionTitle.Provider value={titleId}>
          <Suspense fallback={<div style={{ minHeight }} />}>
            {children}
          </Suspense>
        </SectionTitle.Provider>
      </div>
    </section>
  )
}
