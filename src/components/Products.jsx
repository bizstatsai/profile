import { products } from '../data/profile'
import ScrollReveal from './ScrollReveal'
import '../App.css'

const STATUS = {
  live: { label: 'Live', color: 'var(--success)' },
  early: { label: 'Early access', color: 'var(--accent-light)' },
  building: { label: 'In development', color: '#f5a623' },
  soon: { label: 'Coming soon', color: 'var(--text-muted)' },
}

function StatusPill({ status }) {
  const s = STATUS[status] || STATUS.soon
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontSize: '0.72rem',
      fontFamily: "'JetBrains Mono', monospace",
      color: s.color,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
    }}>
      <span aria-hidden="true" style={{
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        background: s.color,
        display: 'inline-block',
      }} />
      {s.label}
    </span>
  )
}

export default function Products() {
  const live = products.filter(p => p.status === 'live').length
  return (
    <section id="products" className="section">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">Products I Architect</h2>
          <p className="section-subtitle">
            The BizStats AI product family — {products.length} products, {live} in production, all running on a
            self-hosted Kubernetes platform (Smart MCP) that my team designs, builds and operates.
          </p>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}>
          {products.map((product, i) => (
            <ScrollReveal key={product.name} delay={i * 0.05}>
              <article className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', flexWrap: 'wrap' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{product.name}</h3>
                  <StatusPill status={product.status} />
                </div>
                <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', fontWeight: 500, margin: 0 }}>
                  {product.tagline}
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7, margin: 0, flex: 1 }}>
                  {product.description}
                </p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {product.tags.map(tag => (
                    <span key={tag} className="tag" style={{ fontSize: '0.72rem', padding: '3px 10px' }}>{tag}</span>
                  ))}
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                  marginTop: '6px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border)',
                  fontSize: '0.78rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  color: 'var(--text-muted)',
                }}>
                  <span>Runs on {product.platform}</span>
                  {product.url ? (
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--accent-light)', textDecoration: 'none' }}
                    >
                      {product.url.replace(/^https:\/\/(www\.)?/, '').replace(/\/$/, '')} &rarr;
                    </a>
                  ) : (
                    <span>crm.bizstats.ai (planned)</span>
                  )}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
