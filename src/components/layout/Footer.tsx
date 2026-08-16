import { Container } from "../ui/Container";
import { GrainOverlay } from "../ui/GrainOverlay";

const COLUMNS = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      <GrainOverlay opacity={0.05} />
      <Container className="relative z-10 section-y">
        <div className="flex flex-col gap-16">
          <img
            src="/assets/logo-wordmark-white.png"
            alt="RALVON"
            className="h-10 sm:h-14 w-auto object-contain"
          />

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
            <h2 className="font-display font-extrabold text-[clamp(2.25rem,6vw,5rem)] leading-[0.95] tracking-tightest">
              BUILDING
              <br />
              WHAT&rsquo;S NEXT.
            </h2>

            <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer">
              {COLUMNS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm tracking-wide text-stone hover:text-accent transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-10 border-t border-ivory/10">
            <a
              href="mailto:ralvon.studio@gmail.com"
              className="font-body text-sm text-stone hover:text-accent transition-colors duration-200"
            >
              ralvon.studio@gmail.com
            </a>
            <p className="font-body text-xs text-stone/60 tracking-wide">
              &copy; {new Date().getFullYear()} RALVON. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
