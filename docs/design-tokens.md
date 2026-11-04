# Design Tokens

**Co-Author**: Srini Centhala, srini@absolut-e.com, Chief Data and AI Architect

Reference for all design tokens used across the portfolio. Defined as CSS custom properties in `src/index.css`.

## Colors

### Backgrounds
| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0a0a0f` | Main page background |
| `--bg-secondary` | `#12121a` | Alternating section background |
| `--bg-card` | `#1a1a2e` | Card/panel backgrounds |
| `--bg-card-hover` | `#1f1f35` | Card hover state |

### Text
| Token | Value | Usage |
|-------|-------|-------|
| `--text-primary` | `#e8e8f0` | Headings, body text |
| `--text-secondary` | `#9898b0` | Subtitles, descriptions |
| `--text-muted` | `#686880` | Tertiary, metadata |

### Accent
| Token | Value | Usage |
|-------|-------|-------|
| `--accent` | `#6c63ff` | Primary accent (purple) |
| `--accent-light` | `#8b83ff` | Hover states, links |
| `--accent-glow` | `rgba(108,99,255,0.15)` | Glow effects, tag bg |
| `--gradient-start` | `#6c63ff` | Gradient left/top |
| `--gradient-end` | `#00d4ff` | Gradient right/bottom (cyan) |
| `--success` | `#00c9a7` | Success states, bullet dots |

### Borders
| Token | Value | Usage |
|-------|-------|-------|
| `--border` | `#2a2a3e` | Card borders, dividers |

## Typography

### Font Families
| Usage | Font | Fallback |
|-------|------|----------|
| Body | Inter | -apple-system, sans-serif |
| Code/Tags | JetBrains Mono | monospace |

### Font Weights
| Weight | Usage |
|--------|-------|
| 300 | Light text |
| 400 | Body text |
| 500 | Nav links, tags |
| 600 | Card titles, subtitles |
| 700 | Section titles, hero |

### Font Sizes
| Element | Size |
|---------|------|
| Hero h1 | clamp(2.5rem, 5vw, 4rem) |
| Section title | 2rem |
| Section subtitle | 1.05rem |
| Card title | 1.1-1.2rem |
| Body text | 0.95rem |
| Tags | 0.8rem |
| Category labels | 0.85rem |

## Spacing

| Usage | Value |
|-------|-------|
| Section padding | 100px vertical |
| Container max-width | 1100px |
| Container padding | 24px horizontal |
| Card padding | 28px |
| Card gap | 24px |
| Tag padding | 4px 12px |
| Button padding | 12px 28px |

## Border Radius

| Element | Value |
|---------|-------|
| Cards | 12px |
| Buttons | 8px |
| Tags | 20px |
| Book covers | 8px |

## Transitions

| Property | Duration | Easing |
|----------|----------|--------|
| Card hover | 0.3s | ease |
| Nav background | 0.3s | ease |
| Link color | 0.2s | ease |
| Button transform | 0.3s | ease |

## Breakpoints

| Name | Width | Changes |
|------|-------|---------|
| Tablet | 768px | Mobile nav, stack grids |
| Mobile | 640px | Single column experience |

## Gradients

| Name | Value | Usage |
|------|-------|-------|
| Primary gradient | `linear-gradient(135deg, #6c63ff, #00d4ff)` | Titles, buttons, stats |
| Card glow | `0 0 30px rgba(108,99,255,0.15)` | Card hover shadow |
| Hero orb 1 | `radial-gradient(circle, rgba(108,99,255,0.12), transparent)` | Decorative bg |
| Hero orb 2 | `radial-gradient(circle, rgba(0,212,255,0.08), transparent)` | Decorative bg |
