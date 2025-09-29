import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/jetlagchronicles/**",
        search: "",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
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
module.exports = nextConfig;
