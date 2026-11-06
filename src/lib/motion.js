import { useSyncExternalStore } from 'react'

/**
 * One switch for everything that moves on its own. It starts from the visitor's
 * reduced-motion setting, and the stored choice is applied before first paint by
 * the inline script in index.html.
 */
const KEY = 'motion'
const listeners = new Set()

function read() {
  if (typeof document === 'undefined') return true
  return document.documentElement.dataset.motion !== 'off'
}

function write(on) {
  document.documentElement.dataset.motion = on ? 'on' : 'off'
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off')
  } catch {
    // Private browsing can refuse storage. The choice still lasts for this page.
  }
  listeners.forEach(fn => fn())
}

const subscribe = (fn) => {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

export function useMotion() {
  const on = useSyncExternalStore(subscribe, read, () => true)
  return { on, toggle: () => write(!read()) }
}

export const isMotionOn = read
export const subscribeMotion = subscribe
