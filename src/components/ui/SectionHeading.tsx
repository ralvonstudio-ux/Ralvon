import type { ReactNode } from "react";
import { RevealText } from "./RevealText";

interface SectionHeadingProps {
  label: string;
  lines: ReactNode[];
  description?: string;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  lines,
  description,
  tone = "light",
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const textTone = tone === "dark" ? "text-ivory" : "text-ink";
  const mutedTone = tone === "dark" ? "text-stone" : "text-graphite/80";

  return (
    <div className={`${align === "center" ? "text-center mx-auto" : ""} max-w-3xl ${className}`}>
      <span
        className={`block font-body text-xs sm:text-sm tracking-widest uppercase mb-5 ${
          tone === "dark" ? "text-accent" : "text-accent"
        }`}
      >
        {label}
      </span>
      <RevealText
        as="h2"
        lines={lines}
        className={`font-display font-extrabold ${textTone} text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-tightest`}
      />
      {description && (
        <p className={`mt-6 font-body text-base sm:text-lg leading-relaxed ${mutedTone} max-w-xl ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </div>
  );
}
