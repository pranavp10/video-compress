// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Disable static optimization warnings for Electron
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Configure for electron static file serving
  assetPrefix: '',
  basePath: '',
  distDir: '.next', // Use .next directory for static builds
  // Force static generation without streaming
  generateBuildId: () => 'static-build',
  // Force static optimization - Pages Router only
  compiler: {
    removeConsole: false,
  },
  // Ensure no server-side features
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
};

export default nextConfig;