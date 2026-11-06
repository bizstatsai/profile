import { useMotion } from '../../lib/motion'

const ICONS = {
  in: 'M7 2v10M2 7h10',
  out: 'M2 7h10',
  reset: 'M2.500 7a4.500 4.500 0 1 0 1.400-3.300M2.500 1.500v2.700h2.700',
  full: 'M1.500 5V1.500H5M9 1.500h3.500V5M12.500 9v3.500H9M5 12.500H1.500V9',
  close: 'M2.500 2.500l9 9M11.500 2.500l-9 9',
  pause: 'M4.500 2.500v9M9.500 2.500v9',
  play: 'M4 2.500l7 4.500-7 4.500Z',
  prev: 'M9 2.500 4.500 7 9 11.500',
  next: 'M5 2.500 9.500 7 5 11.500',
}

export function ToolButton({ icon, label, onClick, disabled, pressed, text }) {
  return (
    <button
      type="button"
      className={`ac-tool ${text ? 'ac-tool--text' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={text ? undefined : label}
      aria-pressed={pressed}
      title={label}
    >
      {icon && <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true"><path d={ICONS[icon]} /></svg>}
      {text && <span>{text}</span>}
    </button>
  )
}

export default function DiagramToolbar({
  zoom, onFullscreen, onCloseFullscreen, hasFlow, stepper, textOpen, onToggleText,
}) {
  const motion = useMotion()
  return (
    <div className="ac-toolbar" role="toolbar" aria-label="Drawing controls">
      {zoom && (
        <div className="ac-toolbar__group">
          <ToolButton icon="out" label="Zoom out" onClick={zoom.zoomOut} disabled={zoom.view.k <= 1} />
          <ToolButton icon="in" label="Zoom in" onClick={zoom.zoomIn} disabled={zoom.view.k >= 5} />
          <ToolButton icon="reset" label="Reset view" onClick={zoom.reset} disabled={zoom.view.k === 1} />
        </div>
      )}
      {stepper && (
        <div className="ac-toolbar__group ac-toolbar__group--stepper">
          <ToolButton icon="prev" label="Previous step" onClick={stepper.prev} disabled={stepper.step <= 1} />
          <span className="ac-toolbar__count" aria-live="polite">
            {stepper.step ? `Step ${stepper.step} of ${stepper.total}` : `${stepper.total} steps`}
          </span>
          <ToolButton icon="next" label="Next step" onClick={stepper.next} disabled={stepper.step >= stepper.total} />
        </div>
      )}
      {hasFlow && (
        <div className="ac-toolbar__group">
          <ToolButton
            icon={motion.on ? 'pause' : 'play'}
            label={motion.on ? 'Pause motion' : 'Play motion'}
            onClick={motion.toggle}
          />
        </div>
      )}
      <div className="ac-toolbar__group ac-toolbar__group--end">
        {onToggleText && (
          <ToolButton text={textOpen ? 'Hide text version' : 'Read as text'} label="Show this drawing as a text list" onClick={onToggleText} pressed={textOpen} />
        )}
        {onFullscreen && <ToolButton icon="full" label="Open full screen" onClick={onFullscreen} />}
        {onCloseFullscreen && <ToolButton icon="close" label="Close full screen" onClick={onCloseFullscreen} />}
      </div>
    </div>
  )
}
