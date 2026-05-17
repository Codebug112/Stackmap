import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { count, error } = await getSupabase()
      .from("waitlist")
      .select("*", { count: "exact", head: true });

    if (error) throw error;

    return NextResponse.json({ count: count ?? 0 });
  } catch {
    return NextResponse.json({ count: 0 });
  }
}
