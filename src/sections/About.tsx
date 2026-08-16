import { useEffect, useRef } from "react";
import { Container } from "../components/ui/Container";
import { RevealText } from "../components/ui/RevealText";
import { scrollFadeUp } from "../animations/scrollFade";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function About() {
  const paraRef = useRef<HTMLParagraphElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const para = paraRef.current;
    const visual = visualRef.current;
    const targets = [para, visual].filter(Boolean) as HTMLElement[];
    if (targets.length === 0) return;
    const tween = scrollFadeUp(targets, { reducedMotion, stagger: 0.12, start: "top 88%" });
    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [reducedMotion]);

  return (
    <section id="about" className="window-section bg-ivory section-y flex items-center">
      <Container className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7">
          <span className="block font-body text-xs sm:text-sm tracking-widest uppercase text-accent mb-5">
            About Ralvon
          </span>
          <RevealText
            as="h2"
            lines={["TECHNOLOGY IS", "ONLY POWERFUL", "WHEN IT SOLVES", "SOMETHING."]}
            className="font-display font-extrabold text-ink text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.02] tracking-tightest"
          />
          <p ref={paraRef} className="mt-8 max-w-lg font-body text-base sm:text-lg leading-relaxed text-graphite">
            RALVON combines strategy, design and engineering to create digital products and systems that
            are useful, scalable and built to last.
          </p>
        </div>

        <div ref={visualRef} className="lg:col-span-5">
          <svg viewBox="0 0 320 320" className="w-full h-auto max-w-sm mx-auto" aria-hidden>
            <g fill="none" stroke="#403D39" strokeOpacity="0.35">
              <rect x="60" y="40" width="140" height="100" transform="rotate(-3 130 90)" />
              <rect x="100" y="120" width="160" height="150" transform="rotate(2 180 195)" />
            </g>
            <circle cx="170" cy="150" r="110" fill="none" stroke="#CCC5B9" strokeOpacity="0.5" />
            <rect x="130" y="180" width="60" height="60" fill="#EB5E28" opacity="0.9" />
            <circle cx="230" cy="80" r="3.5" fill="#403D39" fillOpacity="0.6" />
          </svg>
        </div>
      </Container>
    </section>
  );
}
