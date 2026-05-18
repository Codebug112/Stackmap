"use client";

import Link from "next/link";
import WaitlistForm from "@/components/WaitlistForm";
import { Nav } from "@/components/Nav";
import { StakmapIcon } from "@/components/StakmapIcon";

const tickerItems = [
  { type: "danger", text: "Stripe webhook silent for 4 days — 23 failed payments missed" },
  { type: "warn", text: "HubSpot sync last fired 18 days ago — nobody noticed" },
  { type: "danger", text: "Zapier zap disabled — onboarding emails stopped sending" },
  { type: "warn", text: "API key expired — CRM data stopped flowing to data warehouse" },
  { type: "danger", text: "Ex-employee OAuth token still active — accessing customer data" },
  { type: "warn", text: "Make.com scenario erroring — 0 new leads synced in 6 days" },
  { type: "danger", text: "Intercom integration broken — support tickets not creating records" },
];

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <TickerStrip />
      <PainSection />
      <SocialProof />
      <HowItWorks />
      <FeaturesSection />
      <FooterCTA />
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1100,
        margin: "0 auto",
        padding: "140px 24px 80px",
      }}
    >
      <div className="split">
        <div>
          <div
            className="animate-fade-up"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-dim)",
              border: "1px solid var(--border-bright)",
              borderRadius: 20,
              padding: "6px 14px",
              marginBottom: 32,
              letterSpacing: "0.5px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--danger)",
                boxShadow: "0 0 6px var(--danger)",
                flexShrink: 0,
              }}
            />
            ⚡ Beta now live — try the interactive demo
          </div>

          <h1
            className="animate-fade-up-1"
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-2.5px",
              color: "var(--text-bright)",
              marginBottom: 24,
            }}
          >
            You&apos;re connected
            <br />
            to everything.
            <br />
            <span className="gradient-text">You can see nothing.</span>
          </h1>

          <p
            className="animate-fade-up-2"
            style={{
              fontSize: 17,
              color: "var(--text-dim)",
              lineHeight: 1.7,
              marginBottom: 40,
              maxWidth: 460,
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
            }}
          >
            The world&apos;s most precise integration monitoring tool for SaaS teams.
            Right now, something in your stack is broken and you don&apos;t know it.
            Stakmap shows you exactly what, why, and how to fix it — before your
            customers find out first.
          </p>

          <div className="animate-fade-up-3" id="hero-form">
            <WaitlistForm />
            <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)" }}>or</span>
              <a
                href="/demo"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                  color: "var(--accent)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  border: "1px solid rgba(0,229,160,0.25)",
                  borderRadius: 6,
                  padding: "6px 14px",
                  background: "rgba(0,229,160,0.06)",
                  transition: "background 0.15s",
                }}
              >
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "var(--accent)",
                  boxShadow: "0 0 5px var(--accent)",
                  display: "inline-block",
                  flexShrink: 0,
                }} />
                Try the interactive beta demo →
              </a>
            </div>
          </div>
        </div>

        <div className="mobile-order-first">
          <HeroMapMockup />
        </div>
      </div>
    </section>
  );
}

