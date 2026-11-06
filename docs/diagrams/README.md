# Diagrams

**Co-Author**: Srini Centhala, srini@absolut-e.com, Chief Data and AI Architect

Every diagram on the site is drawn by site components from a Mermaid source. Labels and relationships are never retyped, and nothing is pasted as a screenshot.

## How it works

1. A Vite plugin (`vite.config.js`) parses each `.mmd` file at build time with `scripts/mermaid-parser.mjs`, so no parser ships to the browser.
2. `src/data/architectureDiagrams.js` adds what a source cannot say: where each component sits, its colour family, and a one-line description for the inspector.
3. `src/lib/diagram/` computes the coordinates, and `src/components/architecture/` draws them as interactive SVG.

`src/test/diagrams.test.js` keeps this honest. It fails if a drawing loses or changes a component, label, relationship, direction, dashed style, participant or message compared with its source. It also fails on overlapping nodes, a connector through a node, overlapping labels, or text too wide for its box.

## Rendered SVG

```bash
npm run diagrams
```

renders `docs/diagrams/src/*.mmd` to `public/diagrams/*.svg` with [mermaid-cli](https://github.com/mermaid-js/mermaid-cli) and copies each source to `public/diagrams/src/`. A parse error fails the run. Visitors without JavaScript see these SVGs. They are also the way to compare a redraw with what Mermaid itself produces. In a container without a bundled Chromium, point it at one:

```bash
PUPPETEER_EXECUTABLE_PATH=/path/to/chromium npm run diagrams
```

## Header on every source file

The first line of each `.mmd` in `docs/diagrams/src/` is a comment with the diagram's register entry:

```
%% id: pattern-lakehouse · level: pattern · visibility: public · owner: architect
```

`level` is one of `C4-1`, `C4-2`, `C4-3`, `C4-4`, `class`, `sequence`, `state`, `deployment`, `pattern`. `visibility` is `public` or `internal`; only `public` sources live in this repository.

## What never appears in a public diagram

Hostnames, IP addresses, ports, namespaces, cluster and tunnel names, secret paths, credential and role names, vendor account identifiers, exact software versions, rate-limit values, incident details, ticket and backlog identifiers, staff names, internal codenames, release tags. Label by **role** ("Control-plane node", "Secrets vault", "Primary tunnel"). Roles, counts and patterns are fine.

Internal diagrams, where those details belong, live with the platform repositories and are the source of truth. A public variant is derived from the internal one by replacing labels, never drawn twice.

## Status

Every drawing states what it is, so that nothing conceptual reads as a deployed system.

| Status | Meaning |
|---|---|
| Reference pattern | A reusable design with its trade-offs. It does not depict any one client system. |
| Target design | The planned design for the BizStats AI platform. Not presented as deployed. |
| As built, public view | The BizStats AI platform as it runs, labelled by role. |
| Engagement summary | A simplified flow from the case-study notes, not a client system diagram. |
| Planning record | Drawn in February 2026 while planning this website. Superseded by the site itself. |

## Inventory and placement

| Source | Kind | Status | Where on the site |
|---|---|---|---|
| `src/pattern-lakehouse.mmd` | Flow | Reference pattern | Architecture, chapter 3.A, plate 3.1 |
| `src/pattern-data-mesh.mmd` | Flow | Reference pattern | Architecture, chapter 3.A, plate 3.2 |
| `src/pattern-streaming.mmd` | Flow | Reference pattern | Architecture, chapter 3.A, plate 3.3 |
| `src/pattern-cloud-migration.mmd` | Flow | Reference pattern | Architecture, chapter 3.B, plate 3.4 |
| `src/pattern-pilot-light-failover.mmd` | Sequence | Target design | Architecture, chapter 3.B, plate 3.5 |
| `src/pattern-availability-states.mmd` | State | Target design | Architecture, chapter 3.B, plate 3.6 |
| `src/pattern-scale-to-zero.mmd` | Sequence | Reference pattern | Architecture, chapter 3.B, plate 3.7 |
| `src/platform-context.mmd` | Flow | As built | Architecture, chapter 3.C, plate 3.8 |
| `src/platform-release-path.mmd` | Sequence | As built | Architecture, chapter 3.C, plate 3.9 |
| `src/pattern-mlops.mmd` | Flow | Reference pattern | AI, plate 5.1 |
| `src/pattern-agentic-mcp.mmd` | Flow | Reference pattern | AI, plate 5.2 |
| `src/pattern-llm-router.mmd` | Flow | Reference pattern | AI, plate 5.3 |
| `sitemap.mmd` | Flow | Planning record | Colophon |
| `deployment.mmd` | Flow | Planning record | Colophon |
| `../uml/component-diagram.mmd` | Flow | Planning record | Colophon |
| `../uml/class-diagram.mmd` | Class | Planning record | Colophon |
| `../uml/sequence-diagram.mmd` | Sequence | Planning record | Colophon |
| `../uml/state-diagram.mmd` | State | Planning record | Colophon |
| `../data-model/schema.mmd` | Entity | Planning record | Colophon |
| `../wireframes/layout.mmd` | Block | Planning record | Colophon |

Drawn from data rather than from a Mermaid file:

| Figure | Source data | Where |
|---|---|---|
| Five engagement flows | `caseStudies[].architecture` | Projects, one per engagement. Status: Engagement summary. |
| Intelligence Stack | `methodology.layers` | Data to Decisions |
| Maturity Pyramid | `maturityPyramid.levels` | AI |
| Technology Radar | `techRadar` | Publications |
| Career timeline | `experiences`, `milestones` | Journey |

New conceptual visuals. Each illustrates an idea and is labelled as such where it could be mistaken for a system:

| Figure | Where |
|---|---|
| Exploded architecture stack | Hero |
| Optical lens from challenges to outcomes | Philosophy |
| Data ribbon from scattered data to one decision | Data to Decisions |
| Five AI layers | AI |

## Conventions

- `<br/>` for line breaks in labels; no `;` inside labels (Mermaid treats it as a separator).
- Keep explicit fills on nodes in the sources, so the rendered SVGs stay readable on their own.
- A node mentioned in several subgraphs belongs, in Mermaid, to the last one. Use `groupOf` in the drawing definition where the parser disagrees.
- Where several parallel connectors carry the same label, a layout may show it once with `noLabel`. The full list stays in the drawing's text version.
- A label override (`labels` in a definition) needs a stated reason. The only one replaces a retired email address in the sitemap record with "Email link".
- When adding a drawing, add a row to the inventory above.
