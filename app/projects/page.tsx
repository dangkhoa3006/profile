import type { Metadata } from "next";
import { ProjectsBento } from "@/components/sections/projects-bento";
import { TechStackGrid } from "@/components/sections/tech-stack-grid";

export const metadata: Metadata = {
  title: "Selected Projects | Profile",
  description:
    "A curated selection of architectural implementations, focus on high-concurrency systems and secure identity management.",
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsBento variant="full" />
      <TechStackGrid variant="summary" />
    </>
  );
}
