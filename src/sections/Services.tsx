import { useEffect, useRef } from "react";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ServicePreview } from "./ServicePreview";
import { SERVICES } from "../data/services";
import { scrollFadeUp } from "../animations/scrollFade";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function Services() {
  const listRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const rows = Array.from(el.querySelectorAll("[data-service-row]"));
    const tween = scrollFadeUp(rows, { reducedMotion, stagger: 0.06, start: "top 92%" });
    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [reducedMotion]);

  return (
    <section id="services" className="window-section bg-ivory section-y flex flex-col justify-center">
      <Container>
        <SectionHeading
          label="Capabilities"
          lines={["What We Build."]}
          description="Six ways we help ambitious businesses turn technology into an advantage."
          className="mb-16"
        />

        <div ref={listRef} className="border-t border-graphite/15">
          {SERVICES.map((service) => (
            <a
              key={service.num}
              href="#contact"
              data-service-row
              data-cursor="link"
              className="group relative grid grid-cols-1 lg:grid-cols-12 items-center gap-3 lg:gap-8 border-b border-graphite/15 py-8 sm:py-10 transition-colors duration-300 hover:bg-ink/[0.03]"
            >
              <span className="lg:col-span-1 font-body text-sm text-graphite/50 group-hover:text-accent transition-colors duration-300">
                {service.num}
              </span>

              <h3 className="lg:col-span-4 font-display font-bold text-ink text-[clamp(1.5rem,3.2vw,2.5rem)] tracking-tighter">
                {service.name}
              </h3>

              <p className="lg:col-span-5 font-body text-sm sm:text-base text-graphite/80 max-w-md transition-transform duration-300 group-hover:translate-x-2">
                {service.description}
              </p>

              <span className="lg:col-span-2 flex items-center justify-start lg:justify-end">
                <span className="relative flex items-center justify-center h-11 w-11 rounded-full border border-graphite/20 text-ink transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-ivory group-hover:translate-x-1">
                  <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path
                      d="M1 7H13M13 7L7 1M13 7L7 13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </span>

              {/* Hover preview — desktop only, purely decorative */}
              <span
                className="hidden lg:block pointer-events-none absolute right-[14%] top-1/2 h-24 w-24 -translate-y-1/2 translate-x-2 opacity-0 scale-95 transition-all duration-500 ease-power2-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0"
                aria-hidden
              >
                <ServicePreview type={service.preview} />
              </span>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}
