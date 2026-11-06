import { StrictMode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { Writable } from 'node:stream'
import App from './App'

/** Renders the whole page, waiting for every lazy section, for scripts/prerender.mjs. */
export function render() {
  return new Promise((resolve, reject) => {
    let html = ''
    const sink = new Writable({
      write(chunk, _encoding, done) {
        html += chunk.toString()
        done()
      },
      final(done) {
        resolve(html)
        done()
      },
    })
    const stream = renderToPipeableStream(<StrictMode><App /></StrictMode>, {
      // Keep every section in document order. Left to itself, React moves large sections to the
      // end of the HTML and swaps them in by script, which breaks anchors and the no-script page.
      progressiveChunkSize: Infinity,
      onAllReady() {
        stream.pipe(sink)
      },
      onShellError: reject,
      onError: reject,
    })
  })
}
