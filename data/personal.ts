import type { PersonalInfo } from "@/lib/types";

export const personalInfo: PersonalInfo = {
  name: "NGUYỄN VĂN ĐĂNG KHOA",
  displayName: "PROFILE",
  title: "FULLSTACK DEVELOPER",
  subtitle:
    "I build scalable systems, modern web apps, and high-performance user experiences.",
  bio: [
    "I am a fullstack engineer dedicated to the craft of building digital products that last. My approach combines technical rigor with aesthetic precision, ensuring that the back-end infrastructure is as elegant as the front-end interface.",
    "With deep expertise in the JavaScript ecosystem and modern PHP frameworks, I thrive in environments that challenge me to solve complex architectural problems while maintaining high performance.",
  ],
  avatar: "/img/avt.jpg",
  stats: [
    { label: "Years Experience", value: "2+" },
    { label: "Projects Shipped", value: "15+" },
  ],
  codeProfile: [
    { key: "name", value: '"NGUYEN VAN DANG KHOA"' },
    { key: "passion", value: '["System Architecture", "Scalability"]' },
    { key: "focus", value: '"Building high-performance experiences"' },
    { key: "motto", value: '"Precision in every line of code"' },
  ],
};
