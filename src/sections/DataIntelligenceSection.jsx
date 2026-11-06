import { useEffect, useRef, useState } from 'react'
import { dataJourney, methodology } from '../data/narrative'
import { SectionHead } from '../components/layout/SectionContainer'
import { isMotionOn, subscribeMotion } from '../lib/motion'
import { useOnScreen } from '../lib/hooks'

const STAGE_TOKENS = ['--cat-source', '--cat-source', '--cat-process', '--cat-storage', '--cat-storage', '--cat-ai', '--cat-consumption']
const LANES = [7, 6, 5, 4, 3, 2, 1]
const PARTICLES = 520

const hexToRgb = (value) => {
  const hex = value.trim().replace('#', '')
  return [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16))
}
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t))
const smooth = (t) => t * t * (3 - 2 * t)

/**
 * Data scattered at one end, one decision at the other. Each particle keeps its own
 * lane; as it advances, lanes merge stage by stage until only a single line remains.
 */
function useRibbon(canvasRef, activeRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')
    let raf = 0
    let w = 0
    let h = 0
    let vertical = false
    let dpr = 1
    let visible = false
    let colors = []
    const stageCount = STAGE_TOKENS.length

    const particles = Array.from({ length: PARTICLES }, (_, i) => ({
      p: (i * 0.618) % 1,
      lane: ((i * 0.7548) % 1) * 2 - 1,
      wobble: (i * 2.399) % (Math.PI * 2),
      speed: 0.018 + ((i * 0.381) % 1) * 0.022,
    }))

    const readColors = () => {
      const s = getComputedStyle(document.documentElement)
      colors = STAGE_TOKENS.map(t => hexToRgb(s.getPropertyValue(t)))
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      vertical = h > w
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      readColors()
    }

    const paint = (time, step) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const along = vertical ? h : w
      const across = vertical ? w : h
      const mid = across / 2
      const active = activeRef.current

      if (!vertical) {
        ctx.strokeStyle = getComputedStyle(canvas).getPropertyValue('--ribbon-rule') || 'rgba(148,163,184,.16)'
        ctx.lineWidth = 1
        for (let i = 1; i < stageCount; i++) {
          const x = Math.round((i / stageCount) * w) + 0.5
          ctx.beginPath()
          ctx.moveTo(x, 0)
          ctx.lineTo(x, h)
          ctx.stroke()
        }
        if (active != null) {
          const c = colors[active]
          ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},0.07)`
          ctx.fillRect((active / stageCount) * w, 0, w / stageCount, h)
        }
      }

      particles.forEach((pt) => {
        pt.p += pt.speed * step
        if (pt.p > 1) pt.p -= 1
        const f = pt.p * stageCount
        const stage = Math.min(stageCount - 1, Math.floor(f))
        const frac = f - stage
        const lanesHere = LANES[stage]
        const lanesNext = LANES[Math.min(stageCount - 1, stage + 1)]
        const snap = (n) => (n === 1 ? 0 : (Math.round(((pt.lane + 1) / 2) * (n - 1)) / (n - 1)) * 2 - 1)
        const laneValue = snap(lanesHere) + (snap(lanesNext) - snap(lanesHere)) * smooth(frac)
        // Chaos at the start resolves to structure within the first two stages.
        const order = smooth(Math.min(1, f / 1.7))
        const chaos = pt.lane * 0.9 + Math.sin(time * 0.0006 + pt.wobble) * 0.32
        const spread = (across * 0.45) * (1 - 0.82 * smooth(pt.p))
        const offset = (chaos * (1 - order) + laneValue * order) * spread
        const a = pt.p * along
        const b = mid + offset
        const color = mix(colors[stage], colors[Math.min(stageCount - 1, stage + 1)], frac)
        const inActive = active == null || stage === active
        const alpha = (inActive ? 0.95 : 0.55) * Math.min(1, pt.p * 20, (1 - pt.p) * 20)
        const streak = 3 + 11 * order
        ctx.strokeStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha})`
        ctx.lineWidth = 1.1 + 0.5 * pt.p
        ctx.lineCap = 'round'
        ctx.beginPath()
        if (vertical) {
          ctx.moveTo(b, a - streak)
          ctx.lineTo(b, a)
        } else {
          ctx.moveTo(a - streak, b)
          ctx.lineTo(a, b)
        }
        ctx.stroke()
      })

      // The single line it all resolves to.
      const tail = colors[stageCount - 1]
      ctx.strokeStyle = `rgba(${tail[0]},${tail[1]},${tail[2]},0.9)`
      ctx.lineWidth = 1.5
      ctx.beginPath()
      if (vertical) {
        ctx.moveTo(mid, along * 0.92)
        ctx.lineTo(mid, along)
      } else {
        ctx.moveTo(along * 0.93, mid)
        ctx.lineTo(along, mid)
      }
      ctx.stroke()
    }

    let last = 0
    const loop = (now) => {
      raf = 0
      if (!visible || document.hidden || !isMotionOn()) return
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016)
      last = now
      paint(now, dt)
      raf = requestAnimationFrame(loop)
    }

    const kick = () => {
      if (!raf && visible && !document.hidden && isMotionOn()) {
        last = performance.now()
        raf = requestAnimationFrame(loop)
      } else if (!isMotionOn() || !visible) {
        paint(1000, 0)
      }
    }

    const ro = new ResizeObserver(() => {
      resize()
      paint(1000, 0)
      kick()
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      kick()
    }, { rootMargin: '80px' })
    io.observe(canvas)
    const unsubscribe = subscribeMotion(kick)
    const onTheme = () => {
      readColors()
      paint(1000, 0)
    }
    window.addEventListener('themechange', onTheme)

    resize()
    paint(1000, 0)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      unsubscribe()
      window.removeEventListener('themechange', onTheme)
    }
  }, [canvasRef, activeRef])
}

