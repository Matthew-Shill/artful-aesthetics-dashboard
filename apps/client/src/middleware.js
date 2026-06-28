import { NextResponse } from "next/server";
import { getPostLoginPath, isAllowedAdminEmail } from "@/config/admin";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const { supabaseResponse, user, authConfigured } = await updateSession(request);

  if (pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/login") {
    if (authConfigured && user?.email) {
      return NextResponse.redirect(new URL(getPostLoginPath(user.email), request.url));
    }
    return supabaseResponse;
  }

  if (pathname === "/account" || pathname.startsWith("/account/")) {
    if (!authConfigured) {
      return supabaseResponse;
    }
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return supabaseResponse;
  }

  if (!pathname.startsWith("/admin")) {
    return supabaseResponse;
  }

  if (!authConfigured) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!user || !isAllowedAdminEmail(user.email)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/login", "/account", "/account/:path*", "/admin", "/admin/:path*"],
};
