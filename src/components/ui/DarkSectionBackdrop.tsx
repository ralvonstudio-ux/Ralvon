import { GrainOverlay } from "./GrainOverlay";

interface DarkSectionBackdropProps {
  /** CSS position for the accent glow, e.g. "85% 15%". */
  glow?: string;
  glowOpacity?: number;
  grainOpacity?: number;
}

/**
 * Shared atmosphere for the site's dark (ink) sections — the same family of
 * texture as the hero, toned down: a graphite→ink wash plus a small accent
 * glow and a grain pass. Locked palette only.
 */
export function DarkSectionBackdrop({ glow = "88% 12%", glowOpacity = 0.18, grainOpacity = 0.07 }: DarkSectionBackdropProps) {
  return (
    <>
      <div
        className="absolute inset-0 z-0"
        aria-hidden
        style={{
          backgroundImage: [
            `radial-gradient(ellipse 65% 55% at ${glow}, rgba(235,94,40,${glowOpacity}), transparent 62%)`,
            "linear-gradient(135deg, rgba(64,61,57,0.55) 0%, rgba(37,36,34,0.9) 65%)",
          ].join(", "),
        }}
      />
      <GrainOverlay opacity={grainOpacity} />
    </>
  );
}
