import { useEffect, useRef } from "react";
import { Container } from "../components/ui/Container";
import { RevealText } from "../components/ui/RevealText";
import { scrollFadeUp } from "../animations/scrollFade";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function Intro() {
  const paraRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = paraRef.current;
    if (!el) return;
    const tween = scrollFadeUp(el, { reducedMotion, start: "top 90%" });
    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [reducedMotion]);

  return (
    <section className="window-section bg-ivory section-y flex flex-col justify-center">
      <Container className="max-w-4xl">
        <RevealText
          as="h2"
          lines={[
            <span className="text-graphite/45">WE DON&rsquo;T JUST</span>,
            <span className="text-graphite/45">BUILD WEBSITES.</span>,
            <span className="text-ink">WE BUILD</span>,
            <span className="text-ink">DIGITAL PRODUCTS.</span>,
          ]}
          className="font-display font-extrabold text-[clamp(2.25rem,6.5vw,4.75rem)] leading-[1.02] tracking-tightest"
          stagger={0.08}
        />

        <p ref={paraRef} className="mt-12 max-w-xl font-body text-base sm:text-lg leading-relaxed text-graphite">
          From strategy and design to development and deployment, RALVON brings technology, design and
          engineering together to create digital experiences that work beautifully and scale intelligently.
        </p>
      </Container>
    </section>
  );
}
