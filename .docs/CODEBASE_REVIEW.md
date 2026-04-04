# VividStack — Codebase Review & Improvement Plan

> **Reviewed:** 2026-04-04
> **Branch:** main
> **Framework:** Astro 5.7.0 (static output)
> **Deployment:** vividstack.ca (Cloudflare Pages)

---

## Overview

VividStack is a single-page marketing site with a brutalist/modern visual design. It features GSAP-driven animations, Lenis smooth scroll, a horizontal-scrolling portfolio showcase, and a contact form backed by Web3Forms. The site is well-designed and performant, but has several gaps in developer experience, security, testing, and maintainability.

---

## 1. Architecture

### Current State

```
Layout.astro
  └── index.astro
        ├── Navbar.astro
        ├── Hero.astro
        ├── Advantage.astro
        ├── Services.astro
        ├── SelectedWorks.astro
        ├── Process.astro
        ├── Capabilities.astro
        └── Contact.astro
              └── Footer.astro (nested)
```

- **Single layout** wraps all pages (`Layout.astro`)
- **Data-driven content** via `src/data/home.ts` — single source of truth for copy
- **Three client scripts** isolated by concern: `home-motion.ts`, `navbar-menu.ts`, `contact-form.ts`
- **Two legal pages** (`privacy.astro`, `terms.astro`) are near-duplicate templates

### Critique

| Aspect | Assessment |
|--------|-----------|
| Component hierarchy | Clean but Footer is nested inside Contact — unexpected coupling |
| Content separation | Good pattern with `home.ts`; data/code boundary is clear |
| Layout reuse | Legal pages duplicate markup that should be shared |
| File organization | Logical but flat; no subdirectories for grouping |

---

## 2. Code Quality Issues

### HIGH — Should Fix Soon

**CR-02: Hardcoded Web3Forms access key**
- `src/components/Contact.astro:26` — the key `7a57...` is hardcoded in the template
- Anyone can submit spam using this key
- **Fix:** Move to `import.meta.env.PUBLIC_WEB3FORMS_KEY` with a `.env.example` file

**CR-03: Brittle CSS class selectors in contact-form.ts**
- `src/scripts/contact-form.ts:70` — selector `'.grid, .flex.flex-col.mt-2, .mt-6.flex'` will silently break if any Tailwind class changes
- **Fix:** Add `data-*` attributes to the elements that need to fade, and select by those

**CR-04: Silent error swallowing**
- `src/scripts/contact-form.ts:98` — `catch { }` discards the error object entirely; no logging, no differentiation between network vs API failures
- `src/scripts/home-motion.ts:164` — `catch { /* ignore */ }` for `document.fonts.ready`
- **Fix:** At minimum `console.error()` in catch blocks; consider surfacing specific errors to the user in contact form

**CR-05: CSS specificity override with `!important`**
- `src/pages/index.astro:56` — `z-index: 9999 !important` on the navbar
- Also duplicated: `z-index: 9999` appears in both `index.astro` and `Navbar.astro`
- **Fix:** Establish a z-index scale in `tailwind.config.mjs` and use consistent values

### MEDIUM — Should Fix

**CR-06: `home-motion.ts` is a 490-line monolith**
- Hero magnetic effect alone is 100+ lines of deeply nested logic
- Hard to test, hard to reason about
- **Fix:** Split into separate modules: `hero-intro.ts`, `magnetic-effect.ts`, `scroll-reveals.ts`, `horizontal-pin.ts`

**CR-07: Duplicate legal page templates**
- `src/pages/privacy.astro` and `src/pages/terms.astro` share nearly identical markup
- **Fix:** Create `src/components/LegalPage.astro` prop-driven by `title` and `content`

**CR-08: Missing return type annotation**
- `scripts/capture-portfolio.mjs:50` — `function sleep(ms)` lacks JSDoc type `@param {number}`
- **Fix:** Add JSDoc types for the dev script

**CR-09: `set:html` with data containing HTML tags**
- `src/components/Advantage.astro:61` — `set:html={item.title}` renders `<br/>` and `<span>` from data
- Safe with static data, but dangerous if data ever becomes user-supplied
- **Fix:** Add a comment documenting this assumption, or split `title` into `plainText` and `richText` fields

### LOW — Nice to Have

