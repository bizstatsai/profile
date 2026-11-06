# Claude Code Context - Srini Centhala Portfolio

**Co-Author**: Srini Centhala, srini@absolut-e.com, Chief Data and AI Architect

Last updated: 2026-11-04

## Project Overview
Executive website for Srini Centhala, Chief Data and AI Architect, technology strategist and enterprise architecture leader. Its central idea is "The Mind Behind the Architecture". It shows the thinking, every architecture drawing, the career line, the engagements, the product family, the books, the recognition and the consulting services.

This repository is **public**. Treat every file in it, including this one, as published.

## Tech Stack
- **Framework**: React 19 with Vite 5, one page, no router (anchor navigation)
- **Rendering**: prerendered at build time and hydrated in the browser (`scripts/prerender.mjs`)
- **Motion**: CSS, Canvas 2D and one motion store (`src/lib/motion.js`). No animation library.
- **Styling**: plain CSS in `src/styles/`, split by area, with tokens in `tokens.css`
- **Fonts**: self-hosted variable Manrope (display and body) and Space Grotesk (technical labels), SIL OFL
- **Diagrams**: Mermaid sources, parsed at build time and drawn by site components
- **Tests**: Vitest with Testing Library (`src/test/`)
- **Deploy**: GitHub Pages from GitHub Actions, on every push to `main`
- **PWA**: service worker and manifest, both base-path aware

## Project Structure
```
profile/
├── index.html                  # SEO tags, Person schema, preference script, font preload
├── vite.config.js              # Base from VITE_BASE, Mermaid plugin, default VITE_SITE_URL
├── .github/workflows/deploy.yml
├── public/
│   ├── diagrams/               # Rendered SVG per pattern, shown when scripts are off; src/ holds source copies
│   ├── fonts/, images/         # Self-hosted fonts, portrait, book covers
│   └── sw.js, manifest.json, og-image.png, favicon*, robots.txt, sitemap.xml
├── scripts/
│   ├── mermaid-parser.mjs      # Turns a .mmd file into nodes, edges, groups, steps
│   ├── prerender.mjs           # Writes the rendered page into dist/index.html
│   └── render-diagrams.mjs     # npm run diagrams: Mermaid sources to public/diagrams/*.svg
├── src/
│   ├── main.jsx, entry-server.jsx, App.jsx
│   ├── data/                   # ALL CONTENT. No copy lives in components.
│   │   ├── profile.js          # Identity, hero, concept, services, clients, navigation
│   │   ├── experience.js       # Roles, milestones, eras, careerLine()
│   │   ├── projects.js         # Case studies and the product family
│   │   ├── publications.js     # Books, questions, radar, speaking, thought leadership
│   │   ├── credentials.js      # Skills, certifications, education, recognition
│   │   ├── narrative.js        # Philosophy, data journey, method, AI section, principles
│   │   ├── architecturePatterns.js # Pattern language text, chapters, governance index
│   │   └── architectureDiagrams.js # Layout, colour family and description per drawing
│   ├── lib/
│   │   ├── diagram/            # layoutFlow.js (grid, routing, lint), layoutSequence.js, text.js
│   │   ├── motion.js, hooks.js, asset.js
│   ├── components/
│   │   ├── layout/             # Header, SectionContainer (with Headline, SectionHead), Footer
│   │   ├── hero/               # HeroSection, ArchitectureHeroVisual (the canvas stack)
│   │   ├── architecture/       # ArchitectureCanvas, ArchitectureLayer, ArchitectureNode,
│   │   │                       # ArchitectureConnector (with DataFlowArrow), ArchitectureLegend,
│   │   │                       # DiagramToolbar, DiagramFullscreen, DiagramDescription, DiagramCard,
│   │   │                       # SequenceCanvas, BlockDiagram, DiagramThumb, CategoryGlyph,
│   │   │                       # ArchitectureShowcase, useZoomPan
│   │   ├── timeline/, projects/, publications/, credentials/, animations/
│   ├── sections/               # Concept, Philosophy, Architecture, DataIntelligence, AI, Principles, Contact, SiteArchive
│   ├── styles/                 # tokens, global, animations, layout, hero, architecture, sections, career, work
│   └── test/                   # content, site, diagrams
├── docs/
│   ├── diagrams/               # README (inventory, placement, rules), src/*.mmd, sitemap, deployment
│   ├── uml/, data-model/, wireframes/   # Planning sources, shown in the colophon
│   ├── redesign-2026.md        # Decisions behind this design
│   └── design-tokens.md, accessibility.md, seo-checklist.md
└── CONTRIBUTING.md, backlog.md, architecture.md
```

## Page order
Hero, then The Mind Behind the Architecture (`#overview`), Philosophy, Architecture, Data to Decisions (`#data-journey`), AI (`#ai`), Journey, Projects, Publications, Recognition, Principles, Contact, Colophon, Footer. Section numbers and headlines come from the data files. Navigation is `navLinks` in `profile.js`; each section's `nav` prop in `App.jsx` says which item it highlights.

## Authenticity rules
These come from the brief and outrank any design idea. `src/test/content.test.js` enforces several of them.
- Never invent clients, awards, certifications, years of experience, metrics, testimonials or logos.
- Never present a conceptual drawing as a deployed system. Every drawing carries a status: Reference pattern, Target design, As built, Engagement summary or Planning record. Conceptual models carry a note saying so.
- Never change the technical meaning of a drawing. See "Diagrams" below.
- Forrester is an evaluation, not an award. Keep its context and its caveat together.
- A figure stays on the site only if the source record supports it. Figures that could not be corroborated were taken out on purpose; `docs/redesign-2026.md` lists them. Do not add them back without a source.
- If information is missing, leave it out. There is no resume link because there is no resume file.

