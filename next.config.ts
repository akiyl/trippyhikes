/** @type {import('next').NextConfig} */
const isVercelBuild = process.env.VERCEL === "1";

module.exports = {
  output: "standalone",
  experimental: {
    instrumentationHook: false,
  },
  env: {
    SKIP_DB_BUILD: isVercelBuild ? "true" : "false",
  },
};

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "media.istockphoto.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

module.exports = nextConfig;
