import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { revealLines } from "../../animations/revealText";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface RevealTextProps {
  as?: ElementType;
  lines: ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
}

/**
 * Wraps each line in an overflow-hidden mask and animates it up into view.
 * Used for editorial headlines throughout the site.
 */
export function RevealText({ as: Tag = "h2", lines, className = "", delay = 0, stagger = 0.1 }: RevealTextProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const spans = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal-line]"));
    const tween = revealLines(spans, { delay, stagger, reducedMotion });
    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [delay, stagger, reducedMotion]);

  return (
    <Tag ref={rootRef} data-reveal-root className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <span data-reveal-line className="block will-change-transform">
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
