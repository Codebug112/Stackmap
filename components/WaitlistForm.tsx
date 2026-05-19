"use client";

import { useRef } from "react";

export default function WaitlistForm() {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit() {
    const raw = inputRef.current?.value.trim() ?? "";
    const domain = raw.replace(/^https?:\/\//, "").replace(/\/.*$/, "") || "yourcompany.com";
    window.location.href = `/demo?domain=${encodeURIComponent(domain)}`;
  }

  return (
    <div>
      <div className="wf-row" style={{ display: "flex", gap: 10 }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="yourcompany.com"
          onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
          onBlur={(e) => (e.target.style.borderColor = "var(--border-bright)")}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          style={{
            flex: 1,
            background: "var(--bg)",
            border: "1px solid var(--border-bright)",
            borderRadius: 10,
            padding: "14px 16px",
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            color: "var(--text-bright)",
            outline: "none",
            transition: "border-color 0.2s",
          }}
        />
        <button
          onClick={handleSubmit}
          style={{
            background: "var(--accent)",
            color: "#000",
            border: "none",
            borderRadius: 10,
            padding: "14px 24px",
            fontFamily: "var(--font-inter)",
            fontSize: 13,
            fontWeight: 700,
            cursor: "pointer",
            whiteSpace: "nowrap",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "0.9")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.opacity = "1")}
        >
          Try Beta (&lt;1 min) →
        </button>
      </div>
    </div>
  );
}
