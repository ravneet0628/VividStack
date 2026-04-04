import resetat30Img from "../assets/resetat30.png";
import hmglobalImg from "../assets/hmglobal.png";
import securechoiceImg from "../assets/securechoice.png";
import photolpImg from "../assets/photolp.png";

import resetat30Mobile from "../assets/resetat30_mobile.png";
import hmglobalMobile from "../assets/hmglobal_mobile.png";
import securechoiceMobile from "../assets/securechoice_mobile.png";
import photolpMobile from "../assets/photolp_mobile.png";

// ============================================
// SELECTED WORKS (PORTFOLIO)
// ============================================
export const portfolioProjects = [
  {
    title: "Reset at 30",
    category: "Personal Brand",
    stack: "Lifestyle Blog",
    stack2: "Loads in under 1 second",
    image: resetat30Img,
    mobileImage: resetat30Mobile,
    accent: "#00ffcc",
    url: "https://resetat30.pages.dev/",
    displayUrl: "resetat30.com",
    cropY: "-top-[5%]"
  },
  {
    title: "HM Global",
    category: "Corporate",
    stack: "Industrial Services",
    stack2: "Built to grow with the business",
    image: hmglobalImg,
    mobileImage: hmglobalMobile,
    accent: "#0066ff",
    url: "https://hmglobalinc.com/",
    displayUrl: "hmglobalinc.com",
    cropY: "top-0"
  },
  {
    title: "Secure Choice",
    category: "Insurance",
    stack: "Insurance Agency",
    stack2: "Looks trustworthy, converts leads",
    image: securechoiceImg,
    mobileImage: securechoiceMobile,
    accent: "#9900ff",
    url: "https://top-insurance.pages.dev/",
    displayUrl: "top-insurance.pages.dev",
    cropY: "-top-[11%]"
  },
  {
    title: "PhotoLP",
    category: "Photography",
    stack: "Photography Portfolio",
    stack2: "Showcases work beautifully",
    image: photolpImg,
    mobileImage: photolpMobile,
    accent: "#ff9900",
    url: "https://shivstudio.onrender.com/",
    displayUrl: "shivstudio.onrender.com",
    cropY: "-top-[11%]"
  },
];

// ============================================
// ADVANTAGES (partnership / outcomes — not stack metrics)
// theme: 'mint' | 'white' | 'navy' — card + icon treatment in Advantage.astro
// ============================================
export const advantages = [
  {
    title: "BUILT TO<br/>CONVERT",
    description:
      "Layouts, copy placement, and CTAs are planned for clarity and leads—not decoration that looks good in a mockup.",
    iconSVG: `<circle cx="12" cy="12" r="10" fill="none"/><circle cx="12" cy="12" r="6" fill="none"/><circle cx="12" cy="12" r="2"/>`,
    theme: "mint" as const,
  },
  {
    title: "CLEAR,<br/>GUIDED PROCESS",
    description:
      "Milestones you can follow, reviews at the right moments, and plain language—so you always know what happens next.",
    iconSVG: `<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>`,
    theme: "white" as const,
  },
  {
    title: 'HOSTING INCLUDED<br/><span class="text-vivid-mint">NO SURPRISE FEES</span>',
    description:
      "We deploy to fast, global edge infrastructure as part of our stack—so you are not nickel-and-dimed on hosting every month.",
    iconSVG: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
    theme: "navy" as const,
    badge: "INCLUDED",
  },
];

// ============================================
// SERVICES (engagement tiers — design, build, SEO scoped per tier; no public pricing)
// ============================================
export const services = [
  {
    id: "single-page",
    name: "Single page",
    tagline: "One URL, maximum impact—for launches, campaigns, or a tight first presence.",
    highlight: false,
    features: [
      "Hero, services, proof, and contact sections on a single high-impact page",
      "Mobile-first layout and responsive typography",
      "Performance-minded build with technical SEO essentials",
      "Contact form or primary CTA integrated end to end",
      "Launch checklist and handoff so you know how everything works",
    ],
  },
  {
    id: "multi-page",
    name: "Multi-page site",
    tagline: "A full small-business site with room to grow—without a CMS yet.",
    highlight: true,
    features: [
      "Information architecture across multiple pages (e.g. home, services, about, contact)",
      "Shared design system and consistent components site-wide",
      "Page-level SEO: titles, descriptions, and sensible internal linking",
      "Optional blog-style or resource sections as static pages",
      "Forms and analytics hooks wired for the pages you need",
    ],
  },
  {
    id: "site-cms",
    name: "Site + CMS",
    tagline: "For teams that update copy, pages, or posts often—without touching code.",
    highlight: false,
    features: [
      "Everything in the multi-page tier, plus CMS-backed content",
      "Editor-friendly content types for pages, posts, or structured sections",
      "Short training session and written documentation for your team",
      "Preview and publish workflow matched to the CMS we agree on",
    ],
  },
];

// ============================================
// PROCESS
// ============================================
export const processPhases = [
  {
    phase: "01",
    clientTitle: "Tell Us Your Vision",
    clientDesc: "Share your goals, who your customers are, and what you need your website to do.",
    agencyTitle: "Research & Plan",
    agencyDesc: "We study your industry, your competitors, and build a strategy to make you stand out.",
    iconSVG: `<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>`
  },
  {
    phase: "02",
    clientTitle: "Share Your Brand",
    clientDesc: "Send us your logo, photos, copy, and anything that represents your business.",
    agencyTitle: "Set Up Hosting",
    agencyDesc: "We get your site's infrastructure ready — fast, secure, and free to host forever.",
    iconSVG: `<polygon points="12,2 22,12 12,22 2,12"/>`
  },
  {
    phase: "03",
    clientTitle: "Review & Refine",
    clientDesc: "You see progress in real time and we fine-tune until you're thrilled.",
    agencyTitle: "Build Your Site",
    agencyDesc: "We design and develop every page with obsessive attention to quality and detail.",
    iconSVG: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>`
  },
  {
    phase: "04",
    clientTitle: "Approve & Go Live",
    clientDesc: "You give the final thumbs up, and your site goes live for the world to see.",
    agencyTitle: "Launch Everywhere",
    agencyDesc: "Your site goes live globally — fast for every customer, no matter where they are.",
    iconSVG: `<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>`
  }
];

// ============================================
// CAPABILITIES (PERFORMANCE GRID)
// ============================================
export const capabilities = [
  {
    title: "Core Web Vitals",
    description:
      "Real-world performance budgets: LCP, CLS, and INP treated as requirements—not afterthoughts once the design is done.",
  },
  {
    title: "Global edge network",
    description:
      "Assets served close to your visitors so the experience stays snappy whether they are across town or across an ocean.",
  },
  {
    title: "Security baseline",
    description:
      "HTTPS, modern security headers, and hardened hosting practices to shrink common attack surface and protect visitors.",
  },
  {
    title: "Accessibility baseline",
    description:
      "Semantic HTML, keyboard-friendly patterns, and contrast-conscious choices so more people can use your site comfortably.",
  },
  {
    title: "Versioned deploys",
    description:
      "Source-controlled releases—changes are traceable, repeatable, and straightforward to roll back when needed.",
  },
];

