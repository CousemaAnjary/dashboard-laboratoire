import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["avatars.githubusercontent.com"], // 🔥 Autorise GitHub Avatars
  },
};

export default nextConfig;
