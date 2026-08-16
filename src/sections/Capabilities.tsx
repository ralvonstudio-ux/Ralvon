import { useEffect, useRef } from "react";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { DarkSectionBackdrop } from "../components/ui/DarkSectionBackdrop";
import { CAPABILITIES } from "../data/capabilities";
import { scrollFadeUp } from "../animations/scrollFade";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function Capabilities() {
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const cols = Array.from(el.children);
    const tween = scrollFadeUp(cols, { reducedMotion, stagger: 0.06, y: 20 });
    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [reducedMotion]);

  return (
    <section className="window-section relative overflow-hidden bg-ink text-ivory section-y flex flex-col justify-center">
      <DarkSectionBackdrop glow="12% 85%" />

      <Container className="relative z-10">
        <SectionHeading
          label="Capabilities"
          tone="dark"
          lines={["Built With The Right Tools."]}
          description="We stay deliberately fluent in a focused set of technologies, not a hundred logos."
          className="mb-16"
        />

        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-10 border-t border-ivory/10 pt-12">
          {CAPABILITIES.map((group) => (
            <div key={group.category}>
              <h3 className="font-body text-xs tracking-widest uppercase text-accent mb-3">
                {group.category}
              </h3>
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="font-body text-sm sm:text-base text-stone">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
