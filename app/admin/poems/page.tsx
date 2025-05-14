import { getDraftPoems } from "@/lib/sanity-actions"
import Link from "next/link"
import NewPoemForm from "@/components/new-poem-form"

export default async function AdminPoemsPage() {
  const { success, poems, error } = await getDraftPoems()

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Poem Administration</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Create New Poem</h2>
        <NewPoemForm />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Draft Poems</h2>
        {!success ? (
          <div className="bg-red-100 p-4 rounded-lg text-red-700">Error loading drafts: {error}</div>
        ) : poems && poems.length > 0 ? (
          <ul className="space-y-2">
            {poems.map((poem) => (
              <li key={poem._id} className="p-4 bg-yellow-50 rounded-lg">
                <div className="font-medium">{poem.title}</div>
                <div className="text-sm text-gray-600">By {poem.poet}</div>
                <div className="mt-2">
                  <Link
                    href={`https://5npbo3eo.sanity.studio/desk/poem;${poem._id}`}
                    target="_blank"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit in Sanity Studio
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No draft poems found.</p>
        )}
      </div>
    </div>
  )
}
