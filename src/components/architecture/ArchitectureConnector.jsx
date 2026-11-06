import { TYPE } from '../../lib/diagram/text'

export function DataFlowArrow({ x, y, angle }) {
  return <path className="ac-arrow" d="M-7.500-4 0 0-7.500 4" transform={`translate(${x} ${y}) rotate(${angle})`} />
}

export function ConnectorLabel({ label }) {
  if (!label) return null
  const { x, y, w, h, lines } = label
  const top = y - ((lines.length - 1) * TYPE.label.lh) / 2 + 4
  return (
    <g className="ac-edge__label">
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={2} />
      <text x={x} y={top} textAnchor="middle">
        {lines.map((line, i) => (
          <tspan key={line + i} x={x} dy={i ? TYPE.label.lh : 0}>{line}</tspan>
        ))}
      </text>
    </g>
  )
}

export default function ArchitectureConnector({ edge, state }) {
  return (
    <g className={`ac-edge ${edge.dashed ? 'ac-edge--dashed' : ''} ${state}`} style={{ '--r': edge.rank }}>
      <path className="ac-edge__line" d={edge.d} pathLength={edge.dashed ? undefined : 1} />
      {!edge.dashed && <path className="ac-edge__pulse" d={edge.d} pathLength={1} />}
      <DataFlowArrow x={edge.tip[0]} y={edge.tip[1]} angle={edge.angle} />
    </g>
  )
}
