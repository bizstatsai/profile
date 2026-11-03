const CACHE_NAME = 'srini-portfolio-v2'
// Resolve every precached URL against the worker's own location, so the same
// file works at a domain root and under a GitHub Pages project path.
const BASE = new URL('./', self.location.href).href
const STATIC_ASSETS = [
  '',
  'favicon.svg',
  'favicon-32.png',
  'favicon-192.png',
  'og-image.png',
  'images/avatar-placeholder.svg',
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

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone))
          }
          return response
        })
        .catch(() => cached)

      return cached || fetchPromise
    })
  )
})
