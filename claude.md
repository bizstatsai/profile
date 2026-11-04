# Claude Code Context - Srini Centhala Portfolio

**Co-Author**: Srini Centhala, srini@absolut-e.com, Chief Data and AI Architect

Last updated: 2026-11-04

## Project Overview
Personal portfolio website for Srini Centhala, Chief Data and AI Architect and technology leader with 25+ years of experience consulting for Fortune 100 companies. The site shows professional experience, the product family, the architecture pattern library, published books, skills, certifications and consulting services.

This repository is **public**. Treat every file in it, including this one, as published.

## Tech Stack
- **Framework**: React 19 with Vite 5, single page, no router (anchor navigation)
- **Animation**: framer-motion (section entrance and the layout transitions only)
- **Styling**: CSS custom properties in `src/index.css`, shared classes in `src/App.css`, inline styles inside components
- **Fonts**: Archivo (display), IBM Plex Sans (body), IBM Plex Mono (labels, data, code)
- **Tests**: Vitest with Testing Library (`src/test/`)
- **Diagrams**: Mermaid sources rendered to SVG by mermaid-cli
- **Deploy**: GitHub Pages from GitHub Actions, on every push to `main`
- **PWA**: service worker and manifest, both base-path aware

## Project Structure
```
profile/
├── index.html                          # Entry HTML, fonts, base-aware service worker registration
├── vite.config.js                      # base from VITE_BASE, React plugin
├── package.json                        # Scripts: dev, build, preview, test, diagrams
├── .github/workflows/deploy.yml        # Test, build and deploy to GitHub Pages
├── public/
│   ├── diagrams/                       # Rendered SVG per diagram; src/ holds the Mermaid sources
│   ├── images/                         # Book covers and other static images
│   ├── sw.js                           # Service worker (caches assets for repeat visits, relative URLs)
│   ├── manifest.json                   # PWA manifest (relative URLs)
│   └── og-image.png, favicon-*.png, robots.txt, sitemap.xml
├── scripts/
│   └── render-diagrams.mjs             # Renders docs/diagrams/src/*.mmd to public/diagrams
├── src/
│   ├── main.jsx                        # React root mount
│   ├── index.css                       # Design tokens for dark (default) and light themes
│   ├── App.jsx                         # Section order; below-the-fold sections are lazy-loaded
│   ├── App.css                         # Shared classes (.section, .card, .btn, .tag, .figure, .dl)
│   ├── data/
│   │   └── profile.js                  # SINGLE SOURCE OF TRUTH: profile, products, patterns, nav
│   ├── lib/
│   │   └── asset.js                    # asset(path): prefixes public paths with the base path
│   ├── components/
│   │   ├── Navbar.jsx                  # Fixed nav, scroll blur, theme toggle, mobile menu
│   │   ├── Hero.jsx                    # Title block, bio, stats, revision line
│   │   ├── About.jsx                   # Expertise cards and role tags
│   │   ├── Products.jsx                # Product family showcase
│   │   ├── ArchitecturePatterns.jsx    # Pattern library: layer filter, detail with rendered diagram
│   │   ├── Platform.jsx                # Platform context and release-path diagrams
│   │   ├── CaseStudies.jsx, Experience.jsx, Methodology.jsx, MaturityPyramid.jsx
│   │   ├── Timeline.jsx, Books.jsx, ThoughtLeadership.jsx, FAQ.jsx, Skills.jsx
│   │   ├── TechRadar.jsx, Services.jsx, Certifications.jsx, Speaking.jsx, SpeakerKit.jsx
│   │   ├── Contact.jsx                 # Contact form and company links
│   │   ├── Footer.jsx                  # Copyright and links
│   │   └── ScrollReveal.jsx            # Reveal-on-scroll wrapper
│   └── test/
│       ├── components.test.jsx         # Component behaviour
│       ├── profile-data.test.js        # Data integrity, pattern count, rendered diagrams exist
│       └── setup.js
├── docs/
│   ├── diagrams/
│   │   ├── README.md                   # Diagram pipeline and public-safety rules
│   │   └── src/*.mmd                   # Mermaid sources (one per rendered figure)
│   ├── redesign-2026.md                # Design decisions for the 2026 redesign
│   ├── platform-blueprint-2026.md      # Research and architecture blueprint
│   ├── design-tokens.md, accessibility.md, seo-checklist.md, tools-and-extensions.md
│   ├── uml/, data-model/, wireframes/, api/   # Earlier planning diagrams and specs
└── CONTRIBUTING.md, backlog.md, architecture.md
```

## Design System
- **Themes**: dark is the default. `data-theme` on `<html>` switches to light. The toggle lives in the navbar.
- **Tokens** (in `src/index.css`, values differ per theme):
  - `--ink-3`: muted text (dark `#98a1b0`, light `#5b6577`)
  - `--accent`: links and highlights (dark `#7fa6e0`, light `#1f4e8c`)
  - `--warn`: "In development" and caution labels (dark `#e2b74a`, light `#8a5a00`)
  - `--gradient-start`, `--gradient-end`: headings and the logo mark
  - `--bg-*`, `--border`, `--text-*`: surfaces and text
