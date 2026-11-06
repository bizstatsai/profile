import { useEffect, useRef, useState } from 'react'
import { navLinks, profile } from '../../data/profile'
import { useTheme } from '../../lib/hooks'
import { asset } from '../../lib/asset'

function ThemeToggle({ theme, toggle }) {
  const next = theme === 'dark' ? 'drafting paper' : 'dark'
  return (
    <button type="button" className="header__icon" onClick={toggle} aria-label={`Switch to ${next} theme`} title={`Switch to ${next} theme`}>
      <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden="true">
        <circle cx="9" cy="9" r="6.500" fill="none" stroke="currentColor" />
        <path d="M9 2.500a6.500 6.500 0 0 1 0 13Z" fill="currentColor" />
      </svg>
    </button>
  )
}

/** Tracks which navigation item the reader is in. Sections mark themselves with data-nav. */
function useActiveSection() {
  const [active, setActive] = useState('overview')
  useEffect(() => {
    const seen = new Map()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => seen.set(entry.target, entry.isIntersecting))
      const current = [...seen.entries()].filter(([, on]) => on).map(([el]) => el)
      const last = current.at(-1)
      if (last) setActive(last.dataset.nav)
    }, { rootMargin: '-40% 0px -55% 0px' })
    document.querySelectorAll('[data-nav]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
  return active
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menu = useRef(null)
  const active = useActiveSection()
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const dialog = menu.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="sheet header__row">
        <a className="header__mark" href="#top" aria-label={`${profile.name}, back to top`}>
          <img src={asset('/favicon.svg')} alt="" width="26" height="26" />
          <span>{profile.name}</span>
        </a>
        <nav className="header__nav" aria-label="Main">
          <ul>
            {navLinks.map(link => (
              <li key={link.key}>
                <a href={link.href} className={active === link.key ? 'is-active' : ''} aria-current={active === link.key ? 'true' : undefined}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="header__actions">
          <ThemeToggle theme={theme} toggle={toggle} />
          <button type="button" className="header__menu tech" onClick={() => setOpen(true)} aria-haspopup="dialog">Menu</button>
        </div>
      </div>

      <dialog ref={menu} className="menu" aria-label="Site navigation" onClose={() => setOpen(false)}>
        <div className="menu__head">
          <span className="tech">{profile.name}</span>
          <button type="button" className="header__menu tech" onClick={() => setOpen(false)}>Close</button>
        </div>
        <nav aria-label="Site sections">
          <ul>
            {navLinks.map((link, i) => (
              <li key={link.key}>
                <a href={link.href} onClick={() => setOpen(false)} className={active === link.key ? 'is-active' : ''}>
                  <span className="tech" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </dialog>
    </header>
  )
}
