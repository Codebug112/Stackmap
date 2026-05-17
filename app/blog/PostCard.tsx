"use client";

import Link from "next/link";

interface Post {
  tag: string;
  date: string;
  title: string;
  desc: string;
  href: string;
  readTime: string;
}

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={post.href} style={{ textDecoration: "none", display: "block" }}>
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 14,
          padding: "28px 32px",
          marginBottom: 16,
          transition: "border-color 0.2s, transform 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-bright)";
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
          (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--accent)",
              background: "var(--accent-dim)",
              border: "1px solid var(--accent-mid)",
              borderRadius: 4,
              padding: "2px 8px",
              letterSpacing: "0.5px",
            }}
          >
            {post.tag}
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)" }}>
            {post.date} · {post.readTime}
          </span>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 20,
            fontWeight: 700,
            color: "var(--text-bright)",
            letterSpacing: "-0.4px",
            marginBottom: 8,
            lineHeight: 1.3,
          }}
        >
          {post.title}
        </h2>
        <p
          style={{
            fontSize: 14,
            color: "var(--text-dim)",
            lineHeight: 1.7,
            fontFamily: "var(--font-inter)",
          }}
        >
          {post.desc}
        </p>
        <div style={{ marginTop: 16, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)" }}>
          Read the guide →
        </div>
      </div>
    </Link>
  );
}
