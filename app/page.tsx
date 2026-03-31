import { Hero } from "@/components/sections/hero";
import { TechStackGrid } from "@/components/sections/tech-stack-grid";
import { ProjectsBento } from "@/components/sections/projects-bento";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { AboutSection } from "@/components/sections/about-section";
import { ContactForm } from "@/components/sections/contact-form";

export default function Home() {
  return (
    <>
      <Hero />
      <TechStackGrid variant="summary" />
      <ProjectsBento variant="summary" />
      <ExperienceTimeline variant="summary" />
      <AboutSection />
      <ContactForm />
    </>
  );
}
