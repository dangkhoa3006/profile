"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";

const skills = [
  "JavaScript",
  "TypeScript",
  "Next.js",
  "React.js",
  "Vue.js",
  "Tailwind CSS",
  "PHP",
  "Node.js",
  "NestJS",
  "Flutter",
  "MySQL",
  "PostgreSQL",
  "Docker",
  "AWS",
  "CI/CD",
  "PM2",
  "Git",
  "Postman",
];

export function ProfileContent() {
  const { language } = useLanguage();

  return (
    <main className="px-4 sm:px-6 py-12 md:py-24 animate-fade-in">
      <div className="max-w-6xl mx-auto space-y-8">
        <section className="glass-panel p-5 sm:p-8 rounded-xl border border-primary/20">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div className="space-y-3">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
                {language === "vi" ? "Hồ sơ" : "Profile"}
              </p>
              <h1 className="font-headline text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">
                NGUYỄN VĂN ĐĂNG KHOA
              </h1>
              <p className="text-secondary font-mono uppercase tracking-wider text-sm">
                {language === "vi" ? "Lập trình viên Fullstack" : "Fullstack Developer"}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <a
                href="tel:0336730183"
                className="glass-panel px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary transition-colors"
              >
                0336 730 183
              </a>
              <a
                href="mailto:dngkhoa.dev@gmail.com"
                className="glass-panel px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary transition-colors break-all"
              >
                dngkhoa.dev@gmail.com
              </a>
              <span className="glass-panel px-4 py-3 rounded-lg text-on-surface-variant">
                {language === "vi"
                  ? "Thủ Đức, Thành phố Hồ Chí Minh"
                  : "Thu Duc, Ho Chi Minh City"}
              </span>
              <Link
                href="https://github.com/dangkhoa3006"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary transition-colors break-all"
              >
                github.com/dangkhoa3006
              </Link>
              <Link
                href="https://www.linkedin.com/in/khoa-nguy%E1%BB%85n-v%C4%83n-%C4%91%C4%83ng-212545226/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel px-4 py-3 rounded-lg text-on-surface-variant hover:text-primary transition-colors sm:col-span-2 wrap-break-word"
              >
                linkedin.com/in/khoa-nguyen-van-dang-212545226
              </Link>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-panel p-5 sm:p-8 rounded-xl space-y-4">
            <h2 className="font-headline text-2xl font-bold text-primary">
              {language === "vi" ? "Mục tiêu nghề nghiệp" : "Career Objectives"}
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              <span className="text-on-surface font-semibold">
                {language === "vi" ? "Ngắn hạn (6-12 tháng):" : "Short-term (6-12 months):"}
              </span>{" "}
              {language === "vi"
                ? "Nâng cao kỹ năng Fullstack (React/Next.js, PHP Laravel), làm chủ việc tích hợp API RESTful, tối ưu UI/UX và hoàn thành tốt công việc tại công ty hiện tại."
                : "Improve Fullstack skills (React/Next.js, PHP Laravel), master RESTful API integration, optimize UI/UX, and deliver strongly at current company."}
            </p>
            <p className="text-on-surface-variant leading-relaxed">
              <span className="text-on-surface font-semibold">
                {language === "vi" ? "Dài hạn (1-3 năm):" : "Long-term (1-3 years):"}
              </span>{" "}
              {language === "vi"
                ? "Trở thành lập trình viên chuyên nghiệp, vững về kiến trúc phần mềm, tham gia dự án quy mô lớn và gắn bó lâu dài."
                : "Become a highly professional developer with solid software architecture expertise, contributing to large-scale projects long-term."}
            </p>
          </div>

          <div className="glass-panel p-5 sm:p-8 rounded-xl space-y-4">
            <h2 className="font-headline text-2xl font-bold text-primary">
              {language === "vi" ? "Học vấn và ngôn ngữ" : "Education & Language"}
            </h2>
            <p className="text-on-surface">
              {language === "vi"
                ? "Cao Đẳng Kỹ Thuật Cao Thắng"
                : "Cao Thang Technical College"}
            </p>
            <p className="text-on-surface-variant">
              {language === "vi" ? "Chuyên ngành: Lập trình" : "Major: Programming"}
            </p>
            <p className="text-on-surface-variant">
              {language === "vi" ? "English: cơ bản" : "English: basic"}
            </p>
            <div className="pt-2 border-t border-outline-variant/40 text-sm text-outline space-y-1">
              <p>{language === "vi" ? "Ngày sinh" : "Date of birth"}: 30/06/2002</p>
              <p>{language === "vi" ? "Nơi sinh" : "Birth place"}: Đồng Tháp</p>
              <p>{language === "vi" ? "Quê quán" : "Hometown"}: Quảng Trị</p>
            </div>
          </div>
        </section>

        <section className="glass-panel p-5 sm:p-8 rounded-xl space-y-5">
          <h2 className="font-headline text-2xl font-bold text-primary">
            {language === "vi" ? "Kỹ năng" : "Skills"}
          </h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 bg-surface-container-high rounded-full border border-outline-variant text-xs font-mono text-on-surface hover:border-primary transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section className="glass-panel p-5 sm:p-8 rounded-xl space-y-6 featured-card">
          <div className="space-y-2">
            <h2 className="font-headline text-2xl font-bold text-primary">
              {language === "vi"
                ? "Face Auth - Đăng nhập bằng khuôn mặt với Next.js + Prisma"
                : "Face Auth - Face Login with Next.js + Prisma"}
            </h2>
            <p className="text-on-surface-variant leading-relaxed">
              {language === "vi"
                ? "Dự án đăng nhập bằng khuôn mặt sử dụng Next.js, Prisma ORM, PostgreSQL và face-api.js (miễn phí, không cần đăng ký)."
                : "Face login project built with Next.js, Prisma ORM, PostgreSQL and face-api.js (free, no signup required)."}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-headline text-lg text-on-surface font-semibold">
              {language === "vi" ? "🏗️ Kiến trúc" : "🏗️ Architecture"}
            </h3>
            <ul className="text-on-surface-variant text-sm space-y-2">
              <li>- Service Provider Pattern (Dependency Injection)</li>
              <li>- Repository Pattern (Data Access Layer)</li>
              <li>- Service Pattern (Business Logic Layer)</li>
              <li>- DTO Pattern (Data Transfer Objects)</li>
              <li>- Custom Exception Pattern (Error Handling)</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-headline text-lg text-on-surface font-semibold">
              📚 Docs & Repository
            </h3>
            <div className="flex flex-wrap gap-3">
              <Link
                href="https://github.com/dangkhoa3006/face_auth_next"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md border border-primary/40 text-primary hover:bg-primary/10 transition-colors font-mono text-xs"
              >
                GitHub: face_auth_next
              </Link>
              <Link
                href="https://github.com/dangkhoa3006/face_auth_next/tree/main/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-md border border-outline-variant text-on-surface-variant hover:text-primary hover:border-primary transition-colors font-mono text-xs"
              >
                docs/
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