## Public-safety rules
- Nothing internal appears in public text or diagrams: no hostnames, addresses, ports, namespaces, cluster or tunnel names, secret paths, credential or role names, codenames, ticket ids, staff names, or release tags. Label by role.
- Contact details in the data file are real. Do not add more personal contact details to the public repository.
- The full rule list is in `docs/diagrams/README.md`. Check every new diff against it before committing.

## Diagrams
- **Mermaid is the source of truth.** The plugin in `vite.config.js` parses each `.mmd` at build time, so no parser ships to the browser. Labels and relationships are never retyped.
- **`architectureDiagrams.js` adds only what a source cannot say**: position, colour family, and a one-line description for the inspector.
- **`src/test/diagrams.test.js` fails** if a drawing and its source disagree, or if a layout has overlapping nodes, a line through a node, overlapping labels or text too wide for its box.
- **A layout can use grid places or drawing coordinates.** `flow(cols, rows, nodeW, at, rest)` uses a grid. `{ px: true, at: { ID: [x, y] } }` uses coordinates. Routes take `sides`, `from`, `to`, `along`, `midX`, `midY`, `via`, `labelPos`, `labelChars` and `noLabel`.
- **Phones** get a vertical `narrow` layout, a numbered list for sequences, and a list by layer for the system context drawing. All of them can still open the full drawing.
- **Group membership follows Mermaid**: a node mentioned in several subgraphs belongs to the last one. Use `groupOf` where the parser disagrees, and check by rendering with `npm run diagrams` or mermaid-cli.

## Design System
- **Themes**: dark is the identity. `data-theme="light"` on `<html>` is a "drafting paper" alternative. The toggle is in the header.
- **Colour families on drawings**: data sources cyan, processing blue, storage violet, AI purple, security and governance amber, business consumption green. Each family also has a glyph, so colour is never the only signal.
- **Use tokens, not literal colours.** `docs/design-tokens.md` lists them, and `src/styles/tokens.css` is authoritative.
- **Use `.tech` for technical labels.** Sentence case, except where the brief specifies capitals.
- **Avoid**: gradient text, glow everywhere, card grids, circular photos, progress bars for skills, scroll hijacking, custom cursors.

## Motion
- `document.documentElement.dataset.motion` is the single switch. The inline script in `index.html` sets it before first paint from the stored choice or the reduced-motion setting.
- Loops must stop when motion is off, when the page is hidden and when the element is off screen.
- **Nothing starts hidden in the prerendered page.** Entrances are armed by script only once the element is known to be off screen (`useArmedReveal`), so a failed script can never hide content.

## Commands
```bash
npm install                 # Install dependencies (Node 22)
npm run dev                 # Dev server, http://localhost:5173
npm run build               # Build, then prerender into dist/index.html
npm run preview             # Serve dist/ locally
npm test                    # Vitest, one run
npm run diagrams            # Render docs/diagrams/src/*.mmd to public/diagrams
```

To preview the production build under its real path:
```bash
VITE_BASE=/profile/ npm run build
VITE_BASE=/profile/ npx vite preview --base /profile/
```

`npm run diagrams` needs a Chromium. Set `PUPPETEER_EXECUTABLE_PATH` to a local Chrome or Chromium when mermaid-cli cannot download its own.

## Key Architecture Decisions
- **Data separate from UI**: all copy lives in `src/data/`. Components read it.
- **Base-path safe**: the Vite base comes from `VITE_BASE`. Wrap every public path in `asset()` from `src/lib/asset.js`, with the leading slash inside the call, as in `asset('/images/x.jpg')`. Never write a base-path prefix by hand.
- **Deploy base**: the workflow uses `/` for a `<owner>.github.io` repository or when `public/CNAME` exists, and `/<repo>/` otherwise.
- **Prerender in document order**: `entry-server.jsx` sets `progressiveChunkSize: Infinity`. Without it React moves large sections to the end of the HTML and swaps them in by script, which breaks in-page anchors and the no-script page. `prerender.mjs` fails the build if that happens.
- **Lazy loading**: sections below the fold are split into chunks in `App.jsx`, inside `SectionContainer`, which stays mounted so anchors always resolve.
- **PWA**: `sw.js`, the manifest and the registration all use relative URLs. Navigations go to the network first, so a release reaches returning visitors at once. Bump `CACHE_NAME` when the precache list changes.
- **No icon library**: icons are small inline SVG. **No router**: anchor links only.

## Notes for Sub-agents
- **Content change**: edit `src/data/`, then run `npm test`.
- **New section**: add copy to `src/data/`, a component in `src/sections/`, lazy-load it inside a `SectionContainer` in `App.jsx`, and start it with `SectionHead`, which names the section landmark.
- **New drawing**: add the `.mmd`, import it and add a definition in `architectureDiagrams.js`, place it in a chapter, and add it to the inventory in `docs/diagrams/README.md`. Run `npm test` until the layout lint is clean, then look at it in both themes and on a phone.
- **Tests**: run `npm test` before every push.

## Recent changes
- **2026-11-04**: Executive redesign. Every section rebuilt around "The Mind Behind the Architecture". All 20 Mermaid sources are now drawn by interactive site components. Prerendering added. framer-motion and react-intersection-observer removed. Publication details corrected against the publishers' pages.

## Open items
See "To confirm with the site owner" in `docs/redesign-2026.md`.
- A custom domain needs `public/CNAME` and `VITE_SITE_URL`. The deploy workflow already switches the base path when `public/CNAME` exists.
- Four diagram sources lack the id header line: `platform-context`, `platform-release-path`, `pattern-pilot-light-failover` and `pattern-availability-states`.
