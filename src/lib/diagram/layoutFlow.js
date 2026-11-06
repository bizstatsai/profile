import { TYPE, wrap, textWidth } from './text'

const PAD_X = 13
const PAD_Y = 11
const GLYPH = 19
const GROUP_PAD = 20
const GROUP_TITLE = 26

const edgeKey = (e, i, all) => {
  const base = `${e.from}>${e.to}`
  const earlier = all.slice(0, i).filter(x => x.from === e.from && x.to === e.to).length
  return earlier ? `${base}#${earlier}` : base
}

function axis(sizes, margin) {
  const centers = []
  let cursor = margin
  for (const size of sizes) {
    centers.push(cursor + size / 2)
    cursor += size
  }
  return (pos) => {
    const lo = Math.min(Math.floor(pos), centers.length - 1)
    const hi = Math.min(lo + 1, centers.length - 1)
    const step = hi > lo ? centers[hi] - centers[lo] : sizes[lo]
    return centers[lo] + step * (pos - lo)
  }
}

function measureNode(node, width) {
  if (node.pseudo) return { w: 14, h: 14, titleLines: [], subLines: [], memberLines: [] }
  const titleChars = Math.floor((width - PAD_X * 2 - GLYPH) / TYPE.title.char)
  const subChars = Math.floor((width - PAD_X * 2) / TYPE.sub.char)
  const memberChars = Math.floor((width - PAD_X * 2) / TYPE.member.char)
  const titleLines = wrap(node.title, titleChars)
  const subLines = (node.sub ?? []).flatMap(s => wrap(s, subChars))
  const memberLines = (node.members ?? []).flatMap(s => wrap(s, memberChars))
  const h = PAD_Y * 2
    + titleLines.length * TYPE.title.lh
    + (subLines.length ? 3 + subLines.length * TYPE.sub.lh : 0)
    + (memberLines.length ? 9 + memberLines.length * TYPE.member.lh : 0)
  return { w: width, h, titleLines, subLines, memberLines }
}

const horizontal = (s) => s === 'l' || s === 'r'

const sidePoint = (rect, side, at = 0.5) => {
  const left = rect.x
  const top = rect.y
  if (side === 'l') return [left, top + rect.h * at]
  if (side === 'r') return [left + rect.w, top + rect.h * at]
  if (side === 't') return [left + rect.w * at, top]
  return [left + rect.w * at, top + rect.h]
}

/** Fraction along a side for an anchor given as a drawing coordinate. */
const anchor = (rect, side, coord, fallback) => {
  if (coord == null) return fallback
  return horizontal(side) ? (coord - rect.y) / rect.h : (coord - rect.x) / rect.w
}

function autoSides(a, b, dir) {
  const ax = a.x + a.w / 2
  const ay = a.y + a.h / 2
  const bx = b.x + b.w / 2
  const by = b.y + b.h / 2
  const gapX = Math.abs(bx - ax) - (a.w + b.w) / 2
  const gapY = Math.abs(by - ay) - (a.h + b.h) / 2
  const preferVertical = dir === 'TB' && gapY > 0
  const preferHorizontal = dir === 'LR' && gapX > 0
  if (preferHorizontal || (gapX >= gapY && !preferVertical)) return bx > ax ? ['r', 'l'] : ['l', 'r']
  return by > ay ? ['b', 't'] : ['t', 'b']
}

function polyline(p, q, fromSide, toSide, route) {
  if (route.via) {
    // 'p' and 'q' stand for the matching coordinate of either end, so a route can
    // follow a lane without hard-coding where the anchors land.
    const pick = (v, i) => (v === 'p' ? p[i] : v === 'q' ? q[i] : v)
    return [p, ...route.via.map(([x, y]) => [pick(x, 0), pick(y, 1)]), q]
  }
  const out = route.out ?? 26
  if (horizontal(fromSide) && horizontal(toSide)) {
    if (fromSide === toSide) {
      const x = fromSide === 'r' ? Math.max(p[0], q[0]) + out : Math.min(p[0], q[0]) - out
      return [p, [x, p[1]], [x, q[1]], q]
    }
    if (Math.abs(p[1] - q[1]) < 0.5) return [p, [q[0], p[1]]]
    const x = route.midX ?? p[0] + (q[0] - p[0]) * (route.mid ?? 0.5)
    return [p, [x, p[1]], [x, q[1]], q]
  }
  if (!horizontal(fromSide) && !horizontal(toSide)) {
    if (fromSide === toSide) {
      const y = fromSide === 'b' ? Math.max(p[1], q[1]) + out : Math.min(p[1], q[1]) - out
      return [p, [p[0], y], [q[0], y], q]
    }
    if (Math.abs(p[0] - q[0]) < 0.5) return [p, [p[0], q[1]]]
    const y = route.midY ?? p[1] + (q[1] - p[1]) * (route.mid ?? 0.5)
    return [p, [p[0], y], [q[0], y], q]
  }
  if (horizontal(fromSide)) return [p, [q[0], p[1]], q]
  return [p, [p[0], q[1]], q]
}

