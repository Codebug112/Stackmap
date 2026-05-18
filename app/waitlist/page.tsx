import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're on the waitlist — Stakmap",
  robots: { index: false, follow: false },
};

export default function WaitlistPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        position: "relative",
        zIndex: 1,
        textAlign: "center",
      }}
    >
      <div
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border-bright)",
          borderRadius: 20,
          padding: "48px 40px",
          maxWidth: 480,
          width: "100%",
          boxShadow: "0 0 80px rgba(0,229,160,0.07)",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 18,
            fontWeight: 800,
            color: "var(--text-bright)",
            letterSpacing: "-0.5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginBottom: 36,
          }}
        >
          <div
            className="animate-pulse-dot"
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--accent)",
              boxShadow: "0 0 10px var(--accent)",
            }}
          />
          Stakmap
        </div>

        {/* Check */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "var(--accent-dim)",
            border: "2px solid var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            fontSize: 28,
            color: "var(--accent)",
          }}
        >
          ✓
        </div>

        <h1
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 32,
            fontWeight: 800,
            color: "var(--text-bright)",
            letterSpacing: "-1px",
            marginBottom: 12,
          }}
        >
          You&apos;re on the list.
        </h1>
        <p
          style={{
            fontSize: 15,
            color: "var(--text-dim)",
            lineHeight: 1.7,
            marginBottom: 32,
          }}
        >
          We&apos;ll email you the moment early access opens. As an early member,
          you&apos;ll get Stakmap{" "}
          <strong style={{ color: "var(--text)" }}>free</strong>.
        </p>

        <div
          style={{
            background: "var(--bg)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "16px 20px",
            fontFamily: "var(--font-mono)",
            fontSize: 12,
            color: "var(--text-dim)",
            lineHeight: 1.6,
            textAlign: "left",
          }}
        >
          <span style={{ color: "var(--accent)" }}>// what happens next</span>
          <br />
          We&apos;re building in public. Expect updates, early previews, and the
          occasional behind-the-scenes look at what we&apos;re shipping.
        </div>

        <div
          style={{
            marginTop: 32,
            paddingTop: 24,
            borderTop: "1px solid var(--border)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--text-dim)",
          }}
        >
          Stakmap — See every integration. Know what&apos;s breaking.
        </div>
      </div>
    </div>
  );
}
