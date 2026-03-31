"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mobileNavLinks } from "@/data/site-config";
import { useLanguage } from "@/components/providers/language-provider";

const mobileLabelMap = {
  "/projects": { vi: "Dự án", en: "Work" },
  "/stack": { vi: "Kỹ năng", en: "Tech" },
  "/profile": { vi: "Hồ sơ", en: "Profile" },
};

export function MobileNav() {
  const pathname = usePathname();
  const { language } = useLanguage();

  function isActive(href: string) {
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-lg border-t border-white/10 z-50 flex justify-around items-center h-16">
      {mobileNavLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "flex flex-col items-center",
            isActive(link.href) ? "text-primary" : "text-slate-500",
          )}
        >
          <span className="material-symbols-outlined">{link.icon}</span>
          <span className="text-[8px] mt-1 font-mono uppercase">
            {mobileLabelMap[link.href as keyof typeof mobileLabelMap]?.[language] ??
              link.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
