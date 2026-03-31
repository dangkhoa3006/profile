"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navLinks, siteConfig, socialLinks } from "@/data/site-config";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/layout/language-toggle";
import { useLanguage } from "@/components/providers/language-provider";

const navLabelMap = {
  "/profile": { vi: "Hồ sơ", en: "Profile" },
  "/projects": { vi: "Dự án", en: "Projects" },
  "/stack": { vi: "Kỹ năng", en: "Stack" },
  "/experience": { vi: "Kinh nghiệm", en: "Experience" },
  "/#contact": { vi: "Liên hệ", en: "Contact" },
};

function TerminalGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 10l2 2-2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CloseGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const { language } = useLanguage();

  const githubLink = socialLinks.find((link) => link.label === "GitHub")?.href ?? "#";
  const linkedinLink = socialLinks.find((link) => link.label === "LinkedIn")?.href ?? "#";
  const emailLink = socialLinks.find((link) => link.label === "Email")?.href ?? "#";

  useEffect(() => {
    if (!isTerminalOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setIsTerminalOpen(false);
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isTerminalOpen]);

  function isActive(href: string) {
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="flex justify-between items-center px-8 h-20 max-w-full">
        <Link
          href="/"
          className="text-xl font-bold tracking-widest text-primary drop-shadow-[0_0_8px_rgba(161,250,255,0.4)] font-headline uppercase"
        >
          {siteConfig.name}
        </Link>

        <div className="hidden md:flex items-center gap-8 font-headline tracking-tighter uppercase text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors duration-300",
                isActive(link.href)
                  ? "text-primary border-b-2 border-primary pb-1"
                  : "text-slate-400 hover:text-primary",
              )}
            >
              {navLabelMap[link.href as keyof typeof navLabelMap]?.[language] ??
                link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <LanguageToggle />
          <button
            aria-label="Open terminal panel"
            className="text-slate-400 hover:text-primary hover:bg-primary/10 hover:shadow-[0_0_15px_rgba(161,250,255,0.2)] p-2 rounded-lg transition-all active:scale-95 duration-150"
            onClick={() => setIsTerminalOpen((prev) => !prev)}
          >
            <TerminalGlyph className="w-5 h-5" />
          </button>
          <Link href="/#contact" className="hidden md:inline-flex">
            <Button variant="primary" size="sm">
              {language === "vi" ? "Thuê tôi" : "Hire Me"}
            </Button>
          </Link>
        </div>
      </div>

      {isTerminalOpen && (
        <div className="absolute right-6 top-24 w-[min(92vw,420px)] glass-panel rounded-xl border border-primary/25 shadow-[0_12px_30px_rgba(0,0,0,0.45)] overflow-hidden animate-fade-in z-60">
          <div className="flex items-center justify-between px-4 py-3 bg-surface-container-highest border-b border-outline-variant/40">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-error-dim" />
              <span className="w-2.5 h-2.5 rounded-full bg-primary-dim" />
              <span className="w-2.5 h-2.5 rounded-full bg-secondary-dim" />
              <span className="ml-2 text-[11px] font-mono text-outline">profile-terminal</span>
            </div>
            <button
              className="text-outline hover:text-primary transition-colors"
              onClick={() => setIsTerminalOpen(false)}
              aria-label="Close terminal panel"
            >
              <CloseGlyph className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 font-mono text-xs space-y-3 text-on-surface-variant">
            <p>
              <span className="text-primary">khoa@portfolio</span>
              <span className="text-outline">:~$</span>{" "}
              <span className="text-on-surface">help</span>
            </p>
            <p className="text-outline">
              {language === "vi" ? "Lệnh khả dụng:" : "Available commands:"}
            </p>
            <div className="space-y-2">
              <Link
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-primary transition-colors"
              >
                <span className="text-primary">open github</span> -{" "}
                {language === "vi"
                  ? "Mở kho mã nguồn"
                  : "Open source repositories"}
              </Link>
              <Link
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-primary transition-colors"
              >
                <span className="text-primary">open linkedin</span> -{" "}
                {language === "vi"
                  ? "Xem hồ sơ chuyên nghiệp"
                  : "View professional profile"}
              </Link>
              <Link
                href={emailLink}
                className="block hover:text-primary transition-colors"
              >
                <span className="text-primary">send mail</span> -{" "}
                {language === "vi"
                  ? "Bắt đầu trao đổi dự án"
                  : "Start project discussion"}
              </Link>
              <Link href="/#contact" className="block hover:text-primary transition-colors">
                <span className="text-primary">contact --form</span> -{" "}
                {language === "vi"
                  ? "Đi đến phần liên hệ"
                  : "Jump to contact section"}
              </Link>
            </div>
            <p>
              <span className="text-primary">khoa@portfolio</span>
              <span className="text-outline">:~$</span>{" "}
              <span className="inline-block w-2 h-4 bg-primary/80 animate-pulse align-middle" />
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}
