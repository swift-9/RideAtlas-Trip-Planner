import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip lint errors during deployment
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Skip TS errors during deployment
  },
  images: {
    remotePatterns: [
      {
        hostname: "bq6li5roc3.ufs.sh", // ✅ Required for UploadThing images
      },
    ],
  },
};

export default nextConfig;
