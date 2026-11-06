import { useMemo, useState } from 'react'
import {
  books, faqItems, techRadar, speakingTopics, speakerKit, thoughtLeadership,
} from '../../data/publications'
import { socialLinks, profile } from '../../data/profile'
import { SectionHead } from '../layout/SectionContainer'
import PublicationCard from './PublicationCard'

const FIRST_QUESTIONS = 8

function AskAnArchitect() {
  const topics = useMemo(() => ['All', ...new Set(faqItems.map(f => f.topic))], [])
  const [topic, setTopic] = useState('All')
  const [expanded, setExpanded] = useState(false)
  const shown = faqItems.filter(f => topic === 'All' || f.topic === topic)
  const collapsed = topic === 'All' && !expanded
  return (
    <section id="ask" className="ask" aria-labelledby="ask-title">
      <header>
        <h3 id="ask-title">Ask an Architect</h3>
        <p>Common enterprise architecture questions, answered from 25+ years of practice.</p>
      </header>
      <div className="ask__topics" role="group" aria-label="Filter questions by topic">
        {topics.map(t => (
          <button key={t} type="button" aria-pressed={t === topic} onClick={() => setTopic(t)}>
            {t}
            <span className="tech" aria-hidden="true">{t === 'All' ? faqItems.length : faqItems.filter(f => f.topic === t).length}</span>
          </button>
        ))}
      </div>
      <div className="ask__list">
        {shown.map((item, i) => (
          <details key={item.question} hidden={collapsed && i >= FIRST_QUESTIONS}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
      {collapsed && (
        <button type="button" className="btn btn--line ask__more" onClick={() => setExpanded(true)}>
          Show all {faqItems.length} questions
        </button>
      )}
    </section>
  )
}

const RING_R = [120, 200, 280, 360]

function TechnologyRadar() {
  const [active, setActive] = useState(null)
  const blips = useMemo(() => {
    let counter = 0
    return techRadar.flatMap((ring, r) => ring.items.map((item, i) => {
      counter += 1
      const inner = r === 0 ? 34 : RING_R[r - 1] + 18
      const outer = RING_R[r] - 18
      const span = ring.items.length
      // Kept off both edges, where the ring names sit.
      const angle = (Math.PI / 2) * (0.1 + 0.8 * ((i + 0.5) / span))
      const radius = i % 2 ? outer : inner + (outer - inner) * 0.35
      return {
        n: counter,
        ring: ring.ring,
        name: item.name,
        note: item.note,
        // Rounded: browsers and the build disagree on the last digit of a sine.
        x: Number((Math.cos(angle) * radius).toFixed(2)),
        y: Number((Math.sin(angle) * radius).toFixed(2)),
      }
    }))
  }, [])
  return (
    <section id="radar" className="radar" aria-labelledby="radar-title">
      <header>
        <h3 id="radar-title">Technology Radar</h3>
        <p>Opinionated guidance on enterprise data and AI technologies, based on real-world production experience.</p>
      </header>
      <div className="radar__body">
        <svg className="radar__svg" viewBox="-10 -10 390 390" aria-hidden="true">
          {[...RING_R].reverse().map((r, i) => (
            <path key={r} className="radar__ring" data-ring={3 - i} d={`M0 0L${r} 0A${r} ${r} 0 0 1 0 ${r}Z`} />
          ))}
          {techRadar.map((ring, r) => (
            <text key={ring.ring} className="radar__ringname" x={(r === 0 ? 0 : RING_R[r - 1]) + 8} y={-2}>{ring.ring}</text>
          ))}
          {blips.map(b => (
            <g
              key={b.n}
              className={`radar__blip ${active === b.n ? 'is-active' : ''}`}
              transform={`translate(${b.x} ${b.y})`}
              onMouseEnter={() => setActive(b.n)}
              onMouseLeave={() => setActive(null)}
            >
              <circle r="11" />
              <text y="3.800" textAnchor="middle">{b.n}</text>
            </g>
          ))}
        </svg>
        <div className="radar__lists">
          {techRadar.map((ring) => (
            <div key={ring.ring}>
              <h4>{ring.ring}</h4>
              <p className="tech">{ring.description}</p>
              <ol>
                {ring.items.map((item) => {
                  const blip = blips.find(b => b.name === item.name)
                  return (
                    <li
                      key={item.name}
                      value={blip.n}
                      className={active === blip.n ? 'is-active' : ''}
                      onMouseEnter={() => setActive(blip.n)}
                      onMouseLeave={() => setActive(null)}
                    >
                      <span className="tech radar__n" aria-hidden="true">{blip.n}</span>
                      <div>
                        <strong>{item.name}</strong>
                        <span>{item.note}</span>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SpeakingBlock() {
  return (
    <section id="speaking" className="speaking" aria-labelledby="speaking-title">
      <header>
        <h3 id="speaking-title">Speaking</h3>
        <p>Available for keynotes, panels, and workshops at enterprise data and AI conferences.</p>
      </header>
      <ol className="speaking__topics">
        {speakingTopics.map(topic => (
          <li key={topic.title}>
            <h4>{topic.title}</h4>
            <p>{topic.description}</p>
          </li>
        ))}
      </ol>
      <div className="speaking__kit">
        <div>
          <h4 className="tech">Speaker bio</h4>
          <p>{speakerKit.bio}</p>
          <p className="speaking__short"><span className="tech">Short version.</span> {speakerKit.bioShort}</p>
        </div>
        <dl>
          <div><dt className="tech">Formats</dt><dd>{speakerKit.formats.join(', ')}</dd></div>
          <div><dt className="tech">Audiences</dt><dd>{speakerKit.audiences.join(', ')}</dd></div>
          <div><dt className="tech">Past clients</dt><dd>{speakerKit.pastClients.join(', ')}</dd></div>
        </dl>
        <div className="speaking__ask">
          <p>
            Interested in a session? Reach out via{' '}
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> or{' '}
            <a href={`mailto:${profile.email}`}>{profile.email}</a> with event details, audience size and preferred topic.
          </p>
          <a className="btn btn--line" href={`mailto:${profile.email}?subject=Speaking%20Inquiry`}>Ask about a session</a>
        </div>
      </div>
    </section>
  )
}

export default function PublicationLibrary() {
  const active = thoughtLeadership.filter(t => t.active)
  const planned = thoughtLeadership.filter(t => !t.active)
  return (
    <>
      <SectionHead
        n="08"
        label="Thought leadership"
        headline="Ideas That Shape Better Technology."
        lead="Four books on AI, security, risk management and project management, written with co-authors, plus the working answers and opinions that have come out of practice."
      />
      <section id="books" className="library" aria-label="Published books">
        {books.map(book => <PublicationCard key={book.isbn} book={book} />)}
      </section>
      <p className="library__author tech">
        <a href={socialLinks.books} target="_blank" rel="noopener noreferrer">Author page at Business Expert Press</a>
      </p>
      <AskAnArchitect />
      <TechnologyRadar />
      <SpeakingBlock />
      <section className="channels" aria-label="Where to follow">
        {active.map(t => (
          <p key={t.platform}>
            <a className="link-out" href={t.url} target="_blank" rel="noopener noreferrer">{t.label}</a>
            <span>{t.description}</span>
          </p>
        ))}
        <div className="channels__planned">
          <p className="tech">Planned channels, not yet published</p>
          <ul>
            {planned.map(t => (
              <li key={t.platform}>
                <strong>{t.platform}</strong>
                <span>{t.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
