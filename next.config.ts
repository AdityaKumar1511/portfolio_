import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/profile.png',
      },
    ],
  },
};

export default nextConfig;
