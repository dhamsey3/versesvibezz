import { NextResponse } from "next/server"

export async function GET() {
  try {
    // In a real application, you would check if the user is authenticated here
    // For now, we'll just return the key from the environment variable
    const studioKey = process.env.STUDIO_ACCESS_KEY || ""

    // Only return the key if it exists
    if (studioKey) {
      return NextResponse.json({ key: studioKey })
    } else {
      return NextResponse.json({ error: "No studio key available" }, { status: 404 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
