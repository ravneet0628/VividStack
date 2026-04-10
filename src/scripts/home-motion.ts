/**
 * Home page motion — single owner for GSAP + Lenis on `/`.
 *
 * Selector ownership (do not let Tailwind transforms fight GSAP on these):
 * - GSAP transform/opacity: .hero-char (intro + magnetic hover); #main-nav stays CSS-only (no intro — avoids load flicker),
 *   #hero-eyebrow, #hero-subtitle, #hero-cta, .tech-node (intro + optional float loop),
 *   #hero-background, #advantage scroll timeline (.advantage-card reveal + header; .advantage-card-icon, .free-badge;
 *   then clearProps for CSS hover:-translate-y-1),
 *   #services scroll timeline (tracer + header + triad cards + bullets + CTAs + ribbon; then clearProps),
 *   .pin-wrap + .blueprint-terminal (desktop pin),
 *   .section-tracer (except #services, #process, #capabilities — owned by their timelines), #ambient-elements > div (float loop)
 *   #process intro + row ScrollTriggers (registered after works pin + final ScrollTrigger.refresh so starts are correct)
 *   #capabilities scroll timeline (tracer + header + bento-perf-main + .perf-gauge-arc + .bento-satellite stagger)
 * - CSS only: Navbar scroll-driven background (nav-fill), component hover transitions, Tailwind transitions
 *
 * Breakpoint: DESKTOP_LG_MIN_PX aligns with Tailwind `lg` (1024px). Lenis + heavy GSAP run when
 * viewport width >= this value at init (not updated on resize — matches previous behavior).
 */

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

export const DESKTOP_LG_MIN_PX = 1024;

/** Tailwind `md` — matches `md:grid-cols-3` on service cards. */
const MD_MIN_PX = 768;

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isDesktopAtInit(): boolean {
  return window.innerWidth >= DESKTOP_LG_MIN_PX;
}

function applyReducedMotionInstantState(): void {
  document.documentElement.classList.add("reduced-motion");

  // Hero chars have opacity-0 in HTML; reveal them immediately.
  gsap.set(".hero-char", { opacity: 1, y: 0, clearProps: "transform" });
  gsap.set("#hero-eyebrow, #hero-subtitle, #hero-cta", { opacity: 1, y: 0 });
  gsap.set(".tech-node", { opacity: 1, y: 0 });

  document.querySelectorAll(".advantage-card").forEach((el) => {
    el.classList.remove("opacity-0");
    gsap.set(el, { clearProps: "all" });
  });

  document
    .querySelectorAll(
      "#advantage-eyebrow, #advantage-title-prefix, #advantage-title-accent, #advantage-lede",
    )
    .forEach((el) => {
      el.classList.remove("opacity-0");
    });
  gsap.set(".advantage-eyebrow-line", {
    scaleX: 1,
    clearProps: "transform",
  });
  gsap.set(".advantage-card-icon, .free-badge", { clearProps: "all" });

  document.querySelectorAll("#services .service-tier-card").forEach((el) => {
    el.classList.remove("opacity-0");
    gsap.set(el, { clearProps: "all" });
  });

  document
    .querySelectorAll(
      "#services-eyebrow, #services-title-prefix, #services-title-accent, #services-lede, .service-tier-bullet, .service-tier-cta",
    )
    .forEach((el) => {
      el.classList.remove("opacity-0");
    });
  gsap.set(".services-eyebrow-line", {
    scaleX: 1,
    clearProps: "transform",
  });
  gsap.set(".service-popular-ribbon", { clearProps: "all" });

  document
    .querySelectorAll(
      "#process-eyebrow, #process-title-prefix, #process-title-accent",
    )
    .forEach((el) => {
      el.classList.remove("opacity-0");
    });
  gsap.set(".process-eyebrow-line", {
    scaleX: 1,
    clearProps: "transform",
  });
  gsap.set(".process-vertical-line-inner", {
    scaleY: 1,
    clearProps: "transform",
  });
  document
    .querySelectorAll(
      "#process .process-stage-label, #process .process-card-client, #process .process-card-agency, #process .process-phase-icon",
    )
    .forEach((el) => {
      el.classList.remove("opacity-0");
      gsap.set(el, { clearProps: "all" });
    });

  document
    .querySelectorAll(
      "#capabilities-eyebrow, #capabilities-title-prefix, #capabilities-title-amp, #capabilities-title-suffix, #capabilities .bento-perf-main, #capabilities .bento-satellite",
    )
    .forEach((el) => {
      el.classList.remove("opacity-0");
    });
  gsap.set(".capabilities-eyebrow-line", {
    scaleX: 1,
    clearProps: "transform",
  });
  gsap.set("#capabilities .section-tracer", { scaleX: 1 });
  document.querySelectorAll("#capabilities .bento-card").forEach((el) => {
    gsap.set(el, { clearProps: "all" });
  });
  const capGaugeArcRm = document.querySelector("#capabilities .perf-gauge-arc");
  if (capGaugeArcRm) gsap.set(capGaugeArcRm, { clearProps: "all" });

  gsap.set(".section-tracer", { scaleX: 1 });
  gsap.set("#hero-background", { opacity: 1 });

  const pinWrap = document.querySelector<HTMLElement>(".pin-wrap");
  if (pinWrap) gsap.set(pinWrap, { clearProps: "all" });
}

