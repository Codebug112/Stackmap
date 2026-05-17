"use client";

import { useState, useRef } from "react";

export default function WaitlistForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "duplicate"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleSubmit() {
    const email = inputRef.current?.value ?? "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (inputRef.current) {
        inputRef.current.style.borderColor = "var(--danger)";
      }
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
        if (data.error === "already_on_list") {
          setStatus("duplicate");
        } else {
          setErrorMsg(data.error ?? "Something went wrong");
          setStatus("error");
        }
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (status === "success" || status === "duplicate") {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "4px 0" }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "var(--accent-dim)",
            border: "2px solid var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: 18,
            color: "var(--accent)",
          }}
        >
          ✓
        </div>
        <div>
          <div
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 15,
              fontWeight: 700,
              color: "var(--text-bright)",
              marginBottom: 3,
            }}
          >
            {status === "duplicate" ? "Already on the list." : "You're on the list."}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.5 }}>
            {status === "duplicate"
              ? "That email is already registered. We'll be in touch soon."
              : "We'll email you the moment early access opens."}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 10 }}>
        <input
          ref={inputRef}
          type="email"
          placeholder="you@company.com"
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
          disabled={status === "loading"}
          style={{
            background: "var(--accent)",
            color: "#000",
            border: "none",
            borderRadius: 10,
            padding: "14px 24px",
            fontFamily: "var(--font-inter)",
            fontSize: 13,
            fontWeight: 700,
            cursor: status === "loading" ? "not-allowed" : "pointer",
            whiteSpace: "nowrap",
            opacity: status === "loading" ? 0.7 : 1,
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => {
            if (status !== "loading")
              (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.opacity =
              status === "loading" ? "0.7" : "1";
          }}
        >
          {status === "loading" ? "Joining..." : "Join the waitlist →"}
        </button>
      </div>

      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--text-dim)",
          marginTop: 8,
        }}
      >
        Free stack audit template included with every signup.
      </p>

      {status === "error" && (
        <p
          style={{
            fontSize: 12,
            color: "var(--danger)",
            marginTop: 6,
            fontFamily: "var(--font-mono)",
          }}
        >
          {errorMsg}
        </p>
      )}

    </div>
  );
}
