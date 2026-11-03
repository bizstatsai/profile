import ScrollReveal from './ScrollReveal'
import { asset } from '../lib/asset'
import '../App.css'

const FIGURES = [
  {
    file: 'platform-context',
    title: 'System context of the product family',
    claim: 'Every public request enters through the edge and one tunnel into a self-hosted Kubernetes cluster; the only cloud pieces are a secrets vault, the status page, a database hot standby and a failover tunnel.',
  },
  {
    file: 'platform-release-path',
    title: 'Release path from merge to production',
    claim: 'Tests and image builds on merge, an automatic staging deploy, then a manual, time-limited promotion to production with a blocking backup and automatic rollback.',
  },
]

export default function Platform() {
  return (
    <section id="platform" className="section" style={{ background: 'var(--bg-2)' }}>
      <div className="container">
        <ScrollReveal>
          <div className="sheet-label">Sheet 04 · Reference implementation</div>
          <h2 className="section-title">How the product family actually runs</h2>
          <p className="section-subtitle">
            The BizStats AI platform is the known use for the operations patterns above: self-hosted first, local models first, a governed release path, and a cloud standby being built to the pilot-light pattern. Labels are roles; no hostnames, addresses, ports or internal identifiers appear in any public diagram.
          </p>
        </ScrollReveal>

        <div style={{ display: 'grid', gap: '28px' }}>
          {FIGURES.map((f, i) => (
            <ScrollReveal key={f.file} delay={i * 0.08}>
              <figure className="figure">
                <img src={asset(`/diagrams/${f.file}.svg`)} alt={`${f.title}: ${f.claim}`} loading="lazy" />
                <figcaption>
                  <span><b style={{ color: 'var(--ink)' }}>{f.title}.</b> {f.claim}</span>
                  <a href={asset(`/diagrams/src/${f.file}.mmd`)} target="_blank" rel="noopener noreferrer">view Mermaid source</a>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
