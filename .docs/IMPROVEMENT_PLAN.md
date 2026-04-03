# VividStack — Improvement Plan

> **For AI agents (Cursor):** Each task below is self-contained. Before implementing any task, read `PROJECT_OVERVIEW.md`, `ARCHITECTURE.md`, and `DESIGN_SYSTEM.md`. After completing a task, update any documentation that is now outdated. Tasks are ordered by priority — complete higher-priority items first as they may be prerequisites.

---

## Priority 1 — Bugs & Broken Functionality

### TASK-01: Delete stale temp file [COMPLETED]
**What:** `src/pages/temp_index_utf8.astro` is a leftover file that creates a live `/temp_index_utf8` route with broken characters (UTF-8 encoding artifacts like `ΓÇö`, `Γåù`).  
**Action:** Delete `src/pages/temp_index_utf8.astro`.  
**Risk:** None — it is not referenced anywhere.

---

### TASK-02: Fix CSS class conflict — `.bento-grid`
**What:** The class `.bento-grid` is defined twice in `index.astro`'s `<style>` block. The second definition (3-column capabilities grid) overwrites the first (2-column services grid). Both currently work due to different child selectors, but this is fragile.  
**Action:** Rename the Services section's grid class from `.bento-grid` to `.services-bento-grid` and update the HTML in the Services section accordingly. The Capabilities section keeps `.bento-grid`.  
**Files:** `src/pages/index.astro` — both the `<style>` block and the Services section HTML.

---

## Priority 2 — Core Missing Features

### TASK-03: Wire up the contact form
**What:** The contact form submits to nothing (`event.preventDefault()`). Leads are being lost.  
**Recommended approach:** Use [Web3Forms](https://web3forms.com) (free, no backend needed for static sites). It requires adding a hidden `access_key` input and changing the form action.  
**Action:**
1. Sign up at web3forms.com and get an access key
2. Add `action="https://api.web3forms.com/submit"` and `method="POST"` to the form
3. Add `<input type="hidden" name="access_key" value="YOUR_KEY">` inside the form
4. Add a success/error state UI — show a confirmation message after submit
5. Remove the inline `onsubmit="event.preventDefault();"` attribute
6. Store the access key in `.env` as `PUBLIC_WEB3FORMS_KEY` and reference it in the component

**Files:** `src/pages/index.astro` — the `#contact` section form.  
**Note:** Astro static sites cannot use server-side env vars at runtime — use `import.meta.env.PUBLIC_WEB3FORMS_KEY` (must be prefixed `PUBLIC_`).

---

### TASK-04: Replace placeholder social links
**What:** All social links in the contact footer point to `#`.  
**Action:** Update the three `<a href="#">` links (LinkedIn, GitHub, Twitter/X) in the `#contact` section to point to real VividStack social profile URLs. If URLs are unknown, create a config object at the top of `index.astro` with the URLs so they are easy to find and update.  
**Files:** `src/pages/index.astro` — bottom of the `#contact` section.

---

## Priority 3 — SEO & Performance

### TASK-05: Add structured data (JSON-LD)
**What:** The site has no JSON-LD schema markup, missing a significant technical SEO opportunity.  
**Action:** Add a `<script type="application/ld+json">` block inside `Layout.astro`'s `<head>` with `LocalBusiness` or `ProfessionalService` schema. Include: `name`, `url`, `description`, `serviceType`, `areaServed`.  
**Files:** `src/layouts/Layout.astro`.

---

### TASK-06: Add a real OG image
**What:** `Layout.astro` references `/og-image.png` but it may not exist or may be a placeholder.  
**Action:** Verify `public/og-image.png` exists and is 1200×630px with proper VividStack branding. If not, create one. Also verify the `og:url` is correct (`https://vividstack.io`).  
**Files:** `public/og-image.png`, `src/layouts/Layout.astro`.

---

### TASK-07: Fix the copyright year
**What:** The footer reads `© 2024 VIVIDSTACK ARCHITECTS`. The year is hardcoded and stale.  
**Action:** Replace the hardcoded `2024` with a dynamic year in the Astro frontmatter:
```astro
---
const currentYear = new Date().getFullYear();
---
```
Then use `{currentYear}` in the footer text.  
**Files:** `src/pages/index.astro` — the `#contact` section footer.

---

## Priority 4 — Content & Maintainability

### TASK-08: Extract portfolio data to a separate file
**What:** The `portfolioProjects` array is defined inside `index.astro`'s frontmatter. Adding or updating projects requires editing a large file.  
**Action:** Create `src/data/portfolio.ts` exporting the `portfolioProjects` array with a TypeScript interface. Import it into `index.astro`. This also makes it easy for future CMS integration.

```typescript
// src/data/portfolio.ts
export interface PortfolioProject {
  title: string;
  stack: string;
  stack2: string;
  image: ImageMetadata;
  mobileImage: ImageMetadata;
  accent: string;
  url: string;
  displayUrl: string;
  systemId: string;
}
```

**Note:** Astro image imports must stay in `.astro` files or be handled carefully — the image imports themselves (`import resetat30Img from ...`) should remain in `index.astro`, but the metadata/config object can live in the data file with images passed in at the call site.  
**Files:** Create `src/data/portfolio.ts`, update `src/pages/index.astro`.

---

### TASK-09: Add a 5th portfolio project slot
**What:** The portfolio shows 4 projects. Adding a 5th demonstrates more breadth.  
**Prerequisites:** TASK-08 should be done first so adding a project is a clean data change.  
**Action:** Add a new entry to `portfolioProjects` with real project details, desktop screenshot (`src/assets/`), and mobile screenshot. Follow the same dual-device mockup pattern.  
**Files:** `src/pages/index.astro` (or `src/data/portfolio.ts` if TASK-08 is done), add new images to `src/assets/`.

---

## Priority 5 — Analytics & Tracking

### TASK-10: Add privacy-friendly analytics
**What:** There is no way to know how many people visit the site or which sections they engage with.  
**Recommended tool:** [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) (free, no cookies, GDPR compliant) or [Plausible](https://plausible.io).  
**Action for Cloudflare Analytics:**
1. Enable Web Analytics in the Cloudflare dashboard for the vividstack.io domain
2. Add the provided `<script>` beacon tag to `Layout.astro`'s `<head>`
3. No cookie consent banner needed

**Files:** `src/layouts/Layout.astro`.

---

## Priority 6 — Future Enhancements (No immediate action needed)

These are larger scope items that require planning before implementing:

- **Blog/Articles page** — Astro's content collections would be the right approach (`src/content/blog/`)
- **Pricing page** — A separate `/pricing` route in `src/pages/pricing.astro`
- **CMS integration** — Contentful or Sanity for portfolio and copy management, eliminating the need to edit `.astro` files for content changes
- **Testimonials section** — A new section between Process and Capabilities with client quotes
- **Dark mode** — Would require significant CSS refactoring; the design currently assumes a light background for most sections

---

## Implementation Notes for Cursor

When implementing any task:
1. **Do not change animation timing or GSAP logic** unless the task explicitly requires it — animations are carefully tuned
2. **Respect the IS_MOBILE threshold (`< 1024px`)** — the portfolio section has fundamentally different behavior on mobile vs desktop
3. **All new CSS** should be added to `index.astro`'s `<style>` block for page-specific styles, or `global.css` for truly global styles
4. **Test the horizontal scroll** on desktop after any changes to `#selected-works` or `.pin-wrap` — GSAP ScrollTrigger calculations depend on element dimensions
5. **Image imports** must use Astro's `<Image>` component, not `<img>` tags, to maintain optimization
