import type { Service } from "../data/services";

/** Small, restrained abstract preview per service category — no giant 3D scenes. */
export function ServicePreview({ type }: { type: Service["preview"] }) {
  const stroke = "#EB5E28";
  const dim = "#403D39";

  switch (type) {
    case "interface":
      return (
        <svg viewBox="0 0 96 96" className="w-full h-full">
          <rect x="10" y="14" width="76" height="54" fill="none" stroke={dim} strokeOpacity="0.4" />
          <line x1="10" y1="28" x2="86" y2="28" stroke={dim} strokeOpacity="0.4" />
          <rect x="18" y="36" width="30" height="22" fill="none" stroke={stroke} />
          <rect x="54" y="36" width="24" height="10" fill="none" stroke={dim} strokeOpacity="0.5" />
          <rect x="54" y="50" width="24" height="8" fill="none" stroke={dim} strokeOpacity="0.5" />
        </svg>
      );
    case "browser":
      return (
        <svg viewBox="0 0 96 96" className="w-full h-full">
          <rect x="10" y="18" width="76" height="52" fill="none" stroke={dim} strokeOpacity="0.4" />
          <line x1="10" y1="30" x2="86" y2="30" stroke={dim} strokeOpacity="0.4" />
          <circle cx="18" cy="24" r="1.6" fill={dim} fillOpacity="0.5" />
          <circle cx="24" cy="24" r="1.6" fill={dim} fillOpacity="0.5" />
          <circle cx="30" cy="24" r="1.6" fill={stroke} />
          <line x1="18" y1="42" x2="66" y2="42" stroke={stroke} />
          <line x1="18" y1="50" x2="52" y2="50" stroke={dim} strokeOpacity="0.5" />
        </svg>
      );
    case "app":
      return (
        <svg viewBox="0 0 96 96" className="w-full h-full">
          <rect x="14" y="10" width="68" height="76" fill="none" stroke={dim} strokeOpacity="0.4" />
          <line x1="14" y1="22" x2="82" y2="22" stroke={dim} strokeOpacity="0.4" />
          <rect x="22" y="32" width="52" height="16" fill="none" stroke={stroke} />
          <rect x="22" y="54" width="52" height="8" fill="none" stroke={dim} strokeOpacity="0.5" />
          <rect x="22" y="66" width="30" height="8" fill="none" stroke={dim} strokeOpacity="0.5" />
        </svg>
      );
    case "system":
      return (
        <svg viewBox="0 0 96 96" className="w-full h-full">
          <rect x="30" y="10" width="36" height="60" rx="6" fill="none" stroke={dim} strokeOpacity="0.45" />
          <line x1="30" y1="18" x2="66" y2="18" stroke={dim} strokeOpacity="0.3" />
          <rect x="38" y="30" width="20" height="14" fill="none" stroke={stroke} />
          <line x1="38" y1="52" x2="58" y2="52" stroke={dim} strokeOpacity="0.5" />
        </svg>
      );
    case "automation":
      return (
        <svg viewBox="0 0 96 96" className="w-full h-full">
          <circle cx="24" cy="48" r="6" fill="none" stroke={dim} strokeOpacity="0.5" />
          <circle cx="48" cy="24" r="6" fill="none" stroke={stroke} />
          <circle cx="72" cy="48" r="6" fill="none" stroke={dim} strokeOpacity="0.5" />
          <circle cx="48" cy="72" r="6" fill="none" stroke={dim} strokeOpacity="0.5" />
          <line x1="29" y1="45" x2="43" y2="28" stroke={dim} strokeOpacity="0.4" />
          <line x1="53" y1="28" x2="67" y2="45" stroke={dim} strokeOpacity="0.4" />
          <line x1="67" y1="51" x2="53" y2="68" stroke={dim} strokeOpacity="0.4" />
          <line x1="43" y1="68" x2="29" y2="51" stroke={dim} strokeOpacity="0.4" />
        </svg>
      );
    case "software":
      return (
        <svg viewBox="0 0 96 96" className="w-full h-full">
          <rect x="10" y="16" width="34" height="34" fill="none" stroke={dim} strokeOpacity="0.45" />
          <rect x="52" y="16" width="34" height="34" fill="none" stroke={dim} strokeOpacity="0.45" />
          <rect x="10" y="58" width="34" height="20" fill="none" stroke={stroke} />
          <rect x="52" y="58" width="34" height="20" fill="none" stroke={dim} strokeOpacity="0.45" />
        </svg>
      );
    default:
      return null;
  }
}
