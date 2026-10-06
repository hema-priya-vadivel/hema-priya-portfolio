import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the dev-only route indicator (the "N" button); errors are still shown.
  devIndicators: false,
};

export default nextConfig;
