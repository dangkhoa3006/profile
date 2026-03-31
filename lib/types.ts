export interface NavLink {
  label: string;
  href: string;
  icon?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  layout: "large" | "small" | "wide";
  icon?: string;
  links?: {
    code?: string;
    demo?: string;
    docs?: string;
  };
  codeSnippet?: {
    filename: string;
    lines: CodeLine[];
  };
  metrics?: {
    label: string;
    bars: number[];
    highlightIndex?: number;
  };
}

export interface CodeLine {
  text: string;
  className?: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  tags: string[];
  side: "left" | "right";
  accentColor: "primary" | "secondary" | "tertiary";
}

export interface SkillCategory {
  id: string;
  title: string;
  icon: string;
  accentColor: "primary" | "secondary" | "tertiary" | "error";
  items: SkillItem[];
}

export interface SkillItem {
  name: string;
  subtitle?: string;
  proficiency?: number;
  relatedTech?: string[];
}

export interface StatMetric {
  id: string;
  label: string;
  value: string;
  monitor: string;
  accentColor: "primary" | "secondary" | "tertiary";
  visual?: "bar" | "blocks" | "text";
  visualData?: string;
}

export interface PersonalInfo {
  name: string;
  displayName: string;
  title: string;
  subtitle: string;
  bio: string[];
  avatar: string;
  stats: { label: string; value: string }[];
  codeProfile: { key: string; value: string }[];
}
