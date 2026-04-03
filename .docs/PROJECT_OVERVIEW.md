# VividStack — Project Overview

> **For AI agents:** This is a single-page marketing/portfolio site for a web design agency called VividStack. It is a static Astro site with no backend. All content is hardcoded. The goal of the site is to generate client leads via a contact form.

---

## What This Project Is

VividStack is a **web design and development agency** landing page. Its purpose is to:
1. Establish brand credibility with a high-quality, performant design
2. Showcase portfolio work (4 client projects)
3. Explain the agency's services and process
4. Capture leads via a contact form

The site is intentionally a **single page** (`src/pages/index.astro`) with anchor-based navigation.

---

## Current State

| Area | Status |
|------|--------|
| Hero section | ✅ Complete with GSAP animations |
| Advantage section | ✅ Complete (3 cards) |
| Services section | ✅ Complete (bento grid) |
| Selected Works / Portfolio | ✅ Complete (horizontal scroll on desktop, snap scroll on mobile) |
| Process section | ✅ Complete (4-phase split layout) |
| Capabilities / Performance section | ✅ Complete (bento grid with Lighthouse score) |
| Contact form | ⚠️ UI only — no submission logic |
| Social links | ⚠️ All point to `#` (placeholder) |
| Analytics | ❌ Not implemented |
| `temp_index_utf8.astro` | ❌ Stale file in `src/pages/` — should be deleted |

---

## Portfolio Projects (hardcoded in `src/pages/index.astro`)

| Title | Live URL | Tech |
|-------|----------|------|
| Reset at 30 | https://resetat30.pages.dev/ | Astro v4, Cloudflare Edge |
| HM Global | https://hmglobalinc.com/ | Industrial/Enterprise |
| Secure Choice | https://top-insurance.pages.dev/ | Risk Architecture |
| PhotoLP | https://shivstudio.onrender.com/ | React + Vite |

---

## Key Business Logic

- **No CMS** — all copy, projects, and structure are hardcoded in `.astro` files
- **No backend** — the contact form currently does nothing on submit
- **Deployment target** — Cloudflare Pages (implied by `output: 'static'` and project URLs)
- **No user accounts, auth, or database**

---

## Navigational Structure

```
/ (index.astro)
├── #hero          — Brand intro, animated headline
├── #advantage     — 3 USP cards (Speed, SEO, Free Hosting)
├── #services      — Bento grid: Web Engineering, Technical SEO, UI/UX
├── #platform      — Selected Works horizontal scroll + Process + Capabilities
│   ├── #selected-works
│   ├── #process
│   └── #portfolio
└── #contact       — Contact form + footer
```

> Note: `#platform` is the nav link for "Work" — it anchors to the Selected Works section inside the `#platform` section wrapper.
