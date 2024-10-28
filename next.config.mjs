/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/api/auth/Login",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
