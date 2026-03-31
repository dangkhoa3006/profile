import { cn } from "@/lib/utils";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  borderAccent?: "primary" | "secondary" | "tertiary" | "none";
  borderSide?: "left" | "right" | "top" | "bottom" | "none";
  hover?: boolean;
}

const accentColors = {
  primary: "border-l-primary",
  secondary: "border-l-secondary",
  tertiary: "border-l-tertiary",
  none: "",
};

const borderSideMap = {
  left: "border-l-4",
  right: "border-r-4",
  top: "border-t-4",
  bottom: "border-b-4",
  none: "",
};

export function GlassPanel({
  children,
  className,
  borderAccent = "none",
  borderSide = "none",
  hover = false,
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-xl",
        borderSide !== "none" && borderSideMap[borderSide],
        borderAccent !== "none" && accentColors[borderAccent],
        hover && "neon-border-hover transition-all duration-300",
        className,
      )}
    >
      {children}
    </div>
  );
}