- **Use tokens, not literal colours**, in components and classes.
- **Type**: display headings in Archivo; body in IBM Plex Sans; labels, tags and figure captions in IBM Plex Mono.
- **Layout**: 16px side gutter; check that nothing scrolls sideways at 400px width.
- **Full reference**: `docs/design-tokens.md`. Check it against `src/index.css` before relying on it.

## Commands
```bash
npm install                 # Install dependencies (Node 22)
npm run dev                 # Dev server, http://localhost:5173
npm run build               # Production build to dist/
npm run preview             # Serve dist/ locally
npm test                    # Vitest, one run
npm run diagrams            # Render docs/diagrams/src/*.mmd to public/diagrams
```

`npm run diagrams` needs a Chromium. Set `PUPPETEER_EXECUTABLE_PATH` to a local Chrome or Chromium when mermaid-cli cannot download its own.

## Content Source
All content lives in `src/data/profile.js`. Components read it and never hard-code copy.

- **Profile**: name, role (Founder & Chief Data and AI Architect), location, companies, education
- **Products**: the product family, with status per product
- **architecturePatterns**: the pattern library. Each entry has a slug, title, layer, intent, forces, consequences, known uses, related patterns and a diagram name.
- **navGroups / navLinks**: the navigation
- **Clients, certifications, books**: listed in the data file; certification links are real, keep them when editing

Contact details in the data file are real. Do not add more personal contact details to the public repository.

## Key Architecture Decisions
- **Single data file**: components import from `src/data/profile.js`. New content goes there first.
- **Base-path safe**: the Vite base comes from `VITE_BASE`. Wrap every public path in `asset()` from `src/lib/asset.js`, and keep the leading slash inside the call, as in `asset('/diagrams/x.svg')`. `asset()` adds the base path in front of that slash. Never write a base-path prefix by hand.
- **Deploy base**: the workflow uses `/` for a `<owner>.github.io` repository or when `public/CNAME` exists, and `/<repo>/` otherwise.
- **PWA**: `sw.js`, the manifest and the registration all use relative URLs, so the app works under either base.
- **Diagrams are rendered, never drawn by hand**: every figure comes from a Mermaid source in `docs/diagrams/src/`, rendered by `npm run diagrams`. Each source starts with an id header. See `docs/diagrams/README.md`.
- **Pattern library**: `architecturePatterns` drives `ArchitecturePatterns.jsx`. The test pins the count and checks that every referenced diagram exists.
- **Lazy-loaded sections**: sections below the fold are split into chunks in `App.jsx`.
- **Inline styles in components**, shared classes in `App.css`, tokens in `index.css`.
- **No icon library**: use Unicode and HTML entities.
- **No router**: anchor links only.

## Diagrams and public-safety rules
- Nothing internal appears in public text or diagrams: no hostnames, addresses, ports, namespaces, cluster or tunnel names, secret paths, credential or role names, codenames, ticket ids, staff names, or release tags. Label by role.
- The full rule list is in `docs/diagrams/README.md`. Check every new diff against it before committing.
- Review gate: a change to `src/data/profile.js` or `docs/diagrams/src/` needs a second look for the rules above.

## Notes for Sub-agents
- **Data changes**: edit `src/data/profile.js`. Components read from there.
- **New sections**: create a component in `src/components/`, lazy-load it in `App.jsx`, and add the section to the navigation data.
- **Section backgrounds**: alternate `var(--bg-primary)` and `var(--bg-secondary)`.
- **Classes**: use `.card`, `.tag`, `.btn`, `.btn-primary`, `.btn-outline`, `.section`, `.figure`, `.dl`.
- **Diagrams**: edit the `.mmd` source, run `npm run diagrams`, and commit the SVG and the source together.
- **Images and fonts**: reference through `asset()`.
- **Tests**: run `npm test` before every push. The data test fails if a pattern points at a missing diagram.

## Recent changes
- **2026-11-04**: Pages deploy is verified on `main` at the base-path fix (PR #4). Earlier in the same redesign: the products showcase and the pattern library were added (PR #2), and the PWA became base-path aware (PR #3).
- **2026-11**: Redesign with new tokens, navigation, hero and restyled sections. Products, Platform and Architecture Patterns sections added. Diagrams are rendered from Mermaid sources.

## Open items
- `public/Srini_Centhala_Resume.pdf` is linked from the hero and tested for, but the file is not in the repository.
- The contact form posts to a Formspree placeholder id in `src/components/Contact.jsx`. Replace it before relying on the form.
- Four diagram sources lack the id header line: `platform-context`, `platform-release-path`, `pattern-pilot-light-failover` and `pattern-availability-states`.
- A custom domain needs `public/CNAME`. The deploy workflow already switches the base path when that file exists.
