export function MilestoneItem({ item }) {
  return (
    <li className="moment">
      <span className="moment__year tech">{item.year}</span>
      <div className="moment__body">
        <p>{item.event}</p>
        <span className="moment__type tech">{item.type}</span>
      </div>
    </li>
  )
}

export default function ExperienceItem({ item }) {
  return (
    <li className="engagement">
      <div className="engagement__year" aria-hidden="true">{item.year}</div>
      <article>
        <header>
          <h4>{item.company}</h4>
          <p className="engagement__role">{item.role}</p>
          <p className="tech">{item.period}<span aria-hidden="true">, </span>{item.location}</p>
        </header>
        <p className="engagement__story">{item.description}</p>
        {item.highlights && (
          <ul className="engagement__points">
            {item.highlights.map(point => <li key={point}>{point}</li>)}
          </ul>
        )}
        <ul className="tag-list">{item.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>
        {item.measure && <p className="engagement__measure" aria-hidden="true">{item.measure}</p>}
      </article>
    </li>
  )
}
