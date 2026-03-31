import type { SkillCategory, SkillItem } from "@/lib/types";

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Interface Engineering",
    icon: "terminal",
    accentColor: "primary",
    items: [
      {
        name: "React / Next.js",
        subtitle: "Advanced architecture using Server Components, Suspense, and robust state management protocols.",
        proficiency: 98,
        relatedTech: ["TailwindCSS", "Framer Motion"],
      },
      {
        name: "TypeScript",
        subtitle: "Type-safe development with complex generic patterns and architectural integrity.",
        proficiency: 95,
        relatedTech: ["Zod", "ESNext"],
      },
      { name: "Vue" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    id: "backend",
    title: "Backend Engine",
    icon: "dns",
    accentColor: "secondary",
    items: [
      {
        name: "Node.js / Bun",
        subtitle: "High-concurrency microservices",
      },
      {
        name: "PHP Laravel",
        subtitle: "Robust enterprise applications",
      },
      {
        name: "NestJS",
        subtitle: "Scalable Node.js architectures",
      },
      {
        name: "Python",
        subtitle: "Data processing & Automation",
      },
    ],
  },
  {
    id: "database",
    title: "Data Persistence",
    icon: "database",
    accentColor: "tertiary",
    items: [
      {
        name: "PostgreSQL",
        subtitle: "Relational modeling & Optimization",
      },
      {
        name: "MySQL",
        subtitle: "Scalable relational data systems",
      },
      {
        name: "MongoDB",
        subtitle: "Flexible NoSQL architecture",
      },
      {
        name: "Redis / Upstash",
        subtitle: "Caching & Real-time systems",
      },
      {
        name: "Prisma / Drizzle",
        subtitle: "Type-safe ORM integration",
      },
    ],
  },
  {
    id: "devops",
    title: "DevOps Cloud",
    icon: "cloud_sync",
    accentColor: "error",
    items: [
      {
        name: "AWS / Google Cloud",
        subtitle: "Serverless architecture & S3",
      },
      {
        name: "Docker / Kubernetes",
        subtitle: "Container orchestration",
      },
      {
        name: "GitHub Actions",
        subtitle: "CI/CD Pipeline automation",
      },
    ],
  },
];

export const devMetrics = [
  {
    label: "SYSTEMS_ARCHITECTURE",
    value: 92,
    color: "primary" as const,
    widthClass: "w-[92%]",
  },
  {
    label: "ALGORITHMIC_LOGIC",
    value: 88,
    color: "secondary" as const,
    widthClass: "w-[88%]",
  },
  {
    label: "UX_PRECISION",
    value: 95,
    color: "tertiary" as const,
    widthClass: "w-[95%]",
  },
];

export const currentFocus = "Rust & WebAssembly";

export const frontendSkillCards: SkillItem[] = skillCategories
  .find((c) => c.id === "frontend")!
  .items.filter((i) => i.proficiency);
