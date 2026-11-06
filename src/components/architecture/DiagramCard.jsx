import { useEffect, useMemo, useState } from 'react'
import { STATUS } from '../../data/architectureDiagrams'
import { layoutFlow } from '../../lib/diagram/layoutFlow'
import { layoutSequence, flattenSteps } from '../../lib/diagram/layoutSequence'
import { useArmedReveal, useElementWidth } from '../../lib/hooks'
import { useMotion } from '../../lib/motion'
import ArchitectureCanvas from './ArchitectureCanvas'
import SequenceCanvas from './SequenceCanvas'
import ArchitectureLegend from './ArchitectureLegend'
import DiagramToolbar from './DiagramToolbar'
import DiagramFullscreen from './DiagramFullscreen'
import { ComponentInspector, FlowText, SequenceSteps, LayerList } from './DiagramDescription'
import useZoomPan from './useZoomPan'

const NARROW = 760

function categories(diagram) {
  const present = diagram.kind === 'sequence'
    ? diagram.model.participants.map(p => p.cat)
    : diagram.model.nodes.filter(n => !n.pseudo).map(n => n.cat)
  const order = ['source', 'process', 'storage', 'ai', 'governance', 'consumption', 'people', 'neutral']
  return order.filter(c => present.includes(c))
}

/** One drawing surface. The inline card and the full-screen view each hold their own. */
function Surface({ diagram, layout, interactive, owned, selected, onSelect, layer, onLayer, step, legendCat, children }) {
  const zoom = useZoomPan(layout.viewBox, { owned })
  const [hovered, setHovered] = useState(null)
  const [hoverStep, setHoverStep] = useState(null)
  const [revealRef, armed, inView] = useArmedReveal({ always: true })
  const motion = useMotion()
  const focusId = selected ?? layout.nodes?.find(n => !n.pseudo)?.id

  return (
    <>
      {children?.(zoom)}
      <div
        ref={revealRef}
        className={`ac-frame-area ${owned ? 'is-owned' : ''} ${zoom.view.k > 1 ? 'is-grab' : ''}`}
      >
        <div className="ac-rulers" aria-hidden="true">
          <span className="ac-rulers__top" />
          <span className="ac-rulers__left" />
        </div>
        {diagram.kind === 'sequence' ? (
          <SequenceCanvas
            layout={layout}
            title={diagram.title}
            step={step}
            hoverStep={hoverStep}
            onHoverStep={setHoverStep}
            zoom={zoom}
            revealed={inView}
            armed={armed}
            legendCat={legendCat}
          />
        ) : (
          <ArchitectureCanvas
            layout={layout}
            title={diagram.title}
            interactive={interactive}
            selected={selected}
            activeLayer={layer}
            onLayer={onLayer}
            hovered={hovered}
            legendCat={legendCat}
            focusId={focusId}
            onSelect={onSelect}
            onHover={setHovered}
            zoom={zoom}
            revealed={inView}
            armed={armed}
            flowing={inView && motion.on}
            variant={diagram.model.variant}
          />
        )}
      </div>
    </>
  )
}

