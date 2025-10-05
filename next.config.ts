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
  // Canonical = NO trailing slash
  trailingSlash: false,

  async redirects() {
    return [
      // --- Host + slash normalization: FORCE ABSOLUTE REDIRECTS ---
      // www with trailing slash -> apex no slash (one hop)
      {
        source: "/:path+/",
        has: [{ type: "host", value: "www.thejetlagchronicles.com" }],
        destination: "https://thejetlagchronicles.com/:path+",
        permanent: true,
      },
      // www without trailing slash -> apex no slash
      {
        source: "/:path+",
        has: [{ type: "host", value: "www.thejetlagchronicles.com" }],
        destination: "https://thejetlagchronicles.com/:path+",
        permanent: true,
      },
      // Root www -> apex
      {
        source: "/",
        has: [{ type: "host", value: "www.thejetlagchronicles.com" }],
        destination: "https://thejetlagchronicles.com/",
        permanent: true,
      },

      // --- Your content redirects (unchanged) ---
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
