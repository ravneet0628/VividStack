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
    systemId: "Personal Brand Website",
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
    systemId: "Corporate Website",
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
    systemId: "Insurance Website",
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
    systemId: "Photography Portfolio",
    cropY: "-top-[11%]"
  },
];

// ============================================
// ADVANTAGES
// ============================================
export const advantages = [
  {
    title: "BLAZING FAST<br/>PERFORMANCE",
    description: "Most users leave a slow site. Yours will load in under a second, keeping every customer on the page.",
    iconSVG: `<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>`,
    theme: "mint" // 'mint', 'white', 'navy' mapping to specific card styles
  },
  {
    title: "FOUND ON<br/>GOOGLE",
    description: "We handle the technical SEO setup so your business shows up where it matters.",
    iconSVG: `<path d="M12.48 10.92v3.28h7.84c-.24 1.84-2.21 5.39-7.84 5.39-4.84 0-8.77-4.01-8.77-8.96s3.93-8.96 8.77-8.96c2.75 0 4.6 1.17 5.65 2.18l2.59-2.5c-1.66-1.55-3.82-2.48-6.24-2.48-5.32 0-9.67 4.35-9.67 9.67s4.35 9.67 9.67 9.67c5.56 0 9.25-3.91 9.25-9.41 0-.63-.07-1.12-.15-1.59h-9.1z"/>`,
    theme: "white"
  },
  {
    title: '$0 HOSTING.<br/><span class="text-vivid-mint">FREE FOREVER</span>',
    description: "Save thousands in monthly fees with our enterprise-grade infrastructure.",
    iconSVG: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
    theme: "navy",
    badge: "FREE FOREVER"
  }
];

// ============================================
// SERVICES (BENTO GRID)
// ============================================
export const services = [
  {
    id: "bento-engineering",
    number: "01",
    title: "Web Engineering",
    description: "Your website will load instantly, look stunning on every screen, and grow with your business. No compromises.",
    cta: "View Case Studies →",
    href: "#platform",
    type: "hero",
    glowColor: "#00ffcc",
    iconSVG: `<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>`
  },
  {
    id: "bento-seo",
    number: "02",
    title: "Technical SEO",
    description: "We set up your site so Google can find your business — the technical stuff that actually gets you more customers.",
    type: "secondary",
    glowColor: "#5DFFEC",
    iconSVG: `<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>`
  },
  {
    id: "bento-design",
    number: "03",
    title: "UI / UX Design",
    description: "Interfaces designed to turn visitors into paying customers. Every detail serves a purpose.",
    type: "accent",
    glowColor: "#95CBD0",
    iconSVG: `<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>`
  }
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
    title: "Found on Google",
    description: "Built-in SEO setup so your business shows up when customers search for you."
  },
  {
    title: "Modern Tech",
    description: "Built with the latest tools for blazing-fast, future-proof websites."
  },
  {
    title: "Mobile-First",
    description: "Looks perfect on every phone, tablet, and desktop your customers use."
  },
  {
    title: "Always Online",
    description: "Your site loads fast from anywhere in the world and never goes down."
  },
  {
    title: "Secure & Protected",
    description: "Your site is protected from attacks and threats — your customers' data stays safe."
  }
];
