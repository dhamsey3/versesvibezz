import { client } from "@/lib/sanity-client"
import Link from "next/link"

export default async function AdminPoetsPage() {
  // Fetch all poets with their IDs
  const poets = await client.fetch(`
    *[_type == "poet"] {
      _id,
      name,
      "slug": slug.current
    }
  `)

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Poet Reference IDs</h1>
      <p className="mb-6 text-gray-600">Use these IDs when creating new poems or referencing poets in other content.</p>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">ID</th>
              <th className="text-left py-2">Slug</th>
            </tr>
          </thead>
          <tbody>
            {poets.map((poet: any) => (
              <tr key={poet._id} className="border-b">
                <td className="py-2">{poet.name}</td>
                <td className="py-2 font-mono text-sm">{poet._id}</td>
                <td className="py-2">{poet.slug}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <Link href="/admin/poems" className="text-purple-700 hover:underline">
          ← Back to Poem Administration
        </Link>
      </div>
    </div>
  )
}
