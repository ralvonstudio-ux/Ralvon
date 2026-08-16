/**
 * Real projects built by RALVON's founder prior to the studio. Screenshots
 * captured directly from the live sites — no fabricated stats or claims.
 */
export interface Project {
  name: string;
  category: string;
  description: string;
  url: string;
  image: string;
  size: "large" | "medium" | "small";
}

export const FEATURED_PROJECT: Project = {
  name: "Softwraith",
  category: "Software & Training Platform",
  description: "Software development, IT services and industry-oriented training programs.",
  url: "https://softwraith.com",
  image: "/assets/work/softwraith.webp",
  size: "large",
};

export const PROJECTS: Project[] = [
  {
    name: "Aurexiva",
    category: "E-Commerce Platform",
    description: "A multi-category storefront for footwear, clothing and electronics.",
    url: "https://aurexiva.in",
    image: "/assets/work/aurexiva.webp",
    size: "large",
  },
  {
    name: "RRGI Innovathon",
    category: "Event Platform",
    description: "Registration and information hub for a student inter-college hackathon.",
    url: "https://innovathon.online",
    image: "/assets/work/innovathon.webp",
    size: "small",
  },
  {
    name: "Khatu Pixel",
    category: "Photography Studio",
    description: "A booking and portfolio site for a photography and videography studio.",
    url: "https://kpds-studio.vercel.app",
    image: "/assets/work/kpds-studio.webp",
    size: "medium",
  },
];
