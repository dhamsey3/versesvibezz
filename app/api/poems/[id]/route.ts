import { NextResponse } from "next/server"
import { getPoemById } from "@/lib/actions"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const poem = await getPoemById(params.id)

    if (!poem) {
      return NextResponse.json({ error: "Poem not found" }, { status: 404 })
    }

    return NextResponse.json(poem)
  } catch (error) {
    console.error("Error fetching poem:", error)
    return NextResponse.json({ error: "Failed to fetch poem" }, { status: 500 })
  }
}
