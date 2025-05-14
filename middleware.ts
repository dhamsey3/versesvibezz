import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Only add CSP headers for studio routes
  if (request.nextUrl.pathname.startsWith("/studio")) {
    // Add CSP headers specifically for Sanity Studio
    response.headers.set(
      "Content-Security-Policy",
      `default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.sanity.io;
      style-src 'self' 'unsafe-inline' https://cdn.sanity.io;
      img-src 'self' data: https://cdn.sanity.io;
      font-src 'self' data:;
      connect-src 'self' https://*.sanity.io https://api.sanity.io;
      frame-src 'self';`,
    )
  }

  return response
}

// Only run middleware on studio routes
export const config = {
  matcher: "/studio/:path*",
}
