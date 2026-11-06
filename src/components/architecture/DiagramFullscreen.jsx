import { useEffect, useRef } from 'react'

/** Uses a native dialog: focus is trapped, Escape closes, and the page behind goes inert. */
export default function DiagramFullscreen({ open, onClose, label, children }) {
  const ref = useRef(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return undefined
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
    return undefined
  }, [open])

  return (
    <dialog ref={ref} className="ac-fullscreen" aria-label={label} onClose={onClose} onCancel={onClose}>
      {open && children}
    </dialog>
  )
}
