import { cn } from "@/lib/utils";
import { GlassPanel } from "./glass-panel";

interface TimelineItemProps {
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  tags: string[];
  side: "left" | "right";
  accentColor: "primary" | "secondary" | "tertiary";
  icon?: string;
}

const accentColorMap = {
  primary: {
    dot: "bg-primary ring-primary/20",
    icon: "text-primary",
    check: "text-primary",
    borderClass: "border-l-primary",
    borderRightClass: "border-r-primary",
    tag: "text-secondary",
    periodColor: "text-secondary",
  },
  secondary: {
    dot: "bg-secondary ring-secondary/20",
    icon: "text-secondary",
    check: "text-secondary",
    borderClass: "border-l-secondary",
    borderRightClass: "border-r-secondary",
    tag: "text-primary",
    periodColor: "text-primary",
  },
  tertiary: {
    dot: "bg-tertiary ring-tertiary/20",
    icon: "text-tertiary",
    check: "text-tertiary",
    borderClass: "border-l-tertiary",
    borderRightClass: "border-r-tertiary",
    tag: "text-tertiary",
    periodColor: "text-tertiary",
  },
};

export function TimelineItem({
  company,
  role,
  period,
  description,
  achievements,
  tags,
  side,
  accentColor,
  icon,
}: TimelineItemProps) {
  const colors = accentColorMap[accentColor];
  const isRight = side === "right";

  return (
    <div className="relative flex flex-col md:flex-row md:items-center w-full">
      {/* Left side content (date or card) */}
      {isRight ? (
        <div className="md:w-1/2 md:pr-24 text-left md:text-right order-2 md:order-1 mt-8 md:mt-0">
          <div className={cn("font-mono text-sm mb-2", colors.periodColor)}>
            {period}
          </div>
          <h3 className="text-3xl font-headline font-bold text-on-surface mb-4">
            {company}
          </h3>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 md:justify-end">
            {tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "px-3 py-1 bg-surface-container-high font-mono text-[10px] rounded-full uppercase tracking-tighter",
                  colors.tag,
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="md:w-1/2 md:pr-24 order-1">
          <GlassPanel
            className={cn("p-8", isRight ? "" : "border-r-4")}
            borderAccent={isRight ? accentColor : "none"}
            borderSide={isRight ? "left" : "none"}
          >
            <div
              className={cn(
                "border-r-4",
                colors.borderRightClass,
                "rounded-xl p-0 border-0 md:border-r-4 md:rounded-none",
              )}
            >
              <div className="flex items-center gap-3 mb-6">
                {icon && (
                  <span
                    className={cn(
                      "material-symbols-outlined group-hover:scale-110 transition-transform",
                      colors.icon,
                    )}
                  >
                    {icon}
                  </span>
                )}
                <h4 className="font-headline font-bold text-xl uppercase tracking-wider">
                  {role}
                </h4>
              </div>
              <ul className="space-y-4">
                {achievements.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className={cn(
                        "material-symbols-outlined text-sm mt-1",
                        colors.check,
                      )}
                    >
                      bolt
                    </span>
                    <span className="text-on-surface-variant text-sm">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </GlassPanel>
        </div>
      )}

      {/* Center dot */}
      <div
        className={cn(
          "absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full ring-4 neon-glow-primary z-10 hidden md:block",
          colors.dot,
          accentColor === "primary" && "dot-featured",
        )}
      />

      {/* Right side content */}
      {isRight ? (
        <div className="md:w-1/2 md:pl-24 order-1 md:order-2">
          <GlassPanel className="p-8 border-l-4" borderAccent={accentColor} borderSide="left">
            <div className="flex items-center gap-3 mb-6">
              <span
                className={cn(
                  "material-symbols-outlined group-hover:scale-110 transition-transform",
                  colors.icon,
                )}
              >
                layers
              </span>
              <h4 className="font-headline font-bold text-xl uppercase tracking-wider">
                {role}
              </h4>
            </div>
            <ul className="space-y-4">
              {achievements.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className={cn(
                      "material-symbols-outlined text-sm mt-1",
                      colors.check,
                    )}
                  >
                    check_circle
                  </span>
                  <span className="text-on-surface-variant text-sm">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </GlassPanel>
        </div>
      ) : (
        <div className="md:w-1/2 md:pl-24 order-2 mt-8 md:mt-0">
          <div className={cn("font-mono text-sm mb-2", colors.periodColor)}>
            {period}
          </div>
          <h3 className="text-3xl font-headline font-bold text-on-surface mb-4">
            {company}
          </h3>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            {description}
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className={cn(
                  "px-3 py-1 bg-surface-container-high font-mono text-[10px] rounded-full uppercase tracking-tighter",
                  colors.tag,
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
