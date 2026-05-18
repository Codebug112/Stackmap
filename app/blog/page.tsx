import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { StakmapIcon } from "@/components/StakmapIcon";
import { PostCard } from "./PostCard";

export const metadata: Metadata = {
  title: "Integration Monitoring Guides & Resources — Stakmap Blog",
  description:
    "Practical guides on integration monitoring, webhook failures, Zapier management, and SaaS stack visibility. Built for SaaS founders and ops teams.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Integration Monitoring Guides & Resources — Stakmap Blog",
    description: "Practical guides on integration monitoring, webhook failures, Zapier management, and SaaS stack visibility. Built for SaaS founders and ops teams.",
    url: "/blog",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const posts = [
  {
    tag: "GUIDE",
    date: "May 2026",
    title: "How to sort out your SaaS integrations in 20 minutes",
    desc: "A step-by-step walkthrough for mapping every tool, finding what's broken, and cutting what's dead — without needing a developer.",
    href: "/integration-audit",
    readTime: "8 min read",
  },
];

const COMING = [
  "Why webhooks fail silently — and how to catch them",
  "The hidden cost of zombie SaaS tools",
  "OAuth token hygiene: the ex-employee access problem",
  "How to audit your stack before a SOC2 assessment",
  "Build vs buy: when to replace a Zapier flow with custom code",
];

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Stakmap Blog",
            "url": "https://stakmap.com/blog",
            "description": "Guides, teardowns, and practical frameworks for founders who want to understand and control their SaaS stack.",
            "publisher": {
              "@type": "Organization",
              "name": "Stakmap",
              "url": "https://stakmap.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://stakmap.com/icon.svg"
              }
            },
            "blogPost": [
              {
                "@type": "BlogPosting",
                "headline": "How to sort out your SaaS integrations in 20 minutes",
                "description": "A step-by-step walkthrough for mapping every tool, finding what's broken, and cutting what's dead — without needing a developer.",
                "url": "https://stakmap.com/integration-audit",
                "datePublished": "2026-05-01",
                "author": {
                  "@type": "Organization",
                  "name": "Stakmap",
                  "url": "https://stakmap.com"
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "Stakmap",
                  "url": "https://stakmap.com"
                },
                "timeRequired": "PT8M"
              }
            ]
          })
        }}
      />
      <Nav />

      <main style={{ paddingTop: 80 }}>
        {/* Header */}
        <div
          style={{
            background: "var(--surface)",
            borderBottom: "1px solid var(--border)",
            padding: "60px 24px 52px",
          }}
        >
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <div
              style={{
                display: "inline-block",
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--accent)",
                background: "var(--accent-dim)",
                border: "1px solid var(--accent-mid)",
                borderRadius: 4,
                padding: "4px 10px",
                letterSpacing: 1,
                marginBottom: 20,
              }}
            >
              BLOG & RESOURCES
            </div>
            <h1
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: "clamp(32px, 5vw, 52px)",
                fontWeight: 800,
                color: "var(--text-bright)",
                letterSpacing: "-1.5px",
                lineHeight: 1.05,
                marginBottom: 14,
              }}
            >
              Guides for founders
              <br />
              <span style={{ color: "var(--accent)" }}>who own their stack.</span>
            </h1>
            <p
              style={{
                fontSize: 15,
                color: "var(--text-dim)",
                lineHeight: 1.7,
                fontFamily: "var(--font-inter)",
              }}
            >
              Practical frameworks for mapping integrations, catching silent failures,
              and cutting the tools you&apos;re still paying for out of fear.
            </p>
          </div>
        </div>

        {/* Posts */}
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "52px 24px 100px" }}>

          {/* Published */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--accent)",
              letterSpacing: "1.5px",
              marginBottom: 20,
              textTransform: "uppercase",
            }}
          >
            // PUBLISHED
          </div>

          {posts.map((post) => (
            <PostCard key={post.href} post={post} />
          ))}

          {/* Coming soon */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--text-dim)",
              letterSpacing: "1.5px",
              marginBottom: 20,
              marginTop: 52,
              textTransform: "uppercase",
            }}
          >
            // COMING SOON
          </div>

          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            {COMING.map((title, i) => (
              <div
                key={i}
                style={{
                  padding: "18px 24px",
                  borderBottom: i < COMING.length - 1 ? "1px solid var(--border)" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--text-dim)",
                    background: "var(--surface2)",
                    border: "1px solid var(--border)",
                    borderRadius: 4,
                    padding: "2px 7px",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  SOON
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 14,
                    color: "var(--text-dim)",
                  }}
                >
                  {title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "28px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--text-dim)",
          maxWidth: 1100,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 15,
            fontWeight: 800,
            color: "var(--text-bright)",
            letterSpacing: "-0.5px",
            display: "flex",
            alignItems: "center",
            gap: 7,
          }}
        >
          <StakmapIcon size={16} />
          Stakmap
        </div>
        <div>© 2026 Stakmap. All rights reserved.</div>
        <div>Built for founders who&apos;ve been burned.</div>
      </div>
    </>
  );
}
