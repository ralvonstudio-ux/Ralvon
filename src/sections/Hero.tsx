import { useEffect, useRef } from "react";
import { gsap, EASE } from "../lib/gsap";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { EditorialAccent } from "../components/ui/EditorialAccent";
import { GrainOverlay } from "../components/ui/GrainOverlay";
import { useReducedMotion } from "../hooks/useReducedMotion";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<HTMLSpanElement[]>([]);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const label = labelRef.current;
    const lines = lineRefs.current.filter(Boolean);
    const sub = subRef.current;
    const cta = ctaRef.current;
    const accent = accentRef.current;
    const visual = visualRef.current;
    if (!section || !label || !sub || !cta || !accent || !visual) return;

    if (reducedMotion) {
      gsap.set([section, label, sub, cta, accent, visual], { opacity: 1, x: 0, y: 0, scale: 1 });
      gsap.set(lines, { yPercent: 0, opacity: 1 });
      return;
    }

    gsap.set(section, { opacity: 0 });
    gsap.set(label, { opacity: 0, y: 12 });
    gsap.set(lines, { yPercent: 110, opacity: 0 });
    gsap.set(sub, { opacity: 0, y: 18 });
    gsap.set(cta, { opacity: 0, y: 18 });
    gsap.set(accent, { opacity: 0 });
    gsap.set(visual, { opacity: 0, scale: 0.94 });

    const tl = gsap.timeline({ delay: 0.15 });

    tl.to(section, { opacity: 1, duration: 0.5, ease: EASE.out2 })
      .to(label, { opacity: 1, y: 0, duration: 0.7, ease: EASE.out3 }, "-=0.15")
      .to(lines, { yPercent: 0, opacity: 1, duration: 1, stagger: 0.12, ease: EASE.expoOut }, "-=0.35")
      .to(sub, { opacity: 1, y: 0, duration: 0.8, ease: EASE.out3 }, "-=0.55")
      .to(cta, { opacity: 1, y: 0, duration: 0.7, ease: EASE.out3 }, "-=0.5")
      .to(accent, { opacity: 1, duration: 0.9, ease: EASE.out2 }, "-=0.5")
      .to(visual, { opacity: 1, scale: 1, duration: 1.1, ease: EASE.expoOut }, "-=0.7");
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="window-section relative pt-32 sm:pt-40 pb-20 sm:pb-28 flex items-center overflow-hidden"
      style={{ backgroundColor: "#252422" }}
    >
      {/* Full-bleed atmospheric backdrop — locked palette only (ink, graphite, accent),
          diagonal wash with a warm glow behind the visual, scrimmed on the left for
          text contrast, plus a grain pass for the photographic finish. */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage: [
            "linear-gradient(100deg, rgba(37,36,34,0.65) 0%, rgba(37,36,34,0.25) 42%, transparent 68%)",
            "radial-gradient(ellipse 55% 45% at 74% 32%, rgba(204,197,185,0.16), transparent 60%)",
            "radial-gradient(ellipse 80% 70% at 88% 62%, rgba(235,94,40,0.55), transparent 65%)",
            "linear-gradient(125deg, #252422 0%, #403D39 55%, rgba(235,94,40,0.75) 100%)",
          ].join(", "),
        }}
      />
      <GrainOverlay opacity={0.09} />

      <Container className="relative z-10 w-full">
        <div className="max-w-xl">
          <div ref={labelRef} className="font-body text-xs sm:text-sm tracking-widest uppercase text-stone mb-6">
            RALVON <span className="text-accent mx-1">/</span> Digital Product Studio
          </div>

          <h1 className="font-display font-extrabold text-ivory text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] tracking-tightest">
            {["WE BUILD", "WHAT'S NEXT."].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <span
                  ref={(el) => {
                    if (el) lineRefs.current[i] = el;
                  }}
                  className="block will-change-transform"
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p ref={subRef} className="mt-8 max-w-md font-body text-base sm:text-lg leading-relaxed text-stone">
            Ralvon designs and builds digital products, websites, applications and technology systems for
            ambitious businesses.
          </p>

          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button href="#contact" variant="primary" data-cursor="link">
              Start a Project <span aria-hidden>→</span>
            </Button>
            <Button href="#work" variant="secondary" tone="dark" data-cursor="link">
              Explore Our Work <span aria-hidden>↓</span>
            </Button>
          </div>

          <div ref={accentRef} className="mt-14">
            <EditorialAccent className="text-stone/70 text-sm">Built with intent.</EditorialAccent>
          </div>
        </div>
      </Container>

      {/* Laptop visual — full-bleed on the right, no card/background of its own
          (transparent cutout), large enough to dominate the right half of the hero. */}
      <div
        ref={visualRef}
        className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 z-[1] pointer-events-none"
        style={{ width: "clamp(360px, 40vw, 700px)" }}
      >
        <img
          src="/assets/hero-laptop-cutout.webp"
          alt="RALVON website preview on a laptop screen"
          width={736}
          height={774}
          className="w-full h-auto"
        />
      </div>

      {/* Mobile / tablet: smaller static version beneath the text, in normal flow */}
      <Container className="relative z-10 lg:hidden mt-12">
        <img
          src="/assets/hero-laptop-cutout.webp"
          alt="RALVON website preview on a laptop screen"
          width={736}
          height={774}
          className="w-full max-w-xs mx-auto h-auto"
        />
      </Container>
    </section>
  );
}
