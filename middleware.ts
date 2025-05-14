import { type NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  // Only apply to /studio routes
  if (request.nextUrl.pathname.startsWith("/studio")) {
    // Get the authorization header
    const basicAuth = request.headers.get("authorization")

    // Check if authentication exists and is valid
    if (basicAuth) {
      const authValue = basicAuth.split(" ")[1]
      const [user, pwd] = atob(authValue).split(":")

      // Replace with your desired username and password
      if (user === "admin" && pwd === "your-secure-password") {
        return NextResponse.next()
      }
    }

    // For security, don't indicate that this is a studio or CMS
    // Just return a generic 404 response to make it appear the page doesn't exist
    return new NextResponse("Page not found", {
      status: 404,
      headers: {
        "WWW-Authenticate": 'Basic realm="Secure Area"',
        "Content-Type": "text/plain",
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: "/studio/:path*",
}
