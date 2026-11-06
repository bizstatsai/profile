import { profile, concept, clients, whatIDo } from '../data/profile'
import { recognition } from '../data/credentials'
import { asset } from '../lib/asset'
import { Headline } from '../components/layout/SectionContainer'

/** The bio, with the clients it names set in full ink. */
function Bio({ text }) {
  const named = clients.filter(c => text.includes(c))
  const parts = text.split(new RegExp(`(${named.map(c => c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`))
  return <p className="concept__bio">{parts.map((part, i) => (named.includes(part) ? <strong key={i}>{part}</strong> : part))}</p>
}

/** One area of practice, marked with the plane of its layer in the opening drawing. */
function PracticeArea({ area, as: Tag = 'li' }) {
  return (
    <Tag className="practice__area" data-cat={area.cat}>
      <div className="practice__what">
        <p className="practice__layer tech">
          <svg viewBox="0 0 26 14" width="26" height="14" aria-hidden="true"><path d="M13 1 25 7 13 13 1 7Z" /></svg>
          {area.layer}
        </p>
        <h4>{area.title}</h4>
        <a className="practice__ref" href={area.link.href}>{area.link.label}</a>
      </div>
      <p className="practice__text">{area.text}</p>
    </Tag>
  )
}

const facts = (s) => [
  { n: s.yearsExperience, l: 'Years of practice' },
  { n: String(clients.length), l: 'Named enterprise and public-sector clients' },
  { n: String(s.publishedBooks), l: 'Published books' },
  { n: String(s.productsArchitected), l: 'Products architected' },
  { n: s.linkedinFollowers, l: 'LinkedIn followers' },
]

export default function ConceptSection() {
  return (
    <section id="overview" className="concept" data-nav="overview" aria-labelledby="concept-title">
      <div className="sheet">
        <header className="concept__head">
          <p className="section-marker tech">
            <span className="section-marker__n">01</span>
            <span>The architect</span>
          </p>
          <Headline text={concept.title} className="concept__title" id="concept-title" />
          <p className="concept__statement">{concept.statement}</p>
        </header>

        <div className="concept__body">
          <figure className="concept__portrait">
            <img
              src={asset(profile.portrait)}
              alt={`Portrait of ${profile.name}`}
              width="400"
              height="400"
              loading="lazy"
              decoding="async"
            />
          </figure>

          <Bio text={profile.bio} />

          <div className="titleblock">
            <p className="titleblock__head tech" aria-hidden="true"><span>Title block</span><span>Sheet 01</span></p>
            <dl aria-label="Title block">
              <div className="is-wide is-name"><dt>Name</dt><dd>{profile.name}</dd></div>
              <div className="is-wide"><dt>Title</dt><dd>Chief Data and AI Architect</dd></div>
              <div className="is-wide"><dt>Firm</dt><dd>{profile.company} · {profile.product}</dd></div>
              <div><dt>Location</dt><dd>{profile.location}</dd></div>
              <div><dt>Practice</dt><dd>{profile.stats.yearsExperience} years · US <span style={{ whiteSpace: 'nowrap' }}>on-site</span> since 1997</dd></div>
              <div><dt>Published</dt><dd>{profile.stats.publishedBooks} books · Business Expert Press, AuthorHouse</dd></div>
              <div><dt>Validation</dt><dd>{recognition.source}: “{recognition.quote}”</dd></div>
              <div className="is-wide is-foot"><dt>Revision</dt><dd>2026.11 · all diagrams rendered from source</dd></div>
            </dl>
          </div>
        </div>

        <ul className="proof">
          {facts(profile.stats).map(f => (
            <li key={f.l}>
              <span className="proof__n">{f.n}</span>
              <span className="proof__l">{f.l}</span>
            </li>
          ))}
        </ul>

        <section id="about" className="practice" aria-labelledby="about-title">
          <header className="practice__head">
            <div>
              <h3 id="about-title">{whatIDo.title}</h3>
              <p>{whatIDo.subtitle}</p>
            </div>
            <div className="practice__roles">
              <p className="tech">Roles held</p>
              <ul>{profile.roles.map(role => <li key={role}>{role}</li>)}</ul>
            </div>
          </header>
          <div className="practice__stack">
            <ol className="practice__layers" aria-label="Areas of practice, from business decisions down to data streams">
              {whatIDo.layers.map(area => <PracticeArea key={area.title} area={area} />)}
            </ol>
            <div className="practice__across">
              <PracticeArea area={whatIDo.across} as="div" />
            </div>
          </div>
        </section>

        <div className="concept__lists">
          <div>
            <h3 className="tech">Clients</h3>
            <p>{clients.join(', ')}.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
