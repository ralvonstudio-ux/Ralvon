import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useIsTouchDevice } from "../../hooks/useIsTouchDevice";

/**
 * A small solid orange dot that follows the pointer — no ring, no per-target
 * scaling or state changes, just a quiet accent. Desktop-only, disabled on
 * touch devices and when the user prefers reduced motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouchDevice();
  const enabled = !reducedMotion && !isTouch;

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");
    const dot = dotRef.current;
    if (!dot) return;

    const onMove = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
    };

    window.addEventListener("mousemove", onMove);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      className="pointer-events-none fixed top-0 left-0 z-[200] h-2.5 w-2.5 -ml-[5px] -mt-[5px] rounded-full bg-accent"
      aria-hidden="true"
    />
  );
}
