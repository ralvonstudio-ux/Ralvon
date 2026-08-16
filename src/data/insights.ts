/** Original short-form editorial pieces authored by RALVON. Sample placeholders — not real published URLs. */
export interface InsightArticle {
  category: string;
  title: string;
  date: string;
  excerpt: string;
}

export const INSIGHTS: InsightArticle[] = [
  {
    category: "Design",
    title: "Why restraint is the hardest design skill to hire for",
    date: "Jul 2026",
    excerpt: "Most interfaces fail from addition, not omission. A short case for cutting more than you add.",
  },
  {
    category: "Engineering",
    title: "The real cost of skipping architecture reviews",
    date: "Jun 2026",
    excerpt: "Technical debt is rarely a single bad decision — it's a hundred small ones nobody checked.",
  },
  {
    category: "AI",
    title: "Where automation actually pays for itself",
    date: "May 2026",
    excerpt: "Not every workflow deserves an AI layer. Here's how we decide which ones do.",
  },
];
