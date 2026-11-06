# Site redesign, November 2026

**Co-Author**: Srini Centhala, srini@absolut-e.com, Chief Data and AI Architect

This document records the decisions behind the current design, so the next change does not undo them by accident. The earlier "drawing register" design is in the git history.

## 1. The concept

**The Mind Behind the Architecture.** Turning complex data, technology and intelligence into systems that create business impact.

The memorable element is one drawing, the exploded stack of enterprise planes in the hero: data streams, cloud infrastructure, knowledge network, intelligent systems and business decisions. It is the site's only big gesture. It returns, labelled and open to exploration, as the five AI layers in section 05.

Three further ideas carry the rest:
- A through-line down the left edge ties the sections into one continuous story.
- Each claim gets a drawing that argues it: the lens in Philosophy, the ribbon in the data journey.
- Every drawing states its own standing, so the visitor always knows whether they are looking at a reference pattern, a target design or something that runs.

## 2. Information architecture

| # | Section | Id | Navigation item |
|---|---|---|---|
| - | Hero | `top` | Overview |
| 01 | The Mind Behind the Architecture | `overview` | Overview |
| 02 | Technology Is the Medium | `philosophy` | Philosophy |
| 03 | Behind Every Intelligent Business | `architecture` | Architecture |
| 04 | Data Is Not Intelligence Yet | `data-journey` | AI & Data |
| 05 | AI Is Powerful | `ai` | AI & Data |
| 06 | Experience Built Across Complex Enterprise Environments | `journey` | Journey |
| 07 | From Architectural Thinking to Real-World Systems | `projects` | Projects |
| 08 | Ideas That Shape Better Technology | `publications` | Publications |
| 09 | Architecture Recognized | `recognition` | Publications |
| 10 | Principles Behind Every Architecture Decision | `principles` | Publications |
| 11 | Have a Complex Technology Challenge? | `contact` | Contact |
| - | Colophon and footer | `site-archive` | - |

Drawings sit where they make the argument, not in one gallery. Patterns are grouped into chapters with the capability text they support, AI patterns sit with the AI section, engagement flows sit inside their engagements, and the planning records sit in the colophon.

## 3. Visual system

Tokens are in `docs/design-tokens.md`.

- **Palette**: near-black navy, with purple and cyan used strategically. On drawings, colour names a family of components and has a matching glyph.
- **Type**: Manrope in light weights for headlines and reading; Space Grotesk for technical labels. Both self-hosted.
- **Layout**: editorial, on a wide sheet. Large year markers on the timeline, hairlines instead of cards, and measures that vary by content.
- **Themes**: dark by default, with a light drafting-paper alternative.
- **Motion**: one orchestrated hero, an entrance for each headline, and a data pulse along connectors. All of it can be paused and all of it respects reduced motion.

## 4. The drawing system

All 20 Mermaid sources are redrawn by site components, from data parsed out of those sources at build time. See `docs/diagrams/README.md` for the inventory, the placement and the rules.

This replaces the earlier rule "diagrams are rendered, never drawn by hand". The new rule keeps its purpose: labels and relationships still come only from the sources, and a test compares each drawing with its source.

## 5. Content decisions

The brief asked for nothing to be invented and nothing valuable to be lost. Where the two pulled against each other, or where the old site's claims could not be supported, these are the calls that were made.

**Taken out because they could not be corroborated:**
- "4,700+ stores" in the Walmart engagement. Replaced with the documented scope.
- "Reducing manual QA by 80%" in the Walmart engagement. Replaced with the documented result.

**Reworded to say only what the record supports:**
- "10+ Fortune 100 clients" became the count of named clients, 14, because the named list does not establish the larger claim.
- "Google Cloud, AWS, and Azure certified" became "Experience across Google Cloud, AWS, and Azure", because the credentials listed are course credentials, not those certifications.
- Case studies no longer say "anonymized", because the clients are named on the page.
- Forrester is presented as an evaluation with its context and an explicit "not a formal award".

**Corrected against the publishers' pages:**
- The three Business Expert Press books are dated March 2020. The old timeline said 2022 and 2025.
- *OneStop Project Management* is credited to four authors, including Muthu Shanmugam, who was missing.

**Reduced or relocated, not removed:**
- Coming-soon channels are reduced to one line.
- The first page wireframe keeps its stale placeholder copy, under a label that says it is superseded.
- The sitemap record's retired email address is relabelled "Email link".
- Questions in "Ask an Architect" show eight at first, with a button for all 30. All of them are in the page for crawlers and no-script readers.

**Left out because the material does not exist:**
- No resume link, because there is no resume file.
- No testimonials and no client logos.

## 6. To confirm with the site owner

| Item | Why it needs confirming |
|---|---|
| Portrait | Taken from the author page at Business Expert Press, at 400 by 400 pixels. A higher-resolution original would look better. |
| Naming clients | The old site described engagements as anonymized while naming the clients. They are named here. Confirm that this is acceptable to the owner and the clients. |
| 25+ years and 22K+ LinkedIn followers | Carried over as stated. They could not be checked from outside. |
| Questions in "Ask an Architect" | Some answers quote general-industry figures that could not be verified. They are carried over unchanged. |
| The dropped figures | If a source exists for 4,700+ stores or the 80% reduction, they can come back. |
| Three MongoDB course credentials | The issuer's links no longer resolve, so the page lists them without links and says so. Supply replacements if the issuer provides any. |
| Contact form | Without `VITE_FORMSPREE_ENDPOINT` the form opens an email draft. Set the variable to post through Formspree. |
| Custom domain | `srinicenthala.com` is currently a parked page, so the canonical address is the GitHub Pages one. Add `public/CNAME` and `VITE_SITE_URL` to move. |

## 7. Two things that are easy to break

- **Prerendered sections stay in document order.** `entry-server.jsx` sets `progressiveChunkSize: Infinity`, and `prerender.mjs` fails the build otherwise. Without it, in-page links far down the page can fail on load.
- **The prerendered page has its final shape.** A diagram card renders its wide and phone versions until it has been measured, and a container query shows the right one. Without it, the phone layout shifts by thousands of pixels on hydration and in-page links land in the wrong place.

## 8. How it was checked

- `npm test`: content authenticity, section order and copy, navigation targets, interactions, and each drawing against its source and the layout lint.
- A browser run of the production build at 1920, 1440, 1280, 1024, 768, 390 and 360 px: no sideways scroll, no console or network errors, the name inside the first view on laptops, and text inside its box on every drawing.
- Interactions: chapters, plates, deep links, component selection, legend, zoom, full screen, stepper, keyboard, phone menu, theme, motion, question filter and contact form.
- Reduced motion, JavaScript off, axe in both themes at desktop and phone widths, and Lighthouse on desktop and mobile.
