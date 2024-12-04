import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination:"/home",
        permanent: true,
      },
      {
        source: "/pokemon/:id",
        destination: "/home/pokemon/:id",
        permanent: false,
      },
    ]
  }
};

export default nextConfig;
