import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "minio.tschudea.de",
        port: "",
        pathname: "/**", // erlaubt alle Pfade unter dieser Domain
      },
    ],
  },
};

export default nextConfig;