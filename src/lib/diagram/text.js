/**
 * SVG text does not wrap, so diagrams wrap labels ahead of time from an estimated
 * character width. The estimates are deliberately a little wide, and the layout
 * test plus the browser QA check that nothing overflows its box.
 */
export const TYPE = {
  title: { size: 14, lh: 18, char: 7.7 },
  sub: { size: 12, lh: 16, char: 6.35 },
  member: { size: 11.5, lh: 15, char: 6.1 },
  label: { size: 11.5, lh: 14, char: 6.1 },
}

/** A path too long for one line breaks after its slashes. */
const pathFragments = (word, maxChars) => {
  if (word.length <= maxChars || !word.includes('/')) return [word]
  const out = ['']
  word.split(/(?<=\/)/).forEach((part) => {
    if (out.at(-1) && (out.at(-1) + part).length > maxChars) out.push(part)
    else out[out.length - 1] += part
  })
  return out
}

export function wrap(text, maxChars) {
  // A separator stays with the word before it, so no line starts with one.
  const words = String(text).split(/\s+/).filter(Boolean).reduce((all, word) => {
    if (word === '·' && all.length) all[all.length - 1] += ' ·'
    else all.push(word)
    return all
  }, []).flatMap(word => pathFragments(word, maxChars))
  const lines = []
  let line = ''
  for (const word of words) {
    const next = line ? `${line} ${word}` : word
    if (next.length > maxChars && line) {
      lines.push(line)
      line = word
    } else {
      line = next
    }
  }
  if (line) lines.push(line)
  return lines
}

export const textWidth = (lines, style) =>
  Math.max(0, ...lines.map(l => l.length * style.char))
