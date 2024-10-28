/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist",
};

module.exports = {
  async redirects() {
    return [
      {
        source: "/api/auth/Login",
        destination: "/CMS",
        permanent: true, // หรือ false ถ้าต้องการให้เป็น temporary redirect
      },
    ];
  },
};

export default nextConfig;
