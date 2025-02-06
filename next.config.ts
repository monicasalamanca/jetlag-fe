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
};

export default nextConfig;
module.exports = nextConfig;
