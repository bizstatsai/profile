/**
 * Parses the subset of Mermaid used by this repository into plain data, so the
 * site can redraw each diagram with its own components while the .mmd file stays
 * the single source of truth for labels and relationships.
 *
 * Used at build time by the Vite plugin in vite.config.js, and by the fidelity tests.
 */

const splitLabel = (label = '') => label.split(/<br\s*\/?>/i).map(s => s.trim()).filter(Boolean)

const statements = (src) =>
  src.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('%%'))

/** Split "a; b" on semicolons outside quotes. */
function splitStatements(line) {
  const out = []
  let cur = ''
  let quoted = false
  for (const ch of line) {
    if (ch === '"') quoted = !quoted
    if (ch === ';' && !quoted) {
      out.push(cur.trim())
      cur = ''
    } else cur += ch
  }
  if (cur.trim()) out.push(cur.trim())
  return out.filter(Boolean)
}

/** Walk one flowchart statement: A["x"] -->|"y"| B -.-> C */
function parseChain(stmt) {
  const parts = []
  let i = 0
  let token = ''
  let quoted = false
  const pushNode = () => {
    if (token.trim()) parts.push({ node: token.trim() })
    token = ''
  }
  while (i < stmt.length) {
    const ch = stmt[i]
    if (ch === '"') quoted = !quoted
    if (!quoted && (stmt.startsWith('-.->', i) || stmt.startsWith('-->', i))) {
      pushNode()
      const dashed = stmt.startsWith('-.->', i)
      i += dashed ? 4 : 3
      while (stmt[i] === ' ') i++
      let label = null
      if (stmt[i] === '|') {
        const close = stmt.indexOf('|', i + 1)
        label = stmt.slice(i + 1, close).replace(/^"|"$/g, '')
        i = close + 1
      }
      parts.push({ arrow: true, dashed, label })
      continue
    }
    token += ch
    i++
  }
  pushNode()
  return parts
}

const NODE_RE = /^([\w-]+)(?:\["(.*)"\])?$/

function parseFlow(lines) {
  const direction = lines[0].split(/\s+/)[1] || 'TB'
  const nodes = new Map()
  const edges = []
  const groups = []
  const stack = []
  const classes = {}

  const touch = (raw) => {
    const m = raw.match(NODE_RE)
    if (!m) throw new Error(`Cannot read node: ${raw}`)
    const [, id, label] = m
    let node = nodes.get(id)
    if (!node) {
      node = { id, label: null, group: stack.at(-1) ?? null }
      nodes.set(id, node)
    }
    if (label != null) node.label = label
    return node
  }

  for (const line of lines.slice(1)) {
    for (const stmt of splitStatements(line)) {
      const sub = stmt.match(/^subgraph\s+([\w-]+)(?:\["(.*)"\])?$/)
      if (sub) {
        groups.push({ id: sub[1], title: sub[2] ?? sub[1], parent: stack.at(-1) ?? null })
        stack.push(sub[1])
        continue
      }
      if (stmt === 'end') {
        stack.pop()
        continue
      }
      if (/^(direction|classDef|style|linkStyle)\b/.test(stmt)) continue
      const cls = stmt.match(/^class\s+([\w,-]+)\s+([\w-]+)$/)
      if (cls) {
        cls[1].split(',').forEach(id => { classes[id] = cls[2] })
        continue
      }
      const parts = parseChain(stmt)
      parts.forEach((part, i) => {
        if (part.node) touch(part.node)
        if (part.arrow) {
          edges.push({
            from: parts[i - 1].node.match(NODE_RE)[1],
            to: parts[i + 1].node.match(NODE_RE)[1],
            dashed: part.dashed,
            label: part.label ? splitLabel(part.label).join(' ') : null,
          })
        }
      })
    }
  }

  return {
    type: 'flow',
    direction,
    nodes: [...nodes.values()].map(n => {
      const [title = n.id, ...sub] = splitLabel(n.label ?? n.id)
      return { id: n.id, title, sub, group: n.group, sourceClass: classes[n.id] ?? null }
    }),
    edges,
    groups,
  }
}

function parseSequence(lines) {
  const participants = []
  const root = []
  const frames = [root]
  let autonumber = false

  for (const line of lines.slice(1)) {
    const p = line.match(/^(participant|actor)\s+([\w-]+)(?:\s+as\s+(.*))?$/)
    if (p) {
      const [title = p[2], ...sub] = splitLabel(p[3] ?? p[2])
      participants.push({ id: p[2], actor: p[1] === 'actor', title, sub })
      continue
    }
    if (line === 'autonumber') {
      autonumber = true
      continue
    }
    const note = line.match(/^Note over\s+([\w,\s-]+):\s*(.*)$/)
    if (note) {
      frames.at(-1).push({ type: 'note', over: note[1].split(',').map(s => s.trim()), text: note[2] })
      continue
    }
    const alt = line.match(/^(alt|opt|loop)\s+(.*)$/)
    if (alt) {
      const frame = { type: 'frame', kind: alt[1], label: alt[2], steps: [] }
      frames.at(-1).push(frame)
      frames.push(frame.steps)
      continue
    }
    if (line === 'end') {
      frames.pop()
      continue
    }
    const msg = line.match(/^(\w+)\s*(-->>|->>|-->|->)\s*(\w+)\s*:\s*(.*)$/)
    if (msg) {
      frames.at(-1).push({ type: 'message', from: msg[1], to: msg[3], reply: msg[2].startsWith('--'), text: msg[4] })
      continue
    }
    throw new Error(`Unknown sequence statement: ${line}`)
  }
  return { type: 'sequence', autonumber, participants, steps: root }
}

