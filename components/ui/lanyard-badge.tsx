"use client";

import dynamic from "next/dynamic";

const LanyardBadge3D = dynamic(
  () =>
    import("@/components/ui/lanyard-badge-3d").then((m) => m.LanyardBadge3D),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-32 h-44 rounded-xl border border-primary/30 bg-surface-container-high animate-pulse" />
      </div>
    ),
  }
);

export function LanyardBadge() {
  return (
    <div className="w-full h-full">
      <LanyardBadge3D />
    </div>
  );
}
