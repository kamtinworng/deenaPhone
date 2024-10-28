/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist",

  async redirects() {
    return [
      {
        source: "/api/auth/Login",
        destination: "/CMS",
        permanent: true, // Set to false for temporary redirect
      },
    ];
  },
};

export default nextConfig;
