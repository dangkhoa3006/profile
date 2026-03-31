import type { Metadata } from "next";
import { TechStackGrid } from "@/components/sections/tech-stack-grid";

export const metadata: Metadata = {
  title: "Tech Stack | Profile",
  description:
    "A high-fidelity architectural overview of the systems, frameworks, and protocols utilized in building digital experiences.",
};

export default function StackPage() {
  return (
    <div className="grid-bg-lines min-h-screen">
      <TechStackGrid variant="full" />
    </div>
  );
}
