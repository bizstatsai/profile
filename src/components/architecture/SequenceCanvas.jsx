import CategoryGlyph from './CategoryGlyph'
import { DataFlowArrow } from './ArchitectureConnector'
import { TYPE } from '../../lib/diagram/text'

const PAD = 11

function Participant({ p, layout, lit }) {
  const { headerY, headerH, headerW } = layout
  const x = p.cx - headerW / 2
  return (
    <g className={`ac-node ${lit ? 'is-lit' : ''}`} data-cat={p.cat}>
      <rect className="ac-node__box" x={x} y={headerY} width={headerW} height={headerH} rx={3} />
      <CategoryGlyph cat={p.cat} x={x + PAD} y={headerY + PAD + 2} size={11} />
      <text className="ac-node__title" x={x + PAD + 16} y={headerY + PAD + 13}>
        {p.titleLines.map((l, i) => (
          <tspan key={l + i} x={i ? x + PAD : x + PAD + 16} dy={i ? TYPE.title.lh : 0}>{l}</tspan>
        ))}
      </text>
      {p.subLines.length > 0 && (
        <text className="ac-node__sub" x={x + PAD} y={headerY + PAD + p.titleLines.length * TYPE.title.lh + 15}>
          {p.subLines.map((l, i) => (
            <tspan key={l + i} x={x + PAD} dy={i ? TYPE.sub.lh : 0}>{l}</tspan>
          ))}
        </text>
      )}
    </g>
  )
}

function Message({ row, state, onHover }) {
  const { ax, bx, y, self, rightward } = row
  const dir = rightward ? 1 : -1
  return (
    <g
      className={`ac-msg ${row.reply ? 'ac-msg--reply' : ''} ${state}`}
      onMouseEnter={() => onHover?.(row.index)}
      onMouseLeave={() => onHover?.(null)}
    >
      <rect className="ac-msg__hit" x={0} y={row.top - 4} width="100%" height={y - row.top + 18} />
      {self ? (
        <>
          <path className="ac-edge__line" d={`M${ax} ${y}h30v22h-22`} />
          <DataFlowArrow x={ax + 8} y={y + 22} angle={180} />
        </>
      ) : (
        <>
          <path className="ac-edge__line" d={`M${ax} ${y}L${bx - dir * 1} ${y}`} />
          <DataFlowArrow x={bx} y={y} angle={rightward ? 0 : 180} />
        </>
      )}
      {row.n != null && (
        <g className="ac-msg__num">
          <circle cx={ax} cy={y} r={9} />
          <text x={ax} y={y + 3.500} textAnchor="middle">{row.n}</text>
        </g>
      )}
      <rect
        className="ac-msg__labelbg"
        x={row.labelX - 3}
        y={row.top - 2}
        width={row.labelW + 6}
        height={row.textH + 3}
        rx={2}
      />
      <text className="ac-msg__text" x={row.labelX} y={row.top + 9}>
        {row.lines.map((l, i) => (
          <tspan key={l + i} x={row.labelX} dy={i ? TYPE.label.lh : 0}>{l}</tspan>
        ))}
      </text>
    </g>
  )
}

function Note({ row }) {
  return (
    <g className="ac-note">
      <rect x={row.x} y={row.y} width={row.w} height={row.h} rx={2} />
      <text x={row.x + row.w / 2} y={row.y + 18} textAnchor="middle">
        {row.lines.map((l, i) => (
          <tspan key={l + i} x={row.x + row.w / 2} dy={i ? TYPE.label.lh : 0}>{l}</tspan>
        ))}
      </text>
    </g>
  )
}

export default function SequenceCanvas({
  layout, title, step, hoverStep, onHoverStep, zoom, revealed, armed, legendCat,
}) {
  const { viewBox: vb, participants, rows, frames, headerY, headerH } = layout
  const active = hoverStep ?? step
  const activeRow = rows.find(r => r.type === 'message' && r.index === active)
  return (
    <svg
      ref={zoom?.svg}
      className={`ac-svg ac-svg--sequence ${armed ? 'is-armed' : ''} ${revealed ? 'is-revealed' : ''} ${zoom?.view.k > 1 ? 'is-zoomed' : ''}`}
      viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
      role="group"
      aria-label={title}
      style={{ '--ratio': vb.w / vb.h, maxWidth: `${vb.w * 1.1}px` }}
      {...(zoom?.handlers ?? {})}
    >
      <g transform={zoom?.transform}>
        {participants.map(p => (
          <line key={p.id} className="ac-lifeline" x1={p.cx} x2={p.cx} y1={headerY + headerH} y2={vb.h - 8} />
        ))}
        {frames.map(f => (
          <g key={f.label} className="ac-frame">
            <rect x={8} y={f.y} width={vb.w - 16} height={f.h} rx={3} />
            <text x={20} y={f.y + 17}>{f.kind === 'alt' ? `if ${f.label}` : f.label}</text>
          </g>
        ))}
        {rows.map((row, i) => (
          row.type === 'note'
            ? <Note key={`note-${i}`} row={row} />
            : (
              <Message
                key={row.index}
                row={row}
                onHover={onHoverStep}
                state={active ? (row.index === active ? 'is-lit' : 'is-dim') : ''}
              />
            )
        ))}
        {participants.map(p => (
          <g key={p.id} className={legendCat && p.cat !== legendCat ? 'is-dim-group' : ''}>
            <Participant
              p={p}
              layout={layout}
              lit={(activeRow && (activeRow.from === p.id || activeRow.to === p.id)) || legendCat === p.cat}
            />
          </g>
        ))}
      </g>
    </svg>
  )
}
