/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	compiler: {
		removeConsole: process.env.NODE_ENV === 'production',
	},
	experimental: {
		optimizePackageImports: ['lucide-react', 'framer-motion'],
		incrementalCacheHandlerPath: false,
	},
	images: {
		unoptimized: true,
	},
	output: 'export',
};

module.exports = nextConfig;
