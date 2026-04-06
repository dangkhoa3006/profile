"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { TechBadge } from "./tech-badge";
import type { Project } from "@/lib/types";
import { useLanguage } from "@/components/providers/language-provider";

interface ProjectCardProps {
  project: Project;
}

const metricBarHeightClassMap: Record<number, string> = {
  30: "h-[30%]",
  40: "h-[40%]",
  45: "h-[45%]",
  55: "h-[55%]",
  60: "h-[60%]",
  70: "h-[70%]",
  80: "h-[80%]",
};

export function ProjectCardLarge({ project }: ProjectCardProps) {
  const { language } = useLanguage();

  return (
    <div className="md:col-span-7 group relative featured-card">
      <div className="absolute -inset-0.5 bg-linear-to-r from-primary to-secondary opacity-10 rounded-xl group-hover:opacity-30 transition duration-500" />
      <div className="relative glass-panel rounded-xl overflow-hidden flex flex-col h-full">
        {project.image && (
          <div className="h-64 relative overflow-hidden">
            <Image
              alt={project.imageAlt || project.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              src={project.image}
              width={256}
              height={256}
              sizes="(max-width: 768px) 192px, 256px"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-surface to-transparent" />
            <div className="absolute bottom-4 left-6">
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-mono border border-primary/30 backdrop-blur-md">
                SECURE_ID
              </span>
            </div>
            <div className="absolute top-4 right-4">
              <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-[10px] font-mono border border-secondary/30 backdrop-blur-md">
                {language === "vi" ? "TIÊU BIỂU" : "FEATURED"}
              </span>
            </div>
          </div>
        )}
        <div className="p-8 flex-1">
          <h2 className="font-headline text-2xl font-bold mb-2">
            {project.title}
          </h2>
          <p className="text-on-surface-variant mb-6 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <TechBadge key={tag} label={tag} variant="secondary" />
            ))}
          </div>
          {project.codeSnippet && (
            <div className="bg-surface-container-lowest rounded-lg p-4 font-mono text-[11px] text-primary/80 border border-outline-variant/30">
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-error-dim" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary-dim" />
                <div className="w-2.5 h-2.5 rounded-full bg-secondary-dim" />
                <span className="ml-2 text-on-surface-variant opacity-50">
                  {project.codeSnippet.filename}
                </span>
              </div>
              <div className="space-y-1">
                {project.codeSnippet.lines.map((line, i) => (
                  <p key={i} className={line.className}>
                    {line.text}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectCardSmall({ project }: ProjectCardProps) {
  const { language } = useLanguage();

  return (
    <div className="md:col-span-5 group relative">
      <div className="absolute -inset-0.5 bg-linear-to-br from-secondary to-primary opacity-5 rounded-xl group-hover:opacity-20 transition duration-500" />
      <div className="relative glass-panel rounded-xl overflow-hidden flex flex-col h-full">
        <div className="p-8">
          <div className="flex justify-end items-start mb-6">
            <span className="bg-surface-container-highest text-slate-400 px-3 py-1 rounded-md text-[10px] font-mono">
              {language === "vi" ? "DOANH NGHIỆP" : "ENTERPRISE"}
            </span>
          </div>
          <h2 className="font-headline text-2xl font-bold mb-2">
            {project.title}
          </h2>
          <p className="text-on-surface-variant mb-6 leading-relaxed">
            {project.description}
          </p>

          {project.metrics && (
            <div className="h-32 w-full bg-surface-container-lowest rounded-lg mb-6 flex items-end p-4 gap-1.5 overflow-hidden relative">
              {project.metrics.bars.map((height, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-full rounded-t",
                    metricBarHeightClassMap[height] ?? "h-full",
                    i === project.metrics!.highlightIndex
                      ? "bg-primary/60 neon-glow-primary shadow-[0_0_10px_rgba(161,250,255,0.2)]"
                      : "bg-secondary-dim/40",
                  )}
                />
              ))}
              <div className="absolute top-2 right-4 text-[10px] font-mono text-primary">
                {project.metrics.label}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <TechBadge key={tag} label={tag} variant="secondary" />
            ))}
          </div>

          {project.links?.docs && (
            <a
              className="inline-flex items-center text-primary font-mono text-xs tracking-widest hover:gap-2 transition-all"
              href={project.links.docs}
            >
              {language === "vi"
                ? "XEM_TÀI_LIỆU_KIẾN_TRÚC"
                : "VIEW_ARCHITECTURE_DOCS"}{" "}
              <span className="material-symbols-outlined text-sm ml-1">
                arrow_forward
              </span>
            </a>
          )}
          {project.links?.code && !project.links?.docs && (
            <a
              className="inline-flex items-center justify-center w-full py-3 border border-outline text-outline font-mono text-xs hover:border-primary hover:text-primary transition-colors"
              href={project.links.code}
            >
              {language === "vi" ? "MỞ REPO" : "LAUNCH REPO"}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectCardWide({ project }: ProjectCardProps) {
  const { language } = useLanguage();

  return (
    <div className="md:col-span-12 group relative overflow-hidden rounded-xl border border-white/5 bg-surface-container-low flex flex-col md:flex-row neon-border-hover">
      {project.image && (
        <div className="md:w-1/2 h-64 md:h-auto overflow-hidden">
          <Image
            alt={project.imageAlt || project.title}
            className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700"
            src={project.image}
            width={256}
            height={256}
            sizes="(max-width: 768px) 192px, 256px"
            priority
          />
        </div>
      )}
      <div className="md:w-1/2 p-10 flex flex-col justify-center">
        <h3 className="font-headline text-3xl font-bold tracking-tight mb-4 uppercase">
          {project.title}
        </h3>
        <p className="text-on-surface-variant mb-6 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-4 mb-8">
          {project.tags.map((tag, i) => (
            <div
              key={tag}
              className="flex items-center gap-2 text-xs font-mono text-outline"
            >
              <span
                className={cn(
                  "w-2 h-2 rounded-full",
                  i === 0
                    ? "bg-primary"
                    : i === 1
                      ? "bg-secondary"
                      : "bg-tertiary",
                )}
              />
              {tag}
            </div>
          ))}
        </div>
        {project.links && (
          <button className="self-start px-6 py-2 bg-surface-container-high hover:bg-surface-container-highest border border-outline-variant text-on-surface font-mono text-xs tracking-widest transition-all">
            {language === "vi" ? "THÔNG_SỐ_HỆ_THỐNG" : "SYSTEM SPECS"}
          </button>
        )}
      </div>
    </div>
  );
}
