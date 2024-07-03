/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['assets.tina.io'],
  },
  async rewrites() {
    return [{
      source: '/',
      destination: '/index'
    }]
  }
}

module.exports = nextConfig
