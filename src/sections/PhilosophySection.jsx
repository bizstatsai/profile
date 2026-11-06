import { useMemo, useState } from 'react'
import { philosophy } from '../data/narrative'
import { SectionHead } from '../components/layout/SectionContainer'
import { useInViewOnce } from '../lib/hooks'

/**
 * An optical drawing of the section's claim: scattered rays (a business challenge)
 * pass through a layered lens (technology, the medium) and resolve to one point (an outcome).
 * The drawing's three zones line up with the three principles below it.
 */
const W = 1200
const H = 470
const CY = 262
const LENS_X = 600
const LENS_R = 168
const FOCUS_X = 948
const RAYS = 19

// Rounded: browsers and the build disagree on the last digit of a sine.
const fix = (n) => Number(n.toFixed(2))

const lensEdge = (offset, dy) => {
  const bulge = Math.sqrt(Math.max(0, 1 - (dy / LENS_R) ** 2))
  return fix(LENS_X + offset * bulge)
}

const SLICES = [-112, -56, 0, 56, 112]

function buildRays() {
  const rays = []
  for (let i = 0; i < RAYS; i++) {
    const t = (i / (RAYS - 1)) * 2 - 1
    const scatter = Math.sin(i * 2.399) * 196
    const startX = fix(8 + Math.abs(Math.sin(i * 1.7)) * 210)
    const y0 = fix(CY + scatter)
    const dyIn = t * 150
    const points = SLICES.map((offset, s) => {
      const f = s / (SLICES.length - 1)
      const dy = dyIn * (1 - f * 0.44)
      return [lensEdge(offset, dy), fix(CY + dy)]
    })
    const last = points.at(-1)
    rays.push({
      left: `M${startX} ${y0}L${points[0][0]} ${points[0][1]}`,
      mid: `M${points.map(p => p.join(' ')).join('L')}`,
      right: `M${last[0]} ${last[1]}L${FOCUS_X} ${CY}`,
      full: `M${startX} ${y0}L${points.map(p => p.join(' ')).join('L')}L${FOCUS_X} ${CY}`,
    })
  }
  return rays
}

const arc = (offset) => {
  const steps = 48
  let d = ''
  for (let i = 0; i <= steps; i++) {
    const a = -Math.PI / 2 + (i / steps) * Math.PI
    d += `${i ? 'L' : 'M'}${(LENS_X + offset * Math.cos(a)).toFixed(1)} ${(CY + LENS_R * Math.sin(a)).toFixed(1)}`
  }
  return d
}

const LEADER_DY = -122
const sliceX = (i) => (lensEdge(SLICES[i], LEADER_DY) + lensEdge(SLICES[i + 1], LEADER_DY)) / 2

