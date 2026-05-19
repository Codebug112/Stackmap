/** @type {import('next').NextConfig} */

const CSP = [
  "default-src 'self'",
  // 'unsafe-inline' required: inline GA script + JSON-LD in layout.tsx, inline scripts in demo/blog HTML
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
  // 'unsafe-inline' required: Next.js/React inline styles + demo/blog HTML inline styles
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com",
  "frame-src 'none'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  // Force HTTPS for 2 years; include subdomains
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Disallow framing by third-party origins (legacy browsers)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Restrict referrer info sent to cross-origin requests
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable sensors/hardware APIs we don't use
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Content-Security-Policy", value: CSP },
];

const nextConfig = {
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async rewrites() {
    return [
      { source: "/demo", destination: "/demo.html" },
      { source: "/blog/how-to-monitor-saas-integrations", destination: "/blog-post-1.html" },
      { source: "/blog/webhook-not-firing", destination: "/blog-post-2.html" },
    ];
  },
};

export default nextConfig;
