import { useEffect, useRef } from "react";
import { gsap, ensureGsapRegistered, EASE } from "../../lib/gsap";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
}

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLAnchorElement[]>([]);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    ensureGsapRegistered();
    const panel = panelRef.current;
    if (!panel) return;

    if (open) {
      document.body.style.overflow = "hidden";
      const items = itemsRef.current.filter(Boolean);
      if (reducedMotion) {
        gsap.set(panel, { clipPath: "inset(0% 0% 0% 0%)" });
        gsap.set(items, { opacity: 1, y: 0 });
      } else {
        gsap.set(panel, { clipPath: "inset(0% 0% 100% 0%)" });
        gsap.set(items, { opacity: 0, y: 24 });
        const tl = gsap.timeline();
        tl.to(panel, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.6, ease: EASE.expoOut }).to(
          items,
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: EASE.out3 },
          "-=0.25",
        );
      }
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open, reducedMotion]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={panelRef}
      className={`fixed inset-0 z-40 bg-ink lg:hidden ${open ? "" : "pointer-events-none"}`}
      style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
    >
      <nav className="h-full flex flex-col items-start justify-center gap-2 px-8" aria-label="Mobile">
        {links.map((link, i) => (
          <a
            key={link.href}
            ref={(el) => {
              if (el) itemsRef.current[i] = el;
            }}
            href={link.href}
            onClick={onClose}
            className="font-display text-4xl sm:text-5xl font-extrabold text-ivory py-2.5 tracking-tightest hover:text-accent transition-colors duration-300"
          >
            {link.label}
          </a>
        ))}
        <a
          ref={(el) => {
            if (el) itemsRef.current[links.length] = el;
          }}
          href="#contact"
          onClick={onClose}
          className="mt-8 font-body text-sm tracking-widest uppercase text-accent border-b border-accent pb-1"
        >
          Start a Project →
        </a>
      </nav>
    </div>
  );
}
