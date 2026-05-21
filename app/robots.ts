import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Raw HTML files — canonical URLs use the /blog/* and /demo routes instead
        disallow: ["/demo.html", "/blog-post-1.html", "/blog-post-2.html"],
      },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "CCBot", disallow: "/" },
    ],
    sitemap: "https://stakmap.com/sitemap.xml",
  };
}
