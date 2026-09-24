/** @type {import('next').NextConfig} */

const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.coolerguru.com",
      },
    ],
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production",
  },
};

export default nextConfig;