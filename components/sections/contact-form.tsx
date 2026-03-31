"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { socialLinks } from "@/data/site-config";
import { useLanguage } from "@/components/providers/language-provider";
import Link from "next/link";

export function ContactForm() {
  const { language } = useLanguage();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [popup, setPopup] = useState<{ text: string; isError: boolean } | null>(null);

  function showPopup(text: string, isError = false) {
    setPopup({ text, isError });
    window.setTimeout(() => {
      setPopup(null);
    }, 30000);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !message.trim()) {
      window.alert(
        language === "vi"
          ? "Vui lòng nhập đầy đủ họ tên, email và nội dung."
          : "Please fill in full name, email, and message.",
      );
      return;
    }

    try {
      setIsSending(true);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Send failed");
      }

      setFullName("");
      setEmail("");
      setMessage("");
      showPopup(
        language === "vi"
          ? "Gửi thành công. Mình sẽ phản hồi sớm."
          : "Message sent successfully. I will reply soon.",
      );
    } catch {
      showPopup(
        language === "vi"
          ? "Gửi thất bại. Vui lòng thử lại."
          : "Failed to send message. Please try again.",
        true,
      );
    } finally {
      setIsSending(false);
    }
  }

  return (
    <section className="py-32 px-6 bg-surface-container-low animate-fade-in" id="contact">
      {popup ? (
        <div
          className={`fixed top-6 right-6 z-50 rounded-md border px-4 py-3 text-sm shadow-lg backdrop-blur-md animate-fade-in ${
            popup.isError
              ? "bg-red-500/15 border-red-400/50 text-red-200"
              : "bg-primary/15 border-primary/50 text-primary"
          }`}
          role="status"
          aria-live="polite"
        >
          <div className="flex items-start gap-3">
            <p>{popup.text}</p>
            <button
              type="button"
              aria-label={language === "vi" ? "Đóng thông báo" : "Close notification"}
              onClick={() => setPopup(null)}
              className="ml-1 text-current/80 hover:text-current transition-colors leading-none"
            >
              X
            </button>
          </div>
        </div>
      ) : null}

      <div className="max-w-4xl mx-auto glass-panel p-12 rounded-2xl relative">
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/10 rounded-full blur-3xl" />

        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl font-bold tracking-tighter mb-4">
            {language === "vi" ? "LIÊN" : "GET IN"}{" "}
            <span className="text-primary">
              {language === "vi" ? "HỆ" : "TOUCH"}
            </span>
          </h2>
          <p className="text-on-surface-variant">
            {language === "vi"
              ? "Hãy trao đổi về dự án tiếp theo của bạn."
              : "Let's discuss your next breakthrough project."}
          </p>
        </div>

        <form
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-mono text-[10px] text-outline uppercase tracking-widest ml-1">
                {language === "vi" ? "Họ và tên" : "Full Name"}
              </label>
              <input
                className="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-0 rounded-md text-on-surface px-4 py-3 transition-all outline-none"
                placeholder={language === "vi" ? "Nguyễn Văn A" : "John Doe"}
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="font-mono text-[10px] text-outline uppercase tracking-widest ml-1">
                {language === "vi" ? "Email" : "Email Address"}
              </label>
              <input
                className="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-0 rounded-md text-on-surface px-4 py-3 transition-all outline-none"
                placeholder={
                  language === "vi" ? "ban@example.com" : "john@example.com"
                }
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-mono text-[10px] text-outline uppercase tracking-widest ml-1">
              {language === "vi" ? "Nội dung" : "Message"}
            </label>
            <textarea
              className="w-full bg-surface-container-lowest border border-outline-variant focus:border-primary focus:ring-0 rounded-md text-on-surface px-4 py-3 transition-all outline-none resize-none"
              placeholder={
                language === "vi"
                  ? "Mình có thể hỗ trợ bạn điều gì?"
                  : "How can I help you?"
              }
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <Button
            variant="primary"
            size="lg"
            fullWidth
            type="submit"
            disabled={isSending}
            className={isSending ? "opacity-70 cursor-not-allowed" : undefined}
          >
            {isSending
              ? language === "vi"
                ? "Đang gửi..."
                : "Sending..."
              : language === "vi"
                ? "Gửi liên hệ"
                : "Send Message"}
          </Button>
        </form>

        <div className="mt-12 pt-12 border-t border-outline-variant flex flex-wrap justify-center gap-8">
          {socialLinks
            .filter((l) => ["Email", "LinkedIn", "GitHub"].includes(l.label))
            .map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-mono text-xs uppercase tracking-widest"
              >
                <span className="material-symbols-outlined text-sm">
                  {link.icon}
                </span>
                {link.label}
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
