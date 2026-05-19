import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { getResend } from "@/lib/resend";

// In-memory rate limiter — per serverless instance, per IP.
// On Vercel each warm instance enforces its own limit; across instances
// the unique-email DB constraint is the hard backstop against duplicate sends.
const ipBucket = new Map<string, number[]>();
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (ipBucket.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (hits.length >= RATE_LIMIT) return true;
  hits.push(now);
  ipBucket.set(ip, hits);
  return false;
}

const MAX_EMAIL_LEN = 254; // RFC 5321

export async function POST(req: NextRequest) {
  // Reject non-JSON content types early
  const ct = req.headers.get("content-type") ?? "";
  if (!ct.includes("application/json")) {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Rate limit by IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  try {
    const body = await req.json();
    const raw: string = typeof body?.email === "string" ? body.email : "";
    const email = raw.trim().toLowerCase();

    if (
      !email ||
      email.length > MAX_EMAIL_LEN ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const supabase = getSupabase();

    const { error: dbError } = await supabase
      .from("waitlist")
      .insert({ email });

    if (dbError) {
      if (dbError.code === "23505") {
        return NextResponse.json(
          { error: "already_on_list" },
          { status: 409 }
        );
      }
      throw dbError;
    }

    // Email is best-effort — don't let Resend failures block the signup
    try {
      await getResend().emails.send({
        from: "Stackmap <hello@stakmap.com>",
        to: email,
        subject: "You're on the Stackmap waitlist",
        html: `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#060a0e;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#060a0e;padding:40px 20px;">
  <tr><td align="center">
    <table width="520" cellpadding="0" cellspacing="0" style="background:#0d1319;border:1px solid #1e2d3d;border-radius:14px;overflow:hidden;max-width:520px;">

      <!-- Header -->
      <tr><td style="background:#0a1a14;border-bottom:1px solid #1e3d2a;padding:24px 36px;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="width:8px;height:8px;background:#00e5a0;border-radius:50%;"></td>
          <td style="padding-left:10px;font-size:17px;font-weight:800;color:#eaf2fb;letter-spacing:-0.5px;">Stakmap</td>
        </tr></table>
      </td></tr>

      <!-- Body -->
      <tr><td style="padding:36px 36px 28px;">
        <p style="font-family:monospace;font-size:10px;color:#00e5a0;letter-spacing:2px;text-transform:uppercase;margin:0 0 14px;">// YOU'RE ON THE LIST</p>
        <h1 style="font-size:26px;font-weight:800;color:#eaf2fb;margin:0 0 16px;letter-spacing:-0.8px;line-height:1.2;">You're in — here's what happens next.</h1>
        <p style="color:#6a8098;font-size:14px;line-height:1.7;margin:0 0 28px;">
          You're one of the first people to join the Stakmap waitlist. We're building the integration monitoring tool that SaaS teams should have had years ago — and you'll be among the first to get it.
        </p>

        <!-- What you get -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#060a0e;border:1px solid #1e2d3d;border-radius:9px;overflow:hidden;margin-bottom:28px;">
          <tr><td style="padding:14px 18px;border-bottom:1px solid #1e2d3d;">
            <p style="font-family:monospace;font-size:9px;color:#00e5a0;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px;">// WHAT YOU'LL RECEIVE</p>
            <table cellpadding="0" cellspacing="0" width="100%">
              <tr><td style="padding:8px 0;border-bottom:1px solid #1a2535;vertical-align:top;">
                <table cellpadding="0" cellspacing="0"><tr>
                  <td style="font-family:monospace;font-size:11px;color:#00e5a0;padding-right:12px;white-space:nowrap;">[01]</td>
                  <td>
                    <strong style="display:block;font-size:13px;color:#d4dfe8;margin-bottom:2px;">Early access — free</strong>
                    <span style="font-size:12px;color:#4a6070;">You get Stakmap before it opens to the public, at no cost. Founder members pay nothing for the first year.</span>
                  </td>
                </tr></table>
              </td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #1a2535;vertical-align:top;">
                <table cellpadding="0" cellspacing="0"><tr>
                  <td style="font-family:monospace;font-size:11px;color:#00e5a0;padding-right:12px;white-space:nowrap;">[02]</td>
                  <td>
                    <strong style="display:block;font-size:13px;color:#d4dfe8;margin-bottom:2px;">Founder member discount — locked in for life</strong>
                    <span style="font-size:12px;color:#4a6070;">When paid plans launch, waitlist members get a permanent discount that never expires — regardless of how pricing changes.</span>
                  </td>
                </tr></table>
              </td></tr>
              <tr><td style="padding:8px 0;border-bottom:1px solid #1a2535;vertical-align:top;">
                <table cellpadding="0" cellspacing="0"><tr>
                  <td style="font-family:monospace;font-size:11px;color:#00e5a0;padding-right:12px;white-space:nowrap;">[03]</td>
                  <td>
                    <strong style="display:block;font-size:13px;color:#d4dfe8;margin-bottom:2px;">Product updates as we build</strong>
                    <span style="font-size:12px;color:#4a6070;">We'll share what we're building before anyone else sees it — new features, integrations we're adding, and real decisions being made.</span>
                  </td>
                </tr></table>
              </td></tr>
              <tr><td style="padding:8px 0;vertical-align:top;">
                <table cellpadding="0" cellspacing="0"><tr>
                  <td style="font-family:monospace;font-size:11px;color:#00e5a0;padding-right:12px;white-space:nowrap;">[04]</td>
                  <td>
                    <strong style="display:block;font-size:13px;color:#d4dfe8;margin-bottom:2px;">Direct line to the founders</strong>
                    <span style="font-size:12px;color:#4a6070;">Reply to any email from us and it goes directly to the team. If something in your stack breaks and you need help diagnosing it, we want to know.</span>
                  </td>
                </tr></table>
              </td></tr>
            </table>
          </td></tr>
        </table>

        <!-- Try demo CTA -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a1a14;border:1px solid #1e3d2a;border-radius:9px;padding:20px;margin-bottom:28px;">
          <tr><td>
            <p style="font-size:13px;color:#6a8098;margin:0 0 12px;line-height:1.6;">While you wait — try the interactive demo. Enter your domain and see what your integration map looks like. Takes under a minute.</p>
            <a href="https://stakmap.com/demo" style="display:inline-block;background:#00e5a0;color:#000;text-decoration:none;font-weight:700;font-size:13px;padding:10px 20px;border-radius:7px;">Try the demo →</a>
          </td></tr>
        </table>

        <p style="color:#4a6070;font-size:13px;line-height:1.7;margin:0;">
          No spam. No marketing fluff. We'll only email you when there's something worth saying — early access, meaningful updates, or the occasional thing we think will genuinely help your stack.
        </p>
      </td></tr>

      <!-- Footer -->
      <tr><td style="border-top:1px solid #1e2d3d;padding:18px 36px;">
        <p style="font-family:monospace;font-size:11px;color:#2a3d52;margin:0;">Stakmap — stakmap.com &nbsp;·&nbsp; Reply to unsubscribe</p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>
        `,
      });
    } catch (emailErr) {
      console.error("Resend error (non-fatal):", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
