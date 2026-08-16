/**
 * Fine film-grain texture, tiled from a small pre-rendered noise PNG rather
 * than a live SVG feTurbulence filter. Several sections layer this at once —
 * a live filter at that scale is a real (and needless) scroll-performance
 * cost; a cached, GPU-composited background-image is nearly free.
 */
export function GrainOverlay({ opacity = 0.05, className = "" }: { opacity?: number; className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 mix-blend-overlay ${className}`}
      style={{
        opacity,
        backgroundImage: "url(/assets/grain.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
      aria-hidden
    />
  );
}
