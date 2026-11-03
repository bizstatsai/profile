import { profile, clients } from '../data/profile'
import '../App.css'

const REVISION = '2026.11'

export default function Hero() {
  return (
    <section id="top" style={{ padding: '140px 0 72px', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.6fr) minmax(min(260px, 100%), 1fr)',
          gap: '48px',
          alignItems: 'start',
        }} className="hero-grid">
          <div style={{ minWidth: 0 }}>
            <div className="sheet-label">Sheet 01 · {profile.title}</div>
            <h1 style={{
              fontSize: 'clamp(2.6rem, 6vw, 4.6rem)',
              fontWeight: 800,
              lineHeight: 1.02,
              marginBottom: '22px',
              letterSpacing: '-0.02em',
            }}>
              {profile.name}
            </h1>
            <p style={{
              fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
              color: 'var(--ink-2)',
              maxWidth: '58ch',
              marginBottom: '28px',
              lineHeight: 1.6,
            }}>
              {profile.bio}
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '26px' }}>
              <a href="#patterns" className="btn btn-primary">See the patterns</a>
              <a href="#experience" className="btn btn-outline">View Experience</a>
              <a href="#contact" className="btn btn-outline">Get in Touch</a>
              <a href="/Srini_Centhala_Resume.pdf" download className="btn btn-signal">Resume</a>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-3)', marginRight: '4px' }}>
                Known uses
              </span>
              {clients.slice(0, 8).map(client => (
                <span key={client} className="tag">{client}</span>
              ))}
            </div>
          </div>

          <div className="title-block" aria-label="Title block">
            <div className="row"><span className="k">Name</span><span className="v">{profile.name}</span></div>
            <div className="row"><span className="k">Title</span><span className="v">{profile.title}</span></div>
            <div className="row"><span className="k">Firm</span><span className="v">{profile.company} · {profile.product}</span></div>
            <div className="row"><span className="k">Location</span><span className="v">{profile.location}</span></div>
            <div className="row"><span className="k">Practice</span><span className="v">{profile.stats.yearsExperience} years · US on-site since 1997</span></div>
            <div className="row"><span className="k">Published</span><span className="v">{profile.stats.publishedBooks} books · Business Expert Press</span></div>
            <div className="row"><span className="k">Validation</span><span className="v">Forrester: “Excellent Architecture &amp; Design”</span></div>
            <div className="row"><span className="k">Revision</span><span className="v">{REVISION} · all diagrams rendered from source</span></div>
          </div>
        </div>

        <div className="proof">
          <div><div className="n">{profile.stats.yearsExperience}</div><div className="l">Years Experience</div></div>
          <div><div className="n">{profile.stats.fortune100Clients}</div><div className="l">Fortune 100 Clients</div></div>
          <div><div className="n">{String(profile.stats.publishedBooks)}</div><div className="l">Published Books</div></div>
          <div><div className="n">13</div><div className="l">Products architected</div></div>
          <div><div className="n">{profile.stats.linkedinFollowers}</div><div className="l">LinkedIn Followers</div></div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
