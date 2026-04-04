/**
 * Home page motion — single owner for GSAP + Lenis on `/`.
 *
 * Selector ownership (do not let Tailwind transforms fight GSAP on these):
 * - GSAP transform/opacity: #main-nav (intro y), .hero-char (intro + magnetic hover),
 *   #hero-title, #hero-subtitle, #hero-cta, .tech-node (intro + optional float loop),
 *   #hero-background, .advantage-card (reveal; then clearProps for CSS hover:-translate-y-1),
 *   #services .service-tier-card (scroll reveal only; not in intro willChange batch — avoids idle layers vs Process),
 *   .pin-wrap + .blueprint-terminal (desktop pin),
 *   .section-tracer, #ambient-elements > div (float loop)
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
  gsap.set("#main-nav", { opacity: 1, y: 0 });
  gsap.set("#hero-title, #hero-subtitle, #hero-cta", { opacity: 1, y: 0 });
  gsap.set(".tech-node", { opacity: 1, y: 0 });

  document.querySelectorAll(".advantage-card").forEach((el) => {
    el.classList.remove("opacity-0");
    gsap.set(el, { clearProps: "all" });
  });

  document.querySelectorAll("#services .service-tier-card").forEach((el) => {
    el.classList.remove("opacity-0");
    gsap.set(el, { clearProps: "all" });
  });
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
  gsap.set("#main-nav", { opacity: 0, y: -20 });
  gsap.set("#hero-title", { y: 24 });
  gsap.set("#hero-subtitle", { y: 20 });
  gsap.set("#hero-cta", { y: 20 });
  gsap.set(".tech-node", { y: 20 });
  gsap.set(".hero-char", { y: 24 });

  const tl = gsap.timeline({
    defaults: { ease: "power3.out", duration: 0.9, force3D: false },
  });

  // Hero intro — opacity-0 is set in HTML; GSAP drives from→to with no CSS conflict.
  tl.to("#main-nav", { opacity: 1, y: 0, delay: 0.15, duration: 0.7 })
    .to(
      ".hero-char",
      {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 0.7,
        ease: "power3.out",
      },
      "-=0.5",
    )
    .to("#hero-title", { opacity: 1, y: 0, duration: 0.65 }, "-=0.4")
    .to("#hero-subtitle", { opacity: 1, y: 0, duration: 0.65 }, "-=0.55")
    .to("#hero-cta", { opacity: 1, y: 0, duration: 0.65 }, "-=0.55")
    .to(".tech-node", { opacity: 1, y: 0, stagger: 0.08, duration: 0.65 }, "-=0.5")
    .call(() => {
      // Remove y residue so layout is clean before magnetic activates.
      gsap.set(".hero-char", { clearProps: "transform" });
      window.setTimeout(initHeroCharMagnetic, 50);
    });

  gsap.set(".advantage-card", { y: 52, force3D: true });
  gsap.to(".advantage-card", {
    autoAlpha: 1,
    y: 0,
    duration: 1.25,
    stagger: 0.08,
    ease: "power3.out",
    force3D: true,
    overwrite: "auto",
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
      const cards = document.querySelectorAll(".advantage-card");
      requestAnimationFrame(() => {
        cards.forEach((el) => {
          el.classList.remove("opacity-0");
          gsap.set(el, {
            clearProps: "transform,opacity,visibility,willChange",
          });
        });
      });
    },
  });

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

  gsap.set("#services .service-tier-card", { y: 52, force3D: true });
  gsap.to("#services .service-tier-card", {
    autoAlpha: 1,
    y: 0,
    duration: 1.25,
    stagger: 0.08,
    ease: "power3.out",
    force3D: true,
    overwrite: "auto",
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
      const cards = document.querySelectorAll("#services .service-tier-card");
      requestAnimationFrame(() => {
        cards.forEach((el) => {
          el.classList.remove("opacity-0");
          gsap.set(el, {
            clearProps: "transform,opacity,visibility,willChange",
          });
        });
      });
    },
  });

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

  gsap.utils.toArray<Element>(".section-tracer-target").forEach((section) => {
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
}
