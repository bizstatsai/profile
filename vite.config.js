import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { parseMermaid } from './scripts/mermaid-parser.mjs'

/** Turns an imported .mmd source into plain data at build time, so no parser ships to the browser. */
const mermaidSource = () => ({
  name: 'mermaid-source',
  enforce: 'pre',
  transform(code, id) {
    if (!id.endsWith('.mmd')) return null
    return { code: `export default ${JSON.stringify(parseMermaid(code))}`, map: null }
  },
})

// The public address of the site. Used for the canonical link, social cards and structured data.
process.env.VITE_SITE_URL ||= 'https://bizstatsai.github.io/profile/'

export default defineConfig({
  // '/' at a domain root; set VITE_BASE=/<repo>/ for a GitHub Pages project site
  base: process.env.VITE_BASE || '/',
  plugins: [mermaidSource(), react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
})
