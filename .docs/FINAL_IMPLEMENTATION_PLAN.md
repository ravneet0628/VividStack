# VividStack — Remaining Implementation Plan

> **Date:** April 3, 2026
> **Project State:** High-Fidelity Landing Page Complete | Functional Web3Forms Backend Integrated | Mobile Nav Overhaul (/adapt) Done.

This plan outlines the final technical and UX refinements required to go from "Impressive MVP" to "Agency Production Ready."

---

## 🟢 Phase 4: Accessibility & UX Engineering

These tasks focus on the "Professional Grade" requirements highlighted in the design critique.

| Ref | Task | Priority | Description | Suggested Skill |
|---|---|---|---|---|
| A01 | **Skip-to-Content Link** | P1 | Add a visually hidden, focusable skip-link at the top of the body for keyboard navigation. | `/polish` |
| A02 | **Landmark Correction** | P2 | Ensure `<main>` wraps the entire page content (Hero through Contact), not just the Hero. | `/polish` |
| A03 | **Form UX / Autocomplete** | P2 | Add `autocomplete="name"`, `autocomplete="email"`, and `autocomplete="off"` to the contact form for better mobile performance. | `/harden` |
| A04 | **Portfolio Mobile Indicators** | P1 | Add a visual swipe indicator or persistent "drag" icon to the Selected Works section on mobile. | `/adapt` |

---

## 🟡 Phase 5: Content & Credibility

Resolving the last "Placeholder" elements to establish professional trust.

| Ref | Task | Priority | Description | Suggested Skill |
|---|---|---|---|---|
| C01 | **Social Link Bridge** | P1 | Replace `#` links in the Navbar and Footer with real agency profiles (LinkedIn, GitHub, Twitter). | `/polish` |
| C02 | **Secondary Pages Stubs** | P2 | Create `/about`, `/case-studies`, `/privacy-policy`, and `/terms-of-service` pages. | `/extract` |
| C03 | **Dynamic Copyright** | P3 | Ensure the footer copyright uses `new Date().getFullYear()` instead of a hardcoded 2026. | `/harden` |

---

## 🟠 Phase 6: Technical Debt & Polish

Cleanup of existing development warnings and architectural improvements.

| Ref | Task | Priority | Description | Suggested Skill |
|---|---|---|---|---|
| T01 | **TypeScript Sanitization** | P1 | Resolve the `any` type implicit warnings for `lenis` and the GSAP `TweenTarget` assignment errors. | `/harden` |
| T02 | **Lighthouse Optimization** | P2 | Perform a final audit to ensure 100/100 scores across Performance, Accessibility, Best Practices, and SEO. | `/audit` |
| T03 | **Pre-Production Env Ops** | P2 | Move the Web3Forms `access_key` from a hardcoded string to an environment variable. | `/harden` |

---

## 🛠 Active Task List (Next Action)

**Phase 4 (Completed)**:
- [x] Add Skip-to-Content link.
- [x] Correct `<main>` landmark.
- [x] Resolve dead LinkedIn/GitHub/Twitter social links.
- [x] Add `autocomplete` to contact form inputs.
- [x] Add Portfolio Mobile Indicators.

**Phase 6 (Completed)**:
- [x] TypeScript Sanitization (`lenis`, GSAP).
- [x] Pre-Production Env Ops (`PUBLIC_WEB3FORMS_KEY`).
- [x] Lighthouse Optimization check.

---

> [!NOTE]
> The brutalist identity is now solid. All future tasks should preserve the sharp corners, monospace accents, and outcome-oriented copy (no dev jargon).
