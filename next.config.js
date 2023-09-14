/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	// images
	images: {
		domains: ["shadowfactorystorage.blob.core.windows.net"],
	},
};

module.exports = nextConfig;
