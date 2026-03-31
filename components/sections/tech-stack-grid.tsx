"use client";

import { cn } from "@/lib/utils";
import { TechBadge } from "@/components/ui/tech-badge";
import { useLanguage } from "@/components/providers/language-provider";
import {
  skillCategories,
  devMetrics,
  currentFocus,
  frontendSkillCards,
} from "@/data/skills";

interface TechStackGridProps {
  variant?: "summary" | "full";
}

const accentIconColors = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
  error: "text-error",
};

const accentBgColors = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
  error: "bg-error",
};

const accentDotColors = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  tertiary: "bg-tertiary",
  error: "bg-error",
};

export function TechStackGrid({ variant = "summary" }: TechStackGridProps) {
  const { language } = useLanguage();
  if (variant === "summary") {
    return (
      <section className="py-24 px-6 bg-surface-container-low animate-fade-in-delay-1" id="stack">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="font-headline text-4xl font-bold tracking-tighter mb-4">
                {language === "vi" ? "NỀN TẢNG" : "TECHNICAL"}{" "}
                <span className="text-primary">
                  {language === "vi" ? "KỸ THUẬT" : "CORE"}
                </span>
              </h2>
              <p className="text-on-surface-variant max-w-md">
                {language === "vi"
                  ? "Bộ công nghệ hiện đại dùng để xây dựng sản phẩm production với tốc độ và độ ổn định cao."
                  : "The modern stack used to build production-grade applications with speed and reliability."}
              </p>
            </div>
            <div className="font-mono text-xs text-outline tracking-widest uppercase">
              {language === "vi"
                ? "Kiến trúc hệ thống // Tối ưu"
                : "System Architecture // Optimization"}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category) => (
              <div key={category.id} className="glass-panel p-8 rounded-xl space-y-6">
                <h3
                  className={cn(
                    "font-mono text-sm font-bold tracking-widest uppercase",
                    accentIconColors[category.accentColor],
                  )}
                >
                  {category.id === "frontend"
                    ? language === "vi"
                      ? "Giao diện"
                      : "Frontend"
                    : category.id === "backend"
                      ? language === "vi"
                        ? "Máy chủ"
                        : "Backend"
                      : category.id === "database"
                        ? language === "vi"
                          ? "Cơ sở dữ liệu"
                          : "Database"
                        : language === "vi"
                          ? "Vận hành"
                          : "DevOps"}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {category.items.map((item) => (
                    <TechBadge key={item.name} label={item.name} variant="default" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="p-8 md:p-12 lg:p-20 space-y-6 max-w-7xl mx-auto animate-fade-in">
      <header className="max-w-4xl space-y-4">
        <div className="flex items-center gap-2 text-primary text-xs font-mono uppercase tracking-[0.2em]">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          {language === "vi"
            ? "Hệ thống hoạt động // Danh mục kỹ năng"
            : "System Operational // Tech Stack Registry"}
        </div>
        <h1 className="text-5xl md:text-8xl font-headline font-bold tracking-tighter text-on-surface">
          CORE_
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
            CAPABILITIES
          </span>
        </h1>
        <p className="text-on-surface-variant max-w-2xl text-xl leading-relaxed">
          A high-fidelity architectural overview of the systems, frameworks, and
          protocols utilized in building the next generation of digital
          experiences.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-12">
        {/* Frontend Panel (large) */}
        <div className="md:col-span-8 bg-surface-container-low p-8 rounded-sm border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 font-mono text-[10px] text-primary opacity-20 uppercase tracking-widest">
            FRONTEND_LAYER
          </div>
          <h2 className="text-2xl font-headline font-bold text-on-surface mb-8 flex items-center gap-3">
            <span className="material-symbols-outlined text-primary">
              terminal
            </span>
            Interface Engineering
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {frontendSkillCards.map((skill) => (
              <div
                key={skill.name}
                className="group frontend-skill-card bg-surface-container-high p-5 rounded-sm border border-outline-variant hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-primary/10 p-2 rounded-sm">
                    <span className="material-symbols-outlined text-primary frontend-icon-pop">
                      data_object
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-primary frontend-metric-live">
                    {skill.proficiency}%{" "}
                    {language === "vi" ? "THÀNH THẠO" : "PROFICIENCY"}
                  </span>
                </div>
                <h3 className="font-headline font-bold text-lg text-on-surface">
                  {skill.name}
                </h3>
                {skill.subtitle && (
                  <p className="text-on-surface-variant text-sm mt-2 leading-tight">
                    {language === "vi"
                      ? skill.name === "React / Next.js"
                        ? "Kiến trúc nâng cao với Server Components, Suspense và quản lý state vững chắc."
                        : "Phát triển type-safe với generic phức tạp và chuẩn kiến trúc rõ ràng."
                      : skill.subtitle}
                  </p>
                )}
                {skill.relatedTech && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {skill.relatedTech.map((tech) => (
                      <TechBadge
                        key={tech}
                        label={tech}
                        variant="secondary"
                        size="sm"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Dev Metrics Panel */}
        <div className="md:col-span-4 bg-primary p-px flex flex-col rounded-sm overflow-hidden">
          <div className="bg-surface p-8 flex-1 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-headline font-bold text-primary mb-2">
                DEV_METRICS
              </h2>
              <p className="text-on-surface-variant text-xs font-mono">
                {language === "vi"
                  ? "Phân bố kỹ năng theo thời gian thực"
                  : "Real-time skill distribution"}
              </p>
            </div>
            <div className="space-y-6 my-8">
              {devMetrics.map((metric) => (
                <div key={metric.label}>
                  <div className="flex justify-between text-[10px] font-mono mb-1 text-on-surface">
                    <span>{metric.label}</span>
                    <span>{metric.value}%</span>
                  </div>
                  <div className="h-1 bg-surface-container-highest w-full rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full",
                        accentBgColors[metric.color],
                        metric.widthClass,
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-surface-container-low p-4 rounded-lg border border-primary/10">
              <div className="text-[10px] font-mono text-primary mb-1">
                {language === "vi" ? "TẬP TRUNG HIỆN TẠI" : "CURRENT_FOCUS"}
              </div>
              <div className="text-sm font-bold text-on-surface">
                {currentFocus}
              </div>
            </div>
          </div>
        </div>

        {/* Backend / Database / DevOps cards */}
        {skillCategories
          .filter((c) => c.id !== "frontend")
          .map((category) => (
            <div
              key={category.id}
              className="md:col-span-4 bg-surface-container-low p-8 rounded-sm border border-white/5 flex flex-col"
            >
              <h2 className="text-xl font-headline font-bold text-on-surface mb-6 flex items-center gap-3">
                <span
                  className={cn(
                    "material-symbols-outlined",
                    accentIconColors[category.accentColor],
                  )}
                >
                  {category.icon}
                </span>
                {category.title.replace(" ", "_")}
              </h2>
              <ul className="space-y-4 flex-1">
                {category.items.map((item) => (
                  <li key={item.name} className="flex items-center gap-4">
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        accentDotColors[category.accentColor],
                      )}
                    />
                    <div>
                      <div className="text-sm font-bold text-on-surface">
                        {item.name}
                      </div>
                      {item.subtitle && (
                        <div className="text-[10px] font-mono text-on-surface-variant">
                          {language === "vi"
                            ? item.name === "Node.js / Bun"
                              ? "Microservices hiệu năng cao"
                              : item.name === "PHP Laravel"
                                ? "Ứng dụng doanh nghiệp ổn định"
                                : item.name === "NestJS"
                                  ? "Kiến trúc Node.js có khả năng mở rộng"
                                  : item.name === "Python"
                                    ? "Xử lý dữ liệu & tự động hóa"
                                    : item.name === "PostgreSQL"
                                      ? "Mô hình dữ liệu quan hệ & tối ưu truy vấn"
                                      : item.name === "MySQL"
                                        ? "Hệ quản trị dữ liệu quan hệ phổ biến"
                                        : item.name === "MongoDB"
                                          ? "NoSQL linh hoạt cho dữ liệu động"
                                          : item.name === "Redis / Upstash"
                                            ? "Cache và realtime performance"
                                            : item.name === "Prisma / Drizzle"
                                              ? "ORM an toàn kiểu dữ liệu"
                                              : item.name === "AWS / Google Cloud"
                                                ? "Hạ tầng cloud và serverless"
                                                : item.name === "Docker / Kubernetes"
                                                  ? "Container hóa và điều phối hệ thống"
                                                  : item.name === "GitHub Actions"
                                                    ? "Tự động hóa CI/CD pipeline"
                                                    : item.subtitle
                            : item.subtitle}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        {/* Code Terminal */}
        <div className="md:col-span-12 mt-12">
          <div className="bg-surface-container-low rounded-xl border border-white/10 overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-surface-container-highest border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-error" />
              <div className="w-3 h-3 rounded-full bg-primary" />
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <span className="ml-4 font-mono text-xs text-on-surface-variant">
                system_init.sh
              </span>
            </div>
            <div className="p-8 font-mono text-sm leading-relaxed text-on-surface space-y-2">
              <div className="flex gap-4">
                <span className="text-slate-600">01</span>
                <span>
                  <span className="text-secondary">import</span>{" "}
                  <span className="text-primary">{"{"}</span> Architect{" "}
                  <span className="text-primary">{"}"}</span>{" "}
                  <span className="text-secondary">from</span>{" "}
                  <span className="text-on-primary-container">
                    {`'@quantum/core'`}
                  </span>
                  ;
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-600">02</span>
                <span>
                  <span className="text-secondary">const</span> stack{" "}
                  <span className="text-primary">=</span>{" "}
                  <span className="text-secondary">new</span> Architect
                  <span className="text-primary">()</span>;
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-600">03</span>
                <span className="text-slate-500">
                  {"// Initialize high-fidelity interface"}
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-600">04</span>
                <span>
                  stack.deploy<span className="text-primary">{"({"}</span>
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-600">05</span>
                <span>
                  {"  "}performance<span className="text-primary">:</span>{" "}
                  <span className="text-error-dim">{`'OPTIMIZED'`}</span>,
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-600">06</span>
                <span>
                  {"  "}ux_fidelity<span className="text-primary">:</span>{" "}
                  <span className="text-error-dim">{`'HIGHEST'`}</span>,
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-600">07</span>
                <span>
                  {"  "}innovation<span className="text-primary">:</span>{" "}
                  <span className="text-error-dim">{`'CONTINUOUS'`}</span>
                </span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-600">08</span>
                <span>
                  <span className="text-primary">{"})"}</span>;
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
