import { profile, hero } from '../../data/profile'
import { useMotion } from '../../lib/motion'
import ArchitectureHeroVisual from './ArchitectureHeroVisual'

export function MotionToggle() {
  const motion = useMotion()
  return (
    <button type="button" className="motion-toggle tech" onClick={motion.toggle} aria-pressed={!motion.on}>
      <span className="motion-toggle__mark" aria-hidden="true" />
      {motion.on ? 'Pause motion' : 'Resume motion'}
    </button>
  )
}

export default function HeroSection() {
  return (
    <section id="top" className="hero" data-nav="overview" aria-labelledby="hero-title">
      <div className="hero__grid" aria-hidden="true" />
      <ArchitectureHeroVisual />
      <div className="sheet hero__body">
        <div className="hero__copy">
          <p className="hero__eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title" className="hero__headline">
            <span className="sr-only">{profile.name}, {profile.title}. </span>
            <span className="hero__setup">{hero.headline[0]}</span>{' '}
            <span className="hero__point">{hero.headline[1]}</span>
          </h1>
          <p className="hero__support">{hero.support}</p>
          <div className="hero__actions">
            <a className="btn btn--primary" href={hero.primary.href}>{hero.primary.label}</a>
            <a className="hero__more" href={hero.secondary.href}>{hero.secondary.label}</a>
          </div>
        </div>
      </div>
      <div className="sheet hero__foot">
        <div className="hero__meta">
          <p className="hero__identity" aria-hidden="true">
            <span className="hero__name">{profile.name}</span>
            <span className="tech hero__designation">{profile.title}</span>
          </p>
          <MotionToggle />
        </div>
      </div>
    </section>
  )
}