function HeroMapMockup() {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border-bright)",
        borderRadius: 14,
        overflow: "hidden",
        boxShadow: "0 0 80px rgba(0,229,160,0.07)",
      }}
    >
      {/* Browser chrome */}
      <div
        style={{
          background: "var(--surface2)",
          borderBottom: "1px solid var(--border)",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div
          style={{
            flex: 1,
            textAlign: "center",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--text-dim)",
          }}
        >
          Stakmap — acme.com
        </div>
      </div>

      {/* Tab bar */}
      <div
        style={{
          borderBottom: "1px solid var(--border)",
          padding: "0 16px",
          display: "flex",
        }}
      >
        {["Overview", "Map", "Alerts (2)"].map((tab, i) => (
          <div
            key={tab}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              padding: "10px 14px",
              color: i === 1 ? "var(--accent)" : "var(--text-dim)",
              borderBottom: i === 1 ? "2px solid var(--accent)" : "2px solid transparent",
              marginBottom: -1,
            }}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* SVG map area — all coordinates in a single space, lines connect to circle edges */}
      <div style={{ position: "relative", height: 300 }}>
        <svg
          viewBox="0 0 340 260"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          <defs>
            <filter id="you-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── Lines (edge-to-edge, computed from centre ± radius) ── */}

          {/* YOU → Stripe (green solid) */}
          <line x1="151" y1="105" x2="84" y2="51" stroke="#00e5a0" strokeWidth="2" />
          {/* YOU → HubSpot (green solid) */}
          <line x1="146" y1="120" x2="53" y2="120" stroke="#00e5a0" strokeWidth="2" />
          {/* YOU → Segment (green solid) */}
          <line x1="151" y1="135" x2="84" y2="189" stroke="#00e5a0" strokeWidth="2" />
          {/* YOU → Zapier (red dashed — broken) */}
          <line x1="189" y1="105" x2="256" y2="51" stroke="#ff4d6a" strokeWidth="2" strokeDasharray="6,4" />
          {/* YOU → Intercom (amber dashed — warning) */}
          <line x1="194" y1="120" x2="287" y2="120" stroke="#ff8c42" strokeWidth="2" strokeDasharray="6,4" />
          {/* YOU → Make (amber dashed — warning) */}
          <line x1="188" y1="136" x2="251" y2="188" stroke="#ff8c42" strokeWidth="2" strokeDasharray="6,4" />

          {/* ── YOU node (48px diameter, r=24, with glow) ── */}
          <circle
            cx="170" cy="120" r="24"
            fill="#00e5a020"
            stroke="#00e5a0"
            strokeWidth="2"
            filter="url(#you-glow)"
          />
          <text
            x="170" y="120"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#00e5a0"
            fontFamily="'JetBrains Mono', monospace"
            fontSize="9"
            fontWeight="700"
          >
            YOU
          </text>

          {/* ── Stripe (green, top-left) cx=70 cy=40 r=18 ── */}
          <circle cx="70" cy="40" r="18" fill="#00e5a010" stroke="#00e5a0" strokeWidth="1.5" />
          <text x="70" y="40" textAnchor="middle" dominantBaseline="central" fill="#00e5a0" fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="700">St</text>
          <text x="70" y="69" textAnchor="middle" fill="#6a8098" fontFamily="'JetBrains Mono', monospace" fontSize="9">Stripe</text>

          {/* ── HubSpot (green, left) cx=35 cy=120 r=18 ── */}
          <circle cx="35" cy="120" r="18" fill="#00e5a010" stroke="#00e5a0" strokeWidth="1.5" />
          <text x="35" y="120" textAnchor="middle" dominantBaseline="central" fill="#00e5a0" fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="700">Hu</text>
          <text x="35" y="150" textAnchor="middle" fill="#6a8098" fontFamily="'JetBrains Mono', monospace" fontSize="9">HubSpot</text>

          {/* ── Segment (green, bottom-left) cx=70 cy=200 r=18 ── */}
          <circle cx="70" cy="200" r="18" fill="#00e5a010" stroke="#00e5a0" strokeWidth="1.5" />
          <text x="70" y="200" textAnchor="middle" dominantBaseline="central" fill="#00e5a0" fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="700">Se</text>
          <text x="70" y="229" textAnchor="middle" fill="#6a8098" fontFamily="'JetBrains Mono', monospace" fontSize="9">Segment</text>

          {/* ── Zapier (red, top-right) cx=270 cy=40 r=18 ── */}
          <circle cx="270" cy="40" r="18" fill="#ff4d6a20" stroke="#ff4d6a" strokeWidth="1.5" />
          <text x="270" y="40" textAnchor="middle" dominantBaseline="central" fill="#ff4d6a" fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="700">Za</text>
          <text x="270" y="69" textAnchor="middle" fill="#6a8098" fontFamily="'JetBrains Mono', monospace" fontSize="9">Zapier</text>

          {/* ── Intercom (amber, right) cx=305 cy=120 r=18 ── */}
          <circle cx="305" cy="120" r="18" fill="#ff8c4220" stroke="#ff8c42" strokeWidth="1.5" />
          <text x="305" y="120" textAnchor="middle" dominantBaseline="central" fill="#ff8c42" fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="700">In</text>
          <text x="305" y="150" textAnchor="middle" fill="#6a8098" fontFamily="'JetBrains Mono', monospace" fontSize="9">Intercom</text>

          {/* ── Make (amber, bottom-right) cx=265 cy=200 r=18 ── */}
          <circle cx="265" cy="200" r="18" fill="#ff8c4220" stroke="#ff8c42" strokeWidth="1.5" />
          <text x="265" y="200" textAnchor="middle" dominantBaseline="central" fill="#ff8c42" fontFamily="'JetBrains Mono', monospace" fontSize="9" fontWeight="700">Ma</text>
          <text x="265" y="229" textAnchor="middle" fill="#6a8098" fontFamily="'JetBrains Mono', monospace" fontSize="9">Make</text>
        </svg>
      </div>

      {/* Status bar */}
      <div
        style={{
          borderTop: "1px solid var(--border)",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
        }}
      >
        <div
          className="animate-pulse-badge"
          style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--danger)" }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--danger)",
              display: "inline-block",
            }}
          />
          2 issues detected
        </div>
        <div style={{ color: "var(--text-dim)" }}>Updated just now</div>
      </div>
    </div>
  );
}

