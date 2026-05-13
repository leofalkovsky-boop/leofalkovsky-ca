# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Preview the static HTML site locally (fixes file:// navigation issues)
python3 -m http.server 8080
# → open http://localhost:8080

# Next.js development server
npm run dev       # http://localhost:3000

# Build Next.js for production (static export → out/)
npm run build

# Lint
npm run lint
```

## Architecture: Two Coexisting Site Layers

This repo has **two parallel site implementations** serving `leofalkovsky.ca` via GitHub Pages:

### 1. Static HTML (canonical, deployed)
The live site is pure HTML/CSS/JS. These files are served directly by GitHub Pages:
- Root pages: `index.html`, `about.html`, `apply.html`, `barrie.html`, `calculators.html`, `contact.html`, etc.
- Blog posts: `blog/index.html` + individual `blog/*.html` files
- Webinars: `webinars/index.html` + individual `webinar/*.html` files
- Shared styles: `css/style.css` — single stylesheet for the entire HTML site
- Shared JS: `js/main.js`

HTML pages use relative paths for CSS/JS (`css/style.css`, not `/css/style.css`), except blog posts which use `../css/style.css`.

### 2. Next.js 15 App Router (in-development layer)
The `app/` directory contains a Next.js rebuild of the site that is **not yet deployed**. It uses:
- `next.config.ts` with `output: 'export'` (static export mode — no server-side runtime)
- `components/Nav.tsx` and `components/Footer.tsx` as shared layout components
- `app/layout.tsx` references `/css/style.css` and `/js/main.js` from `public/` — these are copies of the HTML site's CSS/JS
- `content/posts/*.mdoc` — Markdoc source files for blog posts, read by `app/blog/page.tsx` using `gray-matter`

### Blog: Two Parallel Systems
Each blog post exists in both forms:
- `blog/<slug>.html` — the live version, self-contained with inline `<style>` overrides and gate modal JS
- `content/posts/<slug>.mdoc` — the Next.js/Keystatic source (frontmatter + Markdoc content)

When editing blog content, **update both files** to keep them in sync.

### Lead Magnet Gate
Several blog posts and `blog/index.html` include a gate modal for "The Smart Buy Playbook (2026 Edition)". When the user submits their email, a 2-second delay fires then redirects to `https://breakingbank.media/signup/` in a new tab. The gate is implemented as inline HTML + JS in each `.html` file (no shared component — copy the pattern from any existing gated post).

### Keystatic CMS
`keystatic.config.ts` defines a GitHub-backed CMS for `content/posts/`. It is configured for the `leofalkovsky-boop/leofalkovsky-ca` repo with branch prefix `content/`. The CMS is only accessible when the Next.js dev server is running (not available on the static HTML site).

## Deployment

The site deploys to GitHub Pages at `leofalkovsky.ca` via:
- Remote: `https://github.com/leofalkovsky-boop/leofalkovsky-ca`
- `CNAME` file contains `leofalkovsky.ca`
- Push `main` branch → GitHub Pages serves the repo root automatically
- HTTPS certificate from GitHub may take up to 24h after domain change; enable "Enforce HTTPS" at `github.com/leofalkovsky-boop/leofalkovsky-ca/settings/pages`

To deploy changes: `git add <files> && git commit -m "..." && git push origin main`
