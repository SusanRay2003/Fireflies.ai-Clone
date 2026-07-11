import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/meetings",
        destination: "/notebook/mine",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
