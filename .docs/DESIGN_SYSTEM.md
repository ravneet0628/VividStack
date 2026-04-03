# VividStack — Design System

> **For AI agents:** Follow this document strictly when adding new UI elements. The visual identity is a deliberate "brutalist-tech" aesthetic — sharp edges, heavy typography, bold shadows, and a restrained color palette. Do not introduce rounded corners, gradients, or soft shadows on new components unless matching an existing pattern.

---

## Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `vivid-navy` | `#253644` | Primary text, backgrounds, borders, buttons |
| `vivid-mint` | `#95CBD0` | Accent color, logo, secondary highlights |
| `vivid-teal` | `#5DFFEC` | Agency labels, hover states (rarely used directly in CSS) |
| `vivid-cream` | `#F8F9FA` | Page background, light section backgrounds |
| `#00ffcc` | (no token) | Neon mint — used for CTA glows, "FREE FOREVER" badge, bento CTAs |
| `#000000` | Black | Brutalist borders and shadows throughout |
| `#05192d` | Deep navy | Dashboard/dark section background |

**Rule:** New sections should use either `bg-white`, `bg-vivid-cream`, `bg-[#f3f3f4]`, or `bg-vivid-navy`. Do not introduce new background colors.

---

## Typography

Three font families are loaded from Google Fonts:

| Family | Weights | Usage |
|--------|---------|-------|
| `Space Grotesk` | 300–700 | All display headings (`h2`, section titles). Apply via `style="font-family: 'Space Grotesk', sans-serif;"` |
| `Montserrat` | 400, 600, 700 | Navbar links, small labels. Tailwind default sans. |
| `Inter` | 400, 500, 600, 700 | Body text, card descriptions, metadata |

**Heading scale pattern:**
```css
/* Section headings */
font-size: clamp(3.75rem, 8vw, 5rem);  /* text-6xl md:text-8xl */
font-weight: 900;                        /* font-black */
text-transform: uppercase;
letter-spacing: -0.02em;                 /* tracking-tighter */
line-height: 0.85;
```

**Section label (above every heading):**
```html
<span class="text-vivid-mint font-bold uppercase tracking-[0.4em] text-sm mb-4 block">
  Label Text
</span>
```

---

## Spacing & Layout

- **Max content width:** `max-w-7xl` (1280px) for most sections; `max-w-[1400px]` for the Capabilities dashboard
- **Section padding:** `py-24` (mobile) → `py-32` (desktop)
- **Container padding:** `px-6` consistently

---

## Component Patterns

### Brutalist Card (used in Advantage, Services)
```css
border: 2px solid #000;
box-shadow: 8px 8px 0 0 #000;        /* Hard offset shadow */
background: #f8f9fa or vivid-navy;
/* On hover: */
box-shadow: 12px 12px 0 0 #000;
transform: translateY(-4px);
```

### Glass Panel (used in Process section)
```css
background: rgba(255, 255, 255, 0.6);
backdrop-filter: blur(12px);
border: 1px solid rgba(13, 27, 42, 0.1);
border-radius: 1.5rem;
/* On mobile: backdrop-filter is disabled for performance */
```

### Section Tracer (animated top border on scroll)
Every major section has a 1px horizontal line that scales from `scaleX(0)` to `scaleX(1)` when scrolled into view:
```html
<div class="section-tracer-target">
  <div class="section-tracer absolute top-0 left-0 w-full h-px bg-[color] origin-left scale-x-0 z-20"></div>
  <!-- section content -->
</div>
```
The GSAP animation targets `.section-tracer-target` → `.section-tracer`.

### Tech Node (floating dashboard widget)
Small absolutely-positioned cards in the hero. They use brutalist box-shadows and monospace text. Desktop-only floating animations applied by GSAP.

---

## Animation Conventions

- **Entrance:** Elements start `opacity: 0` + `translateY(30–100px)` in CSS, animated to final state by GSAP on scroll trigger or timeline
- **Easing:** `power2.out` for scroll-triggered, `power4.out` for initial page load
- **Duration:** 0.9–1.4s for entrances, 0.3s for hover micro-interactions
- **Stagger:** 0.1–0.2s between sibling elements
- **Mobile:** Floating/orbit animations and magnetic effects are skipped entirely (`IS_MOBILE` guard)

---

## Responsive Breakpoints

| Breakpoint | Width | Key Changes |
|------------|-------|-------------|
| Mobile default | <640px | Scaled-down text, stacked layouts |
| `sm` | 640px | Some text size increases |
| `md` | 768px | Two-column grids, process layout changes |
| `lg` | 1024px | `IS_MOBILE` threshold — GSAP pin vs snap scroll, Lenis enabled |
| Desktop-only elements | Hidden with `hidden lg:flex` or `hidden md:block` |

---

## Icons

All icons are inline SVGs drawn directly in the markup — no icon library dependency. Icons use `fill="none" stroke="currentColor"` by default with `stroke-width="1.5"` or `stroke-width="2"`. Size is typically set via Tailwind `w-6 h-6` or `w-8 h-8`.
