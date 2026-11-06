import { useEffect, useRef } from 'react'
import { isMotionOn, subscribeMotion } from '../../lib/motion'

/**
 * The opening image: an exploded axonometric drawing of an enterprise, plane by plane,
 * from data streams up to business decisions. It is a concept drawing, not a system diagram.
 * Each plane is painted once to its own offscreen canvas, so a frame is only a few
 * image draws plus the moving pulses.
 */
const LAYERS = [
  { key: 'streams', label: 'Data streams', token: '--cat-source' },
  { key: 'cloud', label: 'Cloud infrastructure', token: '--cat-process' },
  { key: 'knowledge', label: 'Knowledge network', token: '--cat-storage' },
  { key: 'intelligence', label: 'Intelligent systems', token: '--cat-ai' },
  { key: 'decisions', label: 'Business decisions', token: '--cat-consumption' },
]

const STREAMS = [-0.78, -0.52, -0.26, 0, 0.26, 0.52, 0.78].map((v, i) => [
  [-1, v], [-0.3 + i * 0.08, v], [-0.2 + i * 0.08, v + (i % 2 ? 0.1 : -0.1)], [1, v + (i % 2 ? 0.1 : -0.1)],
])

const PODS = []
for (let i = 0; i < 6; i++) {
  for (let j = 0; j < 6; j++) {
    PODS.push({ u: -0.75 + i * 0.3, v: -0.75 + j * 0.3, on: (i * 3 + j * 5) % 4 === 0 })
  }
}
const CLOUD_ROUTES = [
  [[-0.75, -0.75], [-0.15, -0.75], [-0.15, 0.15], [0.75, 0.15]],
  [[-0.75, 0.45], [0.15, 0.45], [0.15, -0.45], [0.75, -0.45]],
  [[-0.45, 0.75], [-0.45, -0.15], [0.45, -0.15], [0.45, 0.75]],
]

const GRAPH_NODES = [
  [-0.72, -0.4], [-0.5, 0.25], [-0.25, -0.62], [-0.15, -0.05], [-0.28, 0.68], [0.14, 0.32],
  [0.2, -0.42], [0.46, -0.72], [0.52, 0.02], [0.42, 0.62], [0.78, -0.3], [0.8, 0.34],
]
const GRAPH_EDGES = [
  [0, 1], [0, 2], [1, 3], [2, 3], [1, 4], [3, 5], [3, 6], [2, 6], [4, 5], [6, 7], [6, 8], [5, 8], [5, 9], [8, 10], [7, 10], [8, 11], [9, 11],
]

const HUBS = [[-0.48, 0.34], [0.05, -0.42], [0.56, 0.36]]
const HUB_ROUTES = [
  [[-0.48, 0.34], [-0.48, -0.42], [0.05, -0.42]],
  [[0.05, -0.42], [0.56, -0.42], [0.56, 0.36]],
  [[-0.48, 0.34], [0.56, 0.36]],
]

const DECISION_ROUTES = [-0.8, -0.42, 0.42, 0.8, 0].map(v => [
  [-1, v], [-0.34, v * 0.5], [0.22, 0], [0.8, 0],
])

const RISERS = [
  { from: 0, to: 1, at: [-0.15, 0.15] },
  { from: 0, to: 1, at: [0.45, -0.45] },
  { from: 1, to: 2, at: [-0.15, -0.05] },
  { from: 1, to: 2, at: [0.45, 0.02] },
  { from: 2, to: 3, at: [0.14, 0.32] },
  { from: 2, to: 3, at: [0.2, -0.42] },
  { from: 3, to: 4, at: [0.05, -0.42] },
  { from: 3, to: 4, at: [0.56, 0.36] },
]

const ROUTES = [
  STREAMS,
  CLOUD_ROUTES,
  GRAPH_EDGES.map(([a, b]) => [GRAPH_NODES[a], GRAPH_NODES[b]]),
  HUB_ROUTES,
  DECISION_ROUTES,
]

const PULSES_PER_ROUTE = [1, 1, 0.5, 1, 1]

const hexToRgb = (value) => {
  const hex = value.trim().replace('#', '')
  return [0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16))
}
const rgba = (rgb, a) => `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${a})`
const easeOut = (t) => 1 - (1 - t) ** 3
const clamp01 = (t) => Math.min(1, Math.max(0, t))

