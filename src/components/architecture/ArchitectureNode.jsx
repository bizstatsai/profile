import CategoryGlyph from './CategoryGlyph'
import { TYPE } from '../../lib/diagram/text'

const PAD_X = 13
const PAD_Y = 11
const GLYPH = 19

function NodeText({ node }) {
  const { x, y, w, h, titleLines, subLines, memberLines } = node
  const contentH = titleLines.length * TYPE.title.lh
    + (subLines.length ? 3 + subLines.length * TYPE.sub.lh : 0)
    + (memberLines.length ? 9 + memberLines.length * TYPE.member.lh : 0)
  const top = y + Math.max(PAD_Y, (h - contentH) / 2)
  const titleX = x + PAD_X + GLYPH
  let cursor = top
  const titleEnd = top + titleLines.length * TYPE.title.lh
  return (
    <>
      <CategoryGlyph cat={node.cat} x={x + PAD_X} y={top + 2.5} />
      <text className="ac-node__title" x={titleX} y={top + 13.5}>
        {titleLines.map((line, i) => (
          <tspan key={line + i} x={titleX} dy={i ? TYPE.title.lh : 0}>{line} </tspan>
        ))}
      </text>
      {subLines.length > 0 && (
        <text className="ac-node__sub" x={x + PAD_X} y={titleEnd + 3 + 12}>
          {subLines.map((line, i) => (
            <tspan key={line + i} x={x + PAD_X} dy={i ? TYPE.sub.lh : 0}>{line} </tspan>
          ))}
        </text>
      )}
      {memberLines.length > 0 && (() => {
        cursor = titleEnd + 9
        return (
          <>
            <line className="ac-node__rule" x1={x} x2={x + w} y1={titleEnd + 4} y2={titleEnd + 4} />
            <text className="ac-node__member" x={x + PAD_X} y={cursor + 11}>
              {memberLines.map((line, i) => (
                <tspan key={line + i} x={x + PAD_X} dy={i ? TYPE.member.lh : 0}>{line}</tspan>
              ))}
            </text>
          </>
        )
      })()}
    </>
  )
}

export default function ArchitectureNode({
  node, state, interactive, focusable, onSelect, onHover, onKeyNav,
}) {
  if (node.pseudo) {
    return (
      <g className={`ac-node ac-node--start ${state}`} style={{ '--r': node.rank }} aria-hidden="true">
        <circle cx={node.x + 7} cy={node.y + 7} r={6} />
      </g>
    )
  }
  const label = [node.title, ...(node.sub ?? [])].join(' ')
  const interaction = interactive ? {
    role: 'button',
    tabIndex: focusable ? 0 : -1,
    'aria-label': label,
    'aria-pressed': state.includes('is-selected'),
    'data-node': node.id,
    onClick: (e) => {
      e.stopPropagation()
      onSelect(node.id)
    },
    onMouseEnter: () => onHover(node.id),
    onMouseLeave: () => onHover(null),
    onFocus: () => onHover(node.id),
    onBlur: () => onHover(null),
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onSelect(node.id)
      } else if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(e.key) && !e.shiftKey) {
        e.preventDefault()
        onKeyNav(node.id, e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1)
      }
    },
  } : {}
  return (
    <g
      className={`ac-node ${interactive ? 'ac-node--interactive' : ''} ${state}`}
      data-cat={node.cat}
      style={{ '--r': node.rank }}
      {...interaction}
    >
      <rect className="ac-node__box" x={node.x} y={node.y} width={node.w} height={node.h} rx={node.variant === 'state' ? 14 : 3} />
      <NodeText node={node} />
    </g>
  )
}
