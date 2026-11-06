import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

const VIEW = { threshold: 0.12 }
const useBrowserLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/** True once the element has entered the viewport. Never turns off again. */
export function useInViewOnce(options = VIEW) {
  const [seen, setSeen] = useState(false)
  const observer = useRef(null)
  const ref = useCallback((el) => {
    observer.current?.disconnect()
    if (!el) return
    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true)
        observer.current?.disconnect()
      }
    }, options)
    observer.current.observe(el)
  }, [options])
  useEffect(() => () => observer.current?.disconnect(), [])
  return [ref, seen]
}

/**
 * For entrance animations. `armed` turns on only once the page is running and the
 * element is off screen, so prerendered content is visible until then.
 * With `always`, it also arms an element that mounts while already on screen.
 */
export function useArmedReveal({ always = false } = {}) {
  const element = useRef(null)
  const [armed, setArmed] = useState(false)
  const [inViewRef, seen] = useInViewOnce()
  const ref = useCallback((el) => {
    element.current = el
    inViewRef(el)
  }, [inViewRef])
  useBrowserLayoutEffect(() => {
    if (!element.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const off = document.documentElement.dataset.motion === 'off'
    if (reduced || off) return
    if (always || element.current.getBoundingClientRect().top > window.innerHeight * 0.9) setArmed(true)
  }, [always])
  return [ref, armed, seen]
}

/** Whether the element is on screen right now, for pausing work that is out of view. */
export function useOnScreen(ref, margin = '100px') {
  const [on, setOn] = useState(false)
  useEffect(() => {
    if (!ref.current) return undefined
    const io = new IntersectionObserver(([entry]) => setOn(entry.isIntersecting), { rootMargin: margin })
    io.observe(ref.current)
    return () => io.disconnect()
  }, [ref, margin])
  return on
}

export function useElementWidth() {
  const [width, setWidth] = useState(null)
  const observer = useRef(null)
  const ref = useCallback((el) => {
    observer.current?.disconnect()
    if (!el) return
    setWidth(el.getBoundingClientRect().width)
    observer.current = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
    observer.current.observe(el)
  }, [])
  useEffect(() => () => observer.current?.disconnect(), [])
  return [ref, width]
}

export function useTheme() {
  const [theme, setTheme] = useState('dark')
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')
  }, [])
  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {
      // Private browsing can refuse storage. The choice still lasts for this page.
    }
    window.dispatchEvent(new Event('themechange'))
  }
  return { theme, toggle }
}
