/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['cdn.sanity.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  // Moved from experimental to root level
  serverExternalPackages: ['@sanity/image-url', '@sanity/vision'],
  experimental: {
    // Remove serverComponentsExternalPackages from here
  },
}

export default nextConfig
