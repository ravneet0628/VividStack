# VividStack

Fast, mobile-ready websites for shops, trades, and service businesses. A static-first landing page built with Astro, Tailwind CSS, and GSAP — deployed to Cloudflare Pages at [vividstack.ca](https://vividstack.ca).

## Tech Stack

- **Framework:** Astro 5 (static output)
- **Styling:** Tailwind CSS 3 via `@astrojs/tailwind` (base styles disabled, custom design tokens in `global.css`)
- **Animation:** GSAP 3 (ScrollTrigger, CustomEase) + Lenis 1 (smooth scroll, desktop only ≥1024px)
- **Form backend:** Web3Forms (client-side, lazy-loaded via IntersectionObserver)
- **Portfolio screenshots:** Playwright + Sharp (`capture-portfolio.mjs`)
- **Typography:** Space Grotesk, Montserrat, Inter (Google Fonts, loaded with `media="print"` swap pattern)

## Commands

| Command | Action |
| --- | --- |
| `npm install` | Installs dependencies |
| `npm run dev` | Starts local dev server at `localhost:4321` |
| `npm run build` | Production build to `./dist/` |
| `npm run preview` | Preview build locally |
| `npm run astro` | Run Astro CLI commands |
| `npm run capture:portfolio` | Screenshot live URLs via Playwright + Sharp |

## Architecture

### Pages

| Route | Template | Purpose |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Landing page — all sections |
| `/privacy/` | `src/pages/privacy.astro` | Privacy policy |
| `/terms/` | `src/pages/terms.astro` | Terms of service |
| `/404` | `src/pages/404.astro` | Not found page |

### Components

| Component | Role |
| --- | --- |
| `Layout.astro` | Shared layout: `<head>`, SEO/meta tags, JSON-LD structured data, font loading, skip link, Web3Forms loader |
| `Navbar.astro` | Fixed top nav with scroll-driven background, mobile drawer with focus trap |
| `Hero.astro` | Animated hero with floating tech nodes, magnetic text effect |
| `Advantage.astro` | 3-column value proposition cards |
| `Services.astro` | 3-tier service bento cards |
| `SelectedWorks.astro` | Horizontal scroll portfolio pin with dual-device mockups |
| `Process.astro` | 4-phase alternating client/agency glass cards |
| `Capabilities.astro` | Bento grid with performance card + 4 smaller cards |
| `Contact.astro` | Web3Forms contact form with hCaptcha, success/error states |
| `Footer.astro` | Copyright, legal links (privacy, terms) |

### Data

All site copy, portfolio items, and configuration live in `src/data/home.ts`. Change content without touching components.

This is a fully static site — zero server-side code. Form submissions go to the external Web3Forms API.

### Design System

Read `.impeccable.md` for the full AI-readable design context (brand palette, typography, component patterns, animation conventions, accessibility requirements).

## Deployment

Deployed to Cloudflare Pages. Push to `main` triggers an automatic build.

## Accessibility

- Skip-to-content link
- Semantic landmarks (`main`, `nav`)
- Focus-visible rings on all interactive elements
- `prefers-reduced-motion: reduce` disables all animations and Lenis
- Honeypot bot protection on contact form
- Mobile menu implements focus trap and Escape/dismissal
