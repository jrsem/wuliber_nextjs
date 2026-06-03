import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   output: 'standalone',
   async rewrites() {
  return [
        {
          source: "/umami.js",
          destination: "http://wuliber-umami-3102e8-76-13-111-34.sslip.io/script.js",
        },
        {
          source: "/api/send",
          destination: "http://wuliber-umami-3102e8-76-13-111-34.sslip.io/api/send",
        },
      ];
    },
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.wuliber.com",
      },
    ],
  },
};

export default nextConfig;
