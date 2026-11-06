import { useEffect, useRef, useState } from 'react'
import { diagrams, STATUS } from '../../data/architectureDiagrams'
import { architecturePatterns } from '../../data/architecturePatterns'
import DiagramCard from './DiagramCard'
import DiagramThumb from './DiagramThumb'

const titleOf = (slug) => architecturePatterns.find(p => p.slug === slug)?.title ?? slug

/** A hash such as #plate-lakehouse/CAT opens that plate and selects that component. */
const readHash = () => {
  if (typeof window === 'undefined') return null
  const match = window.location.hash.match(/^#plate-([\w-]+)(?:\/(.+))?$/)
  return match ? { slug: match[1], node: match[2] ? decodeURIComponent(match[2]) : null } : null
}

function PlateFacts({ plate }) {
  if (!plate.forces) return null
  return (
    <dl className="plate__facts">
      <div>
        <dt>Forces</dt>
        <dd>{plate.forces}</dd>
      </div>
      <div>
        <dt>Solution</dt>
        <dd>{plate.description}</dd>
      </div>
      <div>
        <dt>Consequences</dt>
        <dd>{plate.consequences}</dd>
      </div>
      <div>
        <dt>Known uses</dt>
        <dd>
          <ul>{plate.knownUses.map(use => <li key={use}>{use}</li>)}</ul>
        </dd>
      </div>
      <div>
        <dt>Related patterns</dt>
        <dd>
          <ul className="plate__related">
            {plate.related.map(slug => <li key={slug}><a href={`#plate-${slug}`}>{titleOf(slug)}</a></li>)}
          </ul>
        </dd>
      </div>
      <div>
        <dt>Typical stack</dt>
        <dd>
          <ul className="tag-list">{plate.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        </dd>
      </div>
    </dl>
  )
}

function Plate({ plate, number, active, node }) {
  const diagram = diagrams[plate.diagram]
  return (
    <article id={`plate-${plate.slug}`} className="plate" hidden={!active} aria-labelledby={`plate-${plate.slug}-title`}>
      <header className="plate__head">
        <h3 id={`plate-${plate.slug}-title`}>{plate.title}</h3>
        <p className="plate__intent">{plate.intent}</p>
        <p className="plate__status tech">{STATUS[diagram.status].note}</p>
      </header>
      {active
        ? <DiagramCard diagram={diagram} plate={`Plate ${number}`} initialNode={node} />
        : diagram.render && <noscript><img src={`diagrams/${diagram.render}.svg`} alt={diagram.title} className="ac-noscript-img" loading="lazy" /></noscript>}
      <p className="plate__source tech">
        Drawn from its source: <a href={diagram.source} target="_blank" rel="noopener noreferrer">view the Mermaid file</a>
      </p>
      <PlateFacts plate={plate} />
    </article>
  )
}

export default function ArchitectureShowcase({ chapters, sectionNumber, label }) {
  const all = chapters.flatMap(c => c.plates.map(p => ({ ...p, chapter: c.id })))
  const [chapterId, setChapterId] = useState(chapters[0].id)
  const [slug, setSlug] = useState(chapters[0].plates[0].slug)
  const [node, setNode] = useState(null)
  const [arrival, setArrival] = useState(null)
  const root = useRef(null)

  useEffect(() => {
    const onHash = (event) => {
      const target = readHash()
      if (!target) return
      const plate = all.find(p => p.slug === target.slug)
      if (!plate) return
      setChapterId(plate.chapter)
      setSlug(plate.slug)
      setNode(target.node)
      setArrival({ slug: plate.slug, onLoad: !event })
    }
    onHash()
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
    // The list of plates is fixed for the life of the page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // A plate is hidden until its state commits, so the move to it has to wait for the commit.
  useEffect(() => {
    if (!arrival) return
    document.getElementById(`plate-${arrival.slug}`)?.scrollIntoView({
      block: 'start',
      behavior: arrival.onLoad ? 'instant' : 'auto',
    })
  }, [arrival])

  const chapter = chapters.find(c => c.id === chapterId)
  const plateNumber = (s) => `${sectionNumber}.${all.findIndex(p => p.slug === s) + 1}`

  const openChapter = (c) => {
    setChapterId(c.id)
    setSlug(c.plates[0].slug)
    setNode(null)
  }

  const onTabKey = (e, index) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = chapters[(index + dir + chapters.length) % chapters.length]
    openChapter(next)
    root.current?.querySelector(`[data-chapter="${next.id}"]`)?.focus()
  }

  return (
    <div ref={root} className="atlas">
      {chapters.length > 1 && (
        <div className="atlas__tabs" role="tablist" aria-label={label}>
          {chapters.map((c, i) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              id={`tab-${c.id}`}
              data-chapter={c.id}
              aria-selected={c.id === chapterId}
              aria-controls={`panel-${c.id}`}
              tabIndex={c.id === chapterId ? 0 : -1}
              onClick={() => openChapter(c)}
              onKeyDown={e => onTabKey(e, i)}
            >
              <span className="tech" aria-hidden="true">{sectionNumber}.{String.fromCharCode(65 + i)}</span>
              {c.title}
            </button>
          ))}
        </div>
      )}

      {chapters.map(c => (
        <div
          key={c.id}
          id={`panel-${c.id}`}
          role={chapters.length > 1 ? 'tabpanel' : undefined}
          aria-labelledby={chapters.length > 1 ? `tab-${c.id}` : undefined}
          hidden={c.id !== chapter.id}
          className="atlas__panel"
        >
          {c.narrative && (
            <div className={`atlas__narrative atlas__narrative--${c.narrative.length}`}>
              {c.narrative.map(block => (
                <div key={block.heading}>
                  <h3>{block.heading}</h3>
                  <p>{block.text}</p>
                </div>
              ))}
            </div>
          )}

          <ul className="atlas__strip" aria-label={`Drawings in ${c.title}`}>
            {c.plates.map(p => (
              <li key={p.slug}>
                <a
                  href={`#plate-${p.slug}`}
                  className={p.slug === slug ? 'is-active' : ''}
                  aria-current={p.slug === slug ? 'true' : undefined}
                  onClick={(e) => {
                    e.preventDefault()
                    setChapterId(c.id)
                    setSlug(p.slug)
                    setNode(null)
                    window.history.replaceState(null, '', `#plate-${p.slug}`)
                  }}
                >
                  <DiagramThumb diagram={diagrams[p.diagram]} />
                  <span className="tech">Plate {plateNumber(p.slug)}</span>
                  <span className="atlas__strip-title">{p.title}</span>
                </a>
              </li>
            ))}
          </ul>

          {c.plates.map(p => (
            <Plate
              key={p.slug}
              plate={p}
              number={plateNumber(p.slug)}
              active={p.slug === slug && c.id === chapter.id}
              node={p.slug === slug ? node : null}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
