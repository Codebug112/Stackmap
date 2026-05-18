/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/demo", destination: "/demo.html" },
    ];
  },
};

export default nextConfig;
