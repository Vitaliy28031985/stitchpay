import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/shared/api/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const type = searchParams.get("type");

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=missing_code", origin)
    );
  }

  const supabase = await supabaseServer();

  const { error } =
    await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Auth callback error:", error.message);

    return NextResponse.redirect(
      new URL("/login?error=auth_failed", origin)
    );
  }

  const redirectPath =
    type === "recovery"
      ? "/update-password"
      : "/dashboard";

  return NextResponse.redirect(
    new URL(redirectPath, origin)
  );
}
