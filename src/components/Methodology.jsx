import { methodology } from '../data/profile'
import ScrollReveal from './ScrollReveal'
import '../App.css'

export default function Methodology() {
  return (
    <section id="methodology" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">{methodology.name}</h2>
          <p className="section-subtitle">{methodology.tagline}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '0.95rem',
            lineHeight: 1.8,
            maxWidth: '800px',
            marginBottom: '48px',
          }}>
            {methodology.description}
          </p>
        </ScrollReveal>

        {/* Intelligence Stack visualization */}
        <ScrollReveal delay={0.15}>
          <div style={{ marginBottom: '48px', maxWidth: '700px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '20px', color: 'var(--text-primary)' }}>
              The Intelligence Stack
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {methodology.layers.map((layer, i) => (
                <div key={layer.name} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '14px 20px',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderLeft: `4px solid ${layer.color}`,
                  borderRadius: '6px',
                }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    color: layer.color,
                    minWidth: '70px',
                  }}>
                    {layer.name}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {layer.description}
                  </span>
                </div>
              ))}
            </div>
            <p style={{
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              fontFamily: "'JetBrains Mono', monospace",
              marginTop: '12px',
              textAlign: 'center',
            }}>
              &#8593; Data flows up &middot; Governance flows down &#8595;
            </p>
          </div>
        </ScrollReveal>

        {/* 6 Principles */}
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '20px', color: 'var(--text-primary)' }}>
          Six Principles
        </h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: '20px',
        }}>
          {methodology.principles.map((p, i) => (
            <ScrollReveal key={i} delay={i * 0.06}>
              <div className="card" style={{ height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                  <span style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    flexShrink: 0,
                  }}>
                    {p.icon}
                  </span>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '6px' }}>
                      {p.title}
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7 }}>
                      {p.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
