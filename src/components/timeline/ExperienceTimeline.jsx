import { careerLine, founderRole } from '../../data/experience'
import { SectionHead } from '../layout/SectionContainer'
import ExperienceItem, { MilestoneItem } from './ExperienceItem'

export default function ExperienceTimeline() {
  const eras = careerLine()
  return (
    <>
      <SectionHead
        n="06"
        label="Professional journey"
        headline="Experience Built Across Complex Enterprise Environments."
        lead="A career line from Bangalore to Silicon Valley, oldest first. Client engagements run alongside Absolut-e Data Com, founded in 2007."
      />

      <div className="career">
        {eras.map(era => (
          <section key={era.title} className="era" aria-label={`${era.from} to ${era.to}: ${era.title}`}>
            <header className="era__head">
              <h3>{era.title}</h3>
              <p className="tech">{era.from}–{era.to === 2026 ? 'present' : era.to}</p>
            </header>
            <ol>
              {era.items.map(item => (
                item.kind === 'engagement'
                  ? <ExperienceItem key={`${item.company}-${item.period}`} item={item} />
                  : <MilestoneItem key={item.event} item={item} />
              ))}
            </ol>
          </section>
        ))}

        <section className="career__now" aria-labelledby="career-now-title">
          <p className="engagement__year" aria-hidden="true">Now</p>
          <div>
            <h3 id="career-now-title">{founderRole.company}</h3>
            <p className="engagement__role">{founderRole.role}</p>
            <p className="tech">{founderRole.period}<span aria-hidden="true">, </span>{founderRole.location}</p>
            <p className="engagement__story">{founderRole.description}</p>
            <ul className="engagement__points">
              {founderRole.highlights.map(point => <li key={point}>{point}</li>)}
            </ul>
            <ul className="tag-list">{founderRole.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
          </div>
        </section>
      </div>
    </>
  )
}
