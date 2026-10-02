import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The backend contract uses this name. Next only exposes explicitly listed
  // environment values to browser bundles.
  env: {
    VITE_TRUSTFLOW_API_URL: process.env.VITE_TRUSTFLOW_API_URL,
  },
};

export default nextConfig;
