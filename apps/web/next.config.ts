/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "minio.tschudea.de",
        port: "8999",               // Als STRING
        pathname: "/images/products/**",
      }
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;