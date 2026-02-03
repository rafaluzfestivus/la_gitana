import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/cart/:path*',
        destination: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/cart/:path*`,
      },
      {
        source: '/checkout/:path*',
        destination: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/checkout/:path*`,
      },
    ];
  },
};

export default nextConfig;
