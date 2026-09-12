/** @type {import('next').NextConfig} */
const CANONICAL_HOST = "www.artfulaestheticmedicine.com";
const APEX_HOST = "artfulaestheticmedicine.com";

const nextConfig = {
  transpilePackages: ["@artful/shared"],
  // Canonical URLs omit trailing slashes (except bare "/").
  trailingSlash: false,
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
      // Permanent path moves (308). Kept ahead of host rules.
      {
        source: "/admin/login",
        destination: "/login",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/",
        permanent: true,
      },
      {
        source: "/services/",
        destination: "/",
        permanent: true,
      },

      // Apex + trailing slash → www without slash (avoids www slash-strip hop).
      {
        source: "/:path+/",
        has: [{ type: "host", value: APEX_HOST }],
        destination: `https://${CANONICAL_HOST}/:path+`,
        permanent: true,
      },
      // Apex → www (paths without trailing slash, including "/").
      {
        source: "/:path*",
        has: [{ type: "host", value: APEX_HOST }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
