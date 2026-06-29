/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  devIndicators: false,
  compress: true,
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