function setupHashLinks(lenis: Lenis | null, reducedMotion: boolean): void {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute("href");
      if (!targetId) return;

      if (lenis && !reducedMotion) {
        lenis.scrollTo(targetId, {
          offset: 0,
          duration: 1.5,
          easing: (t) =>
            Math.min(
              1,
              1.001 *
                Math.pow(2, -10 * t) *
                Math.sin((t * 10 - 0.75) * ((2 * Math.PI) / 3)) +
                1,
            ),
        });
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: reducedMotion ? "auto" : "smooth",
        });
      }
    });
  });
}

function setupSelectedWorksLayout(
  worksSection: Element | null,
  pinWrap: HTMLElement | null,
  isMobile: boolean,
  reducedMotion: boolean,
): void {
  if (!worksSection || !pinWrap) return;

  if (isMobile) {
    pinWrap.setAttribute("data-lenis-prevent", "");
    gsap.set(pinWrap, { clearProps: "all" });
    return;
  }

  if (reducedMotion) {
    pinWrap.setAttribute("data-lenis-prevent", "");
    gsap.set(pinWrap, { clearProps: "all" });
    return;
  }

  pinWrap.removeAttribute("data-lenis-prevent");
}

let resizeRefreshTimer: ReturnType<typeof setTimeout> | null = null;

function debouncedScrollTriggerRefresh(): void {
  if (resizeRefreshTimer) clearTimeout(resizeRefreshTimer);
  resizeRefreshTimer = setTimeout(() => {
    resizeRefreshTimer = null;
    ScrollTrigger.refresh();
  }, 150);
}

/** Horizontal pin end position — DOM reads only from ScrollTrigger refresh, not each scrub frame. */
function computePinEndX(pinWrap: HTMLElement): number {
  const iw = window.innerWidth;
  const maxNatural = pinWrap.scrollWidth - iw;
  const buffer = Math.round(iw * 0.06);
  const last = pinWrap.querySelector<HTMLElement>(
    ".project-card:last-of-type",
  );
  if (!last) return -(maxNatural + buffer);
  const lastCenter = last.offsetLeft + last.offsetWidth / 2;
  const scrollToRestLast = lastCenter - iw / 2 + buffer;
  return -Math.max(maxNatural + buffer, scrollToRestLast);
}

function wireVisibilityPause(tweens: gsap.core.Tween[]): void {
  if (tweens.length === 0) return;
  document.addEventListener("visibilitychange", () => {
    const hidden = document.visibilityState === "hidden";
    tweens.forEach((t) => (hidden ? t.pause() : t.resume()));
  });
}

