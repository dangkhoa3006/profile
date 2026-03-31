"use client";

import Link from "next/link";
import { socialLinks } from "@/data/site-config";
import { useLanguage } from "@/components/providers/language-provider";

export function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-surface w-full py-12 border-t border-outline-variant/20">
      <div className="flex flex-col md:flex-row justify-between items-center px-12 max-w-7xl mx-auto gap-6 font-mono text-xs uppercase tracking-widest">
        <div className="text-primary font-bold">
          &copy; {new Date().getFullYear()} PROFILE //{" "}
          <span className="text-slate-500">
            {language === "vi"
              ? "NGUYỄN VĂN ĐĂNG KHOA"
              : "NGUYEN VAN DANG KHOA"}
          </span>
        </div>
        <div className="flex gap-8">
          {socialLinks
            .filter((l) => ["GitHub", "LinkedIn"].includes(l.label))
            .map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-slate-500 hover:text-primary transition-all"
              >
                {link.label}
              </Link>
            ))}
        </div>
      </div>
    </footer>
  );
}
