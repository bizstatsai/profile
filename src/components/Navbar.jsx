import { useState, useEffect } from 'react'
import { navGroups } from '../data/profile'
import useTheme from '../hooks/useTheme'
import '../App.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleButton = (
    <button
      onClick={toggle}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="btn btn-outline"
      style={{ padding: '6px 10px', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}
    >
      {theme === 'dark' ? 'LIGHT' : 'DARK'}
    </button>
  )

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '12px 0',
        background: scrolled || menuOpen ? 'color-mix(in srgb, var(--bg) 88%, transparent)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--rule)' : '1px solid transparent',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
        <a href="#" aria-label="Go to top" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.86rem',
          fontWeight: 500,
          letterSpacing: '0.06em',
          color: 'var(--ink)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <span aria-hidden="true" style={{ width: '10px', height: '10px', background: 'var(--signal)', display: 'inline-block' }} />
          S. CENTHALA
        </a>

        <div className="desktop-nav" style={{ display: 'flex', gap: '22px', alignItems: 'center' }}>
          {navGroups.map(group => (
            <div key={group.label} style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.66rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink-3)',
              }}>{group.label}</span>
              {group.links.map(link => (
                <a key={link.href} href={link.href} style={{ color: 'var(--ink-2)', fontSize: '0.86rem', fontWeight: 500, whiteSpace: 'nowrap' }}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}
          {toggleButton}
        </div>

        <div className="mobile-controls" style={{ display: 'none', gap: '10px', alignItems: 'center' }}>
          {toggleButton}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            className="btn btn-outline"
            style={{ padding: '6px 10px', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}
          >
            {menuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="container" style={{ padding: '18px 20px 22px', display: 'grid', gap: '16px' }}>
          {navGroups.map(group => (
            <div key={group.label}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)', marginBottom: '6px' }}>
                {group.label}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 18px' }}>
                {group.links.map(link => (
                  <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
                    style={{ color: 'var(--ink)', fontSize: '1rem' }}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .desktop-nav { display: none !important; }
          .mobile-controls { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}
