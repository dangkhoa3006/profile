import type { Metadata } from "next";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";

export const metadata: Metadata = {
  title: "Engineering Path | Profile",
  description:
    "Building robust digital ecosystems through full-stack precision and scalable infrastructure.",
};

export default function ExperiencePage() {
  return <ExperienceTimeline variant="full" />;
}
