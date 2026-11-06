import { useCallback, useRef, useState } from 'react'

const MIN = 1
const MAX = 5

/**
 * Zoom and pan held in viewBox units. The page keeps scrolling normally until a
 * drawing is zoomed, except in full screen, where the drawing owns every gesture.
 */
export default function useZoomPan(viewBox, { owned = false } = {}) {
  const [view, setView] = useState({ k: 1, x: 0, y: 0 })
  const pointers = useRef(new Map())
  const pinch = useRef(null)
  const svg = useRef(null)

  const clamp = useCallback((next) => {
    const k = Math.min(MAX, Math.max(MIN, next.k))
    const limitX = (viewBox.w * (k - 1)) / 2
    const limitY = (viewBox.h * (k - 1)) / 2
    return {
      k,
      x: Math.min(limitX, Math.max(-limitX, next.x)),
      y: Math.min(limitY, Math.max(-limitY, next.y)),
    }
  }, [viewBox])

  const zoomBy = useCallback((factor) => {
    setView(v => clamp({ ...v, k: v.k * factor }))
  }, [clamp])

  const panBy = useCallback((dx, dy) => {
    setView(v => clamp({ ...v, x: v.x + dx, y: v.y + dy }))
  }, [clamp])

  const reset = useCallback(() => setView({ k: 1, x: 0, y: 0 }), [])

  const unitsPerPixel = () => {
    const rect = svg.current?.getBoundingClientRect()
    if (!rect?.width) return 1
    return Math.max(viewBox.w / rect.width, viewBox.h / rect.height)
  }

  const onPointerDown = (e) => {
    if (e.target.closest?.('[data-node]') && e.pointerType === 'mouse') return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()]
      pinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y) }
    }
  }

  const onPointerMove = (e) => {
    const prev = pointers.current.get(e.pointerId)
    if (!prev) return
    const next = { x: e.clientX, y: e.clientY }
    pointers.current.set(e.pointerId, next)
    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()]
      const dist = Math.hypot(a.x - b.x, a.y - b.y)
      zoomBy(dist / pinch.current.dist)
      pinch.current.dist = dist
      return
    }
    if (pointers.current.size === 1 && (owned || view.k > 1)) {
      const u = unitsPerPixel()
      panBy((next.x - prev.x) * u, (next.y - prev.y) * u)
    }
  }

  const onPointerUp = (e) => {
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) pinch.current = null
  }

  const onWheel = (e) => {
    if (!owned && !e.ctrlKey && !e.metaKey) return
    e.preventDefault()
    zoomBy(e.deltaY < 0 ? 1.12 : 1 / 1.12)
  }

  const onKeyDown = (e) => {
    if (e.key === '+' || e.key === '=') zoomBy(1.25)
    else if (e.key === '-') zoomBy(0.8)
    else if (e.key === '0') reset()
    else if (e.shiftKey && e.key.startsWith('Arrow')) {
      const step = viewBox.w * 0.06
      e.preventDefault()
      if (e.key === 'ArrowLeft') panBy(step, 0)
      if (e.key === 'ArrowRight') panBy(-step, 0)
      if (e.key === 'ArrowUp') panBy(0, step)
      if (e.key === 'ArrowDown') panBy(0, -step)
    }
  }

  const cx = viewBox.x + viewBox.w / 2
  const cy = viewBox.y + viewBox.h / 2
  const transform = `translate(${view.x + cx} ${view.y + cy}) scale(${view.k}) translate(${-cx} ${-cy})`

  return {
    svg,
    view,
    transform,
    zoomIn: () => zoomBy(1.3),
    zoomOut: () => zoomBy(1 / 1.3),
    reset,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel: onPointerUp,
      onPointerLeave: onPointerUp,
      onWheel,
      onKeyDown,
    },
  }
}
