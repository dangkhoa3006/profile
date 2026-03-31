import { cn } from "@/lib/utils";
import type { StatMetric } from "@/lib/types";

const accentTextColors = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
};

const accentBgColors = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
};

const barWidthClassMap: Record<string, string> = {
  "85": "w-[85%]",
};

export function StatCard({ label, value, monitor, accentColor, visual, visualData }: StatMetric) {
  return (
    <div
      className={cn(
        "bg-surface-container-low p-6 border border-outline-variant/30 relative overflow-hidden group",
        accentColor === "primary" && "featured-card",
      )}
    >
      <div
        className={cn(
          "absolute top-0 right-0 p-4 font-mono text-[8px] opacity-30",
          accentTextColors[accentColor],
        )}
      >
        {monitor}
      </div>
      <div className="text-on-surface-variant font-mono text-xs uppercase mb-4">
        {label}
      </div>
      <div
        className={cn(
          "text-4xl font-headline font-bold text-on-background mb-2",
          accentColor === "primary" && "text-glow-primary",
        )}
      >
        {value}
      </div>

      {visual === "bar" && visualData && (
        <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full",
              accentBgColors[accentColor],
              barWidthClassMap[visualData] ?? "w-full",
            )}
          />
        </div>
      )}

      {visual === "blocks" && (
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={cn(
                "h-4 w-1",
                accentBgColors[accentColor],
                i === 5 && "opacity-30",
              )}
            />
          ))}
        </div>
      )}

      {visual === "text" && visualData && (
        <div
          className={cn(
            "font-mono text-[10px]",
            accentTextColors[accentColor],
          )}
        >
          {visualData}
        </div>
      )}
    </div>
  );
}
