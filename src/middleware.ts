import { NextResponse } from "next/server";

export function middleware(request: NextResponse) {
  // const cookie = request.cookies.get("next-auth.session-token");
  const cookie = request.cookies.get("__Secure-next-auth.session-token");

  if (cookie) return NextResponse.next();
  return NextResponse.redirect(new URL("/Home", request.url));
}

export const config = {
  matcher: "/CMS/:path*",
};
