import { useEffect } from "react";
import { initSmoothScroll } from "../../lib/smoothScroll";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/** Mounted once at the app root. Renders nothing — just owns the Lenis lifecycle. */
export function SmoothScroll() {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    return initSmoothScroll();
  }, [reducedMotion]);

  return null;
}
