import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // TLS証明書の問題を解決
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
};

export default nextConfig;
