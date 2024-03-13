/** @type {import('next').NextConfig} */
module.exports = {
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://localhost:5000/api/:path*',
			},
		]
	},
	webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
		config.module.rules.push({
			test: /\.mjs$/,
			include: /node_modules/,
			type: 'javascript/auto',
		})
		return config
	},
}
