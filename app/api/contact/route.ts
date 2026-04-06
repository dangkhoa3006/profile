                                                                                                                                                                                                                                                                                    import { NextResponse } from "next/server";

type ContactPayload = {
  fullName?: string;
  email?: string;
  message?: string;
};

function missingEnv() {
  return !(process.env.RESEND_API_KEY && process.env.CONTACT_RECEIVER_EMAIL);
}

export async function POST(request: Request) {
  try {
    if (missingEnv()) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Missing email env. Please set RESEND_API_KEY and CONTACT_RECEIVER_EMAIL.",
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

    const fromEmail =
      process.env.CONTACT_FROM_EMAIL ?? "Profile Contact <onboarding@resend.dev>";

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [process.env.CONTACT_RECEIVER_EMAIL],
        reply_to: email,
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
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!resendResponse.ok) {
      const detail = await resendResponse.text();
      return NextResponse.json(
        { ok: false, error: "Failed to send email via Resend.", detail },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { ok: false, error: "Failed to send email." },
      { status: 500 },
    );
  }
}