// ─── Ticker ───────────────────────────────────────────────────────────────────

function TickerStrip() {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 1,
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "22px 0",
        overflow: "hidden",
      }}
    >
      <div className="animate-ticker" style={{ display: "flex", gap: 60, width: "max-content" }}>
        {[...tickerItems, ...tickerItems].map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              whiteSpace: "nowrap",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              color: "var(--text-dim)",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: item.type === "warn" ? "var(--warn)" : "var(--danger)",
                boxShadow: `0 0 6px ${item.type === "warn" ? "var(--warn)" : "var(--danger)"}`,
                flexShrink: 0,
                display: "inline-block",
              }}
            />
            {item.text}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section 1: THE PAIN ──────────────────────────────────────────────────────

function PainSection() {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1100,
        margin: "0 auto",
        padding: "100px 24px",
      }}
    >
      <SectionLabel label="THE PROBLEM" />
      <h2
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "clamp(28px, 4vw, 52px)",
          fontWeight: 800,
          color: "var(--text-bright)",
          letterSpacing: "-1.5px",
          lineHeight: 1.1,
          marginBottom: 56,
          maxWidth: 600,
        }}
      >
        Every founder we spoke to had the same story about integration failures.
      </h2>

      <div className="split-3">
        <StoryCard
          dotColor="var(--danger)"
          title="The webhook that died on a Tuesday."
          story="Their Stripe webhook stopped firing silently. Onboarding emails stopped sending. They found out on Friday when a customer complained they'd never heard from the company after signing up. Four days of broken onboarding for every new user that week."
          cost="Estimated cost: 4 days × avg deal value"
        />
        <StoryCard
          dotColor="var(--warn)"
          title="The tool nobody dared cancel."
          story="They'd been paying $400 a month for a tool three people set up two years ago. They wanted to cancel it but nobody knew if anything still depended on it. So they kept paying. For eleven months. Out of fear."
          cost="Estimated cost: $4,400 in zombie spend"
        />
        <StoryCard
          dotColor="var(--warn)"
          title="The ex-employee who never left."
          story="An engineer left eight months ago. Their OAuth token was still active. For eight months their credentials had silent read access to the CRM, analytics platform, and billing system. Nobody knew until a routine audit flagged it."
          cost="Estimated exposure: full customer database"
        />
      </div>
    </section>
  );
}

function StoryCard({
  dotColor,
  title,
  story,
  cost,
}: {
  dotColor: string;
  title: string;
  story: string;
  cost: string;
}) {
  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: 28,
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transition: "border-color 0.2s, transform 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = dotColor;
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: dotColor,
          boxShadow: `0 0 8px ${dotColor}`,
          flexShrink: 0,
        }}
      />
      <h3
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 17,
          fontWeight: 700,
          color: "var(--text-bright)",
          lineHeight: 1.3,
          letterSpacing: "-0.3px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 14,
          color: "var(--text-dim)",
          lineHeight: 1.7,
          flex: 1,
          fontFamily: "var(--font-inter)",
          fontWeight: 400,
        }}
      >
        {story}
      </p>
      <div
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: 14,
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--danger)",
          letterSpacing: "0.3px",
        }}
      >
        {cost}
      </div>
    </div>
  );
}

