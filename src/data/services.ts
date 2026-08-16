export interface Service {
  num: string;
  name: string;
  description: string;
  preview: "interface" | "browser" | "app" | "system" | "automation" | "software";
}

export const SERVICES: Service[] = [
  {
    num: "01",
    name: "Digital Products",
    description: "End-to-end product design and engineering, from first sketch to shipped release.",
    preview: "interface",
  },
  {
    num: "02",
    name: "Web Development",
    description: "Fast, precise websites built on modern architecture and clean markup.",
    preview: "browser",
  },
  {
    num: "03",
    name: "Web Applications",
    description: "Complex interfaces and data-heavy platforms engineered to scale with real usage.",
    preview: "app",
  },
  {
    num: "04",
    name: "Mobile Applications",
    description: "Native-feeling mobile experiences designed around real workflows.",
    preview: "system",
  },
  {
    num: "05",
    name: "AI & Automation",
    description: "Applied AI systems and automated workflows that remove manual work.",
    preview: "automation",
  },
  {
    num: "06",
    name: "Custom Software",
    description: "Purpose-built systems for businesses that have outgrown off-the-shelf tools.",
    preview: "software",
  },
];
