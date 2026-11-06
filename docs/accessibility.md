# Accessibility

**Co-Author**: Srini Centhala, srini@absolut-e.com, Chief Data and AI Architect

The target is WCAG 2.1 AA. Check a change against this list, and run axe in both themes at desktop and phone widths.

## Contrast
- All text meets 4.5:1, and large text meets 3:1, in both themes. Tokens are in `docs/design-tokens.md`.
- Colour is never the only signal. Each family on a drawing has a glyph, and dashed lines are named in the legend.

## Keyboard
- A skip link leads to the main content.
- Focus is always visible.
- Tabs for chapters and journey stages use arrow keys and a roving tab index.
- On a drawing, Tab reaches one component, arrow keys walk the rest, and Enter or Space selects. Each layer name is its own stop, and Enter or Space opens the layer.
- On a drawing, `+`, `-` and `0` zoom and reset, and Shift with an arrow key pans.
- Escape closes the phone menu and the full-screen view, which are native `dialog` elements.

## Screen readers
- One `h1`, then headings in order. Each section is a landmark named by its headline.
- Decorative canvases and figures are `aria-hidden`. The lens drawing has a full text description.
- Every drawing has a text version: "Read as text" lists its components and relationships, and sequences list their steps.
- The inspector, stepper caption and form status are live regions.
- The accessible name of a component matches its visible text.

## Forms
- Every field has a visible label, and required fields use native validation.
- The form's outcome is announced in a status region, and failure gives the email address.

## Motion
- Everything that moves on its own can be paused with Pause motion.
- `prefers-reduced-motion` is respected before first paint: no entrances, no loops and no smooth scrolling.
- There is no scroll hijacking, and the page keeps scrolling normally over a drawing until a visitor zooms in.

## Without JavaScript
- The prerendered page is complete. Every plate and journey stage is readable, and plates show their rendered SVG.
