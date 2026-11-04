# Contributing to Srini Centhala Portfolio

**Co-Author**: Srini Centhala, srini@absolut-e.com, Chief Data and AI Architect

## Getting Started

```bash
git clone <repo-url>
cd srini-profile
npm install
npm run dev
```

## Project Structure

See `claude.md` for full project context and `architecture.md` for design decisions.

## Development Workflow

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes following the patterns in `claude.md`
3. Test locally with `npm run dev`
4. Build to verify: `npm run build`
5. Submit a pull request

## Adding a New Section

1. Create `src/components/YourSection.jsx`
2. Follow the existing component pattern:
   - Data as const array at top of file
   - Use shared CSS classes (`.section`, `.card`, `.tag`)
   - Alternate background: use `var(--bg-secondary)` if the previous section uses `var(--bg-primary)`
3. Import and add to `App.jsx` in the correct position
4. Add nav link in `Navbar.jsx` if needed

## Styling Guidelines

- Use CSS custom properties from `src/index.css` for colors
- Use shared classes from `App.css` for common patterns
- Use inline styles for component-specific layout
- Maintain the purple-to-cyan gradient theme
- Test responsive behavior at 768px and 640px breakpoints

## Content Updates

- Profile data is in each component file as const arrays
- Shared data constants go in `src/data/`
- Update `claude.md` if you change the structure

## Commit Messages

Use conventional commits:
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation
- `style:` formatting/styling
- `refactor:` code restructuring
- `test:` adding tests
