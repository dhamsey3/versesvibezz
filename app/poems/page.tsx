import Link from "next/link"
import { getPoems } from "@/lib/actions"

export default async function PoemsPage() {
  // Fetch all poems from the database
  const poems = await getPoems()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b p-4">
        <h1 className="text-2xl font-bold">VersesVibez</h1>
      </header>
      <main className="flex-1 p-4">
        <div className="mb-4">
          <Link href="/" className="text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
        <h2 className="text-xl font-semibold mb-4">Poetry Collection</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {poems.map((poem) => (
            <div key={poem.id} className="border rounded p-4">
              <h3 className="font-bold">{poem.title}</h3>
              <p className="text-sm text-gray-500">
                By {poem.author?.username || "Unknown"} • {new Date(poem.created_at).toLocaleDateString()}
              </p>
              <p className="mt-2">{poem.excerpt}</p>
              <Link href={`/poems/${poem.id}`} className="mt-2 block text-blue-500 hover:underline">
                Read more
              </Link>
            </div>
          ))}
        </div>
      </main>
      <footer className="border-t p-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} VersesVibez. All rights reserved.
      </footer>
    </div>
  )
}
