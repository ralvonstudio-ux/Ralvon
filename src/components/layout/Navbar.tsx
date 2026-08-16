import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { MobileMenu } from "./MobileMenu";
import { useScrollHeader } from "../../hooks/useScrollHeader";
import { gsap, EASE } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Insights", href: "#insights" },
];

interface NavbarProps {
  /** "home" shows the full anchor nav; "page" (case-study/404) shows a minimal back-to-home bar. */
  variant?: "home" | "page";
}

export function Navbar({ variant = "home" }: NavbarProps) {
  const scrolled = useScrollHeader(24);
  const [menuOpen, setMenuOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // The home hero is a dark, full-bleed backdrop — the navbar sits light-on-dark
  // while it floats over it, then flips to dark-on-light once scrolled past.
  const onDark = variant === "home" && !scrolled;

  // Load-sequence steps 2–3: navbar + logo reveal.
  useEffect(() => {
    const logo = logoRef.current;
    const links = linksRef.current;
    const cta = ctaRef.current;
    const targets = [logo, links, cta].filter(Boolean) as HTMLElement[];
    if (targets.length === 0) return;

    if (reducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(targets, { opacity: 0, y: -14 });
    gsap.to(targets, { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: EASE.out3, delay: 0.05 });
  }, [reducedMotion]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-power2-out ${
          scrolled
            ? "bg-ivory/90 backdrop-blur-md border-b border-graphite/10 py-3"
            : "bg-transparent border-b border-transparent py-5 sm:py-6"
        }`}
      >
        <Container className="flex items-center justify-between">
          <Link ref={logoRef} to="/" className="shrink-0" aria-label="RALVON — home">
            <img
              src={onDark ? "/assets/logo-wordmark-white.png" : "/assets/logo-wordmark-black.png"}
              alt="RALVON"
              className="h-8 sm:h-9 w-auto object-contain transition-opacity duration-300"
            />
          </Link>

          {variant === "home" ? (
            <>
              <nav ref={linksRef} className="hidden lg:flex items-center gap-9" aria-label="Primary">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`font-body text-sm tracking-wide transition-colors duration-300 relative group ${
                      onDark ? "text-ivory/85 hover:text-ivory" : "text-ink/80 hover:text-ink"
                    }`}
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                  </a>
                ))}
              </nav>

              <div ref={ctaRef} className="hidden lg:block">
                <Button href="#contact" variant="primary">
                  Start a Project
                  <span aria-hidden>→</span>
                </Button>
              </div>
            </>
          ) : (
            <Link to="/" className="font-body text-sm tracking-wide text-ink/80 hover:text-ink transition-colors">
              ← Back to home
            </Link>
          )}

          {variant === "home" && (
            <button
              type="button"
              className="lg:hidden flex flex-col items-center justify-center gap-1.5 h-11 w-11 -mr-2.5"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span
                className={`block h-px w-6 transition-transform duration-300 ${onDark ? "bg-ivory" : "bg-ink"} ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`}
              />
              <span
                className={`block h-px w-6 transition-transform duration-300 ${onDark ? "bg-ivory" : "bg-ink"} ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`}
              />
            </button>
          )}
        </Container>
      </header>

      {variant === "home" && (
        <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={NAV_LINKS} />
      )}
    </>
  );
}
