# Atlas & Co. — Collection '26

A premium single-page site for a clothing brand, built with React + Vite + TypeScript + Tailwind + GSAP + Framer Motion + hls.js.

## Run locally

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # production build → dist/
npm run preview      # preview the production build
```

When developing locally, override the base URL so assets resolve from root:

```bash
VITE_BASE=/ npm run dev
```

## Deploy (GitHub Pages)

A workflow in `.github/workflows/deploy.yml` builds and deploys to GitHub Pages on every push to `main` or `claude/premium-portfolio-site-osOyy`. Enable Pages in **Settings → Pages → Source: GitHub Actions** once. The site is published at:

```
https://<owner>.github.io/Jarvis--Core/
```

## Sections

1. Loading screen (rotating words + counter + progress)
2. Hero (HLS background video, floating navbar, GSAP entrance)
3. Cities marquee
4. Featured pieces (bento grid)
5. Field notes (journal pills)
6. Explorations (pinned + parallax columns + lightbox)
7. Stats (counting up on view)
8. Contact / footer (marquee, mailto CTA, social bar)
