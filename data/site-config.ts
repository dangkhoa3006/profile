import type { NavLink, SocialLink } from "@/lib/types";

export const siteConfig = {
  name: "Profile",
  title: "Profile | Nguyễn Văn Đăng Khoa",
  description:
    "Fullstack Developer specializing in scalable systems, modern web apps, and high-performance user experiences.",
  url: "https://nvdk.dev",
};

export const navLinks: NavLink[] = [
  { label: "Profile", href: "/profile" },
  { label: "Projects", href: "/projects" },
  { label: "Stack", href: "/stack" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/#contact" },
];

export const mobileNavLinks: NavLink[] = [
  { label: "Work", href: "/projects", icon: "code" },
  { label: "Tech", href: "/stack", icon: "layers" },
  { label: "Profile", href: "/profile", icon: "account_circle" },
];

export const socialLinks: SocialLink[] = [
  { label: "Email", href: "mailto:dngkhoa.dev@gmail.com", icon: "mail" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/khoa-nguy%E1%BB%85n-v%C4%83n-%C4%91%C4%83ng-212545226/",
    icon: "link",
  },
  { label: "GitHub", href: "https://github.com/dangkhoa3006", icon: "terminal" },
];