function parseState(lines) {
  const states = new Map()
  const transitions = []
  const scopes = [null]
  const ensure = (id) => {
    const scope = scopes.at(-1)
    if (!states.has(id)) states.set(id, { id, label: null, parent: scope, composite: false })
    return states.get(id)
  }

  for (const line of lines.slice(1)) {
    const open = line.match(/^state\s+([\w-]+)\s*\{$/)
    if (open) {
      ensure(open[1]).composite = true
      scopes.push(open[1])
      continue
    }
    if (line === '}') {
      scopes.pop()
      continue
    }
    const tr = line.match(/^(\[\*\]|[\w-]+)\s*-->\s*(\[\*\]|[\w-]+)(?:\s*:\s*(.*))?$/)
    if (tr) {
      const scope = scopes.at(-1)
      const start = `[*]${scope ? `:${scope}` : ''}`
      const from = tr[1] === '[*]' ? start : tr[1]
      const to = tr[2] === '[*]' ? start : tr[2]
      if (tr[1] !== '[*]') ensure(tr[1])
      if (tr[2] !== '[*]') ensure(tr[2])
      if (tr[1] === '[*]' || tr[2] === '[*]') {
        if (!states.has(start)) states.set(start, { id: start, label: null, parent: scope, pseudo: true })
      }
      transitions.push({ from, to, label: tr[3] ? splitLabel(tr[3]).join(' ') : null })
      continue
    }
    const desc = line.match(/^([\w-]+)\s*:\s*(.*)$/)
    if (desc) {
      ensure(desc[1]).label = desc[2]
      continue
    }
    throw new Error(`Unknown state statement: ${line}`)
  }

  return {
    type: 'flow',
    variant: 'state',
    direction: 'LR',
    nodes: [...states.values()].map(s => {
      const [title = s.id, ...sub] = splitLabel(s.label ?? s.id)
      return { id: s.id, title: s.pseudo ? 'Start' : title, sub, group: s.parent, pseudo: !!s.pseudo, composite: !!s.composite }
    }),
    edges: transitions.map(t => ({ ...t, dashed: false })),
    groups: [...states.values()].filter(s => s.composite).map(s => ({ id: s.id, title: s.id, parent: s.parent })),
  }
}

function parseClass(lines) {
  const nodes = []
  const edges = []
  let open = null
  for (const line of lines.slice(1)) {
    const start = line.match(/^class\s+([\w-]+)\s*\{$/)
    if (start) {
      open = { id: start[1], title: start[1], sub: [], members: [], group: null }
      nodes.push(open)
      continue
    }
    if (line === '}') {
      open = null
      continue
    }
    if (open) {
      open.members.push(line)
      continue
    }
    const rel = line.match(/^([\w-]+)\s*-->\s*([\w-]+)$/)
    if (rel) {
      edges.push({ from: rel[1], to: rel[2], dashed: false, label: null })
      continue
    }
    throw new Error(`Unknown class statement: ${line}`)
  }
  return { type: 'flow', variant: 'class', direction: 'TB', nodes, edges, groups: [] }
}

function parseEr(lines) {
  const nodes = new Map()
  const edges = []
  let open = null
  const ensure = (id) => {
    if (!nodes.has(id)) nodes.set(id, { id, title: id, sub: [], members: [], group: null })
    return nodes.get(id)
  }
  for (const line of lines.slice(1)) {
    const start = line.match(/^([\w-]+)\s*\{$/)
    if (start) {
      open = ensure(start[1])
      continue
    }
    if (line === '}') {
      open = null
      continue
    }
    if (open) {
      open.members.push(line)
      continue
    }
    const rel = line.match(/^([\w-]+)\s+(\S+)\s+([\w-]+)\s*:\s*(.*)$/)
    if (rel) {
      ensure(rel[1])
      ensure(rel[3])
      edges.push({ from: rel[1], to: rel[3], dashed: false, label: rel[4], cardinality: rel[2] })
      continue
    }
    throw new Error(`Unknown ER statement: ${line}`)
  }
  return { type: 'flow', variant: 'er', direction: 'LR', nodes: [...nodes.values()], edges, groups: [] }
}

function parseBlock(lines) {
  const root = { id: 'root', label: null, columns: 1, children: [] }
  const stack = [root]
  for (const line of lines.slice(1)) {
    if (/^style\b/.test(line)) continue
    const cols = line.match(/^columns\s+(\d+)$/)
    if (cols) {
      stack.at(-1).columns = Number(cols[1])
      continue
    }
    const block = line.match(/^block:([\w-]+)\["(.*)"\]$/)
    if (block) {
      const child = { id: block[1], label: block[2], columns: 1, children: [] }
      stack.at(-1).children.push(child)
      stack.push(child)
      continue
    }
    if (line === 'end') {
      stack.pop()
      continue
    }
    if (line === 'space') {
      stack.at(-1).children.push({ id: null, space: true })
      continue
    }
    const leaf = line.match(/^([\w-]+)\["(.*)"\]$/)
    if (leaf) {
      stack.at(-1).children.push({ id: leaf[1], lines: splitLabel(leaf[2]) })
      continue
    }
    throw new Error(`Unknown block statement: ${line}`)
  }
  return { type: 'block', root }
}

export function parseMermaid(src) {
  const lines = statements(src)
  const head = lines[0] ?? ''
  if (/^(flowchart|graph)\b/.test(head)) return parseFlow(lines)
  if (/^sequenceDiagram/.test(head)) return parseSequence(lines)
  if (/^stateDiagram/.test(head)) return parseState(lines)
  if (/^classDiagram/.test(head)) return parseClass(lines)
  if (/^erDiagram/.test(head)) return parseEr(lines)
  if (/^block-beta/.test(head)) return parseBlock(lines)
  throw new Error(`Unsupported diagram type: ${head}`)
}
