"use client";

import { TerminalWindow } from "@/components/ui/terminal-window";
import { personalInfo } from "@/data/personal";
import { useLanguage } from "@/components/providers/language-provider";

export function AboutSection() {
  const { language } = useLanguage();
  const bio =
    language === "vi"
      ? [
          "Tôi là một fullstack engineer theo đuổi việc xây dựng sản phẩm số bền vững. Cách tiếp cận của tôi kết hợp tính kỷ luật kỹ thuật với độ chỉn chu thẩm mỹ, để backend và frontend đều đạt chất lượng cao.",
          "Với nền tảng vững trong hệ sinh thái JavaScript và các framework PHP hiện đại, tôi phù hợp với các bài toán kiến trúc phức tạp, hiệu năng cao và khả năng mở rộng dài hạn.",
        ]
      : personalInfo.bio;

  const stats =
    language === "vi"
      ? [
          { label: "Năm kinh nghiệm", value: "2+" },
          { label: "Dự án đã hoàn thành", value: "15+" },
        ]
      : personalInfo.stats;

  return (
    <section className="py-32 px-6 animate-fade-in" id="about">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        {/* Code Terminal */}
        <div className="lg:w-1/2">
          <TerminalWindow filename={language === "vi" ? "profile.json — hồ sơ" : "profile.json — profile"}>
            <p className="text-primary">
              const <span className="text-on-surface">developer</span> ={" {"}
            </p>
            {personalInfo.codeProfile.map((entry) => (
              <p key={entry.key} className="pl-6">
                {entry.key}: <span className="text-secondary">{entry.value}</span>,
              </p>
            ))}
            <p className="text-primary">{"};"}</p>
            <br />
            <p className="text-outline italic">
              {language === "vi"
                ? "// Hiện đang nghiên cứu CI/CD nâng cao và tích hợp AI"
                : "// Currently exploring advanced CI/CD patterns and AI integration"}
            </p>
          </TerminalWindow>
        </div>

        {/* Bio */}
        <div className="lg:w-1/2 space-y-6">
          <h2 className="font-headline text-4xl font-bold tracking-tighter">
            {language === "vi" ? "VỀ" : "ABOUT THE"}{" "}
            <span className="text-primary italic">
              {language === "vi" ? "TÔI" : "ARCHITECT"}
            </span>
          </h2>
          {bio.map((paragraph, i) => (
            <p
              key={i}
              className="text-on-surface-variant leading-relaxed text-lg"
            >
              {paragraph}
            </p>
          ))}
          <div className="flex gap-12 pt-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-primary text-3xl font-bold font-headline">
                  {stat.value}
                </div>
                <div className="text-[10px] font-mono text-outline uppercase tracking-widest">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
