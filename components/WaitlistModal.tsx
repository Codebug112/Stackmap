"use client";

import { useEffect, useRef, useState } from "react";

export function WaitlistModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setStatus("idle");
      setEmail("");
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function submit() {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.status === 409 || data?.error?.includes("duplicate")) setStatus("duplicate");
      else if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(8,12,16,0.92)", backdropFilter: "blur(10px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: "40px 36px",
          width: "100%",
          maxWidth: 420,
          position: "relative",
          boxShadow: "0 0 60px rgba(0,229,160,0.08)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 18,
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "var(--font-mono)", fontSize: 11,
            color: "var(--text-dim)", padding: "4px 8px",
          }}
        >
          Skip →
        </button>

        <div style={{
          fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "1px",
          color: "var(--accent)", marginBottom: 14, opacity: 0.7,
        }}>
          // JOIN THE WAITLIST
        </div>

        {status === "success" || status === "duplicate" ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>✓</div>
            <div style={{ fontFamily: "var(--font-inter)", fontSize: 18, fontWeight: 700, color: "var(--text-bright)", marginBottom: 8 }}>
              {status === "duplicate" ? "You're already on the list." : "You're in."}
            </div>
            <div style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "var(--text-dim)" }}>
              {status === "duplicate" ? "We already have your email — we'll reach out when access opens." : "We'll email you the moment early access opens."}
            </div>
          </div>
        ) : (
          <>
            <h2 style={{
              fontFamily: "var(--font-inter)", fontSize: 26, fontWeight: 800,
              color: "var(--text-bright)", lineHeight: 1.25, marginBottom: 10,
            }}>
              Get early access<br />to Stakmap.
            </h2>
            <p style={{
              fontFamily: "var(--font-inter)", fontSize: 13, color: "var(--text-dim)",
              lineHeight: 1.6, marginBottom: 24,
            }}>
              Be first when we launch. No spam — one email when access opens.
            </p>

            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
              <input
                ref={inputRef}
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && submit()}
                style={{
                  flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid var(--border)",
                  borderRadius: 8, padding: "11px 14px", fontFamily: "var(--font-inter)",
                  fontSize: 13, color: "var(--text-bright)", outline: "none",
                }}
              />
              <button
                onClick={submit}
                disabled={status === "loading"}
                style={{
                  background: "var(--accent)", color: "#000", border: "none", borderRadius: 8,
                  padding: "11px 18px", fontFamily: "var(--font-inter)", fontSize: 13,
                  fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap",
                  animation: "wl-bob 1.8s ease-in-out infinite",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.85"; (e.currentTarget as HTMLButtonElement).style.animation = "none"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; (e.currentTarget as HTMLButtonElement).style.animation = "wl-bob 1.8s ease-in-out infinite"; }}
              >
                {status === "loading" ? "..." : "Join waitlist →"}
              </button>
            </div>

            {status === "error" && (
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--danger)", marginBottom: 12 }}>
                Something went wrong — try again.
              </p>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                "Free early access — no credit card needed",
                "Founder discount locked in for life",
                "Direct line to the founders",
              ].map((b) => (
                <div key={b} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: "var(--accent)", fontFamily: "var(--font-mono)", fontSize: 11 }}>✓</span>
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: 12, color: "var(--text-dim)" }}>{b}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        @keyframes wl-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
