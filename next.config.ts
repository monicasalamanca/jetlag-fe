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
  // Disable automatic trailing slash handling - we handle it explicitly in redirects
  // trailingSlash: false,

  async redirects() {
    return [
      // --- WWW DOMAIN redirects (www.thejetlagchronicles.com) ---
      // Specific common paths
      {
        source: "/thailand/",
        has: [{ type: "host", value: "www.thejetlagchronicles.com" }],
        destination: "https://thejetlagchronicles.com/thailand",
        permanent: true,
      },
      {
        source: "/blog/",
        has: [{ type: "host", value: "www.thejetlagchronicles.com" }],
        destination: "https://thejetlagchronicles.com/blog",
        permanent: true,
      },
      // Generic www redirects (fallback)
      {
        source: "/:path+/",
        has: [{ type: "host", value: "www.thejetlagchronicles.com" }],
        destination: "https://thejetlagchronicles.com/:path+",
        permanent: true,
      },
      {
        source: "/:path+",
        has: [{ type: "host", value: "www.thejetlagchronicles.com" }],
        destination: "https://thejetlagchronicles.com/:path+",
        permanent: true,
      },
      {
        source: "/",
        has: [{ type: "host", value: "www.thejetlagchronicles.com" }],
        destination: "https://thejetlagchronicles.com",
        permanent: true,
      },

      // --- APEX DOMAIN trailing slash removal (thejetlagchronicles.com) ---
      {
        source: "/:path+/",
        has: [{ type: "host", value: "thejetlagchronicles.com" }],
        destination: "https://thejetlagchronicles.com/:path+",
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
