import { CATEGORIES } from '../../data/architectureDiagrams'
import CategoryGlyph from './CategoryGlyph'

export default function ArchitectureLegend({ cats, hasDashed, sequence, onHover }) {
  return (
    <ul className="ac-legend" aria-label="Legend">
      {cats.map(cat => (
        <li key={cat} data-cat={cat}>
          <button
            type="button"
            onMouseEnter={() => onHover(cat)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(cat)}
            onBlur={() => onHover(null)}
          >
            <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><CategoryGlyph cat={cat} /></svg>
            {CATEGORIES[cat]}
          </button>
        </li>
      ))}
      {hasDashed && (
        <li className="ac-legend__line">
          <svg viewBox="0 0 26 8" width="26" height="8" aria-hidden="true"><path d="M0 4h26" /></svg>
          {sequence ? 'Response or replication' : 'Governs, observes or conditional'}
        </li>
      )}
    </ul>
  )
}
