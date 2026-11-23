import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export a static site that can be hosted from Zoom.ph cPanel.
  output: "export",
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
