import Lenis from "lenis";
import { gsap, ScrollTrigger, ensureGsapRegistered } from "./gsap";

const NAV_OFFSET = 88; // clears the fixed navbar when landing on a section

let lenis: Lenis | null = null;

/**
 * Buttery, Apple/Google-style momentum scroll: eased rather than the browser's
 * raw wheel-delta jump. Synced to GSAP's ticker so ScrollTrigger stays in
 * lockstep with Lenis's own scroll position every frame.
 *
 * Desktop wheel only — touch devices keep their native (already excellent)
 * momentum scroll rather than a JS approximation of it, which is both
 * smoother and cheaper on mobile hardware.
 */
export function initSmoothScroll(): () => void {
  ensureGsapRegistered();

  lenis = new Lenis({
    duration: 1.05,
    easing: (t: number) => 1 - Math.pow(1 - t, 3), // ease-out-cubic
    smoothWheel: true,
    syncTouch: false,
  });

  const onScroll = () => ScrollTrigger.update();
  lenis.on("scroll", onScroll);

  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  // Unify every same-page anchor (#work, #contact, ...) through Lenis's own
  // eased scrollTo rather than the browser's instant/native jump.
  const onClick = (e: MouseEvent) => {
    if (e.defaultPrevented) return;
    const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!anchor) return;

    const hash = anchor.getAttribute("href");
    if (!hash || hash === "#") return;

    const target = document.querySelector(hash);
    if (!target) return;

    e.preventDefault();
    lenis?.scrollTo(target as HTMLElement, { offset: -NAV_OFFSET, duration: 1.2 });
  };
  document.addEventListener("click", onClick);

  return () => {
    document.removeEventListener("click", onClick);
    lenis?.off("scroll", onScroll);
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}
