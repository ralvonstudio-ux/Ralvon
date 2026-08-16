export interface ProcessStep {
  num: string;
  name: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: "01",
    name: "Discover",
    description: "We study the business, the market and the constraints before proposing a direction.",
  },
  {
    num: "02",
    name: "Define",
    description: "Scope, architecture and success criteria are locked before design begins.",
  },
  {
    num: "03",
    name: "Design",
    description: "Interfaces and systems take shape through iteration, not a single big reveal.",
  },
  {
    num: "04",
    name: "Build",
    description: "Engineering runs in parallel with design review, so nothing is built twice.",
  },
  {
    num: "05",
    name: "Launch",
    description: "We ship deliberately, with monitoring and rollback plans in place.",
  },
  {
    num: "06",
    name: "Evolve",
    description: "Post-launch, we keep refining against real usage, not assumptions.",
  },
];
