import { caseStudies, products } from '../../data/projects'
import { profile } from '../../data/profile'
import { SectionHead } from '../layout/SectionContainer'
import ProjectCard from './ProjectCard'

const STATUS = {
  live: 'Live',
  early: 'Early access',
  building: 'In development',
  soon: 'Coming soon',
}
const ORDER = ['live', 'early', 'building', 'soon']

function ProductFamily() {
  const live = products.filter(p => p.status === 'live').length
  return (
    <section id="products" className="family" aria-labelledby="family-title">
      <header className="family__head">
        <h3 id="family-title">{profile.product}: the product family</h3>
        <p>
          {products.length} products I architect, {live} of them live, on a self-hosted platform that my team designs, builds and operates.
          Statuses are as of November 2026. <a href="#plate-platform-context">See how the platform runs</a>.
        </p>
      </header>
      {ORDER.map((status) => {
        const group = products.filter(p => p.status === status)
        return (
          <div key={status} className="family__group">
            <h4 className="tech" data-status={status}>
              <span className="family__dot" aria-hidden="true" />
              {STATUS[status]}
            </h4>
            <ul>
              {group.map(p => (
                <li key={p.name}>
                  <div className="family__name">
                    <h5>{p.name}</h5>
                    <p>{p.tagline}</p>
                  </div>
                  <p className="family__desc">{p.description}</p>
                  <div className="family__meta">
                    <ul className="tag-list">{p.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
                    {p.url
                      ? <a className="link-out" href={p.url} target="_blank" rel="noopener noreferrer">{p.url.replace(/^https:\/\/(www\.)?/, '')}</a>
                      : <span className="tech">Internal, no public address yet</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </section>
  )
}

export default function ProjectShowcase() {
  const ordered = ['walmart', 'att', 'directv', 'experian', 'ebay'].map(id => caseStudies.find(c => c.id === id))
  return (
    <>
      <SectionHead
        n="07"
        label="Selected work"
        headline="From Architectural Thinking to Real-World Systems."
        lead="Five engagements, most recent first, then the product family built today. Figures shown are the ones documented in each engagement's record."
      />
      <div className="projects">
        {ordered.map((study, i) => <ProjectCard key={study.id} study={study} index={i} />)}
      </div>
      <ProductFamily />
    </>
  )
}
