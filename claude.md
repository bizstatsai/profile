# Claude Code Context - Srini Centhala Portfolio

## Project Overview
Personal portfolio website for Srini Centhala - a Chief Data and AI Architect and technology leader with 25+ years of experience consulting for Fortune 100 companies. The site showcases professional experience, published books, skills, certifications, and consulting services.

## Tech Stack
- **Framework**: React 19 with Vite 5
- **Styling**: CSS custom properties (CSS variables) with inline styles in components
- **Fonts**: Inter (body) + JetBrains Mono (accents/code)
- **Build**: Vite (dev server + production build)
- **No routing library** - single-page with anchor scroll navigation

## Project Structure
```
srini-profile/
├── index.html                          # Entry HTML with Google Fonts
├── vite.config.js                      # Vite config with React plugin
├── package.json                        # Dependencies and scripts
├── .env.example                        # Environment variable template
├── .gitignore                          # Git ignore rules
├── .github/workflows/deploy.yml        # CI/CD: GitHub Actions -> GitHub Pages
├── CONTRIBUTING.md                     # Contribution guidelines
├── backlog.md                          # Feature backlog and roadmap
├── architecture.md                     # Architecture decisions and patterns
├── claude.md                           # This file - project context for AI agents
├── src/
│   ├── main.jsx                        # React root mount
│   ├── index.css                       # Global styles, CSS variables, theme
│   ├── App.jsx                         # Main app composing all sections
│   ├── App.css                         # Shared utility classes (.section, .card, .btn, .tag)
│   ├── data/
│   │   └── profile.js                  # SINGLE SOURCE OF TRUTH for all content
│   ├── hooks/                          # Custom React hooks (future)
│   ├── utils/                          # Utility functions (future)
│   └── components/
│       ├── Navbar.jsx                  # Fixed nav with scroll blur + mobile menu
│       ├── Hero.jsx                    # Full-height hero with bio, clients, stats
│       ├── About.jsx                   # 6 expertise cards + role tags
│       ├── Experience.jsx              # 13 client engagements, expandable highlights
│       ├── Books.jsx                   # 3 published books
│       ├── Skills.jsx                  # 6 skill groups (Cloud, AI, Big Data, BI, Languages, Industries)
│       ├── Certifications.jsx          # 11 certs (Databricks, ML, GCP, MongoDB) + education
│       ├── Contact.jsx                 # CTA + services code block + company links
│       └── Footer.jsx                  # Copyright + Absolut-e + BizStats links
├── docs/
│   ├── design-tokens.md                # All colors, typography, spacing reference
│   ├── tools-and-extensions.md         # VS Code extensions, online tools, npm packages
│   ├── seo-checklist.md                # Meta tags, OG tags, structured data
│   ├── accessibility.md                # WCAG 2.1 AA compliance checklist
│   ├── uml/
│   │   ├── component-diagram.mmd       # React component tree
│   │   ├── sequence-diagram.mmd        # User navigation flows
│   │   ├── class-diagram.mmd           # Component data structures
│   │   └── state-diagram.mmd           # App states (nav, menu, form, theme)
│   ├── data-model/
│   │   └── schema.mmd                  # ER diagram for content entities
│   ├── diagrams/
│   │   ├── sitemap.mmd                 # Site information architecture
│   │   └── deployment.mmd              # CI/CD and hosting architecture
│   ├── wireframes/
│   │   └── layout.mmd                  # Block-level page wireframe
│   └── api/
│       └── contact-form-spec.md        # Contact form API spec (3 options)
└── tests/                              # Component tests (future)
```

## Design System
- **Theme**: Dark & modern with purple-to-cyan gradient accents
- **Colors**: Defined as CSS custom properties in `src/index.css`
  - `--bg-primary`: #0a0a0f (darkest)
  - `--bg-secondary`: #12121a (section alternating)
  - `--bg-card`: #1a1a2e (card backgrounds)
  - `--accent`: #6c63ff (primary purple)
  - `--gradient-end`: #00d4ff (cyan accent)
  - `--success`: #00c9a7 (green, bullet dots)
- **Cards**: Dark bg, subtle border, hover glow effect with accent color
- **Typography**: Inter weights 300-700, JetBrains Mono for code/tags
- **Full reference**: `docs/design-tokens.md`

## Commands
- `npm run dev` - Start dev server (default: http://localhost:5173)
- `npm run build` - Production build to `dist/`
- `npm run preview` - Preview production build

## Content Source
All content lives in `src/data/profile.js` — the single source of truth.
Data sourced from LinkedIn (linkedin.com/in/srinicenthala) + full resume.

### Profile
- **Name**: Srini Centhala
- **Location**: San Jose, California
- **Phone**: 678-570-6353
- **Email**: srini@absolut-e.com
- **Companies**: Absolut-e Data Com Inc. (www.absolut-e.com) + BizStats AI (www.bizstats.ai)
- **Role**: Founder & Chief Data and AI Architect
- **Education**: B.E. Electronics, Bangalore University

### Key Clients (13 engagements shown)
DirecTV (2024-25), Walmart (2021-24), Aktana (2020-21), Macy's (2019),
AT&T/DirecTV (2014-19), VMware (2014), DirecTV SCM (2012-14),
Experian (2009-12), IMS Health/IQVIA (2007-08), Lafarge (2005-07),
eBay (2004-05), UPS (1998-2001), plus government clients.

### Certifications (11 with credential URLs)
Databricks (3), Deep Learning (1), Machine Learning (2), GCP (2), MongoDB (3)

### Books (3)
AI for Security, AI for Risk Management, OneStop Project Management

## Key Architecture Decisions
- **Centralized data**: All content in `src/data/profile.js` — components import from there
- **Inline styles** for component-level styling (no CSS modules or styled-components)
- **Shared CSS classes** in App.css for reusable patterns (.card, .btn, .tag, .section)
- **No external icon library** — using HTML entities and Unicode
- **No router** — single page with smooth scroll navigation
- **Expandable experience cards** — click to show/hide highlights
- **Mobile responsive** via CSS media queries and auto-fit grids
- **Mermaid diagrams** (.mmd) for all UML/architecture docs — render at mermaid.live

## Notes for Sub-agents
- **Data changes**: Edit `src/data/profile.js` — all components read from there
- **New sections**: Create component in `src/components/`, import in `App.jsx`
- **Section backgrounds**: Alternate between `var(--bg-primary)` and `var(--bg-secondary)`
- **Gradient theme**: Purple (#6c63ff) to cyan (#00d4ff) — maintain consistency
- **CSS classes**: Use `.card`, `.tag`, `.btn`, `.btn-primary`, `.btn-outline`, `.section`
- **Diagrams**: All `.mmd` files use Mermaid syntax — edit and preview at https://mermaid.live
- **Certifications**: All have real credential URLs — preserve when updating
- **Contact info**: Phone + email are real — do not expose unnecessarily in public deploys
