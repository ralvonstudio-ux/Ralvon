import { useEffect, useRef } from "react";
import { Container } from "../components/ui/Container";
import { SectionHeading } from "../components/ui/SectionHeading";
import { DarkSectionBackdrop } from "../components/ui/DarkSectionBackdrop";
import { gsap, ensureGsapRegistered } from "../lib/gsap";
import { useReducedMotion } from "../hooks/useReducedMotion";

const NODES = ["Interface", "Application", "API", "Database", "AI", "Automation"];
const NODE_X = [70, 226, 382, 538, 694, 850];
const NODE_Y = 90;

export function SystemVisualization() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const nodeRefs = useRef<SVGGElement[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    ensureGsapRegistered();
    const section = sectionRef.current;
    const path = pathRef.current;
    const nodes = nodeRefs.current.filter(Boolean);
    if (!section || !path || nodes.length === 0) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: reducedMotion ? 0 : length });
    gsap.set(nodes, { opacity: reducedMotion ? 1 : 0, scale: reducedMotion ? 1 : 0.5, transformOrigin: "center" });

    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 60%",
          scrub: true,
        },
      });

      tl.to(path, { strokeDashoffset: 0, ease: "none", duration: 1 });
      nodes.forEach((node, i) => {
        tl.to(node, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }, i / nodes.length);
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="window-section relative bg-ink text-ivory section-y overflow-hidden flex flex-col justify-center"
    >
      <DarkSectionBackdrop glow="82% 80%" />

      <Container className="relative z-10">
        <SectionHeading
          label="How It Fits Together"
          tone="dark"
          lines={["One System.", "Built To Scale."]}
          description="From what a user touches to what runs quietly behind it — every layer designed to work as one system."
          className="mb-16 sm:mb-24"
        />

        <div className="relative">
          {/* Hints that the diagram scrolls horizontally on narrow screens. */}
          <div className="sm:hidden pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-ink to-transparent z-10" />
          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 920 180"
              className="w-full min-w-[720px] h-auto"
              role="img"
              aria-label="System architecture: Interface, Application, API, Database, AI, and Automation connected in sequence"
            >
              <path
                ref={pathRef}
                d={`M ${NODE_X.map((x) => `${x} ${NODE_Y}`).join(" L ")}`}
                fill="none"
                stroke="#EB5E28"
                strokeWidth="1.5"
              />
              {NODE_X.map((x, i) => (
                <g
                  key={NODES[i]}
                  ref={(el) => {
                    if (el) nodeRefs.current[i] = el;
                  }}
                >
                  <circle cx={x} cy={NODE_Y} r="7" fill="#252422" stroke="#CCC5B9" strokeWidth="1.5" />
                  <circle cx={x} cy={NODE_Y} r="2.5" fill="#EB5E28" />
                  <text
                    x={x}
                    y={NODE_Y + (i % 2 === 0 ? -26 : 42)}
                    textAnchor="middle"
                    className="fill-ivory font-body"
                    style={{ fontSize: "13px", letterSpacing: "0.02em" }}
                  >
                    {NODES[i]}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </Container>
    </section>
  );
}
