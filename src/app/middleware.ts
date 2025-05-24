import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const allowedIPs = ["24.200.177.202"]; // Replace this with your real IP

export function middleware(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "0.0.0.0";

  if (allowedIPs.length > 0 && !allowedIPs.includes(ip)) {
    return new NextResponse("Access Denied", { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|api|images|fonts).*)"], // Allow static and API routes
};
