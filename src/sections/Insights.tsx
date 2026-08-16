import { useEffect, useRef } from "react";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { INSIGHTS } from "../data/insights";
import { scrollFadeUp } from "../animations/scrollFade";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function Insights() {
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const cards = Array.from(el.children);
    const tween = scrollFadeUp(cards, { reducedMotion, stagger: 0.08 });
    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [reducedMotion]);

  return (
    <section id="insights" className="window-section bg-ivory section-y flex flex-col justify-center">
      <Container>
        <SectionHeading label="Insights" lines={["Notes On What We're", "Learning."]} className="mb-16" />

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-graphite/15 border border-graphite/15">
          {INSIGHTS.map((article) => (
            <a
              key={article.title}
              href="#"
              data-cursor="link"
              onClick={(e) => e.preventDefault()}
              aria-disabled="true"
              className="group bg-ivory p-8 flex flex-col justify-between min-h-[280px] transition-colors duration-300 hover:bg-ink"
            >
              <div>
                <span className="font-body text-xs tracking-widest uppercase text-accent">
                  {article.category}
                </span>
                <h3 className="mt-4 font-display font-bold text-xl leading-snug tracking-tight text-ink transition-colors duration-300 group-hover:text-ivory">
                  {article.title}
                </h3>
                <p className="mt-3 font-body text-sm text-graphite/70 transition-colors duration-300 group-hover:text-stone">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-8 flex items-center justify-between">
                <span className="font-body text-xs text-graphite/50 transition-colors duration-300 group-hover:text-stone">
                  {article.date}
                </span>
                <span className="font-body text-sm text-ink transition-colors duration-300 group-hover:text-accent">
                  Read Article →
                </span>
              </div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
