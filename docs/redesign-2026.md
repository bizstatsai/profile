# Site redesign, November 2026

The portfolio was rebuilt around one idea: the site is an architect's drawing register. Every
section is a sheet; every figure is rendered from source; nothing on it depicts a client system
or an internal identifier. This document records the decisions so the next change does not
undo them by accident.

## 1. Goals

1. Lead with the work that is inspectable: products, patterns, the platform's public
   architecture. The earlier site led with a bio and a client logo strip.
2. Present architecture the way the reference sites do (Fowler, Brown/C4, Hohpe, Richardson,
   Newman, Richards, Xu, Huyen, Willison, Orosz; see the Platform Blueprint, section 10): one
   canonical page per concept, a fixed pattern template, diagrams as first-class artefacts in
   one notation, known uses as public products or anonymised engagements, offerings separated
   from writing, the distribution channel owned.
3. Drop the "AI-generated" look: purple-to-cyan gradient headings, glow hover, emoji section
   markers, Inter as the only face.
4. Keep every existing section and its content; change order, hierarchy and styling.
5. Publish nothing confidential. See `docs/diagrams/README.md` for the rule set.

## 2. Information architecture

Navigation is grouped the way the reference sites separate work, writing and offerings
(`navGroups` in `src/data/profile.js`):

| Group | Links | Section order on the page |
|---|---|---|
| Work | Products · Patterns · Platform · Case Studies | 1 Hero · 2 About · 3 Products · 4 Patterns · 5 Platform · 6 Case Studies · 7 Experience |
| Writing | Books · Methodology · FAQ | 8 Methodology · 9 Maturity Pyramid · 10 Timeline · 11 Books · 12 Thought Leadership · 13 FAQ |
| Offerings | Services · Speaking · Contact | 14 Skills · 15 Tech Radar · 16 Certifications · 17 Services · 18 Speaking · 19 Speaker Kit · 20 Contact · Footer |

The old flat `navLinks` array is kept (tests and the footer used it) and trimmed to seven links.

## 3. Visual system

Tokens live in `src/index.css`; shared components in `src/App.css`. Legacy token names
(`--bg-primary`, `--accent-light`, `--gradient-start`, …) are aliases of the new ones so the
twenty existing components restyle without edits.

| Role | Dark (default) | Light |
|---|---|---|
| Background / raised | `#0f1216` / `#1a202a` | `#f6f7f4` / `#ffffff` |
| Ink / secondary / muted | `#e8ebef` / `#aab2bf` / `#727c8b` | `#1c2230` / `#4a5468` / `#7b8498` |
| Rule | `#2a323e` | `#d6dae2` |
| Accent (ink blue) | `#7fa6e0` | `#1f4e8c` |
| Signal (one orange, used for the sheet mark, proposed elements, the resume button) | `#ff8a4c` | `#d1540f` |
| Paper (diagram cards, same in both themes) | `#f6f7f4` | `#ffffff` |

Type: Archivo 700/800 for display, IBM Plex Sans for body, IBM Plex Mono for data, labels and
the title block. Headings are solid ink, never gradient text. Cards have a 6px radius and a
1px rule; hover changes the border colour only.

Structural devices that carry information: the mono **sheet label** above each title (the
section's place in the register), the **title block** in the hero (name, title, firm, location,
practice, published, validation, revision), and the **proof strip** (five numbers).
Numbered markers are used only where the content is a sequence (the cloud-migration pattern).

## 4. Sections

- **Hero** (`Hero.jsx`): sheet label, name, the bio as thesis, four actions (patterns,
  experience, contact, resume), "known uses" client tags, the title block, the proof strip.
  The placeholder avatar is gone; a real headshot can be added back as a title-block cell.
- **About**: unchanged content, emoji icons removed.
- **Products** (`Products.jsx`): the thirteen-product family with status pills, public URLs,
  and a platform line that names no internals.
- **Patterns** (`ArchitecturePatterns.jsx`): ten patterns in the pattern-language template
  (intent, forces, solution, consequences, known uses, related, stack), filterable by layer
  (Data platform · AI & agents · Platform & operations), each with a rendered diagram and a
  "view Mermaid source" link. Four patterns are new and come from the BizStats platform:
  self-hosted primary with cloud pilot light, availability as a state machine, scale-to-zero
  environments with a door, LLM router with provider fallback.
- **Platform** (`Platform.jsx`, new): two public-safe figures of the product family, the C4
  system context and the release path, each with its claim in the caption.
- **Services / Speaking / Contact**: unchanged content, icons removed, restyled by tokens.
- **Footer**: identity, the three nav groups, elsewhere links, and the statement that every
  diagram is rendered from source and no client system is depicted.

## 5. Diagrams pipeline

`npm run diagrams` renders `docs/diagrams/src/*.mmd` to `public/diagrams/*.svg` with
mermaid-cli and copies the sources next to them. A test fails if a pattern references a
diagram that is not rendered. Rules, inventory and the public/internal boundary:
`docs/diagrams/README.md`.

## 6. Accessibility and performance

- Section landmarks and heading order unchanged; the patterns list uses `aria-pressed`
  buttons and an `aria-live` detail panel; every figure has `alt` and a caption.
- Focus ring is the signal colour on every interactive element; reduced-motion is respected.
- Fonts are loaded from Google Fonts with `display=swap`; sections below the fold stay
  lazy-loaded; diagrams are static SVG with `loading="lazy"` (no Mermaid runtime in the bundle).
- Page body never scrolls horizontally at 400px; checked in headless Chromium in both themes.

## 7. Content rules for anything added later

1. Known uses are public products or anonymised engagements; never a client's internal system.
2. A figure is added as a `.mmd` source, rendered by the pipeline, and captioned with one claim.
3. Pattern pages keep the eight positions in the same order so two can be compared by scanning.
4. Every page must contain something only the author could write: a drill number, a decision,
   a consequence that is not all positive. That is the test for generic content.

## 8. Checklist before publishing a change

- `npm test` and `npm run build` pass.
- `npm run diagrams` was run if any `.mmd` changed and the SVGs are committed.
- No hostname, address, port, namespace, codename, ticket id or staff name in any new text or
  diagram (grep the diff for digits-with-dots and for the internal names list).
- Screenshot at 1440px and 400px in both themes.
