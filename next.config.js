/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	reactStrictMode: true,
	images: {
		// unoptimized: true,
		loader: 'custom',
		loaderFile: './my-loader.ts',
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				port: ''
			}
		]
	}
}

module.exports = nextConfig