function IntelligenceStack() {
  const motionRef = useRef(null)
  const onScreen = useOnScreen(motionRef)
  return (
    <div ref={motionRef} className={`stack ${onScreen ? 'is-on' : ''}`}>
      <div className="stack__flow stack__flow--up" aria-hidden="true"><span>Data flows up</span></div>
      <ol className="stack__layers" aria-label="The Intelligence Stack, from top to bottom">
        {methodology.layers.map(layer => (
          <li key={layer.name} data-cat={layer.cat}>
            <h4>{layer.name}</h4>
            <p>{layer.description}</p>
          </li>
        ))}
      </ol>
      <div className="stack__flow stack__flow--down" aria-hidden="true"><span>Governance flows down</span></div>
      <p className="sr-only">Data flows up through the layers. Governance flows down.</p>
    </div>
  )
}

export default function DataIntelligenceSection() {
  const [active, setActive] = useState(0)
  const canvas = useRef(null)
  const activeRef = useRef(0)
  activeRef.current = active
  useRibbon(canvas, activeRef)
  const { stages } = dataJourney

  const onKey = (e, i) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (i + dir + stages.length) % stages.length
    setActive(next)
    e.currentTarget.parentElement.querySelectorAll('button')[next]?.focus()
  }

  return (
    <>
      <SectionHead n="04" label={dataJourney.label} headline={dataJourney.headline} lead={dataJourney.lead} />
      <p className="concept-note tech">{dataJourney.note}</p>

      <div className="journey">
        <canvas ref={canvas} className="journey__ribbon" aria-hidden="true" />

        <div className="journey__tabs" role="tablist" aria-label="Stages from business data to business decisions">
          {stages.map((stage, i) => (
            <button
              key={stage.id}
              type="button"
              role="tab"
              id={`stage-tab-${stage.id}`}
              aria-selected={i === active}
              aria-controls={`stage-${stage.id}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={e => onKey(e, i)}
            >
              <span className="tech" aria-hidden="true">{i + 1}</span>
              {stage.name}
            </button>
          ))}
        </div>

        <div className="journey__stages">
          {stages.map((stage, i) => (
            <div
              key={stage.id}
              id={`stage-${stage.id}`}
              className={`journey__stage ${i === active ? 'is-active' : ''}`}
              role="tabpanel"
              aria-labelledby={`stage-tab-${stage.id}`}
            >
              <header>
                <span className="tech journey__n" aria-hidden="true">{i + 1}</span>
                <h3>{stage.name}</h3>
              </header>
              <div className="journey__what">
                <p className="journey__explain">{stage.explanation}</p>
              </div>
              <div>
                <h4 className="tech">What it is responsible for</h4>
                <p>{stage.responsibility}</p>
              </div>
              <div>
                <h4 className="tech">Documented in the work</h4>
                <ul className="tag-list journey__tech">
                  {stage.documented.map(t => <li key={t}>{t}</li>)}
                </ul>
              </div>
              {stage.next && (
                <div>
                  <h4 className="tech">Hand-off to the next stage</h4>
                  <p>{stage.next}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div id="methodology" className="method">
        <div className="method__intro">
          <h3>{methodology.name}</h3>
          <p className="method__tagline">{methodology.tagline}</p>
          <p>{methodology.description}</p>
        </div>
        <IntelligenceStack />
        <ol className="method__principles" aria-label="Six principles of the method">
          {methodology.principles.map(p => (
            <li key={p.title}>
              <h4>{p.title}</h4>
              <p>{p.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}
