import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Registers GSAP plugins exactly once for the whole app. */
export function ensureGsapRegistered() {
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export const EASE = {
  out2: "power2.out",
  out3: "power3.out",
  expoOut: "expo.out",
} as const;

export { gsap, ScrollTrigger };
