import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/jetlagchronicles/**",
      },
    ],
  },
  // EMERGENCY: Completely disable trailing slash to break the loop
  trailingSlash: undefined,
  async redirects() {
    return [
      // Only handle non-www canonical domain redirects here
      { source: "/home", destination: "/", permanent: true },
      { source: "/chronicles", destination: "/blog", permanent: true },
      {
        source: "/thailand/chiang-mai-vs-bangkok-expat-guide-2025",
        destination: "/thailand/chiang-mai-vs-bangkok-expat-guide",
        permanent: true,
      },
      {
        source: "/thailand/thailand-scams-2025",
        destination: "/thailand/30-thailand-scams",
        permanent: true,
      },
      {
        source: "/thailand/thailand-scams",
        destination: "/thailand/30-thailand-scams",
        permanent: true,
      },
      {
        source: "/thailand/thailand-visa-border-run-guide-2025",
        destination: "/thailand/thailand-visa-border-run-guide",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
