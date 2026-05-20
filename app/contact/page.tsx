import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { StakmapIcon } from "@/components/StakmapIcon";
import { RedditCard } from "./RedditCard";

export const metadata: Metadata = {
  title: "Contact — Stakmap",
  description: "Contact the Stakmap team with questions about integration monitoring, early access, or partnership opportunities. We respond via Reddit DM.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Stakmap",
    description: "Contact the Stakmap team with questions about integration monitoring, early access, or partnership opportunities.",
    url: "/contact",
    type: "website",
  },
  twitter: { card: "summary" },
};


export default function ContactPage() {
  return (
    <>
      <Nav />

      <main style={{ paddingTop: 80 }}>
        <div
          style={{
            background: "var(--surface)",
            borderBottom: "1px solid var(--border)",
            padding: "60px 24px 52px",
          }}
        >
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
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
              GET IN TOUCH
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
              Say hello.
            </h1>
            <p
              style={{
                fontSize: 15,
                color: "var(--text-dim)",
                lineHeight: 1.7,
                fontFamily: "var(--font-inter)",
              }}
            >
              Questions, feedback, or just want to talk about integration
              monitoring — send a DM on Reddit.
            </p>
          </div>
        </div>

        <div style={{ maxWidth: 680, margin: "0 auto", padding: "52px 24px 100px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            <RedditCard />

            {/* Waitlist */}
            <div
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: "28px 32px",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 48, height: 48, borderRadius: 10,
                  background: "var(--accent-dim)", border: "1px solid var(--accent-mid)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00e5a0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    color: "var(--text-dim)",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  Early access
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 14,
                    color: "var(--text)",
                    marginBottom: 10,
                    lineHeight: 1.6,
                  }}
                >
                  Want to be among the first to use Stakmap? Join the waitlist
                  for early access and a free stack audit.
                </div>
                <Link
                  href="/#hero-form"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: "var(--accent)",
                    color: "#000",
                    borderRadius: 8,
                    padding: "9px 18px",
                    fontFamily: "var(--font-inter)",
                    fontSize: 13,
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  Get 70% off →
                </Link>
              </div>
            </div>

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
