/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  distDir: 'build',
  output: 'standalone',
}

module.exports = nextConfig
