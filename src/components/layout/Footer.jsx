import { profile, concept, navLinks, socialLinks } from '../../data/profile'
import { MotionToggle } from '../hero/HeroSection'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="sheet">
        <div className="footer__top">
          <div className="footer__id">
            <p className="footer__name">{profile.name}</p>
            <p className="tech">{profile.title}</p>
            <p className="footer__statement">{concept.statement}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="footer__nav">
              {navLinks.map(link => <li key={link.key}><a href={link.href}>{link.label}</a></li>)}
            </ul>
          </nav>
          <ul className="footer__links">
            <li><a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><a href={socialLinks.absoluteE} target="_blank" rel="noopener noreferrer">Absolut-e Data Com</a></li>
            <li><a href={socialLinks.bizstats} target="_blank" rel="noopener noreferrer">BizStats AI</a></li>
          </ul>
        </div>
        <div className="footer__base tech">
          <span suppressHydrationWarning>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <span className="footer__note">Diagrams are rendered from Mermaid sources in this site's repository. No client systems are depicted.</span>
          <MotionToggle />
        </div>
      </div>
    </footer>
  )
}
