import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  highlight: string;
  subtitle?: string;
  label?: string;
  align?: "left" | "center";
  divider?: boolean;
  highlightStyle?: "primary" | "secondary" | "italic";
}

const highlightColors = {
  primary: "text-primary",
  secondary: "text-secondary italic",
  italic: "text-primary italic",
};

export function SectionHeader({
  title,
  highlight,
  subtitle,
  label,
  align = "left",
  divider = false,
  highlightStyle = "primary",
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-16", align === "center" && "text-center")}>
      {label && (
        <div className="font-mono text-xs text-outline uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
          <span className="h-px w-12 bg-primary" />
          {label}
        </div>
      )}
      <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-4">
        {title}{" "}
        <span className={highlightColors[highlightStyle]}>{highlight}</span>
      </h2>
      {subtitle && (
        <p className="text-on-surface-variant max-w-xl text-lg">{subtitle}</p>
      )}
      {divider && <div className="h-1 w-24 bg-primary mt-4" />}
    </div>
  );
}
