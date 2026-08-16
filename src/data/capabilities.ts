export interface CapabilityGroup {
  category: string;
  items: string[];
}

export const CAPABILITIES: CapabilityGroup[] = [
  { category: "Frontend", items: ["React", "TypeScript", "Next.js", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "PostgreSQL", "REST & GraphQL APIs"] },
  { category: "Cloud", items: ["AWS", "Vercel", "Docker"] },
  { category: "AI", items: ["LLM Integration", "Retrieval Systems", "Agent Workflows"] },
  { category: "Automation", items: ["Workflow Engines", "Internal Tooling", "API Orchestration"] },
  { category: "Data", items: ["Pipelines", "Analytics", "Structured Storage"] },
  { category: "Product Design", items: ["Figma", "Design Systems", "Prototyping"] },
];
