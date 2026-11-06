# Architecture - Srini Centhala Portfolio

**Co-Author**: Srini Centhala, srini@absolut-e.com, Chief Data and AI Architect

## Overview

A static single page, built with React and Vite, prerendered at build time and hydrated in the browser. There is no backend. It deploys to any static host; the repository deploys to GitHub Pages.

```
Mermaid sources (.mmd)          src/data/*.js
   docs/diagrams, uml, ...         all copy, layouts, colour families
        |                               |
        |  parsed at build time         |
        v                               v
   vite plugin -------------------> React components
                                        |
                       vite build       |   vite build --ssr + prerender.mjs
                       (client chunks)  |   (the whole page as HTML)
                                        v
                                  dist/index.html  --> hydrated in the browser
```

## How a page load works

1. The HTML already holds every section in document order, so first paint, crawlers, link previews and no-script visitors all get the full content.
2. An inline script in the head applies the stored theme and motion preference before first paint.
3. The main bundle hydrates the header, hero, concept and philosophy. Each later section is a lazy chunk that hydrates inside its own `Suspense` boundary.
4. The hero canvas draws its planes once to offscreen canvases, then composites them each frame. It stops when off screen, when the tab is hidden, or when motion is off.

## Layers

| Layer | Where | Responsibility |
|---|---|---|
| Content | `src/data/` | All copy. One file per domain. |
| Drawing sources | `docs/` `.mmd` files | Labels and relationships of every drawing. |
| Drawing layout | `src/lib/diagram/` | Pure functions from a model and a spec to coordinates. Also the layout lint. |
| Drawing parts | `src/components/architecture/` | SVG nodes, connectors, layers, toolbar, inspector, full screen. |
| Sections | `src/sections/`, `src/components/*` | Compose content and drawings into the page. |
| Styling | `src/styles/` | Tokens, then global rules, then one file per area. |
| Preferences | `src/lib/motion.js`, `useTheme` | Motion and theme, stored locally and applied before paint. |

## The drawing system

`DiagramCard` is the unit the page uses. It chooses a surface by the width it is given. In the prerendered page both versions are present and a container query shows the right one, so nothing shifts on hydration. Once the card has been measured, only the version in use stays mounted.

- wide: `ArchitectureCanvas` for flow, state, class and entity diagrams, or `SequenceCanvas` for sequences
- narrow, with a `narrow` layout: the same canvas with the vertical layout
- narrow, sequence: `SequenceSteps`, a numbered list
- narrow, system context: `LayerList`, a list by layer

Each card has `DiagramToolbar` (zoom, reset, stepper, pause, text version, full screen), `ArchitectureLegend`, a `ComponentInspector`, and `DiagramFullscreen`, a native `dialog`. Selecting a component lights what it connects to. Selecting a layer name opens that layer: the rest dims, and the inspector lists what it holds and what crosses its boundary. Zoom and pan are held in `useZoomPan` in viewBox units. The page keeps scrolling normally until a visitor zooms in.

`ArchitectureShowcase` groups plates into chapters and handles deep links of the form `#plate-<slug>` and `#plate-<slug>/<nodeId>`.

## Responsive strategy

- Fluid type with `clamp()`, and `cqw` for the hero name, so it spans its container
- The hero is sized with `vh` as well as `vw`, so the composition fits the first view of a short laptop screen
- Grid layouts collapse at 1040, 900, 760 and 620 px
- Diagrams switch on the width of their own card, not the viewport, through a container query and a `ResizeObserver`
- Tested at 1920, 1440, 1280, 1024, 768, 390 and 360 px wide

## Performance

- No animation or UI library. React is the only runtime dependency.
- Fonts are self-hosted, preloaded and use `font-display: swap`, with a metric-matched fallback to avoid layout shift
- Images have dimensions and load lazily
- Canvas work pauses whenever it cannot be seen
- Only the active plate mounts its drawing

## Failure behaviour

| What fails | What happens |
|---|---|
| JavaScript off or broken | All content stays readable, including every plate and stage. Plates show their rendered SVG. |
| Local storage refused | Preferences last for the page view. |
| Reduced motion requested | No entrances, no loops, no smooth scrolling. Canvases draw one still frame. |
| No form service configured | The contact form opens an email draft instead. |
| Form service down | The form says so and gives the email address. |

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main`: `npm ci`, `npm test`, chooses the base path, `npm run build`, and publishes `dist/` to GitHub Pages. Pull requests run the same steps without publishing.

Any static host works. Set `VITE_BASE` to the path the site is served under and `VITE_SITE_URL` to its public address, with a trailing slash.