// ─── Section 2: SOCIAL PROOF ──────────────────────────────────────────────────

function SocialProof() {
  const quotes = [
    {
      text: "It's hard to know when we have been called — it could make the difference between an order being paid for or not.",
      author: "Engineering Manager",
      company: "Bay Area startup",
    },
    {
      text: "We wanted to cancel our old CRM but nobody knew what depended on it. We kept paying $800 a month for six months out of fear of breaking something.",
      author: "SaaS Founder",
      company: "r/SaaS",
    },
    {
      text: "I have no traceability of callouts to webhooks. Partners keep telling us they're not getting events — we have no way to see what we're actually sending.",
      author: "Sr Director of Engineering",
      company: "German SaaS",
    },
  ];

  return (
    <section
      style={{
        position: "relative",
        zIndex: 1,
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "100px 0",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <SectionLabel label="WHAT FOUNDERS ARE SAYING" />
        <h2
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 800,
            color: "var(--text-bright)",
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            marginBottom: 56,
          }}
        >
          You&apos;re not alone.
          <br />
          This is everywhere.
        </h2>

        <div className="split-3" style={{ marginBottom: 60 }}>
          {quotes.map((q, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: 28,
                position: "relative",
                transition: "border-color 0.2s, transform 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-bright)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: 12,
                  right: 20,
                  fontFamily: "var(--font-inter)",
                  fontSize: 60,
                  color: "var(--border-bright)",
                  lineHeight: 1,
                  fontWeight: 800,
                  pointerEvents: "none",
                }}
              >
                &ldquo;
              </span>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--text)",
                  lineHeight: 1.7,
                  marginBottom: 20,
                  fontStyle: "italic",
                  fontFamily: "var(--font-inter)",
                }}
              >
                {q.text}
              </p>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)" }}>
                — {q.author},{" "}
                <span style={{ color: "var(--accent)" }}>{q.company}</span>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 1,
            background: "var(--border)",
            border: "1px solid var(--border)",
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          {[
            { num: "48%", label: "of enterprise apps are completely unmanaged (Zylo, 2024)" },
            { num: "13×", label: "average SaaS tools per employee, up 85% in two years (BetterCloud)" },
            { num: "86%", label: "of IT leaders say tool sprawl is creating security risk (Productiv)" },
          ].map((s) => (
            <div key={s.num} style={{ background: "var(--bg)", padding: "36px 24px", textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 48,
                  fontWeight: 800,
                  color: "var(--accent)",
                  lineHeight: 1,
                  marginBottom: 8,
                  letterSpacing: "-1.5px",
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "var(--text-dim)",
                  maxWidth: 180,
                  margin: "0 auto",
                  lineHeight: 1.5,
                  fontFamily: "var(--font-inter)",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: HOW IT WORKS ──────────────────────────────────────────────────

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        position: "relative",
        zIndex: 1,
        maxWidth: 1100,
        margin: "0 auto",
        padding: "100px 24px",
      }}
    >
      <SectionLabel label="HOW IT WORKS" />
      <h2
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: "clamp(28px, 4vw, 52px)",
          fontWeight: 800,
          color: "var(--text-bright)",
          letterSpacing: "-1.5px",
          lineHeight: 1.1,
          marginBottom: 64,
          maxWidth: 520,
        }}
      >
        From chaos to clarity in three steps — faster than any tool on the market.
      </h2>

      <div className="split-3">
        <HowItWorksStep
          number="01"
          title="Map it"
          description="Enter your domain and connect your tools. Stakmap builds a live visual of every integration — what connects to what, what's healthy, what's idle, what's broken. You see the whole thing for the first time."
          mockup={<Step1Mockup />}
        />
        <HowItWorksStep
          number="02"
          title="Understand it"
          description="Every connection gets a plain English description of what it does, what depends on it, and what would break if it stopped. No developer needed. You can finally read your own stack."
          mockup={<Step2Mockup />}
        />
        <HowItWorksStep
          number="03"
          title="Fix it"
          description="When something goes wrong, you get told exactly what broke, what the business impact is, and step by step how to fix it. Not a red dot. A diagnosis."
          mockup={<Step3Mockup />}
        />
      </div>
    </section>
  );
}

