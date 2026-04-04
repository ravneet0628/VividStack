const MOBILE_MAX = 767;

const btn = document.getElementById("mobile-menu-btn");
const links = document.getElementById("nav-links");
const backdrop = document.getElementById("nav-backdrop");
const brandLink = document.getElementById("nav-brand-link");

let menuTrapHandler: ((e: KeyboardEvent) => void) | null = null;
let menuOpenSnapshot: HTMLElement | null = null;

function isMobileNav(): boolean {
  return window.innerWidth <= MOBILE_MAX;
}

function drawerFocusables(): HTMLElement[] {
  if (!btn || !links) return [];
  const anchors = Array.from(
    links.querySelectorAll("a.nav-link, a.contact-btn"),
  ) as HTMLElement[];
  return [btn, ...anchors];
}

function openMenu(): void {
  btn?.classList.add("active");
  btn?.setAttribute("aria-expanded", "true");
  btn?.setAttribute("aria-label", "Close menu");
  links?.classList.add("active");
  backdrop?.classList.add("active");
  document.body.style.overflow = "hidden";

  if (!isMobileNav()) return;

  menuOpenSnapshot =
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;

  brandLink?.setAttribute("tabindex", "-1");
  document.getElementById("main-content")?.setAttribute("inert", "");

  links?.setAttribute("role", "dialog");
  links?.setAttribute("aria-modal", "true");
  links?.setAttribute("aria-label", "Site navigation");

  const firstLink = links?.querySelector("a.nav-link, a.contact-btn");
  if (firstLink instanceof HTMLElement) firstLink.focus();

  menuTrapHandler = (e: KeyboardEvent) => {
    if (e.key !== "Tab" || !btn?.classList.contains("active")) return;
    const list = drawerFocusables();
    if (list.length === 0) return;
    const active = document.activeElement;
    const idx = active instanceof HTMLElement ? list.indexOf(active) : -1;
    if (idx === -1) return;

    if (!e.shiftKey && idx === list.length - 1) {
      e.preventDefault();
      const wrap = list[0];
      if (wrap instanceof HTMLElement) wrap.focus();
    } else if (e.shiftKey && idx === 0) {
      e.preventDefault();
      const wrap = list[list.length - 1];
      if (wrap instanceof HTMLElement) wrap.focus();
    }
  };
  document.addEventListener("keydown", menuTrapHandler);
}

function closeMenu(): void {
  btn?.classList.remove("active");
  btn?.setAttribute("aria-expanded", "false");
  btn?.setAttribute("aria-label", "Open menu");
  links?.classList.remove("active");
  backdrop?.classList.remove("active");
  document.body.style.overflow = "";

  brandLink?.removeAttribute("tabindex");
  document.getElementById("main-content")?.removeAttribute("inert");

  links?.removeAttribute("role");
  links?.removeAttribute("aria-modal");
  links?.removeAttribute("aria-label");

  if (menuTrapHandler) {
    document.removeEventListener("keydown", menuTrapHandler);
    menuTrapHandler = null;
  }

  if (menuOpenSnapshot && document.contains(menuOpenSnapshot)) {
    menuOpenSnapshot.focus();
  } else {
    btn?.focus();
  }
  menuOpenSnapshot = null;
}

btn?.addEventListener("click", () => {
  const isOpen = btn.classList.contains("active");
  isOpen ? closeMenu() : openMenu();
});

backdrop?.addEventListener("click", closeMenu);

links?.querySelectorAll(".nav-link, .contact-btn").forEach((link) => {
  link.addEventListener("click", () => {
    if (isMobileNav()) closeMenu();
  });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && btn?.classList.contains("active")) {
    closeMenu();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > MOBILE_MAX && btn?.classList.contains("active")) {
    closeMenu();
  }
});
