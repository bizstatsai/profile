/**
 * Prefix a public-asset path with Vite's base URL so the site works both at a
 * domain root and under a GitHub Pages project path (e.g. /profile/).
 */
export function asset(path) {
  const base = import.meta.env.BASE_URL || '/'
  return base.replace(/\/$/, '') + path
}
