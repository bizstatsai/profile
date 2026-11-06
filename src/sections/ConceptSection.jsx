import { profile, concept, clients } from '../data/profile'
import { recognition } from '../data/credentials'
import { asset } from '../lib/asset'
import { Headline } from '../components/layout/SectionContainer'

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

          <p className="concept__bio">{profile.bio}</p>

          <dl className="titleblock" aria-label="Title block">
            <div><dt>Name</dt><dd>{profile.name}</dd></div>
            <div><dt>Title</dt><dd>Chief Data and AI Architect</dd></div>
            <div><dt>Firm</dt><dd>{profile.company} · {profile.product}</dd></div>
            <div><dt>Location</dt><dd>{profile.location}</dd></div>
            <div><dt>Practice</dt><dd>{profile.stats.yearsExperience} years · US on-site since 1997</dd></div>
            <div><dt>Published</dt><dd>{profile.stats.publishedBooks} books · Business Expert Press, AuthorHouse</dd></div>
            <div><dt>Validation</dt><dd>{recognition.source}: “{recognition.quote}”</dd></div>
            <div><dt>Revision</dt><dd>2026.11 · all diagrams rendered from source</dd></div>
          </dl>
        </div>

        <ul className="proof">
          {facts(profile.stats).map(f => (
            <li key={f.l}>
              <span className="proof__n">{f.n}</span>
              <span className="proof__l">{f.l}</span>
            </li>
          ))}
        </ul>

        <div className="concept__lists">
          <div>
            <h3 className="tech">Roles held</h3>
            <p>{profile.roles.join(', ')}.</p>
          </div>
          <div>
            <h3 className="tech">Clients</h3>
            <p>{clients.join(', ')}.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
