/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  output: 'standalone',
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
  },
  // Enable React strict mode for better development practices
  reactStrictMode: true,
  // Configure proper headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
  // Remove static export configuration for Cloud Run
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  // trailingSlash: true,
  // output: 'export',
}

module.exports = nextConfig 