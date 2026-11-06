import { Fragment, useRef, useState } from 'react'
import { diagrams, STATUS } from '../../data/architectureDiagrams'
import { architecturePatterns, architectureChapters, aiChapters } from '../../data/architecturePatterns'
import DiagramCard from './DiagramCard'
import { PlateFacts, PlateRing } from './ArchitectureShowcase'

const LAYERS = [
  { name: 'Data platform', cat: 'storage' },
  { name: 'AI & agents', cat: 'ai' },
  { name: 'Platform & operations', cat: 'process' },
]
const catOf = Object.fromEntries(LAYERS.map(l => [l.name, l.cat]))

// Each pattern keeps the plate number it carries in section 03 or 05, and the catalogue follows that order.
const plates = [
  ...architectureChapters.flatMap(c => c.plates).map((p, i) => [p.slug, `3.${i + 1}`]),
  ...aiChapters.flatMap(c => c.plates).map((p, i) => [p.slug, `5.${i + 1}`]),
]
const plateNo = Object.fromEntries(plates)
const patterns = plates.map(([slug]) => architecturePatterns.find(p => p.slug === slug)).filter(Boolean)

function Diamond() {
  return (
    <svg viewBox="0 0 26 14" width="20" height="11" aria-hidden="true">
      <path d="M13 1 25 7 13 13 1 7Z" />
    </svg>
  )
}

function PatternSheet({ pattern, onRelated }) {
  const diagram = diagrams[pattern.diagram]
  const no = plateNo[pattern.slug]
  return (
    <article id="pattern-sheet" className="catalogue__sheet" aria-labelledby="pattern-sheet-title">
      <header className="plate__head">
        <PlateRing plate={pattern} />
        <h4 id="pattern-sheet-title">{pattern.title}</h4>
        <p className="plate__intent">{pattern.intent}</p>
        <p className="plate__status tech">{STATUS[diagram.status].note}</p>
      </header>
      <DiagramCard key={pattern.slug} diagram={diagram} plate={`Plate ${no}`} />
      <p className="catalogue__flow tech">
        <span>{pattern.layers.join(' → ')}</span>
        <a href={diagram.source} target="_blank" rel="noopener noreferrer">View the Mermaid file</a>
      </p>
      <PlateFacts plate={pattern} onRelated={onRelated} />
      <a className="link-out catalogue__open" href={`#plate-${pattern.slug}`}>
        Open Plate {no} in section 0{no[0]}
      </a>
    </article>
  )
}

/** Every pattern in one register, as the earlier site's library had them: filter by layer, pick one, read its sheet. */
export default function PatternCatalogue() {
  const [layer, setLayer] = useState(null)
  const [slug, setSlug] = useState(patterns[0].slug)
  const root = useRef(null)
  const visible = patterns.filter(p => !layer || p.layer === layer)

  // On a phone the sheet opens under its item, so a sheet closing above can carry the item out of view.
  const open = (next, { focus = false } = {}) => {
    setSlug(next)
    requestAnimationFrame(() => {
      const item = root.current?.querySelector(`[data-slug="${next}"]`)
      item?.scrollIntoView({ block: 'nearest', behavior: 'instant' })
      if (focus) item?.focus({ preventScroll: true })
    })
  }

  const filter = (name) => {
    setLayer(name)
    const kept = patterns.find(p => p.slug === slug)
    if (name && kept.layer !== name) setSlug(patterns.find(p => p.layer === name).slug)
  }

  const related = (target) => {
    setLayer(null)
    open(target, { focus: true })
  }

  return (
    <section ref={root} id="patterns" className="catalogue" aria-labelledby="patterns-title">
      <header className="catalogue__head">
        <div>
          <h3 id="patterns-title">Pattern catalogue</h3>
          <p>
            All ten patterns from sections 03 and 05 in one register. Pick one to load its drawing and its notes.
            Known uses name public products or anonymised engagements only.
          </p>
        </div>
        <div className="catalogue__filter" role="group" aria-label="Filter patterns by layer">
          <button type="button" aria-pressed={!layer} onClick={() => filter(null)}>
            All <span className="tech">{patterns.length}</span>
          </button>
          {LAYERS.map(l => (
            <button key={l.name} type="button" data-cat={l.cat} aria-pressed={layer === l.name} onClick={() => filter(l.name)}>
              {l.name} <span className="tech">{patterns.filter(p => p.layer === l.name).length}</span>
            </button>
          ))}
        </div>
      </header>

      <div className="catalogue__body" style={{ '--rows': visible.length }}>
        {visible.map(p => {
          const isOpen = p.slug === slug
          return (
            <Fragment key={p.slug}>
              <button
                type="button"
                className="catalogue__item"
                data-slug={p.slug}
                data-cat={catOf[p.layer]}
                aria-expanded={isOpen}
                aria-controls={isOpen ? 'pattern-sheet' : undefined}
                onClick={() => open(p.slug)}
              >
                <span className="catalogue__no tech">{plateNo[p.slug]}</span>
                <span className="catalogue__name">{p.title}</span>
                <span className="catalogue__meta tech">
                  <span className="catalogue__layer"><Diamond />{p.layer}</span>
                  {p.ring === 'trial' && <span className="catalogue__trial">Trial</span>}
                </span>
              </button>
              {isOpen && <PatternSheet pattern={p} onRelated={related} />}
            </Fragment>
          )
        })}
      </div>
    </section>
  )
}