**CR-10: Magic number `end: "+=500%"`**
- `home-motion.ts:436` — the horizontal pin end is a hard-coded multiplier
- **Fix:** Extract to a named constant: `const HORIZONTAL_PIN_SCROLL_MULT = 5`

**CR-11: Scroll listener on window for magnetic effect**
- `home-motion.ts:212-223` — scroll events trigger `updateBrandRectCache` on every scroll (rAF-throttled, but still fires on entire scroll lifecycle)
- **Fix:** Consider using `IntersectionObserver` to unbind the handler when hero section is off-screen

**CR-12: Navbar scroll-driven animation lacks Safari fallback**
- `animation-timeline: scroll(root block)` is Chrome-only (115+)
- Safari users see a statically opaque nav

---

## 3. Security

| Issue | Severity | Details |
|-------|----------|---------|
| Hardcoded API key | Medium | Web3Forms key visible in HTML; acceptable by design but should use env vars |
| No CSP headers | Low | Static site on Cloudflare; could add a strict CSP to prevent injection |
| `set:html` pattern | Low | Safe with static data, risky if data source changes |

---

## 4. Developer Experience

### Missing Tooling

| Tool | Status | Impact |
|------|--------|--------|
| Linter (ESLint) | Not configured | No automated code quality enforcement |
| Formatter (Prettier) | Not configured | Inconsistent code style across contributions |
| Test framework | Not configured | Zero test coverage; no safety net |
| Type checking CI | `@astrojs/check` installed but not in scripts | No `npm run check` script in `package.json` |
| Husky/lint-staged | Not configured | No pre-commit hooks |
| CI/CD pipeline | Not configured | No automated builds or checks on push |
| `.env.example` | Missing | No template for required env vars |
| `.prettierignore` | Missing | Build artifacts should be excluded from formatting |
| Customized README.md | Default template | Reads like a fresh Astro project starter |

### Dead Weight

- `node-v22.22.2-win-x64/` directory is Windows binaries in a Linux workspace — irrelevant
- `.playwright-mcp/` contains dev session logs — good that it's gitignored, but consider adding `playwright-results/` if screenshots accumulate

---

## 5. Performance

| Area | Assessment |
|------|-----------|
| Font loading | Good — `media="print"` swap with `<noscript>` fallback |
| Motion bundle loading | Good — deferred after 2 `requestAnimationFrame` cycles |
| Web3Forms loading | Good — IntersectionObserver-based lazy load |
| GSAP will-change lifecycle | Good — set on `onStart`, cleared on `onComplete` |
| Hero background image | `w-[200vw]` is oversized; Astro `sizes` prop helps but CSS makes it massive |
| Selected Works pin duration | `"+=500%"` creates a very long scroll pin; may feel sluggish on low-end devices |
| No unused CSS purging | Tailwind content glob is correct; no dead styles |

### Lighthouse Estimate

| Metric | Estimated | Notes |
|--------|-----------|-------|
| Performance | 70-85 | GSAP + Lenis bundle weight; single-page means no route-level splitting |
| Accessibility | 80-90 | Skip link, focus management done well; form field dimming hurts a11y |
| Best Practices | 85-95 | Missing CSP, hardcoded key |
| SEO | 75-85 | Sitemap exists; missing JSON-LD, dynamic copyright year |

---

## 6. Testing Strategy (Recommended)

The project has Playwright installed but only uses it for screenshot capture. Recommended testing layers:

1. **Unit tests** (Vitest) — `home.ts` data validation, utility functions
2. **Component tests** (Astro + Vitest) — render components with different data props
3. **E2E tests** (Playwright) — contact form submission, mobile menu, horizontal scroll, reduced motion
4. **Lighthouse CI** — automated performance budget on PRs

Minimal recommended E2E test cases:
- Navigation: mobile drawer opens/closes, focus trap works
- Contact form: happy path, empty field, invalid email
- Horizontal scroll: desktop pins correctly, mobile shows vertical
- Reduced motion: all animations disabled, content still visible

---

## 7. Improvement Plan — Prioritized Tasks

### Phase 1: Fix & Protect (Week 1)

**T-01: Move Web3Forms key to env var**
- Create `.env.example` with `PUBLIC_WEB3FORMS_KEY=`
- Reference via `import.meta.env.PUBLIC_WEB3FORMS_KEY` in `Contact.astro`
- Files: `.env.example`, `src/components/Contact.astro`
- Effort: Small

