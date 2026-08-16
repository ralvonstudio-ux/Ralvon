import type { AnchorHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary";
  children: ReactNode;
  tone?: "light" | "dark";
}

const base =
  "group inline-flex items-center gap-2.5 font-body text-sm font-medium tracking-wide transition-colors duration-300 ease-power2-out";

/**
 * Primary: solid accent fill. Secondary: text link with an underline that
 * draws in on hover. `tone` flips the resting color to stay legible on
 * dark (ink) section backgrounds.
 */
export function Button({ variant = "primary", tone = "light", children, className = "", ...rest }: ButtonProps) {
  if (variant === "primary") {
    return (
      <a
        {...rest}
        className={`${base} bg-accent text-ivory px-7 py-4 hover:bg-ink hover:text-ivory ${
          tone === "dark" ? "hover:bg-ivory hover:text-ink" : ""
        } ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      {...rest}
      className={`${base} relative pb-1 ${tone === "dark" ? "text-ivory" : "text-ink"} ${className}`}
    >
      <span className="relative">
        {children}
        <span
          className={`absolute left-0 -bottom-0.5 h-px w-full origin-left scale-x-100 transition-transform duration-300 ease-power2-out group-hover:scale-x-0 ${
            tone === "dark" ? "bg-ivory/40" : "bg-ink/30"
          }`}
        />
        <span
          className="absolute left-0 -bottom-0.5 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-300 ease-power2-out group-hover:scale-x-100"
        />
      </span>
    </a>
  );
}
