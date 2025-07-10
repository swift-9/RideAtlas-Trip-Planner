import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip lint issues during Vercel build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Skip TS errors during Vercel build
  },
  images: {
    remotePatterns: [
      {
        hostname: "bq6li5roc3.ufs.sh", // ✅ Allow UploadThing-hosted images
      },
    ],
  },
};

export default nextConfig;
