import { useState } from 'react'
import { diagrams, planningRecords, wireframeRecord, STATUS } from '../data/architectureDiagrams'
import DiagramCard from '../components/architecture/DiagramCard'
import BlockDiagram from '../components/architecture/BlockDiagram'

/** The drawings made while planning this website, kept as a record and labelled as one. */
export default function SiteArchive() {
  const records = [...planningRecords.map(id => diagrams[id]), wireframeRecord]
  const [openId, setOpenId] = useState(null)
  return (
    <section id="site-archive" className="archive" aria-labelledby="archive-title">
      <div className="sheet">
        <header className="archive__head">
          <h2 id="archive-title">Colophon: how this site was first planned</h2>
          <p>{STATUS.record.note} They are kept here as a record, and some of what they show was never built.</p>
        </header>
        <ul className="archive__list">
          {records.map(record => (
            <li key={record.id}>
              <button type="button" aria-expanded={openId === record.id} onClick={() => setOpenId(openId === record.id ? null : record.id)}>
                <span>{record.title}</span>
                <span className="tech" aria-hidden="true">{openId === record.id ? 'Close' : 'Open'}</span>
              </button>
              <noscript>
                <p className="tech"><a href={record.source}>View the Mermaid file</a></p>
              </noscript>
              {openId === record.id && (
                <div className="archive__item">
                  <p>{record.claim}</p>
                  {record.kind === 'block'
                    ? <BlockDiagram model={record.model} />
                    : <DiagramCard diagram={record} plate="Planning record" />}
                  <p className="tech">
                    <a href={record.source} target="_blank" rel="noopener noreferrer">View the Mermaid file</a>
                  </p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
