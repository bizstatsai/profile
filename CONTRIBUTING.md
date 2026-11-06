# Contributing to Srini Centhala Portfolio

**Co-Author**: Srini Centhala, srini@absolut-e.com, Chief Data and AI Architect

## Getting Started

```bash
git clone https://github.com/bizstatsai/profile.git
cd profile
npm install
npm run dev
```

## Project Structure

See `claude.md` for project context and `architecture.md` for how the site works.

## Development Workflow

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make changes following the patterns in `claude.md`
3. Test locally with `npm run dev`
4. Run `npm test` and `npm run build`
5. Submit a pull request

Pushing to `main` publishes the public site.

## Before you change content

The site states facts about a real person. Do not add a client, award, certification, figure or quote unless it comes from a record you can point to. If something is missing, leave it out. The rules are in `claude.md`.

This repository is public. Nothing internal goes into text or drawings: see `docs/diagrams/README.md`.

## Adding a New Section

1. Put the copy in `src/data/`
2. Create a component in `src/sections/` that starts with `SectionHead`
3. Lazy-load it in `src/App.jsx` inside a `SectionContainer`, with an `id` and a `nav` key
4. Add a navigation item in `navLinks` if it needs one
5. Update the order test in `src/test/site.test.jsx`

## Adding a Drawing

1. Write the Mermaid source under `docs/diagrams/src/`
2. Import it in `src/data/architectureDiagrams.js` and add its layout, colour families, descriptions and status
3. Place it in a chapter in `src/data/architecturePatterns.js`
4. Add it to the inventory in `docs/diagrams/README.md`
5. Run `npm run diagrams` for the rendered SVG, then `npm test` until the layout lint is clean
6. Look at it in both themes, on a phone, and in full screen

## Styling Guidelines

- Use tokens from `src/styles/tokens.css`, never literal colours
- Add rules to the area file in `src/styles/`
- Keep colour meaningful: on drawings, each colour names a family of components
- Check that nothing scrolls sideways at 360 px
- Anything that moves must stop when motion is off. Test with the Pause motion button and with reduced motion on.

## Commit Messages

Use conventional commits:
- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation
- `style:` formatting/styling
- `refactor:` code restructuring
- `test:` adding tests
