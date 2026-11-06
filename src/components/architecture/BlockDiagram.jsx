/** Nested layout blocks, used for the page wireframe. */
function Block({ block }) {
  if (block.space) return <span aria-hidden="true" />
  if (block.lines) {
    return (
      <div className="ac-block__leaf">
        {block.lines.map(l => <span key={l}>{l}</span>)}
      </div>
    )
  }
  return (
    <section className="ac-block">
      <h5>{block.label}</h5>
      <div className="ac-block__grid" style={{ '--cols': block.columns }}>
        {block.children.map((child, i) => <Block key={child.id ?? `space-${i}`} block={child} />)}
      </div>
    </section>
  )
}

export default function BlockDiagram({ model }) {
  return (
    <div className="ac-blocks">
      {model.root.children.map(block => <Block key={block.id} block={block} />)}
    </div>
  )
}
