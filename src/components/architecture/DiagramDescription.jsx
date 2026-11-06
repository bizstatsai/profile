import { CATEGORIES } from '../../data/architectureDiagrams'
import { flattenSteps } from '../../lib/diagram/layoutSequence'
import { layerMembers } from '../../lib/diagram/layoutFlow'
import CategoryGlyph from './CategoryGlyph'

const labelOf = (model, id) => {
  const node = model.nodes.find(n => n.id === id)
  if (node) return node.title
  return model.groups?.find(g => g.id === id)?.title ?? id
}

const relation = (e, model, id) => (
  <>
    {labelOf(model, id)}
    {e.label && <span className="ac-rel__via"> ({e.label})</span>}
    {e.dashed && <span className="ac-rel__via"> dashed</span>}
  </>
)

/** An open layer: what it holds and what crosses its boundary. */
function LayerInspector({ model, layer, onClear, onSelect }) {
  const group = model.groups.find(g => g.id === layer)
  const inside = layerMembers(model.nodes, model.groups, layer)
  const members = model.nodes.filter(n => inside.has(n.id) && !n.pseudo)
  const incoming = model.edges.filter(e => inside.has(e.to) && !inside.has(e.from) && !e.from.startsWith('['))
  const outgoing = model.edges.filter(e => inside.has(e.from) && !inside.has(e.to))
  const count = `${members.length} ${members.length === 1 ? 'component' : 'components'}`
  return (
    <div className="ac-inspector" aria-live="polite">
      <div className="ac-inspector__main">
        <p className="ac-inspector__cat">Layer, {count}</p>
        <h4>{group.title}</h4>
        <ul className="ac-inspector__members">
          {members.map(n => (
            <li key={n.id}>
              <button type="button" onClick={() => onSelect(n.id)}>
                <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true" data-cat={n.cat}><CategoryGlyph cat={n.cat} /></svg>
                {n.title}
              </button>
              {n.desc && <p>{n.desc}</p>}
            </li>
          ))}
        </ul>
      </div>
      <dl className="ac-inspector__rel">
        {incoming.length > 0 && (
          <div>
            <dt>Enters from</dt>
            {incoming.map((e, i) => <dd key={i}>{relation(e, model, e.from)} to {labelOf(model, e.to)}</dd>)}
          </div>
        )}
        {outgoing.length > 0 && (
          <div>
            <dt>Leaves to</dt>
            {outgoing.map((e, i) => <dd key={i}>{labelOf(model, e.from)} to {relation(e, model, e.to)}</dd>)}
          </div>
        )}
      </dl>
      <button type="button" className="ac-inspector__close" onClick={onClear}>Close layer</button>
    </div>
  )
}

/** The inspector: what the selected component or layer is, and what it connects to. */
export function ComponentInspector({ diagram, selected, layer, onClear, onSelect }) {
  const { model } = diagram
  if (layer) return <LayerInspector model={model} layer={layer} onClear={onClear} onSelect={onSelect} />
  const node = model.nodes.find(n => n.id === selected)
  if (!node) {
    return (
      <p className="ac-inspector__hint" aria-live="polite">
        Select a component to read what it does and see what it connects to.
        {model.groups?.length > 0 && ' Select a layer name to open that layer.'}
      </p>
    )
  }
  const incoming = model.edges.filter(e => e.to === selected && e.from !== selected && !e.from.startsWith('['))
  const outgoing = model.edges.filter(e => e.from === selected && e.to !== selected)
  const loops = model.edges.filter(e => e.from === selected && e.to === selected)
  return (
    <div className="ac-inspector" data-cat={node.cat} aria-live="polite">
      <div className="ac-inspector__main">
        <p className="ac-inspector__cat">
          <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><CategoryGlyph cat={node.cat} /></svg>
          {CATEGORIES[node.cat]}
        </p>
        <h4>{node.title}</h4>
        {node.sub?.length > 0 && <p className="ac-inspector__sub">{node.sub.join(' · ')}</p>}
        {node.desc && <p>{node.desc}</p>}
      </div>
      <dl className="ac-inspector__rel">
        {incoming.length > 0 && (
          <div>
            <dt>Receives from</dt>
            {incoming.map(e => <dd key={e.from + e.label}>{relation(e, model, e.from)}</dd>)}
          </div>
        )}
        {outgoing.length > 0 && (
          <div>
            <dt>Leads to</dt>
            {outgoing.map(e => <dd key={e.to + e.label}>{relation(e, model, e.to)}</dd>)}
          </div>
        )}
        {loops.length > 0 && (
          <div>
            <dt>Repeats</dt>
            {loops.map(e => <dd key={e.label}>{e.label}</dd>)}
          </div>
        )}
      </dl>
      <button type="button" className="ac-inspector__close" onClick={onClear}>Clear selection</button>
    </div>
  )
}

