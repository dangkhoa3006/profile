import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileNav } from "@/components/layout/mobile-nav";
import { LanguageProvider } from "@/components/providers/language-provider";
import { DecorativeBlobs } from "@/components/ui/decorative-blobs";
import { siteConfig } from "@/data/site-config";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-headline",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const savedLanguage = cookieStore.get("profile-lang")?.value;
  const initialLanguage = savedLanguage === "en" ? "en" : "vi";

  return (
    <html
      lang="en"
      className={`dark ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen overflow-x-hidden flex flex-col bg-background text-on-background font-body antialiased">
        <LanguageProvider initialLanguage={initialLanguage}>
          <Navbar />
          <main className="flex-1 pt-20 pb-20 md:pb-0">{children}</main>
          <Footer />
          <MobileNav />
          <DecorativeBlobs />
        </LanguageProvider>
      </body>
    </html>
  );
}
