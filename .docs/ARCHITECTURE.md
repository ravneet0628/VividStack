# VividStack — Architecture

> **For AI agents:** Understand this file before touching any animation, scroll, or layout code. The desktop and mobile experiences are fundamentally different in how the portfolio section works.

---

## Tech Stack

| Tool | Version | Role |
|------|---------|------|
| Astro | ^5.7.0 | Static site framework, routing, image optimization |
| Tailwind CSS | ^3.4.0 | Utility styling via `@astrojs/tailwind` |
| GSAP | ^3.12.0 | All scroll-driven and entrance animations |
| GSAP ScrollTrigger | (bundled) | Pinning, scrubbing, scroll-linked animations |
| Lenis | ^1.2.0 | Smooth scroll on desktop only |

**Output:** `static` — compiled to flat HTML/CSS/JS, no server runtime.

---

## File Structure

```
/
├── public/
│   ├── favicon.svg
│   └── og-image.png          ← OG image (referenced in Layout, must exist)
├── src/
│   ├── assets/               ← All images imported via Astro's Image component
│   │   ├── logo.png
│   │   ├── hero_code.png
│   │   ├── lighthouse-100.png
│   │   ├── resetat30.png / resetat30_mobile.png
│   │   ├── hmglobal.png / hmglobal_mobile.png
│   │   ├── securechoice.png / securechoice_mobile.png
│   │   └── photolp.png / photolp_mobile.png
│   ├── components/
│   │   └── Navbar.astro      ← Fixed nav with scroll + dark-section detection
│   ├── layouts/
│   │   └── Layout.astro      ← HTML shell: meta, fonts, OG tags, body classes
│   ├── pages/
│   │   └── index.astro       ← Entire site (all sections + all styles + all scripts)
│   └── styles/
│       └── global.css        ← Tailwind imports + html/body base + .bg-grid-tech
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

> ⚠️ `src/pages/temp_index_utf8.astro` is a stale file. It creates a `/temp_index_utf8` route. **Delete it.**

---

## CSS Architecture

Styles live in three places — understand which to edit:

1. **`src/styles/global.css`** — Base resets, Tailwind imports, `.bg-grid-tech` pattern. Edit for global changes.

2. **`src/layouts/Layout.astro`** — No `<style>` block. Only Tailwind classes on `<body>`. Body uses `bg-vivid-cream text-vivid-navy`.

3. **`src/pages/index.astro` `<style>` block** — The bulk of component styles. All section-specific CSS lives here as regular (non-scoped) CSS. This is intentional — Astro scopes styles by default but these are written as global to target dynamically rendered elements and GSAP targets.

4. **`src/components/Navbar.astro` `<style>` block** — Scoped to the Navbar component.

**Tailwind custom tokens** (from `tailwind.config.mjs`):
```
vivid-navy:  #253644
vivid-teal:  #5DFFEC
vivid-mint:  #95CBD0
vivid-cream: #F8F9FA
```

---

## Animation Architecture

### Initialization Order (in `index.astro` `<script>`)

```
1. Register GSAP plugins (ScrollTrigger, CustomEase)
2. Check IS_MOBILE (window.innerWidth < 1024)
3. Init Lenis (desktop only) → sync with ScrollTrigger
4. Run entrance timeline (nav → hero chars → subtitle → CTA → tech nodes)
5. Scroll-triggered animations (advantage cards, bento tiles, service cards)
6. Conditional: floating/orbit animations (desktop only)
7. Selected Works: GSAP pin (desktop) OR native snap scroll (mobile)
8. Hash link smooth scroll (Lenis on desktop, scrollIntoView on mobile)
9. Magnetic headline letters (desktop only, rAF-throttled)
10. Section tracer border animations
```

### The Portfolio Horizontal Scroll (Critical Section)

This is the most complex part of the site. Behavior differs completely by breakpoint:

**Desktop (≥1024px):**
- `#selected-works` is pinned to the viewport via `ScrollTrigger`
- `.pin-wrap` is translated horizontally as user scrolls vertically (scrub: 1)
- Scroll distance = `pin-wrap.scrollWidth - window.innerWidth`
- The pin lasts `+=500%` of scroll distance
- A `.title-card` (desktop-only div) is the first slide
- After pin, page resumes normal vertical scroll

**Mobile (<1024px):**
- `#selected-works` height is `auto`, not fixed
- `.pin-wrap` becomes a horizontal flex container with `overflow-x: auto`
- `scroll-snap-type: x mandatory` for card-by-card snapping
- `.title-card` is `display: none` — a separate `.mobile-section-header` div above shows the heading
- GSAP transforms are cleared with `gsap.set(pinWrap, { clearProps: "all" })`

### Navbar Scroll Detection

The Navbar script polls `window.scrollY` on every scroll event and also checks `getBoundingClientRect()` of sections with dark backgrounds to switch between light/dark nav states. The dark-section detection checks `rgb(5, 25, 45)`, `rgb(0, 0, 0)`, `rgb(37, 54, 68)` background colors.

---

## Image Handling

All images are imported at the top of `index.astro` and passed to Astro's `<Image>` component. Astro handles:
- Format conversion (WebP/AVIF)
- Responsive `srcset` generation based on `widths` prop
- Lazy loading (all portfolio images use `loading="lazy"`)
- Hero images use `loading="eager"` and `fetchpriority="high"`

Portfolio projects each have **two images**: desktop (`*Img`) and mobile (`*Mobile`) variants displayed in the dual-device mockup layout.

---

## Known CSS Class Conflict

The class `.bento-grid` is defined **twice** in `index.astro`'s `<style>` block:
- First definition: Services section grid (2-column, bento tile layout)
- Second definition: Capabilities/Portfolio section grid (3-column card layout)

The second definition overwrites the first. This works only because the two sections use different child elements (`.bento-tile` vs `.bento-card`). **When refactoring, rename one of these.**
