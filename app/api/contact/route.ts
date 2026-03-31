                                                                                                                                                                                                                                                                                    import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  fullName?: string;
  email?: string;
  message?: string;
};

function missingEnv() {
  return !(
    process.env.SMTP_HOST &&
    process.env.SMTP_PORT &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.CONTACT_RECEIVER_EMAIL
  );
}

export async function POST(request: Request) {
  try {
    if (missingEnv()) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Missing SMTP env. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_RECEIVER_EMAIL.",
        },
        { status: 500 },
      );
    }

    const payload = (await request.json()) as ContactPayload;
    const fullName = payload.fullName?.trim();
    const email = payload.email?.trim();
    const message = payload.message?.trim();

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Profile Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER_EMAIL,
      replyTo: email,
      subject: `Liên hệ mới từ ${fullName}`,
      text: `Họ tên: ${fullName}\nEmail: ${email}\n\nNội dung:\n${message}`,
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6">
          <h2>Liên hệ mới từ website Profile</h2>
          <p><strong>Họ tên:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Nội dung:</strong></p>
          <p>${message.replace(/\n/g, "<br/>")}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to send email." },
      { status: 500 },
    );
  }
}