function buildScene(width, height) {
  const narrow = width < 900
  // The stack gives way, so the longest plane name stays in view.
  const labelRoom = 158
  const size = narrow
    ? Math.min(width * 0.34, height * 0.33)
    : Math.min(width * 0.2, width * 0.325 - labelRoom, height * 0.32, 400)
  return {
    narrow,
    A: size,
    B: size * 0.41,
    gap: size * 0.37,
    cx: narrow ? Math.min(width * 0.4, width - size - labelRoom) : width * 0.668,
    cy: narrow ? height * 0.5 : height * 0.455,
    labelSize: narrow ? 11 : 13,
    showLabels: true,
  }
}

const project = (scene, u, v) => [((u - v) / 2) * scene.A, ((u + v) / 2) * scene.B]

function paintPlane(i, scene, colors, dpr) {
  const { A, B, labelSize } = scene
  const padRight = 190
  const w = Math.ceil(A * 2 + padRight + 24)
  const h = Math.ceil(B * 2 + 24)
  const canvas = document.createElement('canvas')
  canvas.width = w * dpr
  canvas.height = h * dpr
  const ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)
  const ox = A + 12
  const oy = B + 12
  ctx.translate(ox, oy)
  const at = (u, v) => project(scene, u, v)
  const c = colors.layers[i]

  const outline = () => {
    ctx.beginPath()
    ;[[-1, -1], [1, -1], [1, 1], [-1, 1]].forEach(([u, v], n) => {
      const [x, y] = at(u, v)
      if (n) ctx.lineTo(x, y)
      else ctx.moveTo(x, y)
    })
    ctx.closePath()
  }

  outline()
  ctx.fillStyle = rgba(colors.plane, colors.light ? 0.82 : 0.78)
  ctx.fill()
  outline()
  ctx.fillStyle = rgba(c, colors.light ? 0.05 : 0.045)
  ctx.fill()

  ctx.lineWidth = 0.6
  ctx.strokeStyle = rgba(c, colors.light ? 0.16 : 0.11)
  for (let g = -0.75; g <= 0.76; g += 0.25) {
    ctx.beginPath()
    ctx.moveTo(...at(g, -1))
    ctx.lineTo(...at(g, 1))
    ctx.moveTo(...at(-1, g))
    ctx.lineTo(...at(1, g))
    ctx.stroke()
  }

  outline()
  ctx.lineWidth = 1
  ctx.strokeStyle = rgba(c, colors.light ? 0.6 : 0.5)
  ctx.stroke()

  const dotAt = (u, v, r, alpha) => {
    const [x, y] = at(u, v)
    ctx.beginPath()
    ctx.ellipse(x, y, r, r * 0.6, 0, 0, Math.PI * 2)
    ctx.fillStyle = rgba(c, alpha)
    ctx.fill()
  }

  const drawRoute = (route, alpha, width = 0.9) => {
    ctx.beginPath()
    route.forEach(([u, v], n) => {
      const [x, y] = at(u, v)
      if (n) ctx.lineTo(x, y)
      else ctx.moveTo(x, y)
    })
    ctx.lineWidth = width
    ctx.strokeStyle = rgba(c, alpha)
    ctx.stroke()
  }

  if (i === 0) {
    STREAMS.forEach(r => drawRoute(r, colors.light ? 0.5 : 0.36))
  }
  if (i === 1) {
    const pod = 0.085
    PODS.forEach(({ u, v, on }) => {
      ctx.beginPath()
      ;[[-pod, -pod], [pod, -pod], [pod, pod], [-pod, pod]].forEach(([du, dv], n) => {
        const [x, y] = at(u + du, v + dv)
        if (n) ctx.lineTo(x, y)
        else ctx.moveTo(x, y)
      })
      ctx.closePath()
      ctx.lineWidth = 0.8
      ctx.strokeStyle = rgba(c, on ? 0.8 : 0.3)
      ctx.stroke()
      if (on) {
        ctx.fillStyle = rgba(c, 0.26)
        ctx.fill()
      }
    })
    CLOUD_ROUTES.forEach(r => drawRoute(r, 0.28))
  }
  if (i === 2) {
    GRAPH_EDGES.forEach(([a, b]) => drawRoute([GRAPH_NODES[a], GRAPH_NODES[b]], colors.light ? 0.46 : 0.36))
    GRAPH_NODES.forEach(([u, v], n) => dotAt(u, v, n % 3 === 0 ? 3.4 : 2.4, 0.95))
  }
  if (i === 3) {
    HUB_ROUTES.forEach(r => drawRoute(r, 0.34))
    HUBS.forEach(([u, v]) => {
      ;[0.26, 0.18, 0.1].forEach((r, n) => {
        ctx.beginPath()
        for (let t = 0; t <= 48; t++) {
          const a = (t / 48) * Math.PI * 2
          const [x, y] = at(u + Math.cos(a) * r, v + Math.sin(a) * r)
          if (t) ctx.lineTo(x, y)
          else ctx.moveTo(x, y)
        }
        ctx.lineWidth = 0.8
        ctx.strokeStyle = rgba(c, 0.26 + n * 0.22)
        ctx.stroke()
      })
      dotAt(u, v, 3.6, 1)
    })
  }
  if (i === 4) {
    DECISION_ROUTES.forEach(r => drawRoute(r, colors.light ? 0.56 : 0.44))
    dotAt(0.8, 0, 4.6, 1)
    dotAt(0.8, 0, 9, 0.2)
  }

  // Leader line and name, taken from the plane's right corner.
  const [rx, ry] = at(1, -1)
  ctx.beginPath()
  ctx.moveTo(rx, ry)
  ctx.lineTo(rx + 22, ry)
  ctx.lineWidth = 0.8
  ctx.strokeStyle = rgba(c, 0.7)
  ctx.stroke()
  ctx.font = `500 ${labelSize}px "Space Grotesk", system-ui, sans-serif`
  ctx.textBaseline = 'middle'
  ctx.fillStyle = rgba(colors.label, 0.92)
  ctx.fillText(LAYERS[i].label, rx + 28, ry)

  return { canvas, w, h, ox, oy }
}

