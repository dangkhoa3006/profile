import { cn } from "@/lib/utils";

interface TerminalWindowProps {
  filename: string;
  children: React.ReactNode;
  className?: string;
}

export function TerminalWindow({
  filename,
  children,
  className,
}: TerminalWindowProps) {
  return (
    <div
      className={cn(
        "bg-surface-container-low rounded-xl border border-white/10 overflow-hidden shadow-2xl",
        className,
      )}
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-surface-container-highest border-b border-white/5">
        <div className="w-3 h-3 rounded-full bg-error" />
        <div className="w-3 h-3 rounded-full bg-primary" />
        <div className="w-3 h-3 rounded-full bg-secondary" />
        <span className="ml-4 font-mono text-xs text-on-surface-variant">
          {filename}
        </span>
      </div>
      <div className="p-8 font-mono text-sm leading-relaxed text-on-surface-variant">
        {children}
      </div>
    </div>
  );
}
