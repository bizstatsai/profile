import { TYPE, wrap } from './text'

const HEADER_PAD = 11
const ROW_GAP = 16
const LABEL_MIN = 176

/** Number the messages the way Mermaid's autonumber does, and flatten frames. */
export function flattenSteps(steps, autonumber, counter = { n: 0 }, frame = null) {
  const out = []
  steps.forEach((step) => {
    if (step.type === 'message') {
      counter.n += 1
      out.push({ ...step, n: autonumber ? counter.n : null, index: counter.n, frame })
    } else if (step.type === 'note') {
      out.push({ ...step, frame })
    } else if (step.type === 'frame') {
      out.push({ type: 'frameStart', label: step.label, kind: step.kind })
      out.push(...flattenSteps(step.steps, autonumber, counter, step))
      out.push({ type: 'frameEnd' })
    }
  })
  return out
}

export function layoutSequence(model, spec = {}) {
  const margin = 16
  const colW = spec.colW ?? 142
  const headerW = spec.headerW ?? colW - 14
  const count = model.participants.length
  const width = margin * 2 + colW * count
  const headerChars = Math.floor((headerW - HEADER_PAD * 2) / TYPE.sub.char)
  const titleChars = Math.floor((headerW - HEADER_PAD * 2) / TYPE.title.char)

  const participants = model.participants.map((p, i) => {
    const titleLines = wrap(p.title, titleChars)
    const subLines = p.sub.flatMap(s => wrap(s, headerChars))
    const h = HEADER_PAD * 2 + titleLines.length * TYPE.title.lh + (subLines.length ? 3 + subLines.length * TYPE.sub.lh : 0)
    return { ...p, i, cx: margin + colW * (i + 0.5), titleLines, subLines, h }
  })
  const headerH = Math.max(...participants.map(p => p.h))
  const byId = Object.fromEntries(participants.map(p => [p.id, p]))

  let y = margin + headerH + 22
  const rows = []
  const frames = []
  const openFrames = []
  const flat = flattenSteps(model.steps, model.autonumber)

  flat.forEach((step) => {
    if (step.type === 'frameStart') {
      openFrames.push({ label: step.label, kind: step.kind, y: y - 4 })
      y += 28
      return
    }
    if (step.type === 'frameEnd') {
      const f = openFrames.pop()
      frames.push({ ...f, h: y - f.y + 2 })
      y += 12
      return
    }
    if (step.type === 'note') {
      const xs = step.over.map(id => byId[id].cx)
      const left = Math.min(...xs) - colW * 0.42
      const right = Math.max(...xs) + colW * 0.42
      const w = Math.max(right - left, 170)
      const cx = (left + right) / 2
      const lines = wrap(step.text, Math.floor((w - 24) / TYPE.label.char))
      const h = lines.length * TYPE.label.lh + 16
      rows.push({ type: 'note', x: Math.max(margin, cx - w / 2), y, w, h, lines, text: step.text, over: step.over })
      y += h + ROW_GAP
      return
    }
    const a = byId[step.from]
    const b = byId[step.to]
    const self = step.from === step.to
    const span = Math.abs(b.cx - a.cx)
    const labelW = Math.max(span - 26, LABEL_MIN)
    const lines = wrap(step.text, Math.floor(labelW / TYPE.label.char))
    const textH = lines.length * TYPE.label.lh
    const lineY = y + textH + 4
    const rightward = b.cx >= a.cx
    let labelX = (self ? a.cx + 34 : Math.min(a.cx, b.cx) + 18)
    const textWidth = Math.max(...lines.map(l => l.length * TYPE.label.char))
    if (labelX + textWidth > width - margin) labelX = width - margin - textWidth
    rows.push({
      type: 'message',
      n: step.n,
      index: step.index,
      from: step.from,
      to: step.to,
      text: step.text,
      reply: step.reply,
      self,
      rightward,
      ax: a.cx,
      bx: b.cx,
      y: lineY,
      top: y,
      lines,
      labelX,
      labelW: textWidth,
      textH,
    })
    y = lineY + (self ? 34 : 12) + ROW_GAP
  })

  const height = y + 8
  return {
    viewBox: { x: 0, y: 0, w: width, h: height },
    participants,
    headerY: margin,
    headerH,
    headerW,
    rows,
    frames,
  }
}
