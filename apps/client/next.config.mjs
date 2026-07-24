/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@artful/shared"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "artfulaestheticmedicine.com" }],
        destination: "https://www.artfulaestheticmedicine.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