function roundedPath(points, radius = 8) {
  let d = `M${points[0][0]} ${points[0][1]}`
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i - 1]
    const [cx, cy] = points[i]
    const [nx, ny] = points[i + 1]
    const inLen = Math.hypot(cx - px, cy - py)
    const outLen = Math.hypot(nx - cx, ny - cy)
    const r = Math.min(radius, inLen / 2, outLen / 2)
    if (r < 0.5) {
      d += `L${cx} ${cy}`
      continue
    }
    const ax = cx - ((cx - px) / inLen) * r
    const ay = cy - ((cy - py) / inLen) * r
    const bx = cx + ((nx - cx) / outLen) * r
    const by = cy + ((ny - cy) / outLen) * r
    d += `L${ax} ${ay}Q${cx} ${cy} ${bx} ${by}`
  }
  const last = points.at(-1)
  return `${d}L${last[0]} ${last[1]}`
}

function selfLoop(rect, route) {
  const size = route.out ?? 34
  const x = rect.x + rect.w
  const y = rect.y + rect.h * 0.35
  const top = rect.y - size
  const px = rect.x + rect.w * 0.72
  return [[x, y], [x + size, y], [x + size, top], [px, top], [px, rect.y]]
}

function pointAlong(points, fraction) {
  const lengths = points.slice(1).map((pt, i) => Math.hypot(pt[0] - points[i][0], pt[1] - points[i][1]))
  const total = lengths.reduce((a, b) => a + b, 0)
  let remaining = total * fraction
  for (let i = 0; i < lengths.length; i++) {
    if (remaining <= lengths[i]) {
      const t = lengths[i] ? remaining / lengths[i] : 0
      return [
        points[i][0] + (points[i + 1][0] - points[i][0]) * t,
        points[i][1] + (points[i + 1][1] - points[i][1]) * t,
      ]
    }
    remaining -= lengths[i]
  }
  return points.at(-1)
}

function longestSegmentMid(points) {
  let best = 0
  let mid = points[0]
  for (let i = 1; i < points.length; i++) {
    const len = Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1])
    if (len > best) {
      best = len
      mid = [(points[i][0] + points[i - 1][0]) / 2, (points[i][1] + points[i - 1][1]) / 2]
    }
  }
  return mid
}

/** Longest-path rank from the roots, used to stagger reveal and flow animation. */
function ranks(nodes, edges) {
  const rank = Object.fromEntries(nodes.map(n => [n.id, 0]))
  const solid = edges.filter(e => !e.dashed && e.from !== e.to)
  for (let pass = 0; pass < nodes.length; pass++) {
    for (const e of solid) {
      if (rank[e.from] === undefined || rank[e.to] === undefined) continue
      const next = rank[e.from] + 1
      if (next > rank[e.to] && next <= nodes.length) rank[e.to] = next
    }
  }
  return rank
}

