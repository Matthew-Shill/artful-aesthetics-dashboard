import { NextResponse } from "next/server";
import { isAllowedAdminEmail } from "@/config/admin";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const { supabaseResponse, user, authConfigured } = await updateSession(request);

  if (!authConfigured) {
    if (pathname === "/admin/login") {
      return supabaseResponse;
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const isLoginRoute = pathname === "/admin/login";

  if (isLoginRoute) {
    if (user && isAllowedAdminEmail(user.email)) {
      return NextResponse.redirect(new URL("/admin/overview", request.url));
    }
    return supabaseResponse;
  }

  if (!user || !isAllowedAdminEmail(user.email)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
