import type { Metadata } from "next";
import { ProfileContent } from "@/components/sections/profile-content";

export const metadata: Metadata = {
  title: "Profile | Nguyễn Văn Đăng Khoa",
  description:
    "Trang hồ sơ đầy đủ của Nguyễn Văn Đăng Khoa: liên hệ, kỹ năng, kinh nghiệm, mục tiêu và dự án nổi bật.",
};

export default function ProfilePage() {
  return <ProfileContent />;
}
