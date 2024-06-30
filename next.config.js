/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [{
      source: '/',
      destination: '/index'
    }]
  }
}

module.exports = nextConfig
