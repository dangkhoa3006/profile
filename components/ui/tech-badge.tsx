import { cn } from "@/lib/utils";

interface TechBadgeProps {
  label: string;
  variant?: "default" | "primary" | "secondary" | "outline";
  size?: "sm" | "md";
}

const variantStyles = {
  default:
    "bg-surface-container-high text-on-surface border border-outline-variant hover:border-primary",
  primary: "bg-primary/20 text-primary",
  secondary: "bg-surface-container-high text-secondary",
  outline:
    "bg-surface-container-highest text-secondary",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-3 py-1 text-[10px]",
};

export function TechBadge({
  label,
  variant = "default",
  size = "md",
}: TechBadgeProps) {
  return (
    <span
      className={cn(
        "rounded-full font-mono transition-all inline-block",
        variantStyles[variant],
        sizeStyles[size],
      )}
    >
      {label}
    </span>
  );
}
