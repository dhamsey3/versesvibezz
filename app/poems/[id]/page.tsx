import Link from "next/link"
import { notFound } from "next/navigation"
import { getPoemById } from "@/lib/actions"

export default async function PoemPage({ params }: { params: { id: string } }) {
  // Fetch the poem from the database
  const poem = await getPoemById(params.id)

  // If the poem doesn't exist, show a 404 page
  if (!poem) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b p-4">
        <h1 className="text-2xl font-bold">VersesVibez</h1>
      </header>
      <main className="flex-1 p-4">
        <div className="mb-4">
          <Link href="/poems" className="text-blue-500 hover:underline">
            Back to Poems
          </Link>
        </div>
        <article>
          <h2 className="text-3xl font-bold mb-2">{poem.title}</h2>
          <p className="text-sm text-gray-500 mb-4">
            By {poem.author?.username || "Unknown"} • {new Date(poem.created_at).toLocaleDateString()}
          </p>
          <div className="prose max-w-none">
            <div className="whitespace-pre-line">{poem.content}</div>
          </div>
        </article>
      </main>
      <footer className="border-t p-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} VersesVibez. All rights reserved.
      </footer>
    </div>
  )
}
