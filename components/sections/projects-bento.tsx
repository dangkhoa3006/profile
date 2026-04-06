"use client";

import { SectionHeader } from "@/components/ui/section-header";
import {
  ProjectCardLarge,
  ProjectCardSmall,
  ProjectCardWide,
} from "@/components/ui/project-card";
import { projects, capabilities } from "@/data/projects";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/providers/language-provider";

interface ProjectsBentoProps {
  variant?: "summary" | "full";
}

const capabilityBorderColors = {
  primary: "border-primary",
  secondary: "border-secondary",
  tertiary: "border-tertiary",
};

const capabilityIconColors = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
};

export function ProjectsBento({ variant = "summary" }: ProjectsBentoProps) {
  const { language } = useLanguage();
  const localizedProjects =
    language === "vi"
      ? projects.map((project) => {
          if (project.id === "face-auth") {
            return {
              ...project,
              title: "Hệ thống xác thực khuôn mặt",
              description:
                "Lớp bảo mật sinh trắc học dùng computer vision để nhận diện và kiểm soát truy cập liền mạch.",
            };
          }
          if (project.id === "fleet-management") {
            return {
              ...project,
              title: "Quản lý đội xe Deli Group",
              description:
                "Giải pháp logistics quy mô lớn, tích hợp theo dõi GPS realtime và tự động hóa điều phối giao hàng.",
            };
          }
          return {
            ...project,
            title: "Website hồ sơ cá nhân",
            description:
              "Website giới thiệu cá nhân hiệu năng cao xây dựng bằng Next.js, TypeScript và design system tùy biến.",
          };
        })
      : projects;
  const largeProjects = localizedProjects.filter((p) => p.layout === "large");
  const smallProjects = localizedProjects.filter((p) => p.layout === "small");
  const wideProjects = localizedProjects.filter((p) => p.layout === "wide");

  return (
    <section className="py-16 md:py-24 lg:py-32 px-4 sm:px-6 animate-fade-in-delay-2" id="projects">
      <div className="max-w-7xl mx-auto">
        {variant === "summary" ? (
          <SectionHeader
            title={language === "vi" ? "Dự án" : "Selected"}
            highlight={language === "vi" ? "Nổi bật" : "Works"}
            highlightStyle="italic"
            divider
          />
        ) : (
          <header className="mb-12">
            <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight md:tracking-tighter text-glow-primary mb-4 uppercase">
              {language === "vi" ? "Dự Án Nổi Bật" : "Selected Projects"}
            </h1>
            <p className="text-on-surface-variant max-w-2xl text-base md:text-lg">
              {language === "vi"
                ? "Danh sách dự án tiêu biểu, tập trung vào hệ thống hiệu năng cao và bảo mật định danh."
                : "A curated selection of architectural implementations, focus on high-concurrency systems and secure identity management."}
            </p>
          </header>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {largeProjects.map((project) => (
            <ProjectCardLarge key={project.id} project={project} />
          ))}
          {smallProjects.map((project) => (
            <ProjectCardSmall key={project.id} project={project} />
          ))}

          {variant === "full" &&
            capabilities.map((cap) => (
              <div
                key={cap.title}
                className={cn(
                  "md:col-span-4 glass-panel rounded-xl p-6 border-l-4",
                  capabilityBorderColors[cap.accentColor],
                )}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className={cn(
                      "material-symbols-outlined",
                      capabilityIconColors[cap.accentColor],
                    )}
                  >
                    {cap.icon}
                  </span>
                  <h3 className="font-headline font-bold">{cap.title}</h3>
                </div>
                <p className="text-sm text-on-surface-variant">
                  {language === "vi"
                    ? cap.title === "Latency Optimization"
                      ? "Triển khai chiến lược cache tại edge giúp giảm độ trễ toàn cục từ 1.2s xuống 180ms."
                      : cap.title === "Cloud Scalability"
                        ? "Triển khai đa vùng AWS, xử lý hơn 2TB dữ liệu giao dịch mỗi ngày."
                        : "Triển khai OAuth2/OIDC cùng RBAC chi tiết cho hệ thống nội bộ doanh nghiệp."
                    : cap.description}
                </p>
              </div>
            ))}

          {variant === "summary" &&
            wideProjects.map((project) => (
              <ProjectCardWide key={project.id} project={project} />
            ))}
        </div>
      </div>
    </section>
  );
}
