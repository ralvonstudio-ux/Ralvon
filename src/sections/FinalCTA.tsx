import { useEffect, useRef } from "react";
import { Container } from "../components/ui/Container";
import { RevealText } from "../components/ui/RevealText";
import { Button } from "../components/ui/Button";
import { DarkSectionBackdrop } from "../components/ui/DarkSectionBackdrop";
import { scrollFadeUp } from "../animations/scrollFade";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tween = scrollFadeUp(el, { reducedMotion, start: "top 90%" });
    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [reducedMotion]);

  return (
    <section id="contact" className="window-section relative overflow-hidden bg-ink text-ivory section-y flex items-center">
      <DarkSectionBackdrop glow="50% 15%" glowOpacity={0.2} />

      <Container className="relative z-10 text-center flex flex-col items-center">
        <RevealText
          as="h2"
          lines={["HAVE AN IDEA?", "LET'S BUILD IT."]}
          className="font-display font-extrabold text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.98] tracking-tightest"
        />

        <p ref={ref} className="mt-8 max-w-md font-body text-base sm:text-lg text-stone leading-relaxed">
          Tell us what you're working on. We'll help turn it into something real.
        </p>

        <div className="mt-12">
          <Button href="mailto:ralvon.studio@gmail.com" variant="primary" data-cursor="link">
            Start a Project <span aria-hidden>→</span>
          </Button>
        </div>
      </Container>
    </section>
  );
}
