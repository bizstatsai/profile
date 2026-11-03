import { servicesDetail, profile } from '../data/profile'
import ScrollReveal from './ScrollReveal'
import '../App.css'

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">Services</h2>
          <p className="section-subtitle">
            Enterprise architecture consulting through {profile.company}. Available for Corp-to-Corp engagements.
          </p>
        </ScrollReveal>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          gap: '24px',
        }}>
          {servicesDetail.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.08}>
              <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '10px' }}>
                  {service.title}
                </h3>
                <p style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.92rem',
                  lineHeight: 1.7,
                  marginBottom: '18px',
                  flex: 1,
                }}>
                  {service.description}
                </p>

                <div>
                  <h4 style={{
                    fontSize: '0.78rem',
                    color: 'var(--accent-light)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '8px',
                  }}>
                    Deliverables
                  </h4>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}>
                    {service.deliverables.map((d, j) => (
                      <li key={j} style={{
                        fontSize: '0.83rem',
                        color: 'var(--text-muted)',
                        paddingLeft: '16px',
                        position: 'relative',
                      }}>
                        <span style={{ position: 'absolute', left: 0, color: 'var(--success)' }}>&#8226;</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