function OpticsWide({ zone, rays, seen }) {
  const labelX = [465, 563, 661, 759]
  return (
    <svg
      className={`optics optics--wide ${seen ? 'is-seen' : ''}`}
      data-zone={zone ?? undefined}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Scattered rays labelled ${philosophy.input} pass through a lens of four layers: ${philosophy.medium.join(', ')}. They converge on a single point labelled ${philosophy.output}.`}
    >
      <defs>
        <linearGradient id="ray-in" gradientUnits="userSpaceOnUse" x1="0" x2="440" y1="0" y2="0">
          <stop offset="0" stopColor="var(--cat-neutral)" stopOpacity="0.28" />
          <stop offset="1" stopColor="var(--cat-source)" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="ray-mid" gradientUnits="userSpaceOnUse" x1="480" x2="720" y1="0" y2="0">
          <stop offset="0" stopColor="var(--cat-source)" />
          <stop offset="1" stopColor="var(--cat-ai)" />
        </linearGradient>
        <linearGradient id="ray-out" gradientUnits="userSpaceOnUse" x1="712" x2={FOCUS_X} y1="0" y2="0">
          <stop offset="0" stopColor="var(--cat-ai)" stopOpacity="0.85" />
          <stop offset="1" stopColor="var(--cat-consumption)" />
        </linearGradient>
        <radialGradient id="focus-glow">
          <stop offset="0" stopColor="var(--cat-consumption)" stopOpacity="0.5" />
          <stop offset="1" stopColor="var(--cat-consumption)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className="optics__zone optics__zone--in">
        <text className="optics__label" x="0" y="44">{philosophy.input}</text>
        {rays.map(r => <path key={r.left} d={r.left} stroke="url(#ray-in)" className="optics__ray" />)}
      </g>

      <g className="optics__zone optics__zone--mid">
        {SLICES.map(offset => <path key={offset} d={arc(offset)} className="optics__lens" />)}
        {philosophy.medium.map((name, i) => {
          const [a, b] = name.split(' ')
          return (
            <g key={name}>
              <text className="optics__label optics__label--mid" x={labelX[i]} y="24" textAnchor="middle">
                <tspan x={labelX[i]}>{a}</tspan>
                <tspan x={labelX[i]} dy="16">{b}</tspan>
              </text>
              <path className="optics__leader" d={`M${labelX[i]} 50L${sliceX(i)} ${CY + LEADER_DY}`} />
            </g>
          )
        })}
        {rays.map(r => <path key={r.mid} d={r.mid} stroke="url(#ray-mid)" className="optics__ray optics__ray--mid" />)}
      </g>

      <g className="optics__zone optics__zone--out">
        <text className="optics__label optics__label--out" x={W} y="44" textAnchor="end">{philosophy.output}</text>
        {rays.map(r => <path key={r.right} d={r.right} stroke="url(#ray-out)" className="optics__ray" />)}
        <circle cx={FOCUS_X} cy={CY} r="64" fill="url(#focus-glow)" />
        <path className="optics__beam" d={`M${FOCUS_X} ${CY}H${W - 2}`} />
        <circle className="optics__focus" cx={FOCUS_X} cy={CY} r="5" />
        <path className="optics__leader" d={`M${W - 90} 58V${CY - 4}`} />
      </g>

      {rays.filter((_, i) => i % 3 === 1).map((r, i) => (
        <path key={r.full} d={r.full} pathLength="1" className="optics__pulse" style={{ '--i': i }} />
      ))}
    </svg>
  )
}

/** On a phone the same rays run down a spine beside the text, one piece per principle. */
function OpticsSpine({ rays, part }) {
  const flip = (d) => d.replace(/(-?[\d.]+) (-?[\d.]+)/g, (_, x, y) => `${y} ${x}`)
  const ranges = { left: [0, 466], mid: [466, 734], right: [734, 948] }
  const [from, to] = ranges[part]
  return (
    <svg className="optics-spine" viewBox={`0 ${from} ${H} ${to - from}`} preserveAspectRatio="none" aria-hidden="true">
      {rays.map(r => <path key={r[part]} d={flip(r[part])} data-part={part} vectorEffect="non-scaling-stroke" />)}
    </svg>
  )
}

export default function PhilosophySection() {
  const [zone, setZone] = useState(null)
  const rays = useMemo(buildRays, [])
  const [ref, seen] = useInViewOnce()
  const zones = ['in', 'mid', 'out']
  const parts = ['left', 'mid', 'right']
  const pieces = [
    <p key="in" className="optics-piece tech">{philosophy.input}</p>,
    <p key="mid" className="optics-piece tech">{philosophy.medium.join(', ')}</p>,
    <p key="out" className="optics-piece tech">{philosophy.output}</p>,
  ]

  return (
    <>
      <SectionHead n="02" label={philosophy.label} headline={philosophy.headline} lead={philosophy.lead} />
      <div ref={ref} className="philosophy">
        <OpticsWide zone={zone} rays={rays} seen={seen} />
        <ol className="philosophy__principles">
          {philosophy.principles.map((p, i) => (
            <li
              key={p.n}
              onMouseEnter={() => setZone(zones[i])}
              onMouseLeave={() => setZone(null)}
            >
              <OpticsSpine rays={rays} part={parts[i]} />
              <div className="philosophy__principle">
                {pieces[i]}
                <span className="philosophy__n tech" aria-hidden="true">{p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="philosophy__context">{philosophy.context}</p>
      </div>
    </>
  )
}
