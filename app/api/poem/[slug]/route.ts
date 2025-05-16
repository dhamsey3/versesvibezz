import { NextResponse } from "next/server"
import { fetchPoemDirectly } from "@/lib/standalone-sanity"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    if (!slug) {
      return NextResponse.json({ error: "Slug parameter is required" }, { status: 400 })
    }

    const poem = await fetchPoemDirectly(slug)

    if (!poem) {
      return NextResponse.json({ error: "Poem not found" }, { status: 404 })
    }

    return NextResponse.json({ poem })
  } catch (error) {
    console.error("Error in poem API route:", error)
    return NextResponse.json({ error: "Failed to fetch poem data" }, { status: 500 })
  }
}
