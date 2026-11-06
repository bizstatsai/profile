import { useMemo } from 'react'
import { layoutFlow } from '../../lib/diagram/layoutFlow'
import { layoutSequence } from '../../lib/diagram/layoutSequence'

/** A wordless silhouette of a drawing, so plates can be told apart at a glance. */
export default function DiagramThumb({ diagram }) {
  const shape = useMemo(() => {
    if (diagram.kind === 'sequence') return { kind: 'sequence', layout: layoutSequence(diagram.model, diagram.sequence) }
    return { kind: 'flow', layout: layoutFlow(diagram.model, diagram.wide) }
  }, [diagram])
  const { viewBox: vb } = shape.layout
  return (
    <svg className="ac-thumb" viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`} aria-hidden="true" preserveAspectRatio="xMidYMid meet">
      {shape.kind === 'flow' ? (
        <>
          {shape.layout.edges.map(e => <path key={e.key} d={e.d} className={e.dashed ? 'is-dashed' : ''} />)}
          {shape.layout.nodes.filter(n => !n.pseudo).map(n => (
            <rect key={n.id} x={n.x} y={n.y} width={n.w} height={n.h} rx={4} data-cat={n.cat} />
          ))}
        </>
      ) : (
        <>
          {shape.layout.participants.map(p => (
            <g key={p.id}>
              <path d={`M${p.cx} ${shape.layout.headerY}V${vb.h}`} />
              <rect x={p.cx - shape.layout.headerW / 2} y={shape.layout.headerY} width={shape.layout.headerW} height={shape.layout.headerH} rx={4} data-cat={p.cat} />
            </g>
          ))}
          {shape.layout.rows.filter(r => r.type === 'message').map(r => (
            <path key={r.index} d={`M${r.ax} ${r.y}H${r.self ? r.ax + 30 : r.bx}`} className="is-msg" />
          ))}
        </>
      )}
    </svg>
  )
}
