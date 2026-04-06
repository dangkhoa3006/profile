"use client";

import { TimelineItem } from "@/components/ui/timeline-item";
import { StatCard } from "@/components/ui/stat-card";
import { experiences, stats } from "@/data/experience";
import { useLanguage } from "@/components/providers/language-provider";

interface ExperienceTimelineProps {
  variant?: "summary" | "full";
}

export function ExperienceTimeline({
  variant = "summary",
}: ExperienceTimelineProps) {
  const { language } = useLanguage();
  const localizedExperiences =
    language === "vi"
      ? experiences.map((exp) => {
        if (exp.id === "deli-group") {
          return {
            ...exp,
            company: "Công ty Cổ phần Deli Group",
            role: "Lập trình viên Fullstack",
            description:
                "Tham gia phát triển tính năng cho hệ thống vận hành, tập trung vào điều phối và bản đồ.",
            achievements: [
                "Tích hợp VietMap và Google Maps cho theo dõi vị trí và thao tác bản đồ.",
                "Xây dựng và cải tiến API backend phục vụ luồng dữ liệu nội bộ.",
                "Phát triển module realtime bằng WebSocket để cập nhật trạng thái phương tiện.",
            ],
            tags: ["React.js", "Node.js", "PostgreSQL", "Redis"],
          };
        }

        return {
          ...exp,
          company: "Freelance / Independent Contractor",
          role: "Kỹ sư phần mềm tự do",
          description:
                "Nhận và triển khai các hạng mục web/app theo nhu cầu của khách hàng.",
          achievements: [
                "Tối ưu trải nghiệm người dùng và hiệu năng frontend cho dự án thương mại điện tử.",
                "Thiết lập bộ khung dự án để rút ngắn thời gian làm MVP.",
                "Hỗ trợ triển khai và cấu hình hạ tầng cloud ở mức cơ bản.",
          ],
          tags: ["Next.js", "Tailwind", "AWS", "TypeScript"],
        };
      })
      : experiences;
  const localizedStats =
    language === "vi"
      ? stats.map((stat) => {
        if (stat.id === "commits") {
          return { ...stat, label: "Tổng số commit mã nguồn" };
        }
        if (stat.id === "uptime") {
          return { ...stat, label: "Độ ổn định production" };
        }
        return { ...stat, label: "Số dự án đã hoàn thành", visualData: "TRẠNG_THAI: ỔN_ĐỊNH" };
      })
      : stats;

  return (
    <section
      className="py-24 px-6 bg-surface-container-lowest relative overflow-hidden animate-fade-in"
      id="experience"
    >
      <div className="max-w-4xl mx-auto relative">
        {variant === "summary" ? (
          <div className="text-center mb-20">
            <h2 className="font-headline text-4xl font-bold tracking-tighter mb-4">
              {language === "vi" ? "HÀNH TRÌNH" : "ENGINEERING"}{" "}
              <span className="text-secondary italic">
                {language === "vi" ? "SỰ NGHIỆP" : "PATH"}
              </span>
            </h2>
            <div className="font-mono text-[10px] text-outline uppercase tracking-[0.3em]">
              {language === "vi"
                ? "Lộ trình nghề nghiệp // Phát triển"
                : "Career Trajectory // Growth"}
            </div>
          </div>
        ) : (
          <header className="mb-20">
            <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <span className="text-primary font-mono text-[10px] tracking-widest uppercase">
                {language === "vi"
                  ? "Khoi_tao_lo_trinh_su_nghiep"
                  : "Career_Protocol_Initiated"}
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter text-on-background max-w-3xl leading-none">
              {language === "vi" ? "Lộ trình" : "Engineering"}{" "}
              <span className="text-primary">
                {language === "vi" ? "Sự nghiệp" : "Path"}
              </span>
            </h1>
            <p className="mt-6 text-on-surface-variant max-w-xl text-lg leading-relaxed">
              {language === "vi"
                ? "Xây dựng hệ sinh thái số vững chắc bằng tư duy full-stack và hạ tầng có khả năng mở rộng."
                : "Building robust digital ecosystems through full-stack precision and scalable infrastructure."}
            </p>
          </header>
        )}

        <div className="relative space-y-32">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[3px] z-10 pointer-events-none block">
            <div className="absolute inset-0 bg-primary/55 shadow-[0_0_10px_rgba(161,250,255,0.32)]" />
            <div className="timeline-line-runner absolute left-1/2 -translate-x-1/2 top-0 h-24 w-[10px]" />
          </div>

          {localizedExperiences.map((exp) => (
            <TimelineItem
              key={exp.id}
              company={exp.company}
              role={exp.role}
              period={exp.period}
              description={exp.description}
              achievements={exp.achievements}
              tags={exp.tags}
              side={exp.side}
              accentColor={exp.accentColor}
            />
          ))}
        </div>
      </div>

      {/* Stats section (full variant only) */}
      {variant === "full" && (
        <div className="max-w-7xl mx-auto mt-40">
          <h2 className="font-headline text-2xl font-bold uppercase tracking-[0.2em] mb-12 flex items-center gap-4">
            <span className="h-px w-12 bg-primary" />
            {language === "vi" ? "Trang_thai_he_thong" : "System_Status"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {localizedStats.map((stat) => (
              <StatCard key={stat.id} {...stat} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
