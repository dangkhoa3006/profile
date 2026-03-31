"use client";

import { useLanguage } from "@/components/providers/language-provider";

export function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-1.5 rounded-md border border-outline-variant text-xs font-mono text-on-surface-variant hover:text-primary hover:border-primary transition-colors"
      aria-label="Toggle website language"
      title="Toggle language"
    >
      {language.toUpperCase()}
    </button>
  );
}