function HowItWorksStep({
  number,
  title,
  description,
  mockup,
}: {
  number: string;
  title: string;
  description: string;
  mockup: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", letterSpacing: "1.5px" }}>
        {number}
      </div>
      <h3
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 22,
          fontWeight: 800,
          color: "var(--text-bright)",
          letterSpacing: "-0.5px",
          lineHeight: 1.2,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 14,
          color: "var(--text-dim)",
          lineHeight: 1.7,
          fontFamily: "var(--font-inter)",
          fontWeight: 400,
        }}
      >
        {description}
      </p>
      {mockup}
    </div>
  );
}

function Step1Mockup() {
  return (
    <div
      style={{
        background: "var(--bg)",
        border: "1px solid var(--border-bright)",
        borderRadius: 10,
        padding: "16px 18px",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
      }}
    >
      <div style={{ color: "var(--text-dim)", marginBottom: 10, letterSpacing: "1px", fontSize: 10 }}>
        ENTER YOUR DOMAIN
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <div
          style={{
            flex: 1,
            background: "var(--surface2)",
            border: "1px solid var(--accent)",
            borderRadius: 6,
            padding: "8px 12px",
            color: "var(--text-bright)",
            fontSize: 12,
          }}
        >
          acme.com
        </div>
        <div
          style={{
            background: "var(--accent)",
            color: "#000",
            borderRadius: 6,
            padding: "8px 12px",
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          Analyze →
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {["Stripe ✓", "Zapier ✓", "HubSpot ✓", "+8 more"].map((t) => (
          <span
            key={t}
            style={{
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              borderRadius: 4,
              padding: "2px 8px",
              color: "var(--text-dim)",
              fontSize: 10,
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function Step2Mockup() {
  return (
    <div
      style={{
        background: "var(--bg)",
        border: "1px solid var(--border-bright)",
        borderRadius: 10,
        overflow: "hidden",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
      }}
    >
      <div
        style={{
          padding: "10px 14px",
          background: "var(--surface2)",
          borderBottom: "1px solid var(--border)",
          color: "var(--accent)",
          fontSize: 10,
          letterSpacing: "0.5px",
        }}
      >
        Stripe → Zapier → HubSpot
      </div>
      <div style={{ padding: "14px 16px" }}>
        <p
          style={{
            fontSize: 12,
            color: "var(--text)",
            lineHeight: 1.7,
            fontStyle: "italic",
            marginBottom: 10,
            fontFamily: "var(--font-inter)",
          }}
        >
          &ldquo;When a payment succeeds in Stripe, Zapier triggers this workflow to create a HubSpot deal and send a welcome email.&rdquo;
        </p>
        <div style={{ color: "var(--text-dim)", fontSize: 10 }}>
          Depends on: HubSpot · Mailchimp · Zapier
        </div>
      </div>
    </div>
  );
}

function Step3Mockup() {
  return (
    <div
      style={{
        background: "var(--bg)",
        border: "1px solid var(--danger)",
        borderRadius: 10,
        overflow: "hidden",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
      }}
    >
      <div
        style={{
          background: "var(--danger-dim)",
          padding: "10px 14px",
          borderBottom: "1px solid var(--danger)",
          color: "var(--danger)",
          fontWeight: 700,
          fontSize: 11,
        }}
      >
        ! Stripe Webhook Failure
      </div>
      <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div>
          <span style={{ color: "var(--danger)", fontSize: 10, letterSpacing: "1px" }}>WHAT BROKE</span>
          <div style={{ color: "var(--text)", fontSize: 11, marginTop: 2 }}>Payment webhooks not delivering</div>
        </div>
        <div>
          <span style={{ color: "var(--warn)", fontSize: 10, letterSpacing: "1px" }}>IMPACT</span>
          <div style={{ color: "var(--text)", fontSize: 11, marginTop: 2 }}>$4,280 in pending orders at risk</div>
        </div>
        <div>
          <span style={{ color: "var(--accent)", fontSize: 10, letterSpacing: "1px" }}>FIX</span>
          <div style={{ color: "var(--text)", fontSize: 11, marginTop: 2, lineHeight: 1.6 }}>
            1. Renew SSL cert on api.acme.com<br />
            2. Replay failed events in Stripe
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section 4: FEATURES ──────────────────────────────────────────────────────

const featuresList = [
  {
    title: "Live Integration Map",
    desc: "A real-time visual graph of every tool connected to your stack. See the full picture at a glance.",
    tag: "AT LAUNCH" as const,
  },
  {
    title: "Silent Failure Alerts",
    desc: "Instant Slack or email alert the moment a webhook stops firing or an API key goes silent.",
    tag: "AT LAUNCH" as const,
  },
  {
    title: "Plain English Diagnosis",
    desc: "When something breaks, you get told what happened, why it matters, and exactly how to fix it. No engineer needed.",
    tag: "AT LAUNCH" as const,
  },
  {
    title: "Zombie Detector",
    desc: "Flags integrations with zero activity in 30 days. Shows the monthly cost. Kill what's dead.",
    tag: "AT LAUNCH" as const,
  },
  {
    title: "API Key Expiry Warnings",
    desc: "Know before they break. Never be surprised by an expired token killing a critical flow.",
    tag: "AT LAUNCH" as const,
  },
  {
    title: "Impact Analysis",
    desc: "What breaks if I cancel this tool? Answer that question safely before you make the call.",
    tag: "COMING SOON" as const,
  },
  {
    title: "OAuth Token Audit",
    desc: "Detect ex-employee connected apps still accessing your systems. Close the door on stale access.",
    tag: "COMING SOON" as const,
  },
  {
    title: "SOC2 Audit Export",
    desc: "One-click PDF of your full integration inventory. Built for auditors and investor due diligence.",
    tag: "ROADMAP" as const,
  },
];

function FeaturesSection() {
  return (
    <section
      id="features"
      style={{
        position: "relative",
        zIndex: 1,
        background: "var(--surface)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "100px 0",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <SectionLabel label="FEATURES" />
        <h2
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: "clamp(28px, 4vw, 52px)",
            fontWeight: 800,
            color: "var(--text-bright)",
            letterSpacing: "-1.5px",
            lineHeight: 1.1,
            marginBottom: 56,
          }}
        >
          Everything you need to monitor and manage your integrations.
        </h2>

        <div className="grid-4">
          {featuresList.map((f) => (
            <FeatureCard key={f.title} title={f.title} desc={f.desc} tag={f.tag} />
          ))}
        </div>

        <div style={{
          marginTop: 56,
          background: "var(--bg)",
          border: "1px solid rgba(0,229,160,0.2)",
          borderRadius: 14,
          padding: "28px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
        }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", letterSpacing: 1.5, marginBottom: 6 }}>// BETA NOW LIVE</div>
            <div style={{ fontFamily: "var(--font-inter)", fontSize: 18, fontWeight: 800, color: "var(--text-bright)", letterSpacing: "-0.5px" }}>
              See every feature in action — right now, for free.
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-dim)", marginTop: 6, lineHeight: 1.6 }}>
              The interactive beta demo shows exactly what Stakmap does on a real-looking stack. No signup required.
            </div>
          </div>
          <a
            href="/demo"
            style={{
              background: "var(--accent)",
              color: "#000",
              borderRadius: 8,
              padding: "12px 24px",
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: 13,
              textDecoration: "none",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Try the beta demo →
          </a>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  desc,
  tag,
}: {
  title: string;
  desc: string;
  tag: "AT LAUNCH" | "COMING SOON" | "ROADMAP";
}) {
  const tagStyle: Record<string, React.CSSProperties> = {
    "AT LAUNCH": {
      background: "var(--accent-dim)",
      color: "var(--accent)",
      border: "1px solid var(--accent-mid)",
    },
    "COMING SOON": {
      background: "var(--warn-dim)",
      color: "var(--warn)",
      border: "1px solid #ff8c4244",
    },
    ROADMAP: {
      background: "var(--surface2)",
      color: "var(--text-dim)",
      border: "1px solid var(--border)",
    },
  };

  return (
    <div
      style={{
        background: "var(--bg)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        transition: "border-color 0.2s, transform 0.2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-bright)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
      }}
    >
      <span
        style={{
          display: "inline-block",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          padding: "3px 8px",
          borderRadius: 20,
          letterSpacing: "0.5px",
          alignSelf: "flex-start",
          ...tagStyle[tag],
        }}
      >
        {tag}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 15,
          fontWeight: 700,
          color: "var(--text-bright)",
          letterSpacing: "-0.3px",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 13,
          color: "var(--text-dim)",
          lineHeight: 1.6,
          fontFamily: "var(--font-inter)",
          fontWeight: 400,
        }}
      >
        {desc}
      </p>
    </div>
  );
}

// ─── Footer CTA ───────────────────────────────────────────────────────────────

function FooterCTA() {
  return (
    <div style={{ position: "relative", zIndex: 1 }}>

      {/* Free template CTA band */}
      <div
        style={{
          background: "linear-gradient(135deg, #0d1f18, #0a1520)",
          borderTop: "1px solid var(--accent-mid)",
          borderBottom: "1px solid var(--accent-mid)",
          padding: "80px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
            width: 320, height: 1,
            background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
          }}
        />
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <SectionLabel label="BLOG & RESOURCES" centered />
          <h2
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              color: "var(--text-bright)",
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              marginBottom: 14,
            }}
          >
            Want to learn more?
          </h2>
          <p
            style={{
              color: "var(--text-dim)",
              fontSize: 15,
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
              lineHeight: 1.7,
              marginBottom: 32,
            }}
          >
            Guides, teardowns, and practical frameworks for founders who want to
            understand and control their SaaS stack.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--accent)",
                color: "#000",
                borderRadius: 10,
                padding: "13px 26px",
                fontFamily: "var(--font-inter)",
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Visit the blog →
            </Link>
            <Link
              href="#hero-form"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                color: "var(--text-bright)",
                border: "1px solid var(--border-bright)",
                borderRadius: 10,
                padding: "13px 26px",
                fontFamily: "var(--font-inter)",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Join the waitlist
            </Link>
          </div>
        </div>
      </div>

      {/* Full footer */}
      <div
        style={{
          background: "var(--surface)",
          borderTop: "1px solid var(--border)",
          padding: "56px 24px 36px",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1.6fr 1fr 1fr 1fr",
            gap: 40,
            marginBottom: 48,
          }}
        >
          {/* Brand column */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 17,
                fontWeight: 800,
                color: "var(--text-bright)",
                letterSpacing: "-0.5px",
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
              }}
            >
              <StakmapIcon size={18} />
              Stakmap
            </div>
            <p
              style={{
                fontSize: 13,
                color: "var(--text-dim)",
                lineHeight: 1.7,
                fontFamily: "var(--font-inter)",
                maxWidth: 220,
              }}
            >
              Live visibility into every integration in your stack. Know what&apos;s
              connected, what&apos;s breaking, and what&apos;s safe to cut.
            </p>
          </div>

          {/* Product column */}
          <FooterCol
            heading="Product"
            links={[
              { label: "How it works", href: "/#how-it-works" },
              { label: "Features", href: "/#features" },
              { label: "Join waitlist", href: "/#hero-form" },
            ]}
          />

          {/* Resources column */}
          <FooterCol
            heading="Resources"
            links={[
              { label: "Integration audit guide", href: "/integration-audit" },
              { label: "Blog", href: "/blog" },
            ]}
          />

          {/* Company column */}
          <FooterCol
            heading="Company"
            links={[
              { label: "Contact", href: "/contact" },
            ]}
          />
        </div>

        {/* Bottom bar */}
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            paddingTop: 24,
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--text-dim)",
          }}
        >
          <div>© 2026 Stakmap. All rights reserved.</div>
          <div>Built for founders who&apos;ve been burned.</div>
        </div>
      </div>
    </div>
  );
}

function FooterCol({ heading, links }: { heading: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--accent)",
          letterSpacing: "1.2px",
          textTransform: "uppercase",
          marginBottom: 16,
        }}
      >
        {heading}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {links.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 13,
              color: "var(--text-dim)",
              textDecoration: "none",
              transition: "color 0.15s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-bright)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text-dim)")}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Shared ───────────────────────────────────────────────────────────────────

function SectionLabel({ label, centered }: { label: string; centered?: boolean }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        color: "var(--accent)",
        letterSpacing: "1.5px",
        marginBottom: 16,
        textAlign: centered ? "center" : undefined,
        textTransform: "uppercase",
      }}
    >
      // {label}
    </div>
  );
}
