const MARK_SIZE = 8

/**
 * A named boundary around components, such as a subgraph or a nested state region.
 * On an interactive drawing its name opens the layer: the rest dims and the inspector lists what it holds.
 */
export default function ArchitectureLayer({ group, state = '', open = false, onToggle }) {
  const titleY = group.y + 18
  if (!onToggle) {
    return (
      <g className={`ac-layer ${state}`}>
        <rect className="ac-layer__box" x={group.x} y={group.y} width={group.w} height={group.h} rx={4} />
        <text x={group.x + 12} y={titleY}>{group.title}</text>
      </g>
    )
  }
  const markX = group.x + 12
  const markY = titleY - 8
  const half = MARK_SIZE / 2
  const toggle = (e) => {
    e.stopPropagation()
    onToggle(group.id)
  }
  return (
    <g className={`ac-layer ${open ? 'is-open' : ''} ${state}`}>
      <rect className="ac-layer__box" x={group.x} y={group.y} width={group.w} height={group.h} rx={4} />
      <g
        className="ac-layer__toggle"
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-label={`${group.title}: ${open ? 'close' : 'open'} this layer`}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggle(e)
          }
        }}
      >
        <rect className="ac-layer__hit" x={group.x + 5} y={group.y + 3} width={group.title.length * 6.6 + 30} height={22} rx={3} />
        <path
          className="ac-layer__mark"
          d={`M${markX} ${markY + half}h${MARK_SIZE}${open ? '' : `M${markX + half} ${markY}v${MARK_SIZE}`}`}
        />
        <text x={markX + MARK_SIZE + 6} y={titleY}>{group.title}</text>
      </g>
    </g>
  )
}