export function layoutFlow(model, spec) {
  const margin = spec.margin ?? 16
  // With px, positions are drawing coordinates instead of grid places.
  const col = spec.px ? (x) => x : axis(spec.cols, margin)
  const row = spec.px ? (y) => y : axis(spec.rows, margin)
  const groupIds = new Set((model.groups ?? []).map(g => g.id))

  const rects = {}
  const nodes = model.nodes
    .filter(n => !groupIds.has(n.id))
    .map((n) => {
      const at = spec.at[n.id]
      if (!at) throw new Error(`${model.id}: no position for node ${n.id}`)
      const width = spec.size?.[n.id] ?? spec.nodeW
      const m = measureNode(n, width)
      const height = Math.max(m.h, n.pseudo ? 0 : spec.minH ?? 0)
      const rect = { x: col(at[0]) - m.w / 2, y: row(at[1]) - height / 2, w: m.w, h: height }
      rects[n.id] = rect
      return { ...n, ...m, ...rect, group: spec.groupOf?.[n.id] ?? n.group }
    })

  const groups = (model.groups ?? []).map(g => ({ ...g }))
  const depth = (g) => (g.parent ? 1 + depth(groups.find(x => x.id === g.parent)) : 0)
  ;[...groups].sort((a, b) => depth(b) - depth(a)).forEach((g) => {
    const members = [
      ...nodes.filter(n => n.group === g.id),
      ...groups.filter(c => c.parent === g.id && c.w),
    ]
    if (!members.length) return
    const left = Math.min(...members.map(m => m.x)) - GROUP_PAD
    const top = Math.min(...members.map(m => m.y)) - GROUP_PAD - GROUP_TITLE + 8
    const right = Math.max(...members.map(m => m.x + m.w)) + GROUP_PAD
    const bottom = Math.max(...members.map(m => m.y + m.h)) + GROUP_PAD
    Object.assign(g, { x: left, y: top, w: right - left, h: bottom - top })
    rects[g.id] = g
  })

  // First pass: choose sides, so anchors can be spread along each side.
  const planned = model.edges.map((e, i, all) => {
    const key = edgeKey(e, i, all)
    const route = spec.routes?.[key] ?? {}
    const a = rects[e.from]
    const b = rects[e.to]
    if (!a || !b) throw new Error(`${model.id}: edge ${key} has no endpoint`)
    const [fromSide, toSide] = route.sides ?? autoSides(a, b, spec.dir)
    return { ...e, key, route, a, b, fromSide, toSide }
  })

  const slots = {}
  const addSlot = (id, side, edge, end, other) => {
    const k = `${id}:${side}`
    slots[k] = slots[k] ?? []
    slots[k].push({ edge, end, other })
  }
  planned.forEach((e) => {
    if (e.from === e.to) return
    addSlot(e.from, e.fromSide, e, 'from', e.b)
    addSlot(e.to, e.toSide, e, 'to', e.a)
  })
  Object.entries(slots).forEach(([k, list]) => {
    const side = k.split(':').at(-1)
    list.sort((p, q) => horizontal(side)
      ? (p.other.y + p.other.h / 2) - (q.other.y + q.other.h / 2)
      : (p.other.x + p.other.w / 2) - (q.other.x + q.other.w / 2))
    const bus = spec.bus?.includes(k)
    list.forEach((slot, i) => {
      slot.edge[`${slot.end}At`] = bus ? 0.5 : (i + 1) / (list.length + 1)
    })
  })

  const edges = planned.map((e) => {
    const { route } = e
    let points
    if (e.from === e.to) {
      points = selfLoop(e.a, route)
    } else {
      const p = sidePoint(e.a, e.fromSide, anchor(e.a, e.fromSide, route.from ?? route.along, route.fromAt ?? e.fromAt))
      const q = sidePoint(e.b, e.toSide, anchor(e.b, e.toSide, route.to ?? route.along, route.toAt ?? e.toAt))
      points = polyline(p, q, e.fromSide, e.toSide, route)
    }
    const [lx0, ly0] = points.at(-2)
    const [lx1, ly1] = points.at(-1)
    const angle = (Math.atan2(ly1 - ly0, lx1 - lx0) * 180) / Math.PI

    let label = null
    if (e.label && !route.noLabel) {
      const lines = wrap(e.label, route.labelChars ?? spec.labelChars ?? 26)
      const mid = route.labelPos ?? (route.labelAt != null ? pointAlong(points, route.labelAt) : longestSegmentMid(points))
      const w = textWidth(lines, TYPE.label) + 8
      const h = lines.length * TYPE.label.lh + 4
      label = {
        lines,
        x: mid[0] + (route.labelDx ?? 0),
        y: mid[1] + (route.labelDy ?? 0),
        w,
        h,
      }
    }
    return {
      key: e.key,
      from: e.from,
      to: e.to,
      dashed: e.dashed,
      text: e.label,
      points,
      d: roundedPath(points),
      tip: points.at(-1),
      angle,
      label,
    }
  })

  const rank = ranks(nodes, model.edges)
  nodes.forEach((n) => { n.rank = rank[n.id] ?? 0 })
  edges.forEach((e) => { e.rank = rank[e.from] ?? 0 })

  // Fit the view to everything drawn.
  const xs = []
  const ys = []
  const include = (x, y) => {
    xs.push(x)
    ys.push(y)
  }
  nodes.forEach((n) => { include(n.x, n.y); include(n.x + n.w, n.y + n.h) })
  groups.filter(g => g.w).forEach((g) => { include(g.x, g.y); include(g.x + g.w, g.y + g.h) })
  edges.forEach((e) => {
    e.points.forEach(([x, y]) => include(x, y))
    if (e.label) {
      include(e.label.x - e.label.w / 2, e.label.y - e.label.h / 2)
      include(e.label.x + e.label.w / 2, e.label.y + e.label.h / 2)
    }
  })
  const pad = spec.viewPad ?? 14
  const minX = Math.min(...xs) - pad
  const minY = Math.min(...ys) - pad
  const width = Math.max(...xs) + pad - minX
  const height = Math.max(...ys) + pad - minY

  return {
    viewBox: { x: minX, y: minY, w: width, h: height },
    nodes,
    groups: groups.filter(g => g.w),
    edges,
  }
}

