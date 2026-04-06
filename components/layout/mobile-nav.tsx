"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mobileNavLinks } from "@/data/site-config";
import { useLanguage } from "@/components/providers/language-provider";

const mobileLabelMap = {
  "/profile": { vi: "Hồ sơ", en: "Profile" },
  "/projects": { vi: "Dự án", en: "Work" },
  "/stack": { vi: "Kỹ năng", en: "Tech" },
  "/experience": { vi: "K.Nghiệm", en: "Exp" },
  "/#contact": { vi: "Liên hệ", en: "Contact" },
};

export function MobileNav() {
  const pathname = usePathname();
  const { language } = useLanguage();

  function isActive(href: string) {
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-lg border-t border-white/10 z-50 flex justify-around items-center h-16 px-1">
      {mobileNavLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "flex flex-col items-center min-w-0 px-1",
            isActive(link.href) ? "text-primary" : "text-slate-500",
          )}
        >
          <span className="material-symbols-outlined text-[20px] leading-none">{link.icon}</span>
          <span className="text-[8px] mt-1 font-mono uppercase truncate max-w-[60px] text-center">
            {mobileLabelMap[link.href as keyof typeof mobileLabelMap]?.[language] ??
              link.label}
          </span>
        </Link>
      ))}
    </div>
  );
}
