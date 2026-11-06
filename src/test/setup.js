import '@testing-library/jest-dom'

class IntersectionObserver {
  constructor(callback) { this.callback = callback }
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.IntersectionObserver = IntersectionObserver

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver = ResizeObserver

window.matchMedia = (query) => ({
  matches: false,
  media: query,
  addEventListener() {},
  removeEventListener() {},
})

// jsdom has no drawing surface. Every canvas call is accepted and does nothing.
const canvasContext = new Proxy({}, {
  get: (target, key) => (key in target ? target[key] : () => canvasContext),
  set: (target, key, value) => {
    target[key] = value
    return true
  },
})
HTMLCanvasElement.prototype.getContext = () => canvasContext

HTMLDialogElement.prototype.showModal = function showModal() { this.setAttribute('open', '') }
HTMLDialogElement.prototype.close = function close() { this.removeAttribute('open') }
Element.prototype.scrollIntoView = () => {}
