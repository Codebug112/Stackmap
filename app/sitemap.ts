import type { MetadataRoute } from "next";

const BASE = "https://stakmap.com";
const NOW = new Date("2026-05-19");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Core pages
    { url: `${BASE}/`,                                          lastModified: NOW, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/demo`,                                      lastModified: NOW, changeFrequency: "weekly",  priority: 0.9 },

    // Blog index + posts — add every new post here
    { url: `${BASE}/blog`,                                      lastModified: NOW, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${BASE}/blog/how-to-monitor-saas-integrations`,     lastModified: NOW, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/blog/webhook-not-firing`,                   lastModified: NOW, changeFrequency: "monthly", priority: 0.9 },

    // Guides / tools
    { url: `${BASE}/integration-audit`,                         lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },

    // Supporting pages
    { url: `${BASE}/contact`,                                   lastModified: NOW, changeFrequency: "yearly",  priority: 0.4 },
    { url: `${BASE}/join`,                                      lastModified: NOW, changeFrequency: "yearly",  priority: 0.5 },
  ];
}