export default function DiagramCard({ diagram, plate, compact = false, initialNode = null }) {
  const [widthRef, width] = useElementWidth()
  const [selected, setSelected] = useState(initialNode)
  const [layer, setLayer] = useState(null)
  const [step, setStep] = useState(null)
  const [legendCat, setLegendCat] = useState(null)
  const [full, setFull] = useState(false)
  const [textOpen, setTextOpen] = useState(false)

  useEffect(() => { setSelected(initialNode) }, [initialNode])

  const isSequence = diagram.kind === 'sequence'
  // Until the card has been measured, both versions render and CSS shows the right one, so the
  // prerendered page already has its final shape. After that only the version in use stays mounted.
  const showWide = width == null || width >= NARROW
  const showNarrow = width == null || width < NARROW
  const isNarrow = width != null && width < NARROW
  const interactive = !isSequence && !compact

  const steps = useMemo(
    () => (isSequence ? flattenSteps(diagram.model.steps, true).filter(s => s.type === 'message') : []),
    [diagram, isSequence],
  )

  const wideLayout = useMemo(
    () => (isSequence ? layoutSequence(diagram.model, diagram.sequence) : layoutFlow(diagram.model, diagram.wide)),
    [diagram, isSequence],
  )
  const narrowFlow = !isSequence && diagram.narrow && !diagram.narrow.kind
  const narrowLayout = useMemo(
    () => (narrowFlow ? layoutFlow(diagram.model, diagram.narrow) : null),
    [diagram, narrowFlow],
  )

  const select = (id) => {
    setLayer(null)
    setSelected(current => (current === id ? null : id))
  }
  const toggleLayer = (id) => {
    setSelected(null)
    setLayer(current => (current === id ? null : id))
  }
  const clearSelection = () => {
    setSelected(null)
    setLayer(null)
  }
  const cats = categories(diagram)
  const hasDashed = isSequence
    ? steps.some(s => s.reply)
    : diagram.model.edges.some(e => e.dashed)

  const stepper = isSequence ? {
    step: step ?? 0,
    total: steps.length,
    prev: () => setStep(s => Math.max(1, (s ?? 1) - 1)),
    next: () => setStep(s => Math.min(steps.length, (s ?? 0) + 1)),
  } : null

  const currentStep = isSequence && step ? steps.find(s => s.index === step) : null
  const participantName = (id) => diagram.model.participants.find(p => p.id === id)?.title

  const status = STATUS[diagram.status]
  const noNarrowDrawing = isNarrow && !isSequence && !diagram.narrow

  const surface = (layout) => (
    <Surface
      diagram={diagram}
      layout={layout}
      interactive={interactive}
      selected={selected}
      onSelect={select}
      layer={layer}
      onLayer={toggleLayer}
      step={step}
      legendCat={legendCat}
    >
      {compact ? null : (zoom) => (
        <DiagramToolbar
          zoom={zoom}
          stepper={stepper}
          hasFlow={!isSequence}
          onFullscreen={() => setFull(true)}
          textOpen={textOpen}
          onToggleText={() => setTextOpen(o => !o)}
        />
      )}
    </Surface>
  )

  const narrowStage = () => {
    const toFullscreen = <DiagramToolbar onFullscreen={() => setFull(true)} hasFlow={false} />
    if (isSequence) return <>{toFullscreen}<SequenceSteps diagram={diagram} step={step} onStep={setStep} /></>
    if (diagram.narrow?.kind === 'layers') return <>{toFullscreen}<LayerList diagram={diagram} selected={selected} onSelect={setSelected} /></>
    if (narrowLayout) return surface(narrowLayout)
    return (
      <>
        <p className="ac-card__hint">This drawing is wide. Open it full screen and pinch to zoom, or read the text version below.</p>
        {surface(wideLayout)}
      </>
    )
  }

  return (
    <figure ref={widthRef} className={`ac-card ${compact ? 'ac-card--compact' : ''}`}>
      {plate && (
        <figcaption className="ac-card__head">
          <span className="ac-card__plate">{plate}</span>
          <span className="ac-card__status" data-status={diagram.status} title={status.note}>{status.label}</span>
        </figcaption>
      )}

      {showWide && <div className="ac-variant ac-variant--wide">{surface(wideLayout)}</div>}
      {showNarrow && <div className="ac-variant ac-variant--narrow">{narrowStage()}</div>}

      <ArchitectureLegend cats={cats} hasDashed={!compact && hasDashed} sequence={isSequence} onHover={setLegendCat} />

      {interactive && (
        <ComponentInspector diagram={diagram} selected={selected} layer={layer} onClear={clearSelection} onSelect={select} />
      )}

      {isSequence && showWide && (
        <p className="ac-card__stepcaption ac-variant--wide" aria-live="polite">
          {currentStep
            ? <><strong>{participantName(currentStep.from)}{currentStep.from !== currentStep.to ? ` to ${participantName(currentStep.to)}` : ''}:</strong> {currentStep.text}</>
            : 'Step through the sequence, or hover over a message to isolate it.'}
        </p>
      )}

      {(textOpen || noNarrowDrawing) && !(isNarrow && isSequence) && (
        isSequence
          ? <SequenceSteps diagram={diagram} step={step} onStep={setStep} />
          : <FlowText diagram={diagram} />
      )}

      <DiagramFullscreen open={full} onClose={() => setFull(false)} label={`${diagram.title}, full screen`}>
        <div className="ac-fullscreen__inner">
          <Surface
            diagram={diagram}
            layout={wideLayout}
            interactive={interactive}
            owned
            selected={selected}
            onSelect={select}
            layer={layer}
            onLayer={toggleLayer}
            step={step}
            legendCat={legendCat}
          >
            {(zoom) => (
              <>
                <header className="ac-fullscreen__head">
                  <h4>{diagram.title}</h4>
                  <span className="ac-card__status" data-status={diagram.status}>{status.label}</span>
                </header>
                <DiagramToolbar zoom={zoom} stepper={stepper} hasFlow={!isSequence} onCloseFullscreen={() => setFull(false)} />
              </>
            )}
          </Surface>
          {interactive && <ComponentInspector diagram={diagram} selected={selected} layer={layer} onClear={clearSelection} onSelect={select} />}
          {isSequence && currentStep && (
            <p className="ac-card__stepcaption" aria-live="polite">
              <strong>{participantName(currentStep.from)}{currentStep.from !== currentStep.to ? ` to ${participantName(currentStep.to)}` : ''}:</strong> {currentStep.text}
            </p>
          )}
        </div>
      </DiagramFullscreen>

    </figure>
  )
}
