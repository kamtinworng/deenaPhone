/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist",

  async redirects() {
    return [
      {
        source: "/",
        destination: "/Home",
        permanent: true, // Set to false for temporary redirect
      },
      {
        source: "/Home",
        destination: "/api/auth/Login",
        permanent: true, // Set to false for temporary redirect
      },
      {
        source: "/api/auth/Login",
        destination: "/CMS",
        permanent: true, // Set to false for temporary redirect
      },
    ];
  },
};

export default nextConfig;
