/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'assets.tina.io',
      pathname: '**',
    },
  ],
  async rewrites() {
    return [{
      source: '/',
      destination: '/index'
    }]
  }
}

module.exports = nextConfig
