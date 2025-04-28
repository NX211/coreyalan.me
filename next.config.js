/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['raw.githubusercontent.com', 'github.com', 'avatars.githubusercontent.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
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
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, must-revalidate' }
        ]
      }
    ]
  },
  // Remove static export configuration for Cloud Run
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  // trailingSlash: true,
  // output: 'export',
  
  // Remove custom webpack rule for images - next/image handles this
  /*
  webpack: (config, { dev, isServer }) => {
    // Optimize image loading
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|avif)$/i,
      type: 'asset',
      parser: {
        dataUrlCondition: {
          maxSize: 10 * 1024, // 10kb
        },
      },
    });

    return config;
  },
  */
  
  env: {
    // Custom environment variables can go here
  },
  // For development only - disable in production builds
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
    dirs: ['src'], // Only run ESLint on the src directory
  },
  // Configure dynamic routes and API routes
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
      {
        source: '/auth/:path*',
        destination: '/auth/:path*',
      }
    ]
  },
  // Disable static optimization for API routes
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
  },
  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Configure runtime
  runtime: 'nodejs',
  // Configure server components
  serverComponents: true,
  // Configure static optimization
  staticPageGenerationTimeout: 1000,
  // Configure dynamic routes
  dynamicRoutes: [
    '/api/auth/register',
    '/api/auth/login',
    '/api/auth/callback',
    '/api/invoices',
    '/api/documents',
    '/api/opensign',
    '/api/webhooks'
  ]
};

module.exports = nextConfig; 