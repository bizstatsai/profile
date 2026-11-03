import { profile, socialLinks, navGroups } from '../data/profile'
import '../App.css'

export default function Footer() {
  return (
    <footer style={{ padding: '48px 0 36px', borderTop: '1px solid var(--rule)', background: 'var(--bg-2)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '28px',
          marginBottom: '32px',
        }}>
          <div style={{ gridColumn: 'span 1', minWidth: 0 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.86rem', letterSpacing: '0.06em', marginBottom: '8px' }}>
              <span aria-hidden="true" style={{ width: '10px', height: '10px', background: 'var(--signal)', display: 'inline-block', marginRight: '10px' }} />
              S. CENTHALA
            </div>
            <p style={{ color: 'var(--ink-2)', fontSize: '0.86rem', maxWidth: '34ch' }}>
              {profile.title}. {profile.location}.
            </p>
            <p style={{ color: 'var(--ink-3)', fontSize: '0.78rem', marginTop: '10px', fontFamily: 'var(--font-mono)' }}>
              {profile.email}
            </p>
          </div>
          {navGroups.map(group => (
            <div key={group.label}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '10px' }}>
                {group.label}
              </div>
              <div style={{ display: 'grid', gap: '6px' }}>
                {group.links.map(link => (
                  <a key={link.href} href={link.href} style={{ color: 'var(--ink-2)', fontSize: '0.88rem' }}>{link.label}</a>
                ))}
              </div>
            </div>
          ))}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '10px' }}>
              Elsewhere
            </div>
            <div style={{ display: 'grid', gap: '6px' }}>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink-2)', fontSize: '0.88rem' }}>LinkedIn</a>
              <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink-2)', fontSize: '0.88rem' }}>GitHub</a>
              <a href={socialLinks.absoluteE} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink-2)', fontSize: '0.88rem' }}>Absolut-e.com</a>
              <a href={socialLinks.bizstats} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink-2)', fontSize: '0.88rem' }}>BizStats.AI</a>
              <a href={socialLinks.books} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink-2)', fontSize: '0.88rem' }}>Books</a>
            </div>
          </div>
        </div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap',
          paddingTop: '18px',
          borderTop: '1px solid var(--rule)',
          color: 'var(--ink-3)',
          fontSize: '0.78rem',
          fontFamily: 'var(--font-mono)',
        }}>
          <span>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <span>Diagrams are rendered from Mermaid sources in this site's repository. No client systems are depicted.</span>
        </div>
      </div>
    </footer>
  )
}
