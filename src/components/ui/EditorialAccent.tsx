import type { ReactNode } from "react";

/** Poiret One accent — reserved for a handful of editorial micro-moments only, never body copy. */
export function EditorialAccent({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`font-accent tracking-widest ${className}`}>{children}</span>;
}
