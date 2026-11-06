import { useMemo, useRef } from 'react'
import ArchitectureNode from './ArchitectureNode'
import ArchitectureConnector, { ConnectorLabel } from './ArchitectureConnector'
import ArchitectureLayer from './ArchitectureLayer'
import { layerMembers } from '../../lib/diagram/layoutFlow'

/** Draws a flow, state, class or entity diagram from its computed layout. */
export default function ArchitectureCanvas({
  layout, title, interactive, selected, hovered, legendCat, focusId,
  onSelect, onHover, zoom, revealed, armed, flowing, variant, activeLayer, onLayer,
}) {
  const { viewBox: vb, nodes, edges, groups } = layout
  const root = useRef(null)
  const active = hovered ?? selected
  const linked = useMemo(() => {
    if (!active) return null
    const set = new Set([active])
    edges.forEach((e) => {
      if (e.from === active) set.add(e.to)
      if (e.to === active) set.add(e.from)
    })
    return set
  }, [active, edges])

  const inLayer = useMemo(
    () => (activeLayer ? layerMembers(nodes, groups, activeLayer) : null),
    [activeLayer, nodes, groups],
  )

  const layerState = (g) => {
    if (!inLayer || inLayer.has(g.id)) return ''
    // A layer that contains the open one stays lit around it.
    let parent = groups.find(x => x.id === activeLayer)?.parent
    while (parent) {
      if (parent === g.id) return ''
      const current = parent
      parent = groups.find(x => x.id === current)?.parent
    }
    return 'is-dim'
  }

  const nodeState = (n) => {
    const classes = []
    if (inLayer && !inLayer.has(n.id)) classes.push('is-dim')
    if (n.id === selected) classes.push('is-selected')
    if (n.id === hovered) classes.push('is-hovered')
    if (linked && !linked.has(n.id)) classes.push('is-dim')
    if (legendCat && n.cat !== legendCat) classes.push('is-dim')
    if (legendCat && n.cat === legendCat) classes.push('is-lit')
    return classes.join(' ')
  }
  const edgeState = (e) => {
    if (inLayer) return inLayer.has(e.from) || inLayer.has(e.to) ? 'is-lit' : 'is-dim'
    if (legendCat) return 'is-dim'
    if (!active) return ''
    return e.from === active || e.to === active ? 'is-lit' : 'is-dim'
  }

  const moveFocus = (id, dir) => {
    const order = nodes.filter(n => !n.pseudo)
    const at = order.findIndex(n => n.id === id)
    const next = order[(at + dir + order.length) % order.length]
    root.current?.querySelector(`[data-node="${CSS.escape(next.id)}"]`)?.focus()
  }

  const classes = [
    'ac-svg',
    armed ? 'is-armed' : '',
    revealed ? 'is-revealed' : '',
    flowing ? 'is-flowing' : '',
    zoom?.view.k > 1 ? 'is-zoomed' : '',
    variant === 'state' ? 'ac-svg--state' : '',
  ].join(' ')

  return (
    <svg
      ref={zoom?.svg}
      className={classes}
      viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
      role="group"
      aria-label={title}
      style={{ '--ratio': vb.w / vb.h, maxWidth: `${vb.w * 1.2}px` }}
      {...(zoom?.handlers ?? {})}
      onClick={() => interactive && onSelect(null)}
    >
      <g ref={root} transform={zoom?.transform}>
        {groups.map(g => (
          <ArchitectureLayer
            key={g.id}
            group={g}
            state={layerState(g)}
            open={g.id === activeLayer}
            onToggle={interactive ? onLayer : undefined}
          />
        ))}
        {edges.map(e => <ArchitectureConnector key={e.key} edge={e} state={edgeState(e)} />)}
        {nodes.map(n => (
          <ArchitectureNode
            key={n.id}
            node={{ ...n, variant }}
            state={nodeState(n)}
            interactive={interactive}
            focusable={n.id === focusId}
            onSelect={onSelect}
            onHover={onHover}
            onKeyNav={moveFocus}
          />
        ))}
        {edges.filter(e => e.label).map(e => (
          <g key={e.key} className={edgeState(e)}>
            <ConnectorLabel label={e.label} />
          </g>
        ))}
      </g>
    </svg>
  )
}
