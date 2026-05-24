import { NextRequest, NextResponse } from "next/server";

import { AUTH_COOKIE_NAME } from "@/lib/auth";
import { verifyJwtToken } from "@/lib/jwt";

const protectedRoutes = ["/shop"];
const adminRoutes = ["/shop/admin"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;

  const pathname = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAdminRoute = adminRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const user = await verifyJwtToken(token);

    if (isAdminRoute && user.role !== "admin") {
      return NextResponse.redirect(new URL("/shop", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/shop/:path*"],
};