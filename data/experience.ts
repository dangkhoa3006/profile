import type { ExperienceEntry, StatMetric } from "@/lib/types";

export const experiences: ExperienceEntry[] = [
  {
    id: "deli-Group",
    company: "Deli Group",
    role: "Fullstack Developer",
    period: "05/2025 - Present",
    description:
      "Architecting the future of logistics and delivery services through advanced mapping and real-time data synchronization.",
    achievements: [
      "Integrated VietMap Services for high-precision real-time route optimization across 15+ logistics hubs.",
      "Engineered complex API Gateways using GraphQL to unify internal microservices and reduce latency by 40%.",
      "Architected a Dashboard Monitor displaying real-time vehicle telemetry data with WebSockets.",
    ],
    tags: ["React.js", "Node.js", "PostgreSQL", "Redis"],
    side: "right",
    accentColor: "primary",
  },
  {
    id: "freelance",
    company: "Independent Contractor",
    role: "Freelance Engineer",
    period: "2023 - 2024",
    description:
      "Delivering high-performance digital products for international clients across Europe and SE Asia.",
    achievements: [
      "Performance Optimization for e-commerce platforms, achieving sub-2s load times on mobile devices.",
      "Custom SaaS Boilerplates deployment for startups, integrating Stripe, Auth0, and Supabase.",
      "Consulting on Cloud Migrations from legacy VPS environments to scalable AWS Lambda architectures.",
    ],
    tags: ["Next.js", "Tailwind", "AWS", "TypeScript"],
    side: "left",
    accentColor: "secondary",
  },
];

export const stats: StatMetric[] = [
  {
    id: "commits",
    label: "Total Code Commits",
    value: "14,208",
    monitor: "MONITOR_01",
    accentColor: "primary",
    visual: "bar",
    visualData: "85",
  },
  {
    id: "uptime",
    label: "Production Uptime",
    value: "99.9%",
    monitor: "MONITOR_02",
    accentColor: "secondary",
    visual: "blocks",
  },
  {
    id: "projects",
    label: "Projects Delivered",
    value: "42",
    monitor: "MONITOR_03",
    accentColor: "tertiary",
    visual: "text",
    visualData: "ENCRYPTED_DATA_FLOW: STABLE",
  },
];
