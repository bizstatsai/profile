#!/usr/bin/env node
/**
 * Writes the rendered page into dist/index.html, so crawlers, link previews and
 * first paint get real content instead of an empty root. React hydrates it in the browser.
 * Run after `vite build` and `vite build --ssr src/entry-server.jsx --outDir dist-ssr`.
 */
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const entry = pathToFileURL(resolve('dist-ssr/entry-server.js')).href
const { render } = await import(entry)
const html = await render()
if (html.includes('<template id="B:')) throw new Error('A section was moved out of document order')

const template = readFileSync('dist/index.html', 'utf8')
if (!template.includes('<div id="root"></div>')) throw new Error('dist/index.html has no empty root')
writeFileSync('dist/index.html', template.replace('<div id="root"></div>', () => `<div id="root">${html}</div>`))
rmSync('dist-ssr', { recursive: true, force: true })
console.log(`prerendered ${(html.length / 1024).toFixed(0)} KB of HTML`)
