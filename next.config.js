/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.buymeacoffee.com",
        pathname: "/buttons/v2/**",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com",
        pathname: "/external-flaticons-flat-flat-icons/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/questions",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
