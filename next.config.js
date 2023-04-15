/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost", "i.seadn.io", "i.ibb.co", "linea.build"],
  },
}

module.exports = nextConfig
