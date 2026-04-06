import type { ExperienceEntry, StatMetric } from "@/lib/types";

export const experiences: ExperienceEntry[] = [
  {
    id: "deli-group",
    company: "Deli Group",
    role: "Fullstack Developer",
    period: "05/2025 - Present",
    description:
      "Building and maintaining internal logistics features focused on maps, operations flow, and real-time updates.",
    achievements: [
      "Integrated VietMap and Google Maps features for route display and location tracking.",
      "Built and improved backend APIs for smoother data flow between services.",
      "Developed real-time dashboard modules with WebSocket updates for vehicle status.",
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
      "Built web features and small product modules for freelance clients in different domains.",
    achievements: [
      "Improved frontend performance and UX on e-commerce projects.",
      "Set up reusable starter templates for startup MVPs.",
      "Supported deployments and basic cloud migration tasks for client projects.",
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
