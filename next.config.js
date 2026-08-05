/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    domains: ['rama.server.my.id'],
  },
  // Untuk deploy ke Vercel atau standalone
  output: 'standalone',
}

module.exports = nextConfig
