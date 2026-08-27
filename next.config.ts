import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: isDev,
    remotePatterns: [
      ...(isDev
        ? [
            {
              protocol: "http" as const,
              hostname: "localhost",
              pathname: "/blog/wp-content/uploads/**",
            },
          ]
        : []),
      {
        protocol: "https" as const,
        hostname: "yourdomain.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;