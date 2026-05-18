"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { StakmapIcon } from "./StakmapIcon";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Nav() {
  const pathname = usePathname();
  const router = useRouter();

  function scrollToForm() {
    if (pathname === "/") {
      const el = document.getElementById("hero-form");
      el?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        (el?.querySelector('input[type="email"]') as HTMLInputElement | null)?.focus();
      }, 600);
    } else {
      router.push("/#hero-form");
    }
  }

  const anchorLinks = [
    { label: "How it works", id: "how-it-works" },
    { label: "Features", id: "features" },
  ];

  return (
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
            onClick={() => pathname === "/" ? scrollTo(id) : router.push(`/#${id}`)}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLSpanElement).style.color = "var(--text-bright)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLSpanElement).style.color = "var(--text-dim)")
            }
          >
            {label}
          </span>
        ))}
        <Link
          href="/blog"
          style={{
            letterSpacing: "0.3px",
            color: "var(--text-dim)",
            textDecoration: "none",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-bright)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-dim)")
          }
        >
          Blog
        </Link>
        <Link
          href="/contact"
          style={{
            letterSpacing: "0.3px",
            color: "var(--text-dim)",
            textDecoration: "none",
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-bright)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-dim)")
          }
        >
          Contact
        </Link>
        <Link
          href="/demo"
          style={{
            letterSpacing: "0.3px",
            color: "var(--accent)",
            textDecoration: "none",
            transition: "all 0.15s",
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(0,229,160,0.08)",
            border: "1px solid rgba(0,229,160,0.2)",
            borderRadius: 6,
            padding: "4px 10px",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,229,160,0.15)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0,229,160,0.08)";
          }}
        >
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "var(--accent)",
            boxShadow: "0 0 6px var(--accent)",
            display: "inline-block",
          }} />
          Try Beta <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "rgba(0,229,160,0.7)", marginLeft: 2 }}>(&lt;1 min)</span>
        </Link>
      </div>

      <button
        onClick={scrollToForm}
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
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.opacity = "0.85")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
        }
      >
        Join waitlist →
      </button>
    </nav>
  );
}
