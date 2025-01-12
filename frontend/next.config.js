/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['./src/styles'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig 