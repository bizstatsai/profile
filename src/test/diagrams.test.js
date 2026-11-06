import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import mermaidLib from 'mermaid'
import { parseMermaid } from '../../scripts/mermaid-parser.mjs'
import { diagrams, CATEGORIES, wireframeRecord, planningRecords } from '../data/architectureDiagrams'
import { layoutFlow, lintLayout } from '../lib/diagram/layoutFlow'
import { layoutSequence, flattenSteps } from '../lib/diagram/layoutSequence'

const repoPath = (d) => d.source.replace('https://github.com/bizstatsai/profile/blob/main/', '')
const mermaid = Object.values(diagrams).filter(d => d.source)

describe('every source is accounted for', () => {
  it('draws all twelve figures and eight planning records', () => {
    const paths = [...mermaid.map(repoPath), wireframeRecord.source.split('/main/')[1]]
    expect(new Set(paths).size).toBe(20)
    paths.forEach(p => expect(readFileSync(p, 'utf8').length).toBeGreaterThan(20))
  })

  it('lists each planning record once', () => {
    expect(new Set(planningRecords).size).toBe(7)
    planningRecords.forEach(id => expect(diagrams[id]).toBeTruthy())
  })
})

describe.each(mermaid.map(d => [d.id, d]))('%s matches its Mermaid source', (_id, d) => {
  const parsed = parseMermaid(readFileSync(repoPath(d), 'utf8'))

  if (parsed.type === 'flow') {
    const groupIds = new Set(parsed.groups.map(g => g.id))
    it('keeps every component, with its label', () => {
      const expected = parsed.nodes.filter(n => !groupIds.has(n.id))
      expect(d.model.nodes.map(n => n.id).sort()).toEqual(expected.map(n => n.id).sort())
      expected.forEach((n) => {
        const drawn = d.model.nodes.find(x => x.id === n.id)
        if (d.labels?.[n.id]) return
        expect([drawn.title, ...drawn.sub]).toEqual([n.title, ...n.sub])
      })
    })
    it('keeps every relationship, its direction, style and label', () => {
      expect(d.model.edges).toEqual(parsed.edges)
    })
    it('assigns every component a colour family', () => {
      d.model.nodes.forEach(n => expect(Object.keys(CATEGORIES)).toContain(n.cat))
      Object.keys(d.cats).forEach(id => expect(d.model.nodes.find(n => n.id === id), id).toBeTruthy())
    })
  }

  if (parsed.type === 'sequence') {
    it('keeps every participant and message, in order', () => {
      expect(d.model.participants.map(p => [p.id, p.title, p.sub])).toEqual(parsed.participants.map(p => [p.id, p.title, p.sub]))
      expect(flattenSteps(d.model.steps, true)).toEqual(flattenSteps(parsed.steps, true))
    })
    it('lays out without overflow', () => {
      const layout = layoutSequence(d.model, d.sequence)
      layout.rows.filter(r => r.type === 'message').forEach((r) => {
        expect(r.labelX + r.labelW).toBeLessThanOrEqual(layout.viewBox.w)
      })
    })
  }
})

// Mermaid's own reading of each flowchart, so a mistake in this repository's parser cannot hide.
mermaidLib.initialize({ startOnLoad: false })
const flowcharts = mermaid.filter(d => /^\s*(flowchart|graph)\b/m.test(readFileSync(repoPath(d), 'utf8')))

describe.each(flowcharts.map(d => [d.id, d]))('%s agrees with Mermaid', (_id, d) => {
  const read = async () => (await mermaidLib.mermaidAPI.getDiagramFromText(readFileSync(repoPath(d), 'utf8'))).db

  it('keeps every component in the group Mermaid gives it', async () => {
    const db = await read()
    const owner = new Map(db.getSubGraphs().flatMap(s => s.nodes.map(id => [id, s.id])))
    d.model.nodes.forEach(n => expect(n.group ?? null, n.id).toBe(owner.get(n.id) ?? null))
  })

  it('draws the connections Mermaid reads', async () => {
    const db = await read()
    const key = (from, to, dashed) => `${from}>${to}${dashed ? ' dashed' : ''}`
    const expected = db.getEdges().map(e => key(e.start, e.end, e.stroke === 'dotted')).sort()
    expect(d.model.edges.map(e => key(e.from, e.to, e.dashed)).sort()).toEqual(expected)
  })
})

describe.each(Object.values(diagrams).filter(d => d.kind === 'flow').map(d => [d.id, d]))('%s layout', (_id, d) => {
  it('is clean when wide', () => {
    expect(lintLayout(layoutFlow(d.model, d.wide))).toEqual([])
  })
  if (d.narrow && !d.narrow.kind) {
    it('is clean when narrow, and fits a phone', () => {
      const layout = layoutFlow(d.model, d.narrow)
      expect(lintLayout(layout)).toEqual([])
      expect(layout.viewBox.w).toBeLessThanOrEqual(440)
    })
  }
})
