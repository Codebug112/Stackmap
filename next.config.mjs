/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: "/demo", destination: "/demo.html" },
      { source: "/blog/how-to-monitor-saas-integrations", destination: "/blog-post-1.html" },
    ];
  },
};

export default nextConfig;
