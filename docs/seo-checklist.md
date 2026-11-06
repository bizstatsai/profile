# SEO and Meta Tags

**Co-Author**: Srini Centhala, srini@absolut-e.com, Chief Data and AI Architect

## In place

- **Prerendered HTML**: the whole page is in `dist/index.html`, in document order, so crawlers and link previews need no JavaScript.
- **`index.html`**: title, description, canonical link, Open Graph and Twitter tags, social image with alt text, theme colour.
- **Structured data**: a `Person` block with name, job title, employers, alumni record, location and `sameAs` links. Keep it to facts the site itself states.
- **Social image**: `public/og-image.png`, 1200 by 630.
- **`public/sitemap.xml`** and **`public/robots.txt`**.

## Addresses

`VITE_SITE_URL` sets the canonical link, the social tags and the structured data at build time. It defaults to `https://bizstatsai.github.io/profile/` in `vite.config.js`.

## When moving to a custom domain

1. Add `public/CNAME` with the domain. The deploy workflow then builds with the root base path.
2. Set `VITE_SITE_URL` in the workflow's build step, with a trailing slash.
3. Update `public/sitemap.xml` and `public/robots.txt`.
4. Update the `lastmod` date in the sitemap whenever content changes materially.

## After a release

- Run Lighthouse on the live address.
- Check the social card with the LinkedIn Post Inspector.
- Check the structured data with the Schema.org validator.
