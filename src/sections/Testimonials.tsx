import { useEffect, useRef } from "react";
import { Container } from "../components/ui/Container";
import { scrollFadeUp } from "../animations/scrollFade";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tween = scrollFadeUp(el, { reducedMotion, start: "top 88%" });
    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [reducedMotion]);

  return (
    <section className="window-section bg-ivory section-y flex items-center">
      <Container>
        <div
          ref={ref}
          className="border border-graphite/15 px-8 sm:px-16 py-16 sm:py-24 text-center flex flex-col items-center"
        >
          <svg width="36" height="28" viewBox="0 0 36 28" fill="none" className="text-accent mb-8" aria-hidden>
            <path
              d="M0 28V15.5C0 6.9 5.6 1 14 0L15.4 3.7C10.2 5.1 7 8.4 7 13.3H14V28H0ZM21 28V15.5C21 6.9 26.6 1 35 0L36.4 3.7C31.2 5.1 28 8.4 28 13.3H35V28H21Z"
              fill="currentColor"
            />
          </svg>
          <p className="font-display font-bold text-ink text-2xl sm:text-3xl max-w-xl leading-snug tracking-tighter">
            Client stories, reserved for the work we're proud to show.
          </p>
          <p className="mt-5 font-body text-sm sm:text-base text-graphite/70 max-w-md">
            We're early in bringing this page to life — real client testimonials will appear here as
            projects ship.
          </p>
        </div>
      </Container>
    </section>
  );
}
