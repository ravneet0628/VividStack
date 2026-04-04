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
    displayUrl: "resetat30.pages.dev",
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
    stack2: "Professional look that builds trust",
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
    stack2: "Photography front and center",
    image: photolpImg,
    mobileImage: photolpMobile,
    accent: "#ff9900",
    url: "https://shivstudio.onrender.com/",
    displayUrl: "shivstudio.onrender.com",
    cropY: "-top-[11%]"
  },
];

// ============================================
// ADVANTAGES (partnership / outcomes; not a feature dump)
// theme: 'mint' | 'white' | 'navy' (card + icon treatment in Advantage.astro)
// ============================================
export const advantages = [
  {
    title: "BUILT TO<br/>CONVERT",
    description:
      "Page structure, wording, and buttons are planned to turn visitors into leads, not just to look good in a mockup.",
    iconSVG: `<circle cx="12" cy="12" r="10" fill="none"/><circle cx="12" cy="12" r="6" fill="none"/><circle cx="12" cy="12" r="2"/>`,
    theme: "mint" as const,
  },
  {
    title: "CLEAR,<br/>GUIDED PROCESS",
    description:
      "Milestones you can follow, reviews when they matter, and plain language so you always know what happens next.",
    iconSVG: `<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>`,
    theme: "white" as const,
  },
  {
    title: 'HOSTING INCLUDED<br/><span class="text-vivid-mint">NO SURPRISE FEES</span>',
    description:
      "Fast, reliable hosting is included. We are not here to surprise you with a separate hosting bill every month.",
    iconSVG: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
    theme: "navy" as const,
    badge: "INCLUDED",
  },
];

// ============================================
// SERVICES (engagement tiers: design, build, SEO per tier; no public pricing)
// ============================================
export const services = [
  {
    id: "single-page",
    name: "Single page",
    tagline: "One URL, full impact: launches, campaigns, or a simple first site.",
    highlight: false,
    features: [
      "Hero, services, social proof, and contact on one strong page",
      "Layout and type that read well on phones and desktops",
      "Built fast, with search basics covered",
      "Contact form or main call-to-action wired and tested",
      "Launch checklist and a walkthrough so you know how it works",
    ],
  },
  {
    id: "multi-page",
    name: "Multi-page site",
    tagline: "A full small-business site with room to grow before you need an editor login.",
    highlight: true,
    features: [
      "Multiple pages (e.g. home, services, about, contact) with a clear structure",
      "One visual system and matching components across the site",
      "Page titles, descriptions, and internal links set up for search",
      "Optional blog or resource pages as static content if you want them",
      "Forms set up for the pages you need; analytics when you are ready",
    ],
  },
  {
    id: "site-cms",
    name: "Site + CMS",
    tagline: "For teams that change copy, pages, or posts often without calling a developer.",
    highlight: false,
    features: [
      "Everything in the multi-page tier, plus an editor-friendly content setup",
      "Content types for pages, posts, or repeating sections, tuned to how you work",
      "Short walkthrough and notes for whoever updates the site",
      "Draft and publish flow matched to the tools we agree on",
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
    agencyDesc: "We look at your industry and competitors and agree on a direction that fits you.",
    iconSVG: `<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>`
  },
  {
    phase: "02",
    clientTitle: "Share Your Brand",
    clientDesc: "Send us your logo, photos, copy, and anything that represents your business.",
    agencyTitle: "Set Up Hosting",
    agencyDesc: "We set up hosting that is fast, secure, and free for you month to month on the setup we use.",
    iconSVG: `<polygon points="12,2 22,12 12,22 2,12"/>`
  },
  {
    phase: "03",
    clientTitle: "Review & Refine",
    clientDesc: "You see progress in real time and we fine-tune until you're thrilled.",
    agencyTitle: "Build Your Site",
    agencyDesc: "We design and build each page with care: typography, spacing, and polish throughout.",
    iconSVG: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>`
  },
  {
    phase: "04",
    clientTitle: "Approve & Go Live",
    clientDesc: "You give the final thumbs up, and your site goes live for the world to see.",
    agencyTitle: "Launch Everywhere",
    agencyDesc: "Your site goes live worldwide so it loads quickly for customers near and far.",
    iconSVG: `<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>`
  }
];

// ============================================
// CAPABILITIES (PERFORMANCE GRID)
// ============================================
export const capabilities = [
  {
    title: "Speed that shows",
    description:
      "We treat load time as part of the design, not something we fix after the fact.",
  },
  {
    title: "Worldwide delivery",
    description:
      "Your files sit close to visitors so pages stay quick whether they are next door or overseas.",
  },
  {
    title: "Security-minded hosting",
    description:
      "Encrypted connections, sensible safeguards, and hosting practices that keep common risks down.",
  },
  {
    title: "Easier for everyone",
    description:
      "Clear structure, keyboard-friendly patterns, and readable contrast so more people can use your site without friction.",
  },
  {
    title: "Safe updates",
    description:
      "Changes are saved in order, easy to repeat, and simple to undo if something needs a second look.",
  },
];

