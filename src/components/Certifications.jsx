import { certifications, education } from '../data/profile'
import '../App.css'

const groupedCerts = [
  { group: 'Databricks', certs: certifications.filter(c => c.issuer === 'Databricks') },
  { group: 'AI & Machine Learning', certs: certifications.filter(c => c.name.includes('Machine Learning') || c.name.includes('Neural') || c.name.includes('Deep')) },
  { group: 'Google Cloud', certs: certifications.filter(c => c.issuer.includes('Google') || c.name.includes('GCP')) },
  { group: 'MongoDB', certs: certifications.filter(c => c.issuer.includes('MongoDB')) },
]

export default function Certifications() {
  return (
    <section id="certifications" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <h2 className="section-title">Certifications & Education</h2>
        <p className="section-subtitle">
          Continuous learning across cloud, AI, data engineering, and architecture.
        </p>

        {/* Education */}
        <div className="card" style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '2rem' }}>&#127891;</span>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{education.degree}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{education.university}</p>
            </div>
          </div>
        </div>

        {/* Certification groups */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: '20px',
        }}>
          {groupedCerts.map((group, i) => (
            <div key={i} className="card">
              <h3 style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--accent-light)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '16px',
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                {group.group}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {group.certs.map((cert, j) => (
                  <div key={j}>
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => e.target.style.color = 'var(--accent-light)'}
                      onMouseLeave={e => e.target.style.color = 'var(--text-primary)'}
                    >
                      {cert.name} &#8599;
                    </a>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '2px' }}>
                      {cert.issuer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional trainings */}
        <div className="card" style={{ marginTop: '20px' }}>
          <h3 style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--accent-light)',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '16px',
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            Additional Training
          </h3>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {[
              'Oracle Database & Applications',
              'Rational Unified Process (RUP)',
              'MicroStrategy',
              'BizFlow',
              'Enterprise Data Modeling (ERP)',
              'Data Science Advanced',
              'Machine Learning Advanced',
              'AI & Deep Learning Advanced',
            ].map(t => (
              <span key={t} className="tag" style={{ padding: '6px 14px' }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
