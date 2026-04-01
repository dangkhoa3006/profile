import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep Tailwind / lightningcss on the Node resolution path (native .node addons break when Turbopack bundles them).
  serverExternalPackages: [
    "lightningcss",
    "@tailwindcss/node",
    "@tailwindcss/postcss",
  ],
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
