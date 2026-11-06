/**
 * A small mark per colour family, so a component's category never depends on colour alone.
 * Drawn on a 12 by 12 grid.
 */
const PATHS = {
  source: 'M6 1.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6ZM6 4.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Z',
  process: 'M1.5 2.5 5.5 6l-4 3.5M6.5 2.5l4 3.5-4 3.5',
  storage: 'M1.8 3c0-1 1.9-1.8 4.2-1.8s4.2.8 4.2 1.8-1.9 1.8-4.2 1.8S1.8 4 1.8 3Zm0 0v6c0 1 1.9 1.8 4.2 1.8s4.2-.8 4.2-1.8V3M1.8 6c0 1 1.9 1.8 4.2 1.8S10.2 7 10.2 6',
  ai: 'M6 .8c.5 3 1.7 4.5 5.2 5.2C7.7 6.7 6.5 8.2 6 11.2 5.5 8.2 4.3 6.7.8 6 4.3 5.3 5.5 3.800 6 .8Z',
  governance: 'M6 1 10.5 2.6v3.2c0 2.600-1.800 4.300-4.500 5.200C3.300 10.100 1.500 8.400 1.500 5.800V2.600L6 1Z',
  consumption: 'M1.500 10.500h9M3 10.500V6.500M6 10.500V2M9 10.500V4.500',
  neutral: 'M2 2h8v8H2Z',
  people: 'M6 1.500a2.300 2.300 0 1 1 0 4.600 2.300 2.300 0 0 1 0-4.600ZM1.800 10.800c.4-2.300 2.100-3.500 4.200-3.500s3.800 1.200 4.200 3.500',
}

export default function CategoryGlyph({ cat, x = 0, y = 0, size = 12 }) {
  return (
    <path
      className="ac-glyph"
      d={PATHS[cat] ?? PATHS.neutral}
      transform={`translate(${x} ${y}) scale(${size / 12})`}
    />
  )
}
