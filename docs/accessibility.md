# Accessibility Guidelines (a11y)

**Co-Author**: Srini Centhala, srini@absolut-e.com, Chief Data and AI Architect

## WCAG 2.1 AA Compliance Checklist

### Color Contrast
- [ ] Text on `--bg-primary` (#0a0a0f): min 4.5:1 ratio
- [ ] Text on `--bg-secondary` (#12121a): min 4.5:1 ratio
- [ ] Text on `--bg-card` (#1a1a2e): min 4.5:1 ratio
- [ ] Large text (18px+): min 3:1 ratio
- [ ] Interactive elements: min 3:1 against adjacent colors
- Current: `--text-primary` (#e8e8f0) on `--bg-primary` (#0a0a0f) = ~17:1 (passes)
- Current: `--text-secondary` (#9898b0) on `--bg-primary` (#0a0a0f) = ~7:1 (passes)

### Keyboard Navigation
- [ ] All interactive elements focusable via Tab
- [ ] Visible focus indicators on all focusable elements
- [ ] Skip-to-content link at top of page
- [ ] Escape key closes mobile menu
- [ ] Logical tab order matches visual order

### Screen Readers
- [ ] All images have descriptive alt text
- [ ] Semantic HTML (nav, main, section, footer, h1-h6)
- [ ] ARIA labels on icon-only buttons (hamburger menu)
- [ ] ARIA landmarks for page regions
- [ ] Live regions for dynamic content (form submissions)

### Forms (Contact - Future)
- [ ] All inputs have associated labels
- [ ] Error messages linked to inputs via aria-describedby
- [ ] Required fields indicated visually and programmatically
- [ ] Form validation errors announced to screen readers

### Motion & Animation
- [ ] Respect `prefers-reduced-motion` media query
- [ ] No auto-playing animations that can't be paused
- [ ] Scroll animations optional / degraded gracefully

### Implementation
```css
/* Add to index.css */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Focus styles */
*:focus-visible {
  outline: 2px solid var(--accent-light);
  outline-offset: 2px;
}
```

```jsx
// Skip link (add to App.jsx)
<a href="#main-content" className="skip-link">
  Skip to main content
</a>
<main id="main-content">...</main>
```

## Testing Tools
- axe DevTools browser extension
- WAVE web accessibility evaluator
- Lighthouse accessibility audit
- VoiceOver (macOS) / NVDA (Windows) screen reader testing
- Keyboard-only navigation testing
