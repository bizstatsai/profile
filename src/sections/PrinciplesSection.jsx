import { principles } from '../data/narrative'
import { SectionHead } from '../components/layout/SectionContainer'

/** Each principle as a small drawing of itself. */
const GLYPHS = {
  target: (
    <>
      <circle cx="32" cy="32" r="27" />
      <circle cx="32" cy="32" r="15" />
      <circle cx="32" cy="32" r="3.500" className="fill" />
      <path d="M2 32h15M47 32h15" />
    </>
  ),
  untangle: (
    <>
      <path d="M2 14c12 0 12 36 22 36s8-36 16-36 6 18 22 18" />
      <path d="M2 50c10 0 14-18 22-18h38" className="strong" />
    </>
  ),
  foundation: (
    <>
      <path d="M24 12h16M14 24h36" />
      <path d="M4 38h56M4 50h56" className="strong" />
      <path d="M32 2v10M12 38V50M32 38V50M52 38V50" />
    </>
  ),
  scale: (
    <>
      <path d="M4 60h9v-9H4ZM17 60h14V46H17ZM35 60h25V35H35Z" />
      <path d="M35 28V4h25v24" strokeDasharray="3 4" />
      <path d="M17 41V30h14v11" strokeDasharray="3 4" />
    </>
  ),
  shield: (
    <>
      <path d="M32 3l25 9v18c0 15-10 25-25 31C17 55 7 45 7 30V12Z" />
      <path d="M32 15l13 5v10c0 8-5 13-13 17-8-4-13-9-13-17V20Z" className="strong" />
    </>
  ),
  focus: (
    <>
      <path d="M2 8l36 24M2 20l36 12M2 44l36-12M2 56l36-24" />
      <path d="M38 32h24" className="strong" />
      <circle cx="38" cy="32" r="3.500" className="fill" />
    </>
  ),
}

export default function PrinciplesSection() {
  return (
    <>
      <SectionHead n="10" label={principles.label} headline={principles.headline} />
      <ol className="principles">
        {principles.items.map(item => (
          <li key={item.n}>
            <span className="principles__n tech" aria-hidden="true">{item.n}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <svg viewBox="0 0 64 64" className="principles__glyph" aria-hidden="true">{GLYPHS[item.glyph]}</svg>
          </li>
        ))}
      </ol>
    </>
  )
}