/** Every relationship in a flow diagram as a plain list. */
export function FlowText({ diagram }) {
  const { model } = diagram
  const sections = [
    ...(model.groups ?? []).map(g => ({ title: g.title, nodes: model.nodes.filter(n => n.group === g.id) })),
    { title: null, nodes: model.nodes.filter(n => !n.group || !model.groups?.some(g => g.id === n.group)) },
  ].filter(s => s.nodes.length)
  return (
    <div className="ac-text">
      {sections.map(section => (
        <div key={section.title ?? 'rest'}>
          {section.title && <h5>{section.title}</h5>}
          <ul>
            {section.nodes.filter(n => !n.pseudo).map(n => (
              <li key={n.id}>
                <strong>{n.title}</strong>
                {n.sub?.length > 0 && <> ({n.sub.join(', ')})</>}
                {n.members?.length > 0 && <> [{n.members.join('; ')}]</>}
                {model.edges.filter(e => e.from === n.id).map(e => (
                  <span key={e.to + e.label} className="ac-text__rel">
                    {e.dashed ? ' dashed to ' : ' to '}{labelOf(model, e.to)}{e.label ? ` (${e.label})` : ''}.
                  </span>
                ))}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {model.edges.some(e => model.groups?.some(g => g.id === e.from)) && (
        <ul>
          {model.edges.filter(e => model.groups?.some(g => g.id === e.from)).map(e => (
            <li key={e.from + e.to}>
              <strong>{labelOf(model, e.from)}</strong>
              {e.dashed ? ' dashed to ' : ' to '}{labelOf(model, e.to)}{e.label ? ` (${e.label})` : ''}.
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/** A sequence as ordered steps. Also the layout phones use in place of the wide drawing. */
export function SequenceSteps({ diagram, step, onStep }) {
  const { model } = diagram
  const names = Object.fromEntries(model.participants.map(p => [p.id, p.title]))
  const flat = flattenSteps(model.steps, true)
  return (
    <ol className="ac-steps">
      {flat.map((s, i) => {
        if (s.type === 'frameStart') return <li key={`f${i}`} className="ac-steps__frame">If {s.label}:</li>
        if (s.type === 'frameEnd') return null
        if (s.type === 'note') {
          return (
            <li key={`n${i}`} className="ac-steps__note">
              <span>{s.over.map(id => names[id]).join(' to ')}</span>
              {s.text}
            </li>
          )
        }
        return (
          <li key={s.index} className={`ac-steps__msg ${step === s.index ? 'is-active' : ''} ${s.reply ? 'is-reply' : ''}`}>
            <button type="button" onClick={() => onStep?.(step === s.index ? null : s.index)} aria-pressed={step === s.index}>
              <span className="ac-steps__n">{s.index}</span>
              <span className="ac-steps__route">
                {names[s.from]}
                {s.from !== s.to && <> <span aria-hidden="true">{s.reply ? '⇢' : '→'}</span><span className="sr-only">to</span> {names[s.to]}</>}
              </span>
              <span className="ac-steps__text">{s.text}</span>
            </button>
          </li>
        )
      })}
    </ol>
  )
}

/** Groups stacked as lists: the phone layout for a context diagram too dense to route. */
export function LayerList({ diagram, selected, onSelect }) {
  const { model } = diagram
  return (
    <div className="ac-layers">
      {model.groups.map((g, i) => {
        const members = model.nodes.filter(n => n.group === g.id)
        return (
          <details key={g.id} className="ac-layers__group" open={i === 0 || members.some(n => n.id === selected)}>
            <summary>
              <h5>{g.title}</h5>
              <span className="tech">{members.length}</span>
            </summary>
            <div className="ac-layers__nodes">
              {members.map(n => (
                <button
                  key={n.id}
                  type="button"
                  className={`ac-layers__node ${selected === n.id ? 'is-selected' : ''}`}
                  data-cat={n.cat}
                  aria-pressed={selected === n.id}
                  onClick={() => onSelect(selected === n.id ? null : n.id)}
                >
                  <svg viewBox="0 0 12 12" width="12" height="12" aria-hidden="true"><CategoryGlyph cat={n.cat} /></svg>
                  <span>
                    <strong>{n.title}</strong>
                    {n.sub.length > 0 && <small>{n.sub.join(' · ')}</small>}
                  </span>
                </button>
              ))}
            </div>
          </details>
        )
      })}
    </div>
  )
}
