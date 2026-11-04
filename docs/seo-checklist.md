# SEO & Meta Tags Checklist

**Co-Author**: Srini Centhala, srini@absolut-e.com, Chief Data and AI Architect

## Head Meta Tags (to add to index.html)

```html
<!-- Primary Meta -->
<meta name="title" content="Srini Centhala - Chief Data and AI Architect">
<meta name="description" content="Seasoned data architect and technology leader specializing in AI-driven business solutions, enterprise architecture, and risk management. Founder of Bizstats.AI.">
<meta name="keywords" content="data architect, AI, machine learning, enterprise architecture, cloud, Google Cloud, Bizstats.AI, Srini Centhala">
<meta name="author" content="Srini Centhala">
<meta name="robots" content="index, follow">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://srinicenthala.com/">
<meta property="og:title" content="Srini Centhala - Chief Data and AI Architect">
<meta property="og:description" content="Seasoned data architect specializing in AI-driven business solutions. Author of 3 books on AI. Founder of Bizstats.AI.">
<meta property="og:image" content="https://srinicenthala.com/og-image.png">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://srinicenthala.com/">
<meta property="twitter:title" content="Srini Centhala - Chief Data and AI Architect">
<meta property="twitter:description" content="Seasoned data architect specializing in AI-driven business solutions. Author of 3 books on AI.">
<meta property="twitter:image" content="https://srinicenthala.com/og-image.png">

<!-- Canonical -->
<link rel="canonical" href="https://srinicenthala.com/">
```

## Structured Data (JSON-LD)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Srini Centhala",
  "url": "https://srinicenthala.com",
  "image": "https://srinicenthala.com/avatar.jpg",
  "jobTitle": "Founder & Chief Data and AI Architect",
  "worksFor": {
    "@type": "Organization",
    "name": "Bizstats.AI"
  },
  "sameAs": [
    "https://linkedin.com/in/srinicenthala",
    "https://bizstats.ai"
  ],
  "knowsAbout": [
    "Data Architecture",
    "Artificial Intelligence",
    "Machine Learning",
    "Cloud Computing",
    "Enterprise Architecture"
  ],
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Bangalore University"
  }
}
</script>
```

## Assets Needed
- [ ] `favicon.ico` (16x16, 32x32)
- [ ] `apple-touch-icon.png` (180x180)
- [ ] `og-image.png` (1200x630) - social sharing preview
- [ ] `avatar.jpg` - professional headshot
- [ ] `robots.txt`
- [ ] `sitemap.xml`

## Performance Targets
- Lighthouse Performance: > 90
- Lighthouse Accessibility: > 95
- Lighthouse SEO: > 95
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
