import { architectureChapters, governanceIndex } from '../data/architecturePatterns'
import { SectionHead } from '../components/layout/SectionContainer'
import ArchitectureShowcase from '../components/architecture/ArchitectureShowcase'
import PatternCatalogue from '../components/architecture/PatternCatalogue'

export default function ArchitectureSection() {
  return (
    <>
      <SectionHead
        n="03"
        label="Architectural thinking"
        headline="Behind Every Intelligent Business Is An Architecture Worth Understanding."
        lead="Each pattern here is written the way architects compare options: intent, forces, solution, consequences and known uses. Every drawing is generated from its Mermaid source, so its labels and connections match the source. Open a drawing, select a component and follow what it connects to."
      />
      <ArchitectureShowcase chapters={architectureChapters} sectionNumber="3" label="Architecture chapters" />

      <aside className="gov-index" aria-labelledby="gov-index-title">
        <div className="gov-index__intro">
          <h3 id="gov-index-title">Where security and governance sit</h3>
          <p>
            Trust is not a separate drawing. It shows up inside the others, always in amber. Follow one to see where it sits.
            Beyond these patterns, the work includes format-preserving encryption (FPE and EFPE) for private information
            on a data lake and Teradata at AT&amp;T / DirecTV, and three books on AI for security and risk.
          </p>
          <p className="gov-index__links">
            <a href="#project-att">The AT&amp;T / DirecTV engagement</a>
            <a href="#books">Books on AI, security and risk</a>
          </p>
        </div>
        <ul>
          {governanceIndex.map(item => (
            <li key={item.plate}>
              <a href={`#plate-${item.plate}/${item.node}`}>
                <span className="tech">{item.where}</span>
                <strong>{item.label}</strong>
                <span>{item.why}</span>
              </a>
            </li>
          ))}
        </ul>
      </aside>

      <PatternCatalogue />
    </>
  )
}
