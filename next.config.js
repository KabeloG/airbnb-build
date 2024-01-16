/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    mapbox_key:
      "pk.eyJ1Ijoia2FiZWxvZyIsImEiOiJjbG80Mzk5YzkxaDFnMmpwamlqM3E0bHRrIn0.kP8wT9JGc9o3c5gSi9ScSg",
  },
};

module.exports = nextConfig;
