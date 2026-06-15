/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Upgraded from old domains format to modern remotePatterns
    remotePatterns: [
      { protocol: 'https', hostname: 'api.akool.com' },
      { protocol: 'https', hostname: 'images.clerk.dev' },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    CONVEX_DEPLOYMENT: process.env.CONVEX_DEPLOYMENT,
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    AKOOL_API_KEY: process.env.AKOOL_API_KEY,
    ARCJET_KEY: process.env.ARCJET_KEY,
    N8N_WEBHOOK_URL: process.env.N8N_WEBHOOK_URL,
  },
}

module.exports = nextConfig