import { useEffect, useRef } from "react";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { PROCESS_STEPS } from "../data/process";
import { gsap, ensureGsapRegistered } from "../lib/gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<HTMLDivElement[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    ensureGsapRegistered();
    const section = sectionRef.current;
    const track = trackRef.current;
    const fill = fillRef.current;
    const steps = stepRefs.current.filter(Boolean);
    if (!section || !track || !fill || steps.length === 0) return;

    if (reducedMotion) {
      gsap.set(fill, { scaleY: 1 });
      steps.forEach((s) => s.classList.add("is-active"));
      return;
    }

    gsap.set(fill, { scaleY: 0, transformOrigin: "top" });

    const ctx = gsap.context(() => {
      gsap.to(fill, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: track,
          start: "top 65%",
          end: "bottom 65%",
          scrub: true,
          onUpdate: (self) => {
            const activeIndex = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
            steps.forEach((step, i) => step.classList.toggle("is-active", i <= activeIndex));
          },
        },
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="process" className="window-section bg-ivory section-y flex flex-col justify-center">
      <Container>
        <SectionHeading
          label="Methodology"
          lines={["How We Build."]}
          className="mb-16 sm:mb-24"
        />

        <div ref={trackRef} className="relative max-w-3xl">
          <div className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-graphite/15" />
          <div
            ref={fillRef}
            className="absolute left-[7px] sm:left-[9px] top-2 bottom-2 w-px bg-accent"
          />

          <div className="flex flex-col">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => {
                  if (el) stepRefs.current[i] = el;
                }}
                className="process-step group relative pl-10 sm:pl-12 py-8 sm:py-10 transition-opacity duration-500"
              >
                <span className="absolute left-0 top-9 sm:top-11 h-[15px] w-[15px] sm:h-[19px] sm:w-[19px] rounded-full border-2 border-graphite/25 bg-ivory transition-colors duration-500 process-step-node" />
                <span className="font-body text-xs tracking-widest uppercase text-graphite/50 transition-colors duration-500 process-step-num">
                  {step.num}
                </span>
                <h3 className="mt-2 font-display font-extrabold text-2xl sm:text-4xl tracking-tighter text-ink/40 transition-colors duration-500 process-step-name">
                  {step.name}
                </h3>
                <p className="mt-2 max-w-md font-body text-sm sm:text-base text-graphite/70">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <style>{`
        .process-step-node { }
        .process-step.is-active .process-step-node { border-color: #EB5E28; background-color: #EB5E28; }
        .process-step.is-active .process-step-num { color: #EB5E28; }
        .process-step.is-active .process-step-name { color: #252422; }
      `}</style>
    </section>
  );
}
