import type { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "face-auth",
    title: "Face Authentication System",
    description:
      "Advanced biometric security layer utilizing computer vision for seamless user identification and access control.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "face-api.js"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCToYyWoLeRq6gRbgKFCUk0InqZLQAJ159fF3bezOV1LTifJ5mY3aD-lf4aIWQEZ0yKs0C-_JyjDnnjxG_256gO8rULcudsd1BJxaVMiPGfr0brIa1Kgr2eXhTrAS5_B2l8wLQdZSxp5CltnW6LdDuRrp7-ZXAbAf3V-bTBRNzE-b-qsNdL81z4T9RHd1SzF4zp3gyyye14EGUd_JrCI2zGM58HGQ2JDU60iyzIA4Z9t4bGj9L2sgvQBxUiV5X2YixIp_wbdwGXSdoz",
    imageAlt:
      "Futuristic face recognition interface with scanning data overlays",
    layout: "large",
    links: { code: "#" },
    codeSnippet: {
      filename: "face-auth.service.ts",
      lines: [
        {
          text: "async verifyIdentity(descriptor: number[]) {",
          className: "text-on-surface",
        },
        {
          text: "  const user = await this.repo.findBestMatch(descriptor);",
          className: "text-on-surface-variant",
        },
        {
          text: "  if (!user) throw new UnauthorizedException();",
          className: "text-on-surface-variant",
        },
        {
          text: "  return { ok: user.similarity > 0.98, userId: user.id };",
          className: "text-on-surface-variant",
        },
      ],
    },
  },
  {
    id: "fleet-management",
    title: "Deli Group Fleet Management",
    description:
      "Enterprise-scale logistics solution managing cross-border fleet operations. Integrated real-time GPS tracking and automated delivery scheduling.",
    tags: ["Next.js", "TypeScript", "Go", "Kafka"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAM9AGEFpgBFjWZkCkgTbNPwu2GTtDx1lmTazL3Y9O0pstVlsgVzGhw__wCXKoL8ldOTQBFpQelJ5QcfrwmJ3QLUyUEr0590VDwrAGXUa9mAneYAnWxGry86QGpisSJmdFs9y5FOayDmHxz9r-VB-R4h5d60MiLFtMwRUjMn_VLYt_7P_RRlySaq6UkrMOE5imfKLZ-zRGw1q4rYetjGTxel88TbDVdHTlCGALAfhz-9-em8ewTCfapvTu_keQvaIkq3x1SPdVuECZc",
    imageAlt: "Digital logistics dashboard with vehicle tracking",
    layout: "small",
    icon: "local_shipping",
    links: { docs: "#" },
    metrics: {
      label: "LIVE_METRICS",
      bars: [30, 60, 45, 80, 55, 70, 40],
      highlightIndex: 3,
    },
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    description:
      "High-performance developer showcase built with Next.js, TypeScript, and a custom design system.",
    tags: ["TypeScript", "Tailwind"],
    layout: "small",
    icon: "devices",
    links: { code: "#" },
  },
];

export const capabilities = [
  {
    icon: "monitoring",
    title: "Latency Optimization",
    description:
      "Implemented Edge caching strategies that dropped global latency from 1.2s to 180ms.",
    accentColor: "primary" as const,
  },
  {
    icon: "cloud_done",
    title: "Cloud Scalability",
    description:
      "Multi-region AWS deployments managing over 2TB of daily transactional data.",
    accentColor: "secondary" as const,
  },
  {
    icon: "shield",
    title: "Zero-Trust Security",
    description:
      "OAuth2/OIDC implementation with granular RBAC for enterprise internal tools.",
    accentColor: "tertiary" as const,
  },
];
