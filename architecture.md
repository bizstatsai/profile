# Architecture - Srini Centhala Portfolio

**Co-Author**: Srini Centhala, srini@absolut-e.com, Chief Data and AI Architect

## Architecture Overview

Single-page application (SPA) built with React + Vite. No server-side rendering or backend. Static site that can be deployed to any CDN (Vercel, Netlify, GitHub Pages, Cloudflare Pages).

```
┌─────────────────────────────────┐
│           index.html            │
│  (Google Fonts, meta, #root)    │
├─────────────────────────────────┤
│           main.jsx              │
│  (React root, global CSS)       │
├─────────────────────────────────┤
│            App.jsx              │
│  (Section composition)          │
├──────┬──────┬──────┬───────────┤
│Navbar│ Hero │About │Experience │
│Books │Skills│Contact│ Footer   │
└──────┴──────┴──────┴───────────┘
```

## Component Architecture

### Layout Pattern
- **Navbar**: Fixed position, transparent -> blurred on scroll
- **Sections**: Full-width, alternating bg colors, 100px vertical padding
- **Container**: Max-width 1100px, centered, 24px horizontal padding

### Component Pattern
Each section component:
1. Contains its own data as a const array (no external data layer)
2. Uses shared CSS classes from `App.css` (`.section`, `.card`, `.tag`, `.btn`)
3. Uses inline styles for component-specific layout
4. Is self-contained with no cross-component dependencies

### Styling Architecture
```
index.css (Global)
├── CSS custom properties (design tokens)
├── Reset styles
├── Base element styles (body, a, scrollbar)
└── Selection styles

App.css (Shared)
├── .section (padding, positioning)
├── .container (max-width, centering)
├── .section-title / .section-subtitle
├── .card (bg, border, hover effects)
├── .tag (badge/chip styling)
└── .btn / .btn-primary / .btn-outline

Components (Inline)
└── Component-specific layouts via style={{}}
```

## Design Decisions

### Why Inline Styles
- Rapid prototyping with immediate visual feedback
- No build-time CSS processing needed
- Co-located styling with component logic
- **Trade-off**: Harder to maintain at scale. Consider migrating to CSS Modules or Tailwind if the site grows significantly.

### Why No Router
- Single-page portfolio with anchor-based navigation
- Simpler architecture, faster load
- Smooth scroll via `scroll-behavior: smooth` on `html`
- **When to add**: If blog/articles section or multi-page features are added

### Why No State Management
- No global state needed - each component is self-contained
- Navbar scroll state uses local useState/useEffect
- **When to add**: If dynamic data fetching (CMS, API) is introduced

### Why No Icon Library
- Minimal icon usage, HTML entities suffice
- Reduces bundle size
- **When to add**: If more icons are needed, consider Lucide React (tree-shakeable)

## Responsive Strategy
- CSS Grid with `auto-fit` and `minmax()` for card layouts
- `clamp()` for fluid typography
- Media queries at 768px (tablet) and 640px (mobile) breakpoints
- Mobile hamburger menu in Navbar

## Performance Considerations
- Google Fonts loaded with `preconnect` hints
- No images (placeholder icons only) - fast initial load
- Vite production build with tree-shaking and minification
- Current bundle: ~64KB gzipped (React + app code)

## Deployment Options
| Platform | Method | Notes |
|----------|--------|-------|
| Vercel | `vercel` CLI or Git integration | Recommended, zero-config for Vite |
| Netlify | Git integration or drag-and-drop | Add `netlify.toml` for redirects |
| GitHub Pages | `gh-pages` package | Set `base` in `vite.config.js` |
| Cloudflare Pages | Git integration | Fast global CDN |

## Future Architecture Considerations
- **CMS Integration**: Headless CMS (Contentful, Sanity) for blog content
- **API Layer**: Serverless functions for contact form
- **Analytics**: Client-side analytics (Plausible for privacy-friendly)
- **Animation**: Framer Motion for scroll-triggered animations
- **Testing**: Vitest + React Testing Library for component tests
