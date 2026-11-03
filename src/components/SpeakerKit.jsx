import { speakerKit, profile, socialLinks } from '../data/profile'
import ScrollReveal from './ScrollReveal'
import '../App.css'

export default function SpeakerKit() {
  return (
    <section id="speaker-kit" className="section">
      <div className="container">
        <ScrollReveal>
          <h2 className="section-title">Speaker Kit</h2>
          <p className="section-subtitle">
            Everything event organizers need to book a session.
          </p>
        </ScrollReveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '24px' }}>
          {/* Bio */}
          <ScrollReveal>
            <div className="card" style={{ height: '100%' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>Bio</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '16px' }}>
                {speakerKit.bio}
              </p>
              <div style={{
                padding: '12px 16px',
                background: 'var(--bg-secondary)',
                borderRadius: '8px',
                border: '1px solid var(--border)',
              }}>
                <p style={{
                  fontSize: '0.8rem',
                  fontFamily: "'JetBrains Mono', monospace",
                  color: 'var(--text-muted)',
                  fontStyle: 'italic',
                }}>
                  Short: {speakerKit.bioShort}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Talk Topics */}
          <ScrollReveal delay={0.08}>
            <div className="card" style={{ height: '100%' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>Talk Topics</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {speakerKit.topics.map((topic, i) => (
                  <li key={i} style={{
                    paddingLeft: '20px',
                    position: 'relative',
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    lineHeight: 1.5,
                  }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--accent-light)' }}>&#9654;</span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Details */}
          <ScrollReveal delay={0.16}>
            <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '8px' }}>Formats</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {speakerKit.formats.map(f => (
                    <span key={f} className="tag">{f}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '8px' }}>Audiences</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {speakerKit.audiences.map(a => (
                    <span key={a} className="tag">{a}</span>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '8px' }}>Past Clients</h3>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {speakerKit.pastClients.map(c => (
                    <span key={c} style={{
                      padding: '4px 12px',
                      fontSize: '0.78rem',
                      fontFamily: "'JetBrains Mono', monospace",
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      background: 'var(--bg-secondary)',
                    }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
                <a href={`mailto:${profile.email}?subject=Speaking%20Inquiry`} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Book a Session &rarr;
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
