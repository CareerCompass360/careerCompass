import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// AdminGuard component handles authentication and authorization for /admin routes
// No proxy protection needed since AdminGuard does proper client-side checks
export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  console.log("[PROXY] Request to:", pathname)

  // Let all requests through - AdminGuard will handle /admin protection
  console.log("[PROXY] Allowing request, AdminGuard will handle protection")
  return NextResponse.next()
}

export const config = {
  matcher: "/admin/:path*",
}
