import { techRadar } from '../data/profile'
import ScrollReveal from './ScrollReveal'
import '../App.css'

const ringColors = {
  Adopt: 'var(--success)',
  Trial: 'var(--accent-light)',
  Assess: '#f0a030',
  Hold: '#e05050',
}

export default function TechRadar() {
  return (
    <section id="tech-radar" className="section">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">Technology Radar</h2>
          <p className="section-subtitle">
            Opinionated guidance on enterprise data & AI technologies — based on real-world production experience.
          </p>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))',
          gap: '24px',
        }}>
          {techRadar.map((ring, ri) => (
            <ScrollReveal key={ring.ring} delay={ri * 0.1}>
              <div className="card" style={{ height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: ringColors[ring.ring],
                    display: 'inline-block',
                    flexShrink: 0,
                  }} />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{ring.ring}</h3>
                </div>
                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.82rem',
                  marginBottom: '18px',
                }}>
                  {ring.description}
                </p>

                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {ring.items.map(item => (
                    <li key={item.name}>
                      <div style={{ fontWeight: 500, fontSize: '0.92rem', marginBottom: '2px' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {item.note}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
