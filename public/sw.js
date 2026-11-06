const CACHE_NAME = 'srini-portfolio-v3'
// Resolve every precached URL against the worker's own location, so the same
// file works at a domain root and under a GitHub Pages project path.
const BASE = new URL('./', self.location.href).href
const STATIC_ASSETS = [
  '',
  'favicon.svg',
  'favicon-32.png',
  'favicon-192.png',
  'og-image.png',
].map((path) => new URL(path, BASE).href)

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

const remember = (request, response) => {
  if (response.ok) {
    const clone = response.clone()
    caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
  }
  return response
}

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return

  // Pages come from the network whenever there is one, so a release reaches returning visitors at once.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => remember(request, response))
        .catch(() => caches.match(request).then((cached) => cached || caches.match(BASE)))
    )
    return
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const fresh = fetch(request)
        .then((response) => remember(request, response))
        .catch(() => cached)
      return cached || fresh
    })
  )
})
