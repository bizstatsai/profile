import { useState } from 'react'
import { aiSection, maturityPyramid } from '../data/narrative'
import { aiChapters } from '../data/architecturePatterns'
import { SectionHead } from '../components/layout/SectionContainer'
import ArchitectureShowcase from '../components/architecture/ArchitectureShowcase'

const planePath = (cx, cy, a, b) => `M${cx - a} ${cy}L${cx} ${cy - b}L${cx + a} ${cy}L${cx} ${cy + b}Z`

/** The hero's exploded planes return, now labelled and open to exploration. */
function LayerFigure({ layers, active, onSelect }) {
  const W = 460
  const gap = 66
  const a = 190
  const b = 88
  const bottom = 342
  return (
    <svg className="layer-figure" viewBox={`0 0 ${W} 440`} aria-hidden="true">
      {layers.map((layer, i) => {
        const y = bottom - i * gap
        const on = i === active
        return (
          <g
            key={layer.id}
            className={`layer-figure__plane ${on ? 'is-active' : ''}`}
            data-cat={layer.cat}
            onClick={() => onSelect(i)}
            style={{ transform: on ? 'translateX(-14px)' : undefined }}
          >
            <path className="layer-figure__fill" d={planePath(W / 2 - 16, y, a, b)} />
            <path className="layer-figure__grid" d={`M${W / 2 - 16 - a / 2} ${y - b / 2}L${W / 2 - 16 + a / 2} ${y + b / 2}M${W / 2 - 16 + a / 2} ${y - b / 2}L${W / 2 - 16 - a / 2} ${y + b / 2}`} />
          </g>
        )
      })}
      <path className="layer-figure__riser" d={`M${W / 2 - 16} ${bottom}V${bottom - gap * 4}`} />
    </svg>
  )
}

function IntelligenceLayers() {
  const { layers } = aiSection
  const [active, setActive] = useState(2)
  const ordered = layers.map((layer, i) => ({ layer, i })).reverse()
  return (
    <div className="ai-layers">
      <LayerFigure layers={layers} active={active} onSelect={setActive} />
      <div className="ai-layers__list">
        <p className="tech ai-layers__order">
          {layers.map(l => l.name).join(', then ')}
        </p>
        <ol reversed>
          {ordered.map(({ layer, i }) => (
            <li key={layer.id} data-cat={layer.cat} className={i === active ? 'is-active' : ''}>
              <button type="button" aria-expanded={i === active} onClick={() => setActive(i)}>
                <span className="tech" aria-hidden="true">L{i + 1}</span>
                {layer.name}
              </button>
              <div className="ai-layers__detail" hidden={i !== active}>
                <p>{layer.summary}</p>
                <ul className="tag-list">{layer.topics.map(t => <li key={t}>{t}</li>)}</ul>
                {layer.plate && <a className="link-out" href={`#plate-${layer.plate}`}>See it drawn: {layer.plateLabel}</a>}
                {layer.link && <a className="link-out" href={layer.link}>{layer.linkLabel}</a>}
                {layer.faq && <a className="link-out" href="#ask">Read: {layer.faq}</a>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function MaturityFigure() {
  const { levels } = maturityPyramid
  const [active, setActive] = useState(4)
  const W = 620
  const H = 400
  const top = 16
  const tier = (H - top - 16) / levels.length
  const half = (y) => ((y - top) / (H - top - 16)) * 230
  const cx = 240
  const shown = levels.find(l => l.level === active)
  return (
    <div className="pyramid">
      <svg className="pyramid__svg" viewBox={`0 0 ${W} ${H}`} role="group" aria-label={maturityPyramid.title}>
        {levels.map((l, i) => {
          const y0 = top + i * tier
          const y1 = y0 + tier - 5
          const d = `M${cx - half(y0)} ${y0}L${cx + half(y0)} ${y0}L${cx + half(y1)} ${y1}L${cx - half(y1)} ${y1}Z`
          return (
            <g
              key={l.level}
              className={`pyramid__tier ${active === l.level ? 'is-active' : ''}`}
              data-cat={l.cat}
              role="button"
              tabIndex={0}
              aria-pressed={active === l.level}
              aria-label={`${l.level} ${l.name}`}
              onClick={() => setActive(active === l.level ? null : l.level)}
              onMouseEnter={() => setActive(l.level)}
              onFocus={() => setActive(l.level)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActive(active === l.level ? null : l.level)
                }
              }}
            >
              <path d={d} />
              <text x={cx} y={(y0 + y1) / 2 + 5} textAnchor="middle" className="pyramid__num">{l.level} </text>
              <path className="pyramid__leader" d={`M${cx + half((y0 + y1) / 2) + 4} ${(y0 + y1) / 2}H492`} />
              <text x={W - 122} y={(y0 + y1) / 2 + 4} className="pyramid__name">
                {l.name.split(' ').length > 2
                  ? l.name.split(' ').map((w, n, all) => (n % 2 === 0 ? <tspan key={w} x={W - 122} dy={n ? 14 : (all.length > 2 ? -6 : 0)}>{all.slice(n, n + 2).join(' ')} </tspan> : null))
                  : l.name}
              </text>
            </g>
          )
        })}
      </svg>
      <div className="pyramid__text" aria-live="polite">
        {shown ? (
          <>
            <p className="tech">Level {shown.level}</p>
            <h4>{shown.name}</h4>
            <p>{shown.description}</p>
          </>
        ) : (
          <p className="pyramid__hint">Choose a level to read what it looks like in practice.</p>
        )}
      </div>
      <dl className="pyramid__all">
        {levels.map(l => (
          <div key={l.level}>
            <dt><span className="tech">{l.level}</span> {l.name}</dt>
            <dd>{l.description}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export default function AISection() {
  return (
    <>
      <SectionHead n="05" label={aiSection.label} headline={aiSection.headline} lead={aiSection.lead} />
      <p className="concept-note tech">{aiSection.note}</p>
      <IntelligenceLayers />
      <div className="ai-practice">
        <h3>AI and MLOps platform design</h3>
        <p>{aiSection.practice}</p>
      </div>
      <ArchitectureShowcase chapters={aiChapters} sectionNumber="5" label="AI drawings" />
      <div className="ai-maturity">
        <div>
          <h3>{maturityPyramid.title}</h3>
          <p>{maturityPyramid.description}</p>
        </div>
        <MaturityFigure />
      </div>
    </>
  )
}
