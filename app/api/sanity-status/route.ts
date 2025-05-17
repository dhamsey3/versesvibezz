import { NextResponse } from "next/server"
import { client } from "@/lib/sanity-client"

export async function GET() {
  try {
    // Try to fetch a simple query to check connection
    const result = await client.fetch('*[_type == "poet"][0...1]')

    return NextResponse.json({
      connected: true,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Sanity connection check failed:", error)

    return NextResponse.json({
      connected: false,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    })
  }
}
