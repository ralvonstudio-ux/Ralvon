import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";

/**
 * Short clip-path + opacity transition that plays whenever the route changes.
 * Kept brief so it never gets in the way of usability.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const firstRender = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (firstRender.current || reducedMotion) {
      firstRender.current = false;
      return;
    }

    gsap.fromTo(
      el,
      { opacity: 0, clipPath: "inset(4% 0% 4% 0%)" },
      { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 0.5, ease: "power2.out" },
    );
  }, [pathname, reducedMotion]);

  return (
    <div ref={ref} key={pathname}>
      {children}
    </div>
  );
}