/** Ids of everything inside a layer: its components, its nested layers and theirs. */
export function layerMembers(nodes, groups, id) {
  const members = new Set([id])
  const walk = (parent) => {
    nodes.filter(n => n.group === parent).forEach(n => members.add(n.id))
    groups.filter(g => g.parent === parent).forEach((g) => {
      members.add(g.id)
      walk(g.id)
    })
  }
  walk(id)
  return members
}

/** Layout problems a person would otherwise have to spot by eye. Used by the tests. */
export function lintLayout(layout) {
  const problems = []
  const { nodes, edges } = layout
  const overlap = (a, b, tol = 0) =>
    a.x < b.x + b.w - tol && a.x + a.w > b.x + tol && a.y < b.y + b.h - tol && a.y + a.h > b.y + tol

  nodes.forEach((a, i) => nodes.slice(i + 1).forEach((b) => {
    if (overlap(a, b)) problems.push(`nodes overlap: ${a.id} / ${b.id}`)
  }))

  nodes.filter(n => !n.pseudo).forEach((n) => {
    const room = n.w - PAD_X * 2
    n.titleLines.forEach((line) => {
      if (line.length * TYPE.title.char > room - GLYPH) problems.push(`title overflows ${n.id}: ${line}`)
    })
    n.subLines.forEach((line) => {
      if (line.length * TYPE.sub.char > room) problems.push(`text overflows ${n.id}: ${line}`)
    })
    n.memberLines.forEach((line) => {
      if (line.length * TYPE.member.char > room) problems.push(`member overflows ${n.id}: ${line}`)
    })
  })

  edges.forEach((e) => {
    if (e.points.some(([x, y]) => Number.isNaN(x) || Number.isNaN(y))) problems.push(`bad coordinate: ${e.key}`)
    e.points.slice(1).forEach((pt, i) => {
      const prev = e.points[i]
      const dx = Math.abs(pt[0] - prev[0])
      const dy = Math.abs(pt[1] - prev[1])
      if (dx > 0.5 && dy > 0.5) problems.push(`diagonal segment: ${e.key}`)
      const seg = {
        x: Math.min(pt[0], prev[0]) - 0.5,
        y: Math.min(pt[1], prev[1]) - 0.5,
        w: dx + 1,
        h: dy + 1,
      }
      nodes.forEach((n) => {
        if (n.id === e.from || n.id === e.to) return
        if (overlap(seg, n, 1)) problems.push(`edge ${e.key} crosses node ${n.id}`)
      })
    })
    if (e.label) {
      const box = { x: e.label.x - e.label.w / 2, y: e.label.y - e.label.h / 2, w: e.label.w, h: e.label.h }
      nodes.forEach((n) => {
        if (overlap(box, n, 1)) problems.push(`label of ${e.key} overlaps node ${n.id}`)
      })
      edges.forEach((other) => {
        if (other === e || !other.label) return
        const b = { x: other.label.x - other.label.w / 2, y: other.label.y - other.label.h / 2, w: other.label.w, h: other.label.h }
        if (other.key > e.key && overlap(box, b, 1)) problems.push(`labels overlap: ${e.key} / ${other.key}`)
      })
    }
  })
  return problems
}
