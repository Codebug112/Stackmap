"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { StakmapIcon } from "@/components/StakmapIcon";

export default function JoinPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    const email = inputRef.current?.value.trim() ?? "";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (inputRef.current) inputRef.current.style.borderColor = "var(--danger)";
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        if (data.error === "already_on_list") setStatus("duplicate");
        else { setErrorMsg(data.error ?? "Something went wrong"); setStatus("error"); }
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", fontFamily: "var(--font-inter)" }}>
      {/* Grid background */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px)",
        backgroundSize: "48px 48px", opacity: 0.25,
      }} />

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 40px",
        background: "rgba(8,12,16,0.88)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "var(--text-bright)", fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" }}>
          <StakmapIcon size={20} />
          Stakmap
        </a>
        <Link href="/blog" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-dim)", textDecoration: "none", letterSpacing: "0.3px" }}>
          Blog
        </Link>
      </nav>

      {/* Main content */}
      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        minHeight: "100vh", padding: "100px 24px 60px",
      }}>
        <div style={{
          background: "var(--surface)", border: "1px solid var(--border-bright)",
          borderRadius: 16, padding: "48px 40px", maxWidth: 480, width: "100%",
          boxShadow: "0 0 60px rgba(0,229,160,0.05)",
        }}>
          {/* Logo mark */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: "var(--accent-dim)", border: "1px solid var(--accent-mid)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <StakmapIcon size={24} />
            </div>
          </div>

          {status === "success" || status === "duplicate" ? (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12, color: "var(--accent)" }}>[ OK ]</div>
              <div style={{ fontFamily: "var(--font-inter)", fontSize: 18, fontWeight: 700, color: "var(--text-bright)", marginBottom: 8 }}>
                {status === "duplicate" ? "Already on the list." : "You're on the list."}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-dim)", lineHeight: 1.6 }}>
                {status === "duplicate"
                  ? "That email is already registered. We'll be in touch soon."
                  : "We'll email you the moment early access opens."}
              </div>
            </div>
          ) : (
            <>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "2px", textAlign: "center", marginBottom: 12 }}>
                // JOIN WAITLIST
              </div>
              <h1 style={{
                fontFamily: "var(--font-inter)", fontSize: 26, fontWeight: 800,
                color: "var(--text-bright)", letterSpacing: "-0.8px", textAlign: "center",
                marginBottom: 8, lineHeight: 1.2,
              }}>
                Get early access to Stakmap
              </h1>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-dim)", textAlign: "center", marginBottom: 28, lineHeight: 1.6 }}>
                Be first to know when we launch. No spam, one email when access opens.
              </p>

              <input
                ref={inputRef}
                type="email"
                placeholder="you@company.com"
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border-bright)")}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                style={{
                  width: "100%", boxSizing: "border-box",
                  background: "var(--bg)", border: "1px solid var(--border-bright)",
                  borderRadius: 10, padding: "14px 16px",
                  fontFamily: "var(--font-mono)", fontSize: 13,
                  color: "var(--text-bright)", outline: "none",
                  transition: "border-color 0.2s", marginBottom: 10,
                }}
              />
              <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                style={{
                  width: "100%", background: "var(--accent)", color: "#000",
                  border: "none", borderRadius: 10, padding: "14px",
                  fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 700,
                  cursor: status === "loading" ? "not-allowed" : "pointer",
                  opacity: status === "loading" ? 0.7 : 1, transition: "opacity 0.2s",
                }}
              >
                {status === "loading" ? "Adding you..." : "Add to waitlist →"}
              </button>

              {status === "error" && (
                <p style={{ fontSize: 12, color: "var(--danger)", marginTop: 6, fontFamily: "var(--font-mono)" }}>
                  {errorMsg}
                </p>
              )}
            </>
          )}
        </div>

        {/* Links */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, marginTop: 32 }}>
          <Link href="/blog" style={{
            fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-dim)",
            textDecoration: "none", display: "flex", alignItems: "center", gap: 6,
            border: "1px solid var(--border)", borderRadius: 6, padding: "8px 16px",
            background: "var(--surface)", transition: "border-color 0.15s",
          }}>
            Read the blog — integration guides and SaaS operations →
          </Link>

          <div style={{
            fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
          }}>
            <span>Questions? Find us on Reddit:</span>
            <a
              href="https://reddit.com/r/SaaS"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--accent)", textDecoration: "none" }}
            >
              u/stakmap on r/SaaS
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
