#!/usr/bin/env node
/**
 * Render every Mermaid source in docs/diagrams/src to an SVG in public/diagrams,
 * and copy the source next to it so the site can offer "view source".
 * Usage: npm run diagrams
 * Set PUPPETEER_EXECUTABLE_PATH to use a system Chromium (CI containers).
 * A parse error fails the run, which is the point.
 */
import { readdirSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'node:fs'
import { join, basename } from 'node:path'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'

const SRC = 'docs/diagrams/src'
const OUT = 'public/diagrams'
mkdirSync(join(OUT, 'src'), { recursive: true })

const args = []
if (process.env.PUPPETEER_EXECUTABLE_PATH) {
  const cfg = join(tmpdir(), 'mmdc-puppeteer.json')
  writeFileSync(cfg, JSON.stringify({ executablePath: process.env.PUPPETEER_EXECUTABLE_PATH, args: ['--no-sandbox', '--headless'] }))
  args.push('-p', cfg)
}

const mmdc = join('node_modules', '.bin', process.platform === 'win32' ? 'mmdc.cmd' : 'mmdc')
if (!existsSync(mmdc)) {
  console.error('mermaid-cli is not installed: run `npm install` first')
  process.exit(1)
}

const files = readdirSync(SRC).filter(f => f.endsWith('.mmd')).sort()
let failed = 0
for (const f of files) {
  const name = basename(f, '.mmd')
  try {
    execFileSync(mmdc, [...args, '-i', join(SRC, f), '-o', join(OUT, `${name}.svg`), '-b', 'transparent', '-q'], { stdio: 'pipe' })
    copyFileSync(join(SRC, f), join(OUT, 'src', f))
    console.log(`ok    ${name}`)
  } catch (e) {
    failed++
    console.error(`FAIL  ${name}\n${String(e.stderr || e.message).slice(0, 400)}`)
  }
}
console.log(`${files.length - failed}/${files.length} diagrams rendered`)
process.exit(failed ? 1 : 0)
