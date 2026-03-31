"use client";

import { Button } from "@/components/ui/button";
import { LanyardBadge } from "@/components/ui/lanyard-badge";
import { personalInfo } from "@/data/personal";
import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";

export function Hero() {
  const { language } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center px-6 grid-bg overflow-hidden animate-fade-in">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        {/* Text Content */}
        <div className="lg:col-span-7 space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary font-mono text-xs tracking-widest uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            {language === "vi"
              ? "Sẵn sàng cho dự án mới"
              : "Available for new projects"}
          </div>

          <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
            NGUYỄN VĂN <br />
            <span className="text-transparent bg-clip-text headline-shimmer">
              ĐĂNG KHOA
            </span>
          </h1>

          <p className="font-headline text-2xl text-on-surface-variant max-w-xl">
            {language === "vi" ? "LẬP TRÌNH VIÊN FULLSTACK" : personalInfo.title}
            <span className="block text-lg font-light mt-2 font-body text-outline">
              {language === "vi"
                ? "Tôi xây dựng hệ thống mở rộng tốt, ứng dụng web hiện đại và trải nghiệm người dùng hiệu năng cao."
                : personalInfo.subtitle}
            </span>
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/projects">
              <Button variant="primary" size="lg">
                {language === "vi" ? "Xem dự án" : "View Projects"}
              </Button>
            </Link>
            <Link href="/#contact">
              <Button variant="secondary-outline" size="lg">
                {language === "vi" ? "Liên hệ" : "Contact"}
              </Button>
            </Link>
          </div>
        </div>

        {/* 3D Lanyard Badge */}
        <div className="lg:col-span-5 relative">
          <div className="w-72 h-96 md:w-96 md:h-[480px] mx-auto cursor-grab active:cursor-grabbing">
            <LanyardBadge />
          </div>
          <p className="text-center text-outline/50 font-mono text-[10px] mt-2 uppercase tracking-widest">
            {language === "vi" ? "Kéo thả để tương tác" : "Drag to interact"}
          </p>
        </div>
      </div>
    </section>
  );
}
