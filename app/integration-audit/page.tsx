import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { StakmapIcon } from "@/components/StakmapIcon";

export const metadata: Metadata = {
  title: "How to Audit Your SaaS Integrations: A Free Template and Checklist — Stakmap",
  description:
    "A free step-by-step guide to auditing your SaaS stack. Find silent failures, map every integration, cut zombie tools. Takes 20 minutes. No technical knowledge required.",
  alternates: { canonical: "/integration-audit" },
  openGraph: {
    title: "How to Audit Your SaaS Integrations: A Free Template and Checklist",
    description:
      "Map your integrations, find what's broken, cut what's dead. A structured 20-minute audit for founders and ops teams.",
    type: "article",
    url: "/integration-audit",
    images: [{ url: "/og-audit.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};

// ─── Fake completed data ─────────────────────────────────────────────────────

const TOOLS = [
  { name: "Stripe",     category: "Payments",        cost: "$0/mo",    owner: "Sarah K",      added: "03/2022", active: "active",  notes: "Primary billing & subscription mgmt" },
  { name: "HubSpot",    category: "CRM",              cost: "$800/mo",  owner: "Marketing",    added: "01/2023", active: "active",  notes: "Contact & deal sync" },
  { name: "Zapier",     category: "Automation",       cost: "$149/mo",  owner: "Alex M",       added: "06/2022", active: "unsure",  notes: "Multiple flows, some may be stale" },
  { name: "Intercom",   category: "Support",          cost: "$74/mo",   owner: "Support team", added: "08/2022", active: "active",  notes: "In-app chat & user messaging" },
  { name: "Segment",    category: "Analytics",        cost: "$120/mo",  owner: "Data team",    added: "11/2022", active: "unsure",  notes: "Event tracking, last checked months ago" },
  { name: "Slack",      category: "Communication",    cost: "$12/mo",   owner: "Everyone",     added: "01/2021", active: "active",  notes: "Alert pipeline for critical events" },
  { name: "Mailchimp",  category: "Marketing/Email",  cost: "$50/mo",   owner: "Marketing",    added: "05/2021", active: "zombie",  notes: "Replaced by HubSpot. Not cancelled yet." },
  { name: "Typeform",   category: "Other",            cost: "$25/mo",   owner: "Growth",       added: "09/2022", active: "active",  notes: "Onboarding survey" },
];

const CONNECTIONS = [
  { from: "Stripe",   to: "Zapier",    what: "Payment success triggers onboarding sequence", method: "Webhook",     lastWorking: "Unknown",   health: "broken" },
  { from: "Zapier",   to: "HubSpot",   what: "Creates a deal in CRM on payment",             method: "Native sync", lastWorking: "Jan 2024",  health: "unsure" },
  { from: "Segment",  to: "Intercom",  what: "Sends user events for in-app targeting",       method: "Native sync", lastWorking: "Feb 2024",  health: "healthy" },
  { from: "HubSpot",  to: "Mailchimp", what: "Syncs contacts for newsletter campaigns",      method: "Zapier/Make", lastWorking: "Aug 2023",  health: "zombie" },
  { from: "Stripe",   to: "Slack",     what: "Posts payment success alerts to #revenue",     method: "Webhook",     lastWorking: "Feb 2024",  health: "healthy" },
  { from: "Intercom", to: "HubSpot",   what: "Syncs support tickets as CRM activities",      method: "Native sync", lastWorking: "Feb 2024",  health: "healthy" },
];

const CHECKS = [
  { q: "I can name every tool currently sending or receiving data in my stack.",              why: "If you can't name them all, you can't protect them all.",                              risk: "HIGH", checked: true },
  { q: "All API keys in active use have known expiry dates that are tracked somewhere.",      why: "Expired keys are the #1 cause of silent integration failures.",                       risk: "HIGH", checked: false },
  { q: "No OAuth tokens belong to people who have left the company.",                        why: "Ex-employee tokens often retain full access to live systems indefinitely.",            risk: "HIGH", checked: false },
  { q: "I know exactly what would break if Stripe went down for 24 hours.",                  why: "Your most critical tool almost certainly has the most undocumented dependencies.",     risk: "HIGH", checked: true },
  { q: "All webhooks have been tested and confirmed working in the last 30 days.",           why: "Webhooks fail silently. If you haven't tested it, assume it might be broken.",        risk: "HIGH", checked: false },
  { q: "I know exactly where customer PII (names, emails, payment data) flows.",             why: "Required for GDPR compliance and SOC2 certification.",                                risk: "MED",  checked: true },
  { q: "Every tool in my stack is owned by a named person still at the company.",            why: "Unowned tools don't get monitored, updated, or cancelled when no longer needed.",     risk: "MED",  checked: true },
  { q: "I could safely cancel any single tool without accidentally breaking something else.", why: "If the answer is no for any tool, that's a dependency risk waiting to happen.",       risk: "MED",  checked: true },
  { q: "There are no tools we're paying for that nobody actively uses.",                     why: "The average company wastes $135k/year on unused SaaS subscriptions.",                 risk: "LOW",  checked: false },
  { q: "A new engineer could understand our full integration stack from documentation alone.", why: "If it only lives in one person's head, it's one resignation away from being lost.", risk: "LOW",  checked: false },
];

const ACTIONS = [
  { issue: "Stripe webhook URL not updated after last deploy",        priority: "critical", owner: "Alex M",  status: "in-progress", due: "20/02/2024" },
  { issue: "Revoke ex-employee OAuth tokens in HubSpot + Segment",   priority: "critical", owner: "Sarah K", status: "not-started", due: "25/02/2024" },
  { issue: "Cancel Mailchimp subscription — zombie tool, $50/mo",    priority: "high",     owner: "Sarah K", status: "done",        due: "15/02/2024" },
  { issue: "Document all active Zapier flows in Notion",              priority: "high",     owner: "Alex M",  status: "not-started", due: "01/03/2024" },
  { issue: "Track API key expiry dates in shared spreadsheet",        priority: "med",      owner: "Alex M",  status: "in-progress", due: "01/03/2024" },
];

const CADENCE = [
  {
    period: "MONTHLY",
    items: [
      "Check for any new tools added without being logged",
      "Review integrations marked 'Unsure' and resolve them",
      "Confirm all active webhooks fired at least once",
      "Check for API keys expiring in the next 60 days",
      "Review zombie integrations — cancel or reactivate",
    ],
  },
  {
    period: "QUARTERLY",
    items: [
      "Full tool inventory review — anything to cut?",
      "Audit all OAuth tokens — any ex-employees still connected?",
      "Review tool ownership — anyone left the company?",
      "Check API costs — anything scaling unexpectedly?",
      "Test every critical integration end to end",
    ],
  },
  {
    period: "ANNUALLY",
    items: [
      "Full rebuild of this audit document from scratch",
      "Negotiate or review all annual SaaS contracts",
      "Review data flows for GDPR / SOC2 compliance",
      "Document stack for any new team members",
      "Assess build vs buy for any custom integrations",
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function activeLabel(status: string) {
  if (status === "active") return { label: "Active", color: "var(--accent)", bg: "var(--accent-dim)" };
  if (status === "zombie") return { label: "Zombie", color: "var(--danger)", bg: "var(--danger-dim)" };
  return { label: "Unsure", color: "var(--warn)", bg: "var(--warn-dim)" };
}

function healthLabel(status: string) {
  if (status === "healthy") return { label: "Healthy",  color: "var(--accent)" };
  if (status === "broken")  return { label: "Broken",   color: "var(--danger)" };
  if (status === "zombie")  return { label: "Zombie",   color: "var(--text-dim)" };
  return { label: "Unsure", color: "var(--warn)" };
}

function priorityLabel(p: string) {
  if (p === "critical") return { label: "Critical", color: "var(--danger)", bg: "var(--danger-dim)" };
  if (p === "high")     return { label: "High",     color: "var(--warn)",   bg: "var(--warn-dim)" };
  return                       { label: "Medium",   color: "var(--accent)", bg: "var(--accent-dim)" };
}

function statusLabel(s: string) {
  if (s === "done")        return { label: "Done",        color: "var(--accent)" };
  if (s === "in-progress") return { label: "In progress", color: "var(--warn)" };
  return                          { label: "Not started", color: "var(--text-dim)" };
}

function riskStyle(risk: string): React.CSSProperties {
  if (risk === "HIGH") return { background: "var(--danger-dim)", color: "var(--danger)",  border: "1px solid #ff4d6a44" };
  if (risk === "MED")  return { background: "var(--warn-dim)",   color: "var(--warn)",    border: "1px solid #ff8c4244" };
  return                      { background: "var(--accent-dim)", color: "var(--accent)",  border: "1px solid var(--accent-mid)" };
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
  return (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--accent)", letterSpacing: "1.5px", marginBottom: 4, textTransform: "uppercase" as const }}>
      // {label}
    </div>
  );
}

function SectionHead({ num, label, title, children }: { num: string; label: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 8,
        background: "var(--accent-dim)", border: "1px solid var(--accent-mid)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--accent)",
        flexShrink: 0, marginTop: 2,
      }}>
        {num}
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", letterSpacing: "1.5px", textTransform: "uppercase" as const, marginBottom: 4 }}>
          // {label}
        </div>
        <h2 style={{ fontFamily: "var(--font-inter)", fontSize: 22, fontWeight: 700, color: "var(--text-bright)", letterSpacing: "-0.5px", marginBottom: 4, margin: 0 }}>
          {title}
        </h2>
        <div style={{ fontSize: 13, color: "var(--text-dim)", lineHeight: 1.6 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      background: "var(--accent-dim)", border: "1px solid var(--accent-mid)",
      borderRadius: 8, padding: "12px 16px", fontSize: 12, color: "var(--text-dim)",
      marginBottom: 14, fontFamily: "var(--font-mono)", lineHeight: 1.6,
    }}>
      <span style={{ color: "var(--accent)", fontWeight: 700 }}>Tip: </span>{children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: "var(--border)", margin: "48px 0" }} />;
}

function Tag({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <span style={{
      display: "inline-block", fontFamily: "var(--font-mono)", fontSize: 10,
      padding: "2px 8px", borderRadius: 4, letterSpacing: "0.4px",
      ...style,
    }}>
      {children}
    </span>
  );
}

const thStyle: React.CSSProperties = {
  padding: "11px 14px", textAlign: "left",
  fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-dim)",
  letterSpacing: "0.8px", textTransform: "uppercase", fontWeight: 400,
  whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
  padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: 12,
  color: "var(--text)", borderTop: "1px solid var(--border)",
  verticalAlign: "middle",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function IntegrationAuditPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "How to Audit Your SaaS Integrations: A Free Template and Checklist",
            "description": "A free step-by-step guide to auditing your SaaS stack. Find silent failures, map every integration, cut zombie tools. Takes 20 minutes.",
            "url": "https://stakmap.com/integration-audit",
            "datePublished": "2026-05-01",
            "dateModified": "2026-05-01",
            "author": { "@type": "Organization", "name": "Stakmap", "url": "https://stakmap.com" },
            "publisher": {
              "@type": "Organization",
              "name": "Stakmap",
              "url": "https://stakmap.com",
              "logo": { "@type": "ImageObject", "url": "https://stakmap.com/icon.svg" }
            },
            "mainEntityOfPage": "https://stakmap.com/integration-audit"
          })
        }}
      />
      <Nav />

      <main style={{ paddingTop: 80 }}>
        {/* ── Page header ── */}
        <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "60px 24px 52px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <div style={{
              display: "inline-block", fontFamily: "var(--font-mono)", fontSize: 10,
              color: "var(--accent)", background: "var(--accent-dim)",
              border: "1px solid var(--accent-mid)", borderRadius: 4,
              padding: "4px 10px", letterSpacing: 1, marginBottom: 20,
            }}>
              FREE RESOURCE — SAAS STACK AUDIT GUIDE
            </div>

            <h1 style={{
              fontFamily: "var(--font-inter)", fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 800, color: "var(--text-bright)", letterSpacing: "-1.5px",
              lineHeight: 1.05, marginBottom: 16,
            }}>
              How to audit your<br />
              <span style={{ color: "var(--accent)" }}>SaaS integrations</span>
            </h1>

            <p style={{
              fontSize: 15, color: "var(--text-dim)", maxWidth: 560,
              lineHeight: 1.7, marginBottom: 24,
              fontFamily: "var(--font-inter)", fontWeight: 400,
            }}>
              A structured walkthrough for mapping your integrations, finding what&apos;s
              broken, and cutting what&apos;s dead. Below is an example of a completed audit
              so you can see exactly what to do and what to look for.
            </p>

            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {["5 sections", "20–30 min to complete", "No technical knowledge required", "Built by Stakmap"].map((item) => (
                <span key={item} style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "var(--accent)", fontFamily: "var(--font-mono)" }}>*</span> {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 24px 100px" }}>

          {/* ── Section 1: Tool Inventory ── */}
          <section style={{ marginBottom: 52 }}>
            <SectionHead num="01" label="Tool Inventory" title="What are you actually paying for?">
              List every SaaS tool your company uses. Be thorough — check your credit
              card statement. Include anything that touches your product, data, or customers.
            </SectionHead>
            <Tip>Check your company credit card for recurring charges. You&apos;ll almost certainly find something you forgot about.</Tip>

            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "var(--surface2)" }}>
                      <th style={thStyle}>Tool Name</th>
                      <th style={thStyle}>Category</th>
                      <th style={thStyle}>Monthly Cost</th>
                      <th style={thStyle}>Who Owns It</th>
                      <th style={thStyle}>Date Added</th>
                      <th style={thStyle}>Still Active?</th>
                      <th style={thStyle}>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TOOLS.map((t) => {
                      const al = activeLabel(t.active);
                      return (
                        <tr key={t.name}>
                          <td style={{ ...tdStyle, color: "var(--text-bright)", fontWeight: 700 }}>{t.name}</td>
                          <td style={tdStyle}>{t.category}</td>
                          <td style={{ ...tdStyle, color: t.active === "zombie" ? "var(--danger)" : "var(--text)" }}>{t.cost}</td>
                          <td style={tdStyle}>{t.owner}</td>
                          <td style={tdStyle}>{t.added}</td>
                          <td style={{ ...tdStyle }}>
                            <Tag style={{ background: al.bg, color: al.color, border: `1px solid ${al.color}44` }}>
                              {al.label}
                            </Tag>
                          </td>
                          <td style={{ ...tdStyle, color: "var(--text-dim)", maxWidth: 200 }}>{t.notes}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <Divider />

          {/* ── Section 2: Connection Map ── */}
          <section style={{ marginBottom: 52 }}>
            <SectionHead num="02" label="Connection Map" title="What's talking to what?">
              For each integration between tools, add a row. Think webhooks, Zapier flows,
              native syncs, and custom API calls. One row per connection, not per tool.
            </SectionHead>
            <Tip>Start with your payment tool and trace every place it sends data. These are usually the most connected and the most risky.</Tip>

            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "var(--surface2)" }}>
                      <th style={thStyle}>From Tool</th>
                      <th style={thStyle}>To Tool</th>
                      <th style={thStyle}>What It Does (plain English)</th>
                      <th style={thStyle}>Method</th>
                      <th style={thStyle}>Last Known Working</th>
                      <th style={thStyle}>Health</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CONNECTIONS.map((c, i) => {
                      const hl = healthLabel(c.health);
                      return (
                        <tr key={i}>
                          <td style={{ ...tdStyle, color: "var(--text-bright)", fontWeight: 700 }}>{c.from}</td>
                          <td style={{ ...tdStyle, color: "var(--text-bright)", fontWeight: 700 }}>{c.to}</td>
                          <td style={{ ...tdStyle, color: "var(--text-dim)", maxWidth: 220 }}>{c.what}</td>
                          <td style={tdStyle}>{c.method}</td>
                          <td style={{ ...tdStyle, color: c.lastWorking === "Unknown" ? "var(--danger)" : "var(--text-dim)" }}>{c.lastWorking}</td>
                          <td style={{ ...tdStyle }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: hl.color, fontWeight: 600 }}>
                              <span style={{ width: 6, height: 6, borderRadius: "50%", background: hl.color, display: "inline-block", flexShrink: 0 }} />
                              {hl.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <Divider />

          {/* ── Section 3: Risk Checklist ── */}
          <section style={{ marginBottom: 52 }}>
            <SectionHead num="03" label="Risk Checklist" title="Where are your blind spots?">
              Go through each item honestly. Unchecked boxes are your risks. Don&apos;t
              guess — only tick what you know for certain.
            </SectionHead>

            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
              {CHECKS.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex", alignItems: "flex-start", gap: 14,
                    padding: "16px 20px",
                    borderBottom: i < CHECKS.length - 1 ? "1px solid var(--border)" : "none",
                    background: item.checked ? "transparent" : "rgba(255,77,106,0.03)",
                  }}
                >
                  <div style={{
                    width: 20, height: 20, borderRadius: 4, flexShrink: 0, marginTop: 1,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: item.checked ? "var(--accent)" : "transparent",
                    border: item.checked ? "2px solid var(--accent)" : "2px solid var(--border-bright)",
                    fontSize: 12, color: "#000", fontWeight: 700,
                  }}>
                    {item.checked ? "✓" : ""}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 14, lineHeight: 1.5, marginBottom: 3,
                      fontFamily: "var(--font-inter)",
                      color: item.checked ? "var(--text)" : "var(--text-bright)",
                      textDecoration: item.checked ? "none" : "none",
                    }}>
                      {item.q}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-dim)", lineHeight: 1.5, fontFamily: "var(--font-mono)" }}>
                      {item.why}
                    </div>
                  </div>
                  <Tag style={{ flexShrink: 0, marginTop: 2, ...riskStyle(item.risk) }}>
                    {item.risk}
                  </Tag>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 14, padding: "14px 18px",
              background: "var(--danger-dim)", border: "1px solid #ff4d6a44",
              borderRadius: 8, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-dim)", lineHeight: 1.6,
            }}>
              <span style={{ color: "var(--danger)", fontWeight: 700 }}>6 / 10 checked. </span>
              4 unchecked items are active risks — each one is a potential silent failure or security exposure. Address the HIGH items first.
            </div>
          </section>

          <Divider />

          {/* ── Section 4: Action List ── */}
          <section style={{ marginBottom: 52 }}>
            <SectionHead num="04" label="Action List" title="What needs fixing right now?">
              Based on sections 1–3, list every issue and assign it. Even if you don&apos;t fix
              it today, writing it down means it won&apos;t get lost.
            </SectionHead>

            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "var(--surface2)" }}>
                      <th style={thStyle}>Issue Found</th>
                      <th style={thStyle}>Priority</th>
                      <th style={thStyle}>Owner</th>
                      <th style={thStyle}>Status</th>
                      <th style={thStyle}>Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ACTIONS.map((a, i) => {
                      const pl = priorityLabel(a.priority);
                      const sl = statusLabel(a.status);
                      return (
                        <tr key={i}>
                          <td style={{ ...tdStyle, maxWidth: 280 }}>{a.issue}</td>
                          <td style={tdStyle}>
                            <Tag style={{ background: pl.bg, color: pl.color, border: `1px solid ${pl.color}44` }}>
                              {pl.label}
                            </Tag>
                          </td>
                          <td style={tdStyle}>{a.owner}</td>
                          <td style={{ ...tdStyle, color: sl.color, fontWeight: 600 }}>{sl.label}</td>
                          <td style={{ ...tdStyle, color: "var(--text-dim)" }}>{a.due}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <Divider />

          {/* ── Section 5: Review Cadence ── */}
          <section style={{ marginBottom: 52 }}>
            <SectionHead num="05" label="Review Cadence" title="How to stay on top of it.">
              A one-off audit decays fast. This is the minimum cadence to keep your stack
              visible and healthy without it becoming a full-time job.
            </SectionHead>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {CADENCE.map((c) => (
                <div
                  key={c.period}
                  style={{
                    background: "var(--surface)", border: "1px solid var(--border)",
                    borderRadius: 12, padding: 20,
                  }}
                >
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--accent)", letterSpacing: 1, textTransform: "uppercase" as const, marginBottom: 14 }}>
                    // {c.period}
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {c.items.map((item, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: 12, color: "var(--text-dim)", padding: "6px 0",
                          borderBottom: i < c.items.length - 1 ? "1px solid var(--border)" : "none",
                          display: "flex", alignItems: "flex-start", gap: 8, lineHeight: 1.4,
                          fontFamily: "var(--font-inter)",
                        }}
                      >
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--accent)", flexShrink: 0, marginTop: 5, opacity: 0.7, display: "inline-block" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <div style={{
            background: "linear-gradient(135deg, #0d1f18, #0a1520)",
            border: "1px solid var(--accent-mid)", borderRadius: 16,
            padding: "48px 40px", textAlign: "center", marginTop: 60,
            position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
              width: 240, height: 1,
              background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
            }} />
            <SectionLabel label="Want this automatically?" />
            <h2 style={{
              fontFamily: "var(--font-inter)", fontSize: "clamp(22px, 4vw, 32px)",
              fontWeight: 800, color: "var(--text-bright)", letterSpacing: "-0.8px",
              marginBottom: 10, marginTop: 8,
            }}>
              Stop doing this manually.
            </h2>
            <p style={{
              fontSize: 14, color: "var(--text-dim)", marginBottom: 28,
              maxWidth: 400, marginLeft: "auto", marginRight: "auto",
              lineHeight: 1.7, fontFamily: "var(--font-inter)",
            }}>
              Stakmap monitors your entire integration graph in real time — so you get
              alerted the moment something breaks, not days later when a customer tells you.
            </p>
            <Link
              href="/#hero-form"
              style={{
                display: "inline-block", background: "var(--accent)", color: "#000",
                fontFamily: "var(--font-inter)", fontSize: 14, fontWeight: 700,
                padding: "13px 28px", borderRadius: 10, textDecoration: "none",
              }}
            >
              Join the waitlist →
            </Link>
          </div>

        </div>
      </main>

      {/* ── Footer ── */}
      <div style={{
        borderTop: "1px solid var(--border)",
        padding: "28px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-dim)",
        maxWidth: 1100, marginLeft: "auto", marginRight: "auto",
      }}>
        <div style={{
          fontFamily: "var(--font-inter)", fontSize: 15, fontWeight: 800,
          color: "var(--text-bright)", letterSpacing: "-0.5px",
          display: "flex", alignItems: "center", gap: 7,
        }}>
          <StakmapIcon size={16} />
          Stakmap
        </div>
        <div>© 2026 Stakmap. All rights reserved.</div>
        <div>Built for founders who&apos;ve been burned.</div>
      </div>
    </>
  );
}
