import { gsap, ensureGsapRegistered, EASE } from "../lib/gsap";

interface RevealTextOptions {
  duration?: number;
  stagger?: number;
  delay?: number;
  start?: string;
  scrub?: boolean;
  reducedMotion?: boolean;
}

/**
 * Progressive clip-path line reveal used for editorial headlines.
 * Expects `lines` to be the inner `<span>` elements already wrapped in
 * overflow-hidden containers (see components/ui/RevealText.tsx).
 */
export function revealLines(
  lines: Element[],
  {
    duration = 1,
    stagger = 0.1,
    delay = 0,
    start = "top 88%",
    scrub = false,
    reducedMotion = false,
  }: RevealTextOptions = {},
) {
  ensureGsapRegistered();
  if (lines.length === 0) return null;

  if (reducedMotion) {
    gsap.set(lines, { yPercent: 0, opacity: 1 });
    return null;
  }

  gsap.set(lines, { yPercent: 110, opacity: 0 });

  return gsap.to(lines, {
    yPercent: 0,
    opacity: 1,
    duration,
    delay,
    stagger,
    ease: EASE.expoOut,
    scrollTrigger: scrub
      ? undefined
      : {
          trigger: lines[0].closest("[data-reveal-root]") ?? lines[0],
          start,
          toggleActions: "play none none reverse",
        },
  });
}
