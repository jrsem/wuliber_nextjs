import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   output: 'standalone',
  //  async rewrites() {
  // return [
  //       {
  //         source: "/umami.js",
  //         destination: "https://juniorsemerzier.dev/script.js",
  //       },
  //       {
  //         source: "/api/send",
  //         destination: "https://juniorsemerzier.dev/script.js/api/send",
  //       },
  //     ];
  //   },
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
