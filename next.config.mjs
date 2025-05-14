/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure images from Sanity are allowed
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  
  // This is important for Sanity Studio to work correctly
  transpilePackages: ['next-sanity'],
  
  // Ignore TypeScript and ESLint errors during build (optional)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Allow Sanity Studio to run in an iframe
  async headers() {
    return [
      {
        source: '/studio/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
        ],
      },
    ]
  },
}

export default nextConfig
