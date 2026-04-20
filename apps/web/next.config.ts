/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "minio.tschudea.de",
				port: "8999", // Als STRING
				pathname: "/images/products/**",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "/**",
			},
		],
	},
	reactStrictMode: false,
};

export default nextConfig;
