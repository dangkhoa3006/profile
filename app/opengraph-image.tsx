import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  const avatarUrl = "https://github.com/dangkhoa3006.png";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "radial-gradient(circle at 80% 10%, rgba(161,250,255,0.15), transparent 35%), #0e0e0f",
          color: "#ffffff",
          padding: "64px",
          fontFamily: "Inter, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 8,
            color: "#a1faff",
            textTransform: "uppercase",
          }}
        >
          Profile
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 44 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
            <div
              style={{
                fontSize: 66,
                lineHeight: 1.05,
                fontWeight: 800,
              }}
            >
              Nguyen Van Dang Khoa
            </div>
            <div
              style={{
                fontSize: 34,
                color: "#b3b3b7",
                maxWidth: 760,
                lineHeight: 1.3,
              }}
            >
              Fullstack Developer specializing in scalable systems, modern web
              apps, and high-performance user experiences.
            </div>
          </div>

          <img
            src={avatarUrl}
            alt="Nguyen Van Dang Khoa avatar"
            width={210}
            height={210}
            style={{
              borderRadius: "9999px",
              border: "4px solid rgba(161,250,255,0.7)",
              boxShadow: "0 0 36px rgba(161,250,255,0.35)",
              objectFit: "cover",
            }}
          />
        </div>

        <div
          style={{
            width: "100%",
            height: 2,
            background:
              "linear-gradient(90deg, rgba(161,250,255,0.9), rgba(184,132,255,0.7))",
          }}
        />
      </div>
    ),
    size,
  );
}