function routeMetrics(route, scene) {
  const pts = route.map(([u, v]) => project(scene, u, v))
  const lengths = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]))
  return { pts, lengths, total: lengths.reduce((a, b) => a + b, 0) }
}

function pointOn(metric, s) {
  let d = ((s % 1) + 1) % 1 * metric.total
  for (let i = 0; i < metric.lengths.length; i++) {
    if (d <= metric.lengths[i]) {
      const t = metric.lengths[i] ? d / metric.lengths[i] : 0
      return [
        metric.pts[i][0] + (metric.pts[i + 1][0] - metric.pts[i][0]) * t,
        metric.pts[i][1] + (metric.pts[i + 1][1] - metric.pts[i][1]) * t,
      ]
    }
    d -= metric.lengths[i]
  }
  return metric.pts.at(-1)
}

export default function ArchitectureHeroVisual() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf = 0
    let scene = null
    let planes = []
    let colors = null
    let pulses = []
    let risers = []
    let width = 0
    let height = 0
    let dpr = 1
    let visible = true
    let started = performance.now()
    let last = started
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 }

    const readColors = () => {
      const s = getComputedStyle(document.documentElement)
      const get = (name) => s.getPropertyValue(name)
      const light = document.documentElement.dataset.theme === 'light'
      colors = {
        light,
        plane: hexToRgb(get('--bg')),
        label: hexToRgb(get('--ink')),
        layers: LAYERS.map(l => hexToRgb(get(l.token))),
      }
    }

    const build = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      width = rect.width
      height = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      readColors()
      scene = buildScene(width, height)
      planes = LAYERS.map((_, i) => paintPlane(i, scene, colors, dpr))
      pulses = []
      ROUTES.forEach((routes, i) => {
        routes.forEach((route, r) => {
          const metric = routeMetrics(route, scene)
          if (r % Math.round(1 / PULSES_PER_ROUTE[i]) !== 0) return
          pulses.push({
            plane: i,
            metric,
            s: ((r * 0.37 + i * 0.21) % 1),
            speed: 26 / Math.max(metric.total, 1),
            trail: 18 / Math.max(metric.total, 1),
          })
        })
      })
      risers = RISERS.map((r, n) => ({ ...r, offset: (n * 0.29) % 1 }))
    }

    const planeY = (i, t) => {
      const settled = (2 - i) * scene.gap
      const delay = i * 0.13
      const p = isMotionOn() ? easeOut(clamp01((t - delay) / 1.15)) : 1
      return { y: settled + (1 - p) * (i - 2.4) * -scene.gap * 1.4, alpha: p }
    }

    const draw = (now, moving) => {
      const t = (now - started) / 1000
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      pointer.x += (pointer.tx - pointer.x) * 0.04
      pointer.y += (pointer.ty - pointer.y) * 0.04

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      const positions = planes.map((_, i) => {
        const { y, alpha } = planeY(i, t)
        const depth = i - 2
        const idleX = moving ? Math.sin(t * 0.22 + i) * 1.4 : 0
        return {
          x: scene.cx + pointer.x * depth * 7 + idleX,
          y: scene.cy + y + pointer.y * depth * 5,
          alpha,
        }
      })

      planes.forEach((plane, i) => {
        const pos = positions[i]
        ctx.globalAlpha = pos.alpha
        ctx.globalCompositeOperation = 'source-over'
        ctx.drawImage(plane.canvas, pos.x - plane.ox, pos.y - plane.oy, plane.w, plane.h)

        // Risers rise from this plane to the next one.
        risers.filter(r => r.from === i).forEach((r) => {
          const [dx, dy] = project(scene, r.at[0], r.at[1])
          const top = positions[r.to]
          const x0 = pos.x + dx
          const y0 = pos.y + dy
          const x1 = top.x + dx
          const y1 = top.y + dy
          ctx.globalAlpha = Math.min(pos.alpha, top.alpha)
          ctx.beginPath()
          ctx.moveTo(x0, y0)
          ctx.lineTo(x1, y1)
          ctx.lineWidth = 0.7
          ctx.strokeStyle = rgba(colors.layers[i], 0.34)
          ctx.stroke()
          if (moving) {
            const phase = (t * 0.2 + r.offset) % 1
            const py = y0 + (y1 - y0) * phase
            const px = x0 + (x1 - x0) * phase
            ctx.beginPath()
            ctx.arc(px, py, 1.5, 0, Math.PI * 2)
            ctx.fillStyle = rgba(colors.layers[r.to], 0.95)
            ctx.fill()
          }
        })

        ctx.globalCompositeOperation = colors.light ? 'source-over' : 'lighter'
        ctx.lineCap = 'round'
        pulses.filter(p => p.plane === i).forEach((p) => {
          if (moving) p.s = (p.s + p.speed * dt) % 1
          const steps = 5
          for (let k = 0; k < steps; k++) {
            const a = pointOn(p.metric, p.s - (k * p.trail) / steps)
            const b = pointOn(p.metric, p.s - ((k + 1) * p.trail) / steps)
            if (Math.hypot(a[0] - b[0], a[1] - b[1]) > 12) continue
            ctx.beginPath()
            ctx.moveTo(pos.x + a[0], pos.y + a[1])
            ctx.lineTo(pos.x + b[0], pos.y + b[1])
            ctx.lineWidth = 1.5
            ctx.strokeStyle = rgba(colors.layers[i], (1 - k / steps) * 0.95 * pos.alpha)
            ctx.stroke()
          }
        })
        ctx.globalCompositeOperation = 'source-over'
        ctx.globalAlpha = 1
      })
    }

    const loop = (now) => {
      raf = 0
      if (!visible || document.hidden || !isMotionOn()) return
      draw(now, true)
      raf = requestAnimationFrame(loop)
    }

    const kick = () => {
      if (!raf && visible && !document.hidden && isMotionOn()) {
        last = performance.now()
        raf = requestAnimationFrame(loop)
      } else if (!isMotionOn()) {
        started = performance.now() - 5000
        draw(performance.now(), false)
      }
    }

    const rebuild = () => {
      build()
      if (!isMotionOn()) started = performance.now() - 5000
      draw(performance.now(), false)
      kick()
    }

    const onPointer = (e) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const resize = new ResizeObserver(() => {
      const rect = canvas.parentElement.getBoundingClientRect()
      if (Math.abs(rect.width - width) > 1 || Math.abs(rect.height - height) > 1) rebuild()
    })
    resize.observe(canvas.parentElement)

    const view = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      kick()
    })
    view.observe(canvas)

    const onVisibility = () => kick()
    const unsubscribe = subscribeMotion(kick)
    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('themechange', rebuild)
    document.addEventListener('visibilitychange', onVisibility)
    // Labels are painted once onto each plane, so repaint when the real typeface arrives.
    document.fonts?.ready.then(() => {
      if (scene) rebuild()
    })

    rebuild()

    return () => {
      cancelAnimationFrame(raf)
      resize.disconnect()
      view.disconnect()
      unsubscribe()
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('themechange', rebuild)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <div className="hero__visual">
      <canvas
        ref={ref}
        role="img"
        aria-label="Exploded axonometric drawing of an enterprise architecture, with five stacked planes: data streams, cloud infrastructure, a knowledge network, intelligent systems and business decisions. Light moves up through the planes."
      />
    </div>
  )
}
