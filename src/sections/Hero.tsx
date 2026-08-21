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
    gsap.set(visual, { opacity: 0, scale: 1.04 });

    const tl = gsap.timeline({ delay: 0.15 });

    tl.to(section, { opacity: 1, duration: 0.5, ease: EASE.out2 })
      .to(visual, { opacity: 1, scale: 1, duration: 1.3, ease: EASE.expoOut }, "-=0.3")
      .to(label, { opacity: 1, y: 0, duration: 0.7, ease: EASE.out3 }, "-=0.9")
      .to(lines, { yPercent: 0, opacity: 1, duration: 1, stagger: 0.12, ease: EASE.expoOut }, "-=0.35")
      .to(sub, { opacity: 1, y: 0, duration: 0.8, ease: EASE.out3 }, "-=0.55")
      .to(cta, { opacity: 1, y: 0, duration: 0.7, ease: EASE.out3 }, "-=0.5")
      .to(accent, { opacity: 1, duration: 0.9, ease: EASE.out2 }, "-=0.5");
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="window-section relative pt-32 sm:pt-40 pb-20 sm:pb-28 flex items-center overflow-hidden"
      style={{ backgroundColor: "#252422" }}
    >
      {/* The section's own background — a near-black base matching the laptop
          photo's own corner tone almost exactly, so the masked photo (below)
          dissolves into it instead of reading as a pasted rectangle. The
          orange glow is a separate radial layer, positioned to align with
          the glow already baked into the photo. */}
      <div
        className="absolute inset-0 z-0"
        aria-hidden
        style={{
          backgroundColor: "#0c0b0a",
          backgroundImage: [
            "radial-gradient(ellipse 55% 60% at 92% 58%, rgba(235,94,40,0.55), transparent 70%)",
            "linear-gradient(120deg, #0c0b0a 0%, #201d1a 45%, #2c2620 100%)",
          ].join(", "),
        }}
      />
      <GrainOverlay opacity={0.07} />

      {/* Desktop: laptop cutout — true alpha (transparent corners), no
          background plate, so it sits directly on the section's own
          gradient instead of reading as a pasted photo. */}
      <div
        ref={visualRef}
        className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 z-[1] pointer-events-none"
        style={{ width: "clamp(480px, 42vw, 720px)" }}
        aria-hidden
      >
        <img
          src="/assets/hero-image.png"
          alt=""
          width={1536}
          height={1024}
          className="w-full h-auto"
        />
      </div>

      <Container className="relative z-10 w-full">
        <div className="max-w-xl">
          <div ref={labelRef} className="font-body text-xs sm:text-sm tracking-widest uppercase text-stone mb-6">
            RALVON <span className="text-accent mx-1">/</span> Digital Product Studio
          </div>

          <h1 className="font-display font-extrabold text-ivory text-[clamp(2.5rem,6.5vw,4.75rem)] leading-[1.05] tracking-tightest">
            {[
              <>Digital products,</>,
              <>
                built to <span className="text-accent">last.</span>
              </>,
            ].map((line, i) => (
              <span key={i} className="block overflow-hidden">
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

          <p ref={subRef} className="mt-6 max-w-md font-body text-base sm:text-lg leading-relaxed text-stone">
            Websites, applications and systems — engineered to endure.
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

      {/* Mobile / tablet: laptop shown beneath the text, in normal flow */}
      <Container className="relative z-10 lg:hidden mt-12">
        <img
          src="/assets/hero-image.png"
          alt="RALVON website preview on a laptop screen"
          width={1536}
          height={1024}
          className="w-full max-w-sm mx-auto h-auto"
        />
      </Container>
    </section>
  );
}