export async function initHomeMotion(): Promise<void> {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create("architectural", "0.4, 0, 0.2, 1");

  const reducedMotion = prefersReducedMotion();
  const isMobile = !isDesktopAtInit();

  if (reducedMotion) {
    applyReducedMotionInstantState();
  } else {
    gsap.ticker.lagSmoothing(0);
    // Avoid mid-intro layout jump when Space Grotesk swaps in after fallback metrics.
    if (document.fonts) {
      try {
        await document.fonts.ready;
        await Promise.all([
          document.fonts.load("700 4rem 'Space Grotesk'"),
          document.fonts.load("700 8rem 'Space Grotesk'"),
          document.fonts.load("700 12rem 'Space Grotesk'"),
        ]);
      } catch {
        /* ignore */
      }
    }
  }

  const worksSection = document.querySelector("#selected-works");
  const pinWrap = document.querySelector<HTMLElement>(".pin-wrap");
  setupSelectedWorksLayout(worksSection, pinWrap, isMobile, reducedMotion);

  let lenis: Lenis | null = null;

  if (!isMobile && !reducedMotion) {
    lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => {
      lenis?.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  setupHashLinks(lenis, reducedMotion);

  if (reducedMotion) {
    return;
  }

  let heroMagneticBound = false;
  function initHeroCharMagnetic(): void {
    if (heroMagneticBound) return;
    heroMagneticBound = true;

    const heroChars = gsap.utils.toArray<Element>(".hero-char");
    if (heroChars.length === 0 || isMobile) return;

    const brand = document.querySelector("#hero-brand");
    let brandRectCache: DOMRect | null = null;
    function updateBrandRectCache(): void {
      if (brand) brandRectCache = brand.getBoundingClientRect();
    }
    updateBrandRectCache();

    let scrollRafPending = false;
    window.addEventListener(
      "scroll",
      () => {
        if (scrollRafPending) return;
        scrollRafPending = true;
        requestAnimationFrame(() => {
          scrollRafPending = false;
          updateBrandRectCache();
        });
      },
      { passive: true },
    );
    window.addEventListener("resize", updateBrandRectCache);

    let rafPending = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let magnetActive = false;

    window.addEventListener("mousemove", (e) => {
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      if (rafPending) return;
      rafPending = true;
      requestAnimationFrame(() => {
        rafPending = false;

        const pad = 110;
        let inside = false;
        if (brandRectCache) {
          const br = brandRectCache;
          inside =
            lastMouseX >= br.left - pad &&
            lastMouseX <= br.right + pad &&
            lastMouseY >= br.top - pad &&
            lastMouseY <= br.bottom + pad;
        }

        if (!inside) {
          if (magnetActive) {
            magnetActive = false;
            heroChars.forEach((char) => {
              gsap.to(char, {
                x: 0,
                y: 0,
                duration: 0.45,
                ease: "power3.out",
                overwrite: "auto",
              });
            });
          }
          return;
        }

        magnetActive = true;
        const magnetRadius = 100;

        heroChars.forEach((char) => {
          const rect = char.getBoundingClientRect();
          const charX = rect.left + rect.width / 2;
          const charY = rect.top + rect.height / 2;
          const distX = lastMouseX - charX;
          const distY = lastMouseY - charY;
          const distance = Math.sqrt(distX * distX + distY * distY);

          if (distance < magnetRadius && distance > 0.5) {
            const pull = 1 - distance / magnetRadius;
            const moveX = (distX / distance) * pull * 8;
            const moveY = (distY / distance) * pull * 8;
            gsap.to(char, {
              x: moveX,
              y: moveY,
              duration: 0.25,
              ease: "power2.out",
              overwrite: "auto",
            });
          } else {
            gsap.to(char, {
              x: 0,
              y: 0,
              duration: 0.45,
              ease: "power3.out",
              overwrite: "auto",
            });
          }
        });
      });
    });
  }

  // Set initial states in GSAP only — no CSS translate classes on these elements
  // so there is no competing transform on first paint.
  gsap.set("#hero-eyebrow", { y: 16 });
  gsap.set("#hero-subtitle", { y: 20 });
  gsap.set("#hero-cta", { y: 20 });
  gsap.set(".tech-node", { y: 20 });
  gsap.set(".hero-char", { y: 24 });

  const tl = gsap.timeline({
    defaults: { ease: "power3.out", duration: 0.9, force3D: false },
  });

  // Hero intro — opacity-0 is set in HTML; GSAP drives from→to with no CSS conflict.
  // Eyebrow first (above H1), then headline words, then subtext — matches reading order.
  // Navbar is not animated here: hiding it after first paint (post–fonts.ready) caused a visible flicker.
  tl.to("#hero-eyebrow", {
    opacity: 1,
    y: 0,
    duration: 0.55,
    ease: "power3.out",
    delay: 0.15,
  })
    .to(
      ".hero-char",
      {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.7,
        ease: "power3.out",
      },
      "-=0.15",
    )
    .to("#hero-subtitle", { opacity: 1, y: 0, duration: 0.65 }, "-=0.45")
    .to("#hero-cta", { opacity: 1, y: 0, duration: 0.65 }, "-=0.55")
    .to(".tech-node", { opacity: 1, y: 0, stagger: 0.08, duration: 0.65 }, "-=0.5")
    .call(() => {
      // Remove y residue so layout is clean before magnetic activates.
      gsap.set(".hero-char", { clearProps: "transform" });
      window.setTimeout(initHeroCharMagnetic, 50);
    });

  gsap.set("#advantage-eyebrow", { y: 18 });
  gsap.set(".advantage-eyebrow-line", {
    scaleX: 0,
    transformOrigin: "left center",
  });
  gsap.set("#advantage-title-prefix", { y: 26 });
  gsap.set("#advantage-title-accent", { y: 22 });
  gsap.set("#advantage-lede", { y: 22 });
  gsap.set(".advantage-card", { y: 52, force3D: true });
  gsap.set(".advantage-card-icon", { scale: 0.88, force3D: true });
  gsap.set(".free-badge", { scale: 0.82, autoAlpha: 0, force3D: true });

  const cardStagger = 0.09;
  const advantageTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#advantage",
      start: "top 88%",
      once: true,
      fastScrollEnd: true,
    },
    onStart: () => {
      gsap.set(".advantage-card", { willChange: "transform" });
    },
    onComplete: () => {
      requestAnimationFrame(() => {
        document
          .querySelectorAll(
            "#advantage-eyebrow, #advantage-title-prefix, #advantage-title-accent, #advantage-lede",
          )
          .forEach((el) => {
            el.classList.remove("opacity-0");
          });
        document.querySelectorAll(".advantage-card").forEach((el) => {
          el.classList.remove("opacity-0");
          gsap.set(el, {
            clearProps: "transform,opacity,visibility,willChange",
          });
        });
        gsap.set(".advantage-card-icon", {
          clearProps: "transform,willChange",
        });
        gsap.set(".free-badge", {
          clearProps: "transform,opacity,visibility,willChange",
        });
        gsap.set(
          "#advantage-eyebrow, #advantage-title-prefix, #advantage-title-accent, #advantage-lede",
          { clearProps: "transform,opacity,visibility" },
        );
        gsap.set(".advantage-eyebrow-line", { clearProps: "transform" });
      });
    },
  });

  advantageTl
    .to("#advantage-eyebrow", {
      opacity: 1,
      y: 0,
      duration: 0.55,
      ease: "power3.out",
    })
    .to(
      ".advantage-eyebrow-line",
      {
        scaleX: 1,
        duration: 0.52,
        ease: "power2.out",
      },
      0.08,
    )
    .to(
      "#advantage-title-prefix",
      {
        opacity: 1,
        y: 0,
        duration: 0.72,
        ease: "power3.out",
      },
      0.1,
    )
    .to(
      "#advantage-title-accent",
      {
        opacity: 1,
        y: 0,
        duration: 0.62,
        ease: "power3.out",
      },
      0.22,
    )
    .to(
      "#advantage-lede",
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out",
      },
      "-=0.38",
    )
    .to(
      ".advantage-card",
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.95,
        stagger: cardStagger,
        ease: "power3.out",
        force3D: true,
        overwrite: "auto",
      },
      "advCards",
    )
    .to(
      ".advantage-card-icon",
      {
        scale: 1,
        duration: 0.48,
        stagger: cardStagger,
        ease: "power3.out",
        force3D: true,
        overwrite: "auto",
      },
      "advCards+=0.32",
    )
    .to(
      ".free-badge",
      {
        scale: 1,
        autoAlpha: 1,
        duration: 0.42,
        stagger: 0.08,
        ease: "back.out(1.35)",
        force3D: true,
        overwrite: "auto",
      },
      "advCards+=0.88",
    );

  const ambientTweens: gsap.core.Tween[] = [];

  if (!isMobile) {
    gsap.utils.toArray<Element>("#ambient-elements > div").forEach((element) => {
      const tw = gsap.to(element, {
        x: "random(-20, 20)",
        y: "random(-20, 20)",
        duration: "random(6, 10)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true,
      });
      ambientTweens.push(tw);
    });

    gsap.utils.toArray<Element>(".tech-node").forEach((node, i) => {
      const tw = gsap.to(node, {
        y: i % 2 === 0 ? 15 : -15,
        rotation: i % 2 === 0 ? 1 : -1,
        duration: 2.5 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        force3D: true,
        delay: i * 0.2,
      });
      ambientTweens.push(tw);
    });
  }

  wireVisibilityPause(ambientTweens);

  gsap.set("#services .section-tracer", {
    scaleX: 0,
    transformOrigin: "left center",
  });
  gsap.set("#services-eyebrow", { y: 18 });
  gsap.set(".services-eyebrow-line", {
    scaleX: 0,
    transformOrigin: "left center",
  });
  gsap.set("#services-title-prefix", { y: 24 });
  gsap.set("#services-title-accent", { y: 20 });
  gsap.set("#services-lede", { y: 22 });
  gsap.set(".service-tier-bullet", { y: 8 });
  gsap.set(".service-tier-cta", { y: 14 });

  const serviceCards = gsap.utils.toArray<HTMLElement>("#services .service-tier-card");
  const servicesTriadBehind =
    typeof window !== "undefined" &&
    window.matchMedia(`(min-width: ${MD_MIN_PX}px)`).matches &&
    serviceCards.length >= 3;

  if (servicesTriadBehind) {
    const [leftCard, centerCard, rightCard] = serviceCards;
    gsap.set(leftCard, {
      y: 52,
      xPercent: 132,
      zIndex: 1,
      force3D: true,
    });
    gsap.set(centerCard, {
      y: 56,
      xPercent: 0,
      scale: 1.02,
      zIndex: 30,
      force3D: true,
    });
    gsap.set(rightCard, {
      y: 52,
      xPercent: -132,
      zIndex: 1,
      force3D: true,
    });
    serviceCards.forEach((card, i) => {
      if (i > 2) gsap.set(card, { y: 52, xPercent: 0, zIndex: 1, force3D: true });
    });
  } else {
    serviceCards.forEach((card, i) => {
      const base = { y: 52, force3D: true };
      if (i === 0) gsap.set(card, { ...base, x: -20 });
      else if (i === 1) gsap.set(card, { ...base, x: 0, scale: 0.98 });
      else if (i === 2) gsap.set(card, { ...base, x: 20 });
      else gsap.set(card, { ...base, x: 0 });
    });
  }

  const popularRibbon = document.querySelector(".service-popular-ribbon");
  if (popularRibbon) {
    gsap.set(popularRibbon, { y: -14, autoAlpha: 0, force3D: true });
  }

  const svcStagger = 0.1;
  const servicesTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#services",
      start: "top 88%",
      once: true,
      fastScrollEnd: true,
    },
    onStart: () => {
      gsap.set("#services .service-tier-card", { willChange: "transform" });
    },
    onComplete: () => {
      requestAnimationFrame(() => {
        document
          .querySelectorAll(
            "#services-eyebrow, #services-title-prefix, #services-title-accent, #services-lede",
          )
          .forEach((el) => {
            el.classList.remove("opacity-0");
          });
        document.querySelectorAll(".service-tier-bullet, .service-tier-cta").forEach((el) => {
          el.classList.remove("opacity-0");
        });
        document.querySelectorAll("#services .service-tier-card").forEach((el) => {
          el.classList.remove("opacity-0");
          gsap.set(el, {
            clearProps: "transform,opacity,visibility,willChange,zIndex",
          });
        });
        gsap.set(".service-tier-bullet", {
          clearProps: "transform,opacity,visibility",
        });
        gsap.set(".service-tier-cta", {
          clearProps: "transform,opacity,visibility",
        });
        if (popularRibbon) {
          gsap.set(popularRibbon, {
            clearProps: "transform,opacity,visibility,willChange",
          });
        }
        gsap.set(
          "#services-eyebrow, #services-title-prefix, #services-title-accent, #services-lede",
          { clearProps: "transform,opacity,visibility" },
        );
        gsap.set(".services-eyebrow-line", { clearProps: "transform" });
        gsap.set("#services .section-tracer", { clearProps: "transform" });
      });
    },
  });

  servicesTl
    .to("#services .section-tracer", {
      scaleX: 1,
      duration: 0.68,
      ease: "power3.inOut",
      force3D: true,
    })
    .to(
      "#services-eyebrow",
      {
        opacity: 1,
        y: 0,
        duration: 0.52,
        ease: "power3.out",
      },
      0.06,
    )
    .to(
      ".services-eyebrow-line",
      {
        scaleX: 1,
        duration: 0.48,
        ease: "power2.out",
      },
      0.12,
    )
    .to(
      "#services-title-prefix",
      {
        opacity: 1,
        y: 0,
        duration: 0.68,
        ease: "power3.out",
      },
      0.12,
    )
    .to(
      "#services-title-accent",
      {
        opacity: 1,
        y: 0,
        duration: 0.58,
        ease: "power3.out",
      },
      0.24,
    )
    .to(
      "#services-lede",
      {
        opacity: 1,
        y: 0,
        duration: 0.62,
        ease: "power3.out",
      },
      "-=0.34",
    );

  if (servicesTriadBehind) {
    const [leftCard, centerCard, rightCard] = serviceCards;
    servicesTl.to(
      centerCard,
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        zIndex: 30,
        duration: 0.78,
        ease: "power3.out",
        force3D: true,
        overwrite: "auto",
      },
      "svcCards",
    );
    servicesTl.to(
      [leftCard, rightCard],
      {
        autoAlpha: 1,
        xPercent: 0,
        y: 0,
        zIndex: 1,
        duration: 0.86,
        ease: "power3.out",
        force3D: true,
        overwrite: "auto",
      },
      "svcCards+=0.24",
    );
  } else {
    servicesTl.to(
      serviceCards,
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.92,
        stagger: svcStagger,
        ease: "power3.out",
        force3D: true,
        overwrite: "auto",
      },
      "svcCards",
    );
  }

  if (popularRibbon) {
    servicesTl.to(
      popularRibbon,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.44,
        ease: "back.out(1.28)",
        force3D: true,
        overwrite: "auto",
      },
      "svcCards+=0.68",
    );
  }

  servicesTl
    .to(
      ".service-tier-bullet",
      {
        opacity: 1,
        y: 0,
        duration: 0.32,
        stagger: 0.038,
        ease: "power2.out",
        overwrite: "auto",
      },
      "svcCards+=0.44",
    )
    .to(
      ".service-tier-cta",
      {
        opacity: 1,
        y: 0,
        duration: 0.48,
        stagger: 0.11,
        ease: "power3.out",
        overwrite: "auto",
      },
      ">",
    );

  if (worksSection && pinWrap && !isMobile) {
    let pinEndX = computePinEndX(pinWrap);

    const worksTl = gsap.timeline({
      scrollTrigger: {
        trigger: worksSection,
        start: "top top",
        end: "+=500%",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: () => {
          pinEndX = computePinEndX(pinWrap);
        },
      },
    });

    worksTl.to(pinWrap, {
      x: () => pinEndX,
      ease: "none",
    });

    gsap.utils.toArray<Element>(".blueprint-terminal").forEach((terminal) => {
      worksTl.to(terminal, { x: -120, ease: "none" }, 0);
    });

    window.addEventListener("load", () => {
      setTimeout(() => ScrollTrigger.refresh(), 800);
    });

    window.addEventListener("resize", debouncedScrollTriggerRefresh);
  }

  /* Process motion runs after works pin is registered so ScrollTrigger positions
   * include pin spacer layout (otherwise triggers never cross their start). */
  gsap.set("#process .section-tracer", {
    scaleX: 0,
    transformOrigin: "left center",
  });
  gsap.set("#process-eyebrow", { y: 18 });
  gsap.set(".process-eyebrow-line", {
    scaleX: 0,
    transformOrigin: "left center",
  });
  gsap.set("#process-title-prefix", { y: 22 });
  gsap.set("#process-title-accent", { y: 18 });
  gsap.set(".process-vertical-line-inner", {
    scaleY: 0,
    transformOrigin: "top center",
    force3D: true,
  });

  const processIntroTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#process",
      start: "top 88%",
      once: true,
      fastScrollEnd: true,
      invalidateOnRefresh: true,
    },
    onComplete: () => {
      requestAnimationFrame(() => {
        document
          .querySelectorAll("#process-eyebrow, #process-title-prefix, #process-title-accent")
          .forEach((el) => {
            el.classList.remove("opacity-0");
          });
        gsap.set(
          "#process-eyebrow, #process-title-prefix, #process-title-accent",
          { clearProps: "transform,opacity,visibility" },
        );
        gsap.set(".process-eyebrow-line", { clearProps: "transform" });
        const processTracer = document.querySelector("#process .section-tracer");
        if (processTracer) {
          processTracer.classList.remove("scale-x-0");
          gsap.set(processTracer, { clearProps: "transform" });
        }
        gsap.set(".process-vertical-line-inner", { clearProps: "transform" });
      });
    },
  });

  processIntroTl
    .to("#process .section-tracer", {
      scaleX: 1,
      duration: 0.65,
      ease: "power3.inOut",
      force3D: true,
    })
    .to(
      "#process-eyebrow",
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      },
      0.05,
    )
    .to(
      ".process-eyebrow-line",
      {
        scaleX: 1,
        duration: 0.45,
        ease: "power2.out",
      },
      0.1,
    )
    .to(
      "#process-title-prefix",
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power3.out",
      },
      0.1,
    )
    .to(
      "#process-title-accent",
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
      },
      0.22,
    )
    .to(
      ".process-vertical-line-inner",
      {
        scaleY: 1,
        duration: 1.05,
        ease: "power2.inOut",
        force3D: true,
      },
      0.15,
    );

  const processMdUp =
    typeof window !== "undefined" &&
    window.matchMedia(`(min-width: ${MD_MIN_PX}px)`).matches;

  document.querySelectorAll("#process .process-row").forEach((row) => {
    const label = row.querySelector<HTMLElement>(".process-stage-label");
    const cardYou = row.querySelector<HTMLElement>(".process-card-client");
    const cardWe = row.querySelector<HTMLElement>(".process-card-agency");
    const icon = row.querySelector<HTMLElement>(".process-phase-icon");
    if (!label || !cardYou || !cardWe || !icon) return;

    if (processMdUp) {
      gsap.set(label, { autoAlpha: 0 });
      gsap.set(cardYou, { autoAlpha: 0, x: -40, force3D: true });
      gsap.set(cardWe, { autoAlpha: 0, x: 40, force3D: true });
      gsap.set(icon, { autoAlpha: 0, scale: 0.88, force3D: true });
    } else {
      gsap.set(label, { autoAlpha: 0 });
      gsap.set(cardYou, { autoAlpha: 0, y: 18, force3D: true });
      gsap.set(cardWe, { autoAlpha: 0, y: 18, force3D: true });
      gsap.set(icon, { autoAlpha: 0, scale: 0.9, force3D: true });
    }

    function clearRowMotionTargets(): void {
      [label, cardYou, cardWe, icon].forEach((el) => {
        el.classList.remove("opacity-0");
        gsap.set(el, {
          clearProps: "transform,opacity,visibility,willChange",
        });
      });
    }

    const rowTl = gsap.timeline({
      scrollTrigger: {
        trigger: row,
        start: "top 90%",
        once: true,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
      },
      onComplete: () => {
        requestAnimationFrame(clearRowMotionTargets);
      },
    });

    if (processMdUp) {
      rowTl
        .to(label, {
          autoAlpha: 1,
          duration: 0.42,
          ease: "power2.out",
        })
        .to(
          cardYou,
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.62,
            ease: "power3.out",
          },
          "-=0.18",
        )
        .to(
          cardWe,
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.62,
            ease: "power3.out",
          },
          "-=0.42",
        )
        .to(
          icon,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.48,
            ease: "power3.out",
          },
          "-=0.38",
        );
    } else {
      rowTl
        .to(label, {
          autoAlpha: 1,
          duration: 0.4,
          ease: "power2.out",
        })
        .to(
          icon,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.44,
            ease: "power3.out",
          },
          "-=0.12",
        )
        .to(
          cardYou,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.52,
            ease: "power3.out",
          },
          "-=0.22",
        )
        .to(
          cardWe,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.52,
            ease: "power3.out",
          },
          "-=0.32",
        );
    }
  });

  const capGaugeArc = document.querySelector<SVGCircleElement>("#capabilities .perf-gauge-arc");
  const capSatellites = gsap.utils.toArray<HTMLElement>("#capabilities .bento-satellite");
  const capPerfMain = document.querySelector<HTMLElement>("#capabilities .bento-perf-main");

  gsap.set("#capabilities .section-tracer", {
    scaleX: 0,
    transformOrigin: "left center",
  });
  gsap.set("#capabilities-eyebrow", { y: 18 });
  gsap.set(".capabilities-eyebrow-line", {
    scaleX: 0,
    transformOrigin: "left center",
  });
  gsap.set("#capabilities-title-prefix", { y: 22 });
  gsap.set("#capabilities-title-amp", { y: 18 });
  gsap.set("#capabilities-title-suffix", { y: 22 });
  if (capPerfMain) {
    gsap.set(capPerfMain, {
      autoAlpha: 0,
      y: 28,
      scale: 0.98,
      force3D: true,
    });
  }
  capSatellites.forEach((el) => {
    gsap.set(el, { autoAlpha: 0, y: 18, force3D: true });
  });
  if (capGaugeArc) {
    gsap.set(capGaugeArc, {
      attr: { "stroke-dashoffset": 352 },
      autoAlpha: 0,
    });
  }

  const capabilitiesTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#capabilities",
      start: "top 88%",
      once: true,
      fastScrollEnd: true,
      invalidateOnRefresh: true,
    },
    onComplete: () => {
      requestAnimationFrame(() => {
        document
          .querySelectorAll(
            "#capabilities-eyebrow, #capabilities-title-prefix, #capabilities-title-amp, #capabilities-title-suffix",
          )
          .forEach((el) => {
            el.classList.remove("opacity-0");
          });
        document.querySelectorAll("#capabilities .bento-perf-main, #capabilities .bento-satellite").forEach((el) => {
          el.classList.remove("opacity-0");
        });
        gsap.set(
          "#capabilities-eyebrow, #capabilities-title-prefix, #capabilities-title-amp, #capabilities-title-suffix",
          { clearProps: "transform,opacity,visibility" },
        );
        gsap.set(".capabilities-eyebrow-line", { clearProps: "transform" });
        const capTracerEl = document.querySelector("#capabilities .section-tracer");
        if (capTracerEl) {
          capTracerEl.classList.remove("scale-x-0");
          gsap.set(capTracerEl, { clearProps: "transform" });
        }
        document.querySelectorAll("#capabilities .bento-card").forEach((el) => {
          gsap.set(el, {
            clearProps: "transform,opacity,visibility,willChange",
          });
        });
        if (capGaugeArc) {
          gsap.set(capGaugeArc, { clearProps: "opacity,visibility" });
        }
      });
    },
  });

  capabilitiesTl
    .to("#capabilities .section-tracer", {
      scaleX: 1,
      duration: 0.65,
      ease: "power3.inOut",
      force3D: true,
    })
    .to(
      "#capabilities-eyebrow",
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      },
      0.05,
    )
    .to(
      ".capabilities-eyebrow-line",
      {
        scaleX: 1,
        duration: 0.45,
        ease: "power2.out",
      },
      0.1,
    )
    .to(
      "#capabilities-title-prefix",
      {
        opacity: 1,
        y: 0,
        duration: 0.62,
        ease: "power3.out",
      },
      0.1,
    )
    .to(
      "#capabilities-title-amp",
      {
        opacity: 1,
        y: 0,
        duration: 0.52,
        ease: "power3.out",
      },
      0.2,
    )
    .to(
      "#capabilities-title-suffix",
      {
        opacity: 1,
        y: 0,
        duration: 0.58,
        ease: "power3.out",
      },
      0.26,
    );

  if (capPerfMain) {
    capabilitiesTl.to(
      capPerfMain,
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.78,
        ease: "power3.out",
        force3D: true,
        overwrite: "auto",
      },
      "capMain",
    );
  } else {
    capabilitiesTl.addLabel("capMain", ">");
  }

  if (capGaugeArc) {
    capabilitiesTl.to(
      capGaugeArc,
      {
        attr: { "stroke-dashoffset": 0 },
        autoAlpha: 1,
        duration: 1.05,
        ease: "power2.out",
      },
      "capMain+=0.18",
    );
  }

  if (capSatellites.length > 0) {
    capabilitiesTl.to(
      capSatellites,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.55,
        stagger: 0.085,
        ease: "power3.out",
        force3D: true,
        overwrite: "auto",
      },
      "capMain+=0.12",
    );
  }

  gsap.utils.toArray<Element>(".section-tracer-target").forEach((section) => {
    if (section.id === "services" || section.id === "process" || section.id === "capabilities") return;
    const tracer = section.querySelector(".section-tracer");
    if (tracer) {
      gsap.to(tracer, {
        scaleX: 1,
        duration: 1.2,
        ease: "power3.inOut",
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }
  });

  const heroBg = document.querySelector("#hero-background");
  if (heroBg) {
    // Opacity only — scale + separate letter motion felt like stacked "zoom" animations.
    gsap.from(heroBg, {
      opacity: 0,
      duration: 1.4,
      delay: 0.15,
      ease: "power2.out",
    });
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  });
}
