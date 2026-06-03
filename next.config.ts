import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   output: 'standalone',
   async rewrites() {
  return [
        {
          source: "/umami.js",
          destination: "http://76.13.111.34:3000/script.js",
        },
        {
          source: "/api/send",
          destination: "http://76.13.111.34:3000/api/send",
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
