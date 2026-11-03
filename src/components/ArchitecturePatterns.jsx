import { useState } from 'react'
import { architecturePatterns } from '../data/profile'
import ScrollReveal from './ScrollReveal'
import '../App.css'

const LAYERS = ['All', 'Data platform', 'AI & agents', 'Platform & operations']

export default function ArchitecturePatterns() {
  const [layer, setLayer] = useState('All')
  const [open, setOpen] = useState(architecturePatterns[0].slug)
  const visible = architecturePatterns.filter(p => layer === 'All' || p.layer === layer)
  const current = architecturePatterns.find(p => p.slug === open) || visible[0]
  const bySlug = Object.fromEntries(architecturePatterns.map(p => [p.slug, p]))

  return (
    <section id="patterns" className="section">
      <div className="container">
        <ScrollReveal>
          <div className="sheet-label">Sheet 03 · Patterns library</div>
          <h2 className="section-title">Architecture patterns, in the pattern-language form</h2>
          <p className="section-subtitle">
            Intent, forces, solution, consequences and known uses for each. Every diagram is rendered from a Mermaid source in this site's repository; known uses name public products or anonymised engagements only.
          </p>
        </ScrollReveal>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '22px' }} role="group" aria-label="Filter patterns by layer">
          {LAYERS.map(l => (
            <button
              key={l}
              aria-pressed={layer === l}
              onClick={() => { setLayer(l); const first = architecturePatterns.find(p => l === 'All' || p.layer === l); if (first) setOpen(first.slug) }}
              className={`btn ${layer === l ? 'btn-primary' : 'btn-outline'}`}
              style={{ padding: '6px 14px', fontSize: '0.8rem' }}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="patterns-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(220px, 300px) minmax(0, 1fr)', gap: '24px', alignItems: 'start' }}>
          <div style={{ display: 'grid', gap: '6px' }} role="group" aria-label="Patterns">
            {visible.map(p => (
              <button
                key={p.slug}
                onClick={() => setOpen(p.slug)}
                aria-pressed={current.slug === p.slug}
                style={{
                  textAlign: 'left',
                  background: current.slug === p.slug ? 'var(--surface-2)' : 'transparent',
                  border: '1px solid',
                  borderColor: current.slug === p.slug ? 'var(--accent)' : 'var(--rule)',
                  borderRadius: '6px',
                  padding: '10px 12px',
                  cursor: 'pointer',
                  color: 'var(--ink)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <div style={{ fontWeight: 600, fontSize: '0.92rem' }}>{p.title}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--ink-3)', marginTop: '3px', letterSpacing: '0.04em' }}>
                  {p.layer.toUpperCase()} · {p.ring.toUpperCase()}
                </div>
              </button>
            ))}
          </div>

          <article className="card" style={{ padding: '26px', minWidth: 0 }} aria-live="polite">
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'baseline', flexWrap: 'wrap', marginBottom: '6px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{current.title}</h3>
              <span className="tag" style={{ color: 'var(--ok)', borderColor: 'var(--ok)' }}>{current.ring}</span>
            </div>
            <p style={{ color: 'var(--ink)', fontSize: '1rem', marginBottom: '18px', maxWidth: '70ch' }}>{current.intent}</p>

            <figure className="figure" style={{ marginBottom: '20px' }}>
              <img
                src={`/diagrams/${current.diagram}.svg`}
                alt={`${current.title}: ${current.intent}`}
                loading="lazy"
              />
              <figcaption>
                <span>{current.layers.join(' → ')}</span>
                <a href={`/diagrams/src/${current.diagram}.mmd`} target="_blank" rel="noopener noreferrer">view Mermaid source</a>
              </figcaption>
            </figure>

            <dl className="dl">
              <dt>Forces</dt><dd>{current.forces}</dd>
              <dt>Solution</dt><dd>{current.description}</dd>
              <dt>Consequences</dt><dd>{current.consequences}</dd>
              <dt>Known uses</dt><dd>{current.knownUses.join(' · ')}</dd>
              <dt>Related</dt>
              <dd style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {current.related.map(slug => bySlug[slug] ? (
                  <button key={slug} onClick={() => { setLayer('All'); setOpen(slug) }} className="tag" style={{ cursor: 'pointer', background: 'transparent', whiteSpace: 'normal', textAlign: 'left', lineHeight: 1.4 }}>
                    {bySlug[slug].title}
                  </button>
                ) : null)}
              </dd>
              <dt>Stack</dt>
              <dd style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {current.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </dd>
            </dl>
          </article>
        </div>
      </div>
      <style>{`
        @media (max-width: 760px) {
          .patterns-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
