"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { StakmapIcon } from "./StakmapIcon";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  function openWaitlistModal() {
    setMenuOpen(false);
    window.location.href = "/join";
  }

  function handleAnchor(id: string) {
    setMenuOpen(false);
    if (pathname === "/") scrollTo(id);
    else router.push(`/#${id}`);
  }

  const anchorLinks = [
    { label: "How it works", id: "how-it-works" },
    { label: "Features", id: "features" },
  ];

  const linkStyle = {
    letterSpacing: "0.3px",
    color: "var(--text-dim)",
    textDecoration: "none",
    transition: "color 0.15s",
    fontFamily: "var(--font-mono)",
    fontSize: 12,
  } as React.CSSProperties;

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 40px",
          background: "rgba(8,12,16,0.88)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <a
          href="/"
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 20,
            fontWeight: 800,
            color: "var(--text-bright)",
            letterSpacing: "-0.5px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
          }}
        >
          <StakmapIcon size={20} />
          Stakmap
        </a>

        {/* Desktop nav links */}
        <div
          className="nav-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--text-dim)",
          }}
        >
          {anchorLinks.map(({ label, id }) => (
            <span
              key={label}
              style={{ cursor: "pointer", letterSpacing: "0.3px", transition: "color 0.15s" }}
              onClick={() => handleAnchor(id)}
              onMouseEnter={(e) => ((e.currentTarget as HTMLSpanElement).style.color = "var(--text-bright)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLSpanElement).style.color = "var(--text-dim)")}
            >
              {label}
            </span>
          ))}
          <Link href="/blog" style={linkStyle}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-bright)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-dim)")}>
            Blog
          </Link>
          <Link href="/contact" style={linkStyle}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-bright)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-dim)")}>
            Contact
          </Link>
          <Link
            href="/demo"
            style={{
              ...linkStyle,
              color: "var(--accent)",
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(0,229,160,0.08)",
              border: "1px solid rgba(0,229,160,0.2)",
              borderRadius: 6,
              padding: "4px 10px",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,229,160,0.15)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,229,160,0.08)"; }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 6px var(--accent)", display: "inline-block" }} />
            Try Beta
          </Link>
        </div>

        {/* Right side: desktop CTA + mobile hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={openWaitlistModal}
            className="nav-waitlist-btn"
            style={{
              background: "var(--accent)",
              color: "#000",
              border: "none",
              borderRadius: 8,
              padding: "9px 18px",
              fontFamily: "var(--font-inter)",
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              animation: "wl-bob 1.8s ease-in-out infinite",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
              (e.currentTarget as HTMLButtonElement).style.animation = "none";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = "1";
              (e.currentTarget as HTMLButtonElement).style.animation = "wl-bob 1.8s ease-in-out infinite";
            }}
          >
            Join waitlist →
          </button>

          {/* Hamburger — mobile only */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            style={{
              display: "none",
              background: "none",
              border: "1px solid var(--border)",
              borderRadius: 6,
              color: "var(--text-dim)",
              fontSize: 18,
              cursor: "pointer",
              padding: "5px 9px",
              lineHeight: 1,
            }}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 61,
            left: 0,
            right: 0,
            zIndex: 99,
            background: "rgba(8,12,16,0.97)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            padding: "8px 0 12px",
          }}
        >
          {anchorLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => handleAnchor(id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                color: "var(--text-dim)",
                padding: "12px 24px",
                textAlign: "left",
                transition: "color 0.15s",
              }}
            >
              {label}
            </button>
          ))}
          {[
            { label: "Blog", href: "/blog" },
            { label: "Contact", href: "/contact" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                color: "var(--text-dim)",
                padding: "12px 24px",
                textDecoration: "none",
                display: "block",
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/demo"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 13,
              color: "var(--accent)",
              padding: "12px 24px",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", boxShadow: "0 0 6px var(--accent)", display: "inline-block" }} />
            Try Beta
          </Link>
          <div style={{ height: 1, background: "var(--border)", margin: "8px 24px" }} />
          <button
            onClick={openWaitlistModal}
            style={{
              background: "var(--accent)",
              color: "#000",
              border: "none",
              borderRadius: 8,
              margin: "4px 24px 0",
              padding: "11px 18px",
              fontFamily: "var(--font-inter)",
              fontSize: 13,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Join waitlist →
          </button>
        </div>
      )}
    </>
  );
}
