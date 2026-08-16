import { gsap, ensureGsapRegistered, EASE } from "../lib/gsap";

interface ScrollFadeOptions {
  y?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  start?: string;
  reducedMotion?: boolean;
}

/**
 * Fades + slides a group of elements up into place as they enter the viewport.
 * Returns the ScrollTrigger instance(s) so callers can clean up on unmount.
 */
export function scrollFadeUp(
  targets: Element | Element[] | NodeListOf<Element>,
  {
    y = 28,
    duration = 0.9,
    delay = 0,
    stagger = 0.08,
    start = "top 85%",
    reducedMotion = false,
  }: ScrollFadeOptions = {},
) {
  ensureGsapRegistered();

  const els = Array.from(
    targets instanceof Element ? [targets] : targets,
  ) as Element[];

  if (els.length === 0) return null;

  if (reducedMotion) {
    gsap.set(els, { opacity: 1, y: 0 });
    return null;
  }

  gsap.set(els, { opacity: 0, y });

  return gsap.to(els, {
    opacity: 1,
    y: 0,
    duration,
    delay,
    stagger,
    ease: EASE.out3,
    scrollTrigger: {
      trigger: els[0],
      start,
      toggleActions: "play none none reverse",
    },
  });
}
