import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if the request is for a studio-related route
  if (
    request.nextUrl.pathname.startsWith("/studio") ||
    request.nextUrl.pathname.startsWith("/studio-iframe") ||
    request.nextUrl.pathname.startsWith("/studio-access") ||
    request.nextUrl.pathname.startsWith("/external-studio")
  ) {
    // Get the secret from the URL or use a default
    const secretKey = request.nextUrl.searchParams.get("key") || ""

    // Check if the secret key is valid using the environment variable
    const validKey = process.env.STUDIO_ACCESS_KEY || ""

    if (!validKey || secretKey !== validKey) {
      // If no valid key is provided, redirect to a 404 page
      return NextResponse.rewrite(new URL("/not-found", request.url))
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/studio/:path*", "/studio-iframe/:path*", "/studio-access/:path*", "/external-studio/:path*"],
}
