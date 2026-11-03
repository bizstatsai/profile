import { thoughtLeadership } from '../data/profile'
import ScrollReveal from './ScrollReveal'
import '../App.css'

export default function ThoughtLeadership() {
  return (
    <section id="thought-leadership" className="section">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">Thought Leadership</h2>
          <p className="section-subtitle">
            Insights on enterprise data architecture, AI strategy, and cloud patterns — across platforms.
          </p>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: '20px',
        }}>
          {thoughtLeadership.map((item, i) => (
            <ScrollReveal key={item.platform} delay={i * 0.08}>
              <a
                href={item.active ? item.url : undefined}
                target={item.active ? '_blank' : undefined}
                rel={item.active ? 'noopener noreferrer' : undefined}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'block',
                  cursor: item.active ? 'pointer' : 'default',
                }}
              >
                <div className="card" style={{
                  height: '100%',
                  opacity: item.active ? 1 : 0.6,
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <span style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: item.active
                        ? 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))'
                        : 'var(--bg-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: item.active ? 'white' : 'var(--text-muted)',
                      fontWeight: 700,
                      fontSize: '1rem',
                      flexShrink: 0,
                    }}>
                      {item.icon}
                    </span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.platform}</div>
                      {!item.active && (
                        <span style={{
                          fontSize: '0.72rem',
                          color: 'var(--text-muted)',
                          fontFamily: "'JetBrains Mono', monospace",
                        }}>
                          Coming Soon
                        </span>
                      )}
                    </div>
                  </div>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.88rem',
                    lineHeight: 1.7,
                    flex: 1,
                  }}>
                    {item.description}
                  </p>
                  {item.active && (
                    <div style={{
                      marginTop: '14px',
                      fontSize: '0.85rem',
                      color: 'var(--accent-light)',
                      fontWeight: 500,
                    }}>
                      {item.label} &rarr;
                    </div>
                  )}
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
