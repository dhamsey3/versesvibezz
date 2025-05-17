import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    // Get the valid key from environment variables
    const validKey = process.env.STUDIO_ACCESS_KEY || ""

    // Check if the password matches the valid key
    const isValid = validKey && password === validKey

    return NextResponse.json({ valid: isValid })
  } catch (error) {
    return NextResponse.json({ valid: false, error: "Invalid request" }, { status: 400 })
  }
}
