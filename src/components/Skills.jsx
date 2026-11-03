import { skillGroups } from '../data/profile'
import '../App.css'

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">Technical Skills</h2>
        <p className="section-subtitle">
          Deep expertise across the full data and AI stack, built over 25+ years.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
          gap: '20px',
        }}>
          {skillGroups.map((group, i) => (
            <div key={i} className="card">
              <h3 style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--accent-light)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '14px',
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                {group.category}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {group.skills.map(skill => (
                  <div key={skill} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    color: 'var(--text-secondary)',
                    fontSize: '0.88rem',
                    lineHeight: 1.4,
                  }}>
                    <span style={{ color: 'var(--success)', fontSize: '0.6rem', marginTop: '5px', flexShrink: 0 }}>&#9679;</span>
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
