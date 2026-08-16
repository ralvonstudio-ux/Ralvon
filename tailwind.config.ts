import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        ivory: "#FFFCEF",
        stone: "#CCC5B9",
        graphite: "#403D39",
        ink: "#252422",
        accent: "#EB5E28",
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        accent: ["'Poiret One'", "cursive"],
      },
      maxWidth: {
        container: "1440px",
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter: "-0.02em",
        widest: "0.18em",
      },
      transitionTimingFunction: {
        "power2-out": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "power3-out": "cubic-bezier(0.22, 0.61, 0.36, 1)",
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "3px",
        md: "4px",
      },
    },
  },
  plugins: [],
} satisfies Config;
