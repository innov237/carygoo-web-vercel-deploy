import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'http', 
      hostname: '**', 
      pathname: '/**',
    },
    {
      protocol: 'https', 
      hostname: '**', 
      pathname: '/**',
    },],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;