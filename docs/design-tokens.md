# Design Tokens

**Co-Author**: Srini Centhala, srini@absolut-e.com, Chief Data and AI Architect

Reference for the design tokens. They are CSS custom properties in `src/styles/tokens.css`, which is authoritative. Dark is the identity; light is "drafting paper", a reader's choice.

## Surfaces and text

| Token | Dark | Light | Usage |
|---|---|---|---|
| `--bg` | `#080b14` | `#f6f7fb` | Page |
| `--bg-2` | `#101625` | `#eceff6` | Alternating section band |
| `--surface` | `#151e30` | `#ffffff` | Raised surface |
| `--surface-2` | `#1c2740` | `#f1f3f9` | Raised surface, hover |
| `--canvas` | `#0b101c` | `#fbfcfe` | Drawing area |
| `--node` | `#111929` | `#ffffff` | Component box on a drawing |
| `--ink` | `#f8fafc` | `#0b1220` | Primary text |
| `--ink-2` | `#a7b3c7` | `#414d66` | Secondary text |
| `--ink-3` | `#8390a8` | `#5a667e` | Tertiary text and labels |
| `--line` | `rgba(148,163,184,.16)` | `rgba(30,41,59,.14)` | Hairlines |
| `--line-2` | `rgba(148,163,184,.32)` | `rgba(30,41,59,.3)` | Stronger rules |

## Accents

Purple and cyan are used strategically: the primary button, the active state and small technical labels. They are not used for decoration.

| Token | Dark | Light | Usage |
|---|---|---|---|
| `--violet` | `#7c3aed` | `#6d28d9` | Primary button, active rule |
| `--violet-ink` | `#b9a0ff` | `#5b21b6` | Violet as text |
| `--cyan` | `#06b6d4` | `#0e7490` | Cyan as a line or fill |
| `--cyan-ink` | `#45d3e8` | `#0e7490` | Cyan as text |
| `--sky` | `#38bdf8` | `#0369a1` | Secondary accent |
| `--on-violet` | `#ffffff` | `#ffffff` | Text on the primary button |

## Colour families on drawings

Each family also has a glyph, drawn by `CategoryGlyph`, so colour is never the only signal.

| Token | Dark | Light | Family |
|---|---|---|---|
| `--cat-source` | `#22d3ee` | `#0e7490` | Data sources |
| `--cat-process` | `#60a5fa` | `#1d4ed8` | Processing and transformation |
| `--cat-storage` | `#8f92ff` | `#4f46e5` | Storage |
| `--cat-ai` | `#d08bff` | `#9333ea` | AI and intelligence |
| `--cat-governance` | `#fbbf24` | `#b45309` | Security and governance |
| `--cat-consumption` | `#34d399` | `#047857` | Business consumption |
| `--cat-neutral` | `#94a3b8` | `#475569` | Tools and external services |
| `--cat-people` | `#cbd5e1` | `#334155` | People |

## Typography

| Token | Value | Usage |
|---|---|---|
| `--font-display`, `--font-body` | Manrope, then a metric-matched Arial fallback | Headlines and reading text |
| `--font-tech` | Space Grotesk | Technical labels, through the `.tech` class |

| Token | Size |
|---|---|
| `--text-xs` | `0.8125rem` |
| `--text-sm` | `0.9375rem` |
| `--text-md` | `1.0625rem` |
| `--text-lg` | `clamp(1.1875rem, 1rem + 0.6vw, 1.4375rem)` |
| `--text-xl` | `clamp(1.5rem, 1.1rem + 1.3vw, 2.25rem)` |
| `--text-2xl` | `clamp(2.125rem, 1.2rem + 3.3vw, 4.5rem)` |
| `--text-3xl` | `clamp(2.4rem, 1.15rem + 4.3vw, 5.4rem)` |

Headlines are set in light weights with tight tracking. Sentences in a headline that set up the point read in `--ink-2`, and the point itself reads in `--ink`.

## Space and motion

| Token | Value | Usage |
|---|---|---|
| `--sheet` | `1520px` | Widest content |
| `--gutter` | `clamp(22px, 6.4vw, 104px)` | Side margin |
| `--gap` | `clamp(16px, 2vw, 32px)` | Default gap |
| `--header` | `68px` | Header height, and the anchor offset |
| `--ease-out` | `cubic-bezier(0.2, 0.7, 0.2, 1)` | Entrances |

## Drawing type

SVG text does not wrap, so `src/lib/diagram/text.js` wraps ahead of time from estimated character widths. Change these together with the matching CSS.

| Role | Size | Line height | Estimated character width |
|---|---|---|---|
| Component title | 14 | 18 | 7.7 |
| Component detail | 12 | 16 | 6.35 |
| Class member | 11.5 | 15 | 6.1 |
| Connector label | 11.5 | 14 | 6.1 |
