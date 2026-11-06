import { diagrams } from '../../data/architectureDiagrams'
import { architecturePatterns } from '../../data/architecturePatterns'
import DiagramCard from '../architecture/DiagramCard'

/** One engagement as an editorial spread, led by the figure the source documents. */
export default function ProjectCard({ study, index }) {
  const pattern = architecturePatterns.find(p => p.slug === study.pattern)
  return (
    <article id={`project-${study.id}`} className={`project project--${index % 2 ? 'flip' : 'lead'}`} aria-labelledby={`project-${study.id}-title`}>
      <div className="project__measure" aria-hidden="true">
        <span>{study.measure}</span>
        <small>{study.measureNote}</small>
      </div>
      <header className="project__head">
        <p className="tech">{study.client}<span aria-hidden="true">, </span>{study.period}</p>
        <h3 id={`project-${study.id}-title`}>{study.title}</h3>
        <p className="sr-only">{study.measure} {study.measureNote}.</p>
      </header>
      <div className="project__story">
        <div>
          <h4 className="tech">Business problem</h4>
          <p>{study.challenge}</p>
        </div>
        <div>
          <h4 className="tech">Solution approach</h4>
          <p>{study.solution}</p>
        </div>
      </div>
      <div className="project__diagram">
        <DiagramCard diagram={diagrams[`flow-${study.id}`]} compact plate="Architecture flow" />
      </div>
      <div className="project__value">
        <h4 className="tech">Business value</h4>
        <ul>{study.impact.map(item => <li key={item}>{item}</li>)}</ul>
      </div>
      <div className="project__stack">
        <h4 className="tech">Technology stack</h4>
        <ul className="tag-list">{study.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        {pattern && <a className="link-out" href={`#plate-${pattern.slug}`}>Related pattern: {pattern.title}</a>}
      </div>
    </article>
  )
}