**T-02: Add data attributes for contact form field selection**
- Replace brittle Tailwind class selectors with `data-form-field` attributes
- Files: `src/components/Contact.astro`, `src/scripts/contact-form.ts`
- Effort: Small

**T-03: Fix error handling in contact form**
- Log errors in catch blocks
- Differentiate network vs API error messages for the user
- Files: `src/scripts/contact-form.ts`
- Effort: Small

**T-04: Fix copyright year to be dynamic**
- Use `new Date().getFullYear()` in the footer
- Files: `src/components/Contact.astro` (or `Footer.astro`)
- Effort: Trivial

### Phase 2: Developer Experience (Week 1-2)

**T-05: Set up ESLint + Prettier**
- Add `eslint` with `@typescript-eslint` and Astro plugin
- Add `prettier` with Astro plugin
- Add `npm run lint` and `npm run format` scripts
- Add `.prettierrc` and `.prettierignore`
- Effort: Medium

**T-06: Add `npm run check` script**
- Already have `@astrojs/check` installed
- Add `"check": "astro check"` to scripts
- Effort: Trivial

**T-07: Write a customized README**
- Replace stock Astro README with project-specific documentation
- Include: project description, tech stack, dev commands, deployment, architecture overview
- Effort: Small

**T-08: Add TypeScript type checking to CI/CD**
- Ensure `astro check` runs before builds
- Consider adding `strict: true` in tsconfig (already extended)
- Effort: Small

### Phase 3: Architecture Cleanup (Week 2)

**T-09: Decouple Footer from Contact**
- Lift `Footer.astro` to the page layout level (alongside `Contact.astro`)
- Files: `src/components/Contact.astro`, `src/pages/index.astro`
- Effort: Small

**T-10: Create shared LegalPage component**
- Create `src/components/LegalPage.astro` with props: `title`, `sections`, `lastUpdated`
- Refactor `privacy.astro` and `terms.astro` to use it
- Effort: Medium

**T-11: Split `home-motion.ts` into focused modules**
```
src/scripts/
  home-motion.ts        (orchestrator)
  hero-intro.ts         (intro timeline)
  magnetic-effect.ts    (hero char magnetic)
  scroll-reveals.ts     (advantage, services, tracer reveals)
  horizontal-pin.ts     (selected works)
  ambient-float.ts      (tech nodes, ambient elements)
  utils.ts              (debounce, hash links, font loading)
```
- Effort: Large

**T-12: Establish z-index scale**
- Define in `tailwind.config.mjs` theme: `zIndex: { nav: 50, modal: 90, toast: 100 }`
- Replace all `z-index: 9999` references
- Effort: Small

### Phase 4: Testing & Quality Gates (Week 2-3)

**T-13: Add basic E2E tests with Playwright**
- Test: page loads, nav works, form submits, mobile menu operates
- Files: `tests/` directory
- Effort: Medium

**T-14: Add JSON-LD structured data**
- Add `LocalBusiness` or `ProfessionalService` schema in `Layout.astro`
- Effort: Small

**T-15: Set up CI pipeline**
- GitHub Actions: lint, type-check, build, test on PR
- Effort: Medium

### Phase 5: Performance & SEO (Optional)

**T-16: Add privacy-friendly analytics**
- Cloudflare Web Analytics or Plausible in `Layout.astro`
- Effort: Small

**T-17: Add Content Security Policy headers**
- Via Cloudflare Pages `_headers` file or `_redirects`
- Effort: Small

**T-18: Audit and reduce hero background image size**
- Consider using WebP format via Astro's `<Image>`
- Effort: Small

---

## Summary of Effort Distribution

| Effort Level | Task Count | Tasks |
|-------------|-----------|-------|
| Trivial | 2 | T-04, T-06 |
| Small | 8 | T-01, T-02, T-03, T-07, T-08, T-09, T-12, T-14, T-16, T-18 |
| Medium | 4 | T-05, T-10, T-13, T-15 |
| Large | 1 | T-11 |

---

## Notes

- This review is based on static analysis of the current codebase state. It does not cover runtime behavior or edge cases not visible from source code.
- The existing `.docs/IMPROVEMENT_PLAN.md` contains feature-level tasks (portfolio entries, analytics, blog) that complement this code quality-focused review.
- Animation timing and GSAP logic should not be changed unless a specific task calls for it — animations have been carefully tuned.
