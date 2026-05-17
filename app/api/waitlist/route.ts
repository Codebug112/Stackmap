export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";
import { getResend } from "@/lib/resend";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
        from: "Stackmap <onboarding@resend.dev>",
        to: email,
        subject: "You're on the Stackmap waitlist",
        html: `
          <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; background: #080c10; color: #d4dfe8; padding: 40px; border-radius: 16px; border: 1px solid #1e2d3d;">
            <div style="font-size: 20px; font-weight: 800; color: #eaf2fb; margin-bottom: 24px; letter-spacing: -0.5px;">
              <span style="color: #00e5a0;">●</span> Stackmap
            </div>
            <h1 style="font-size: 28px; font-weight: 800; color: #eaf2fb; margin-bottom: 12px; letter-spacing: -1px;">You're on the list.</h1>
            <p style="color: #6a8098; line-height: 1.7; margin-bottom: 24px; font-size: 15px;">
              Thanks for joining the Stackmap waitlist. We'll email you the moment early access opens — and you'll get it <strong style="color: #d4dfe8;">free</strong> as an early member.
            </p>
            <p style="color: #6a8098; font-size: 12px; margin-top: 40px; border-top: 1px solid #1e2d3d; padding-top: 20px; font-family: monospace;">
              Stackmap — See every integration. Know what's breaking.
            </p>
          </div>
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
