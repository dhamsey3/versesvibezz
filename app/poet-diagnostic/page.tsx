import { client } from "@/lib/sanity-client"
import Link from "next/link"

export default async function PoetDiagnosticPage() {
  // Test the poet data
  let poets = []
  let error = null
  let poetReferences = []
  let poemWithPoet = null

  try {
    // Try to fetch all poets
    poets = await client.fetch(`*[_type == "poet"] {
      _id,
      name,
      slug
    }`)

    // Check for poems with poet references
    poetReferences = await client.fetch(`*[_type == "poem" && defined(poet)] {
      _id,
      title,
      "poetId": poet._ref,
      "poetExists": defined(*[_type == "poet" && _id == ^.poet._ref][0])
    }`)

    // Get a sample poem with its poet
    poemWithPoet = await client.fetch(`*[_type == "poem" && defined(poet)][0] {
      _id,
      title,
      "poet": poet->{
        _id,
        name,
        slug
      }
    }`)
  } catch (err: any) {
    error = err.message
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Poet Data Diagnostic</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Poets in Database</h2>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            {error ? (
              <p className="text-red-600">{error}</p>
            ) : poets.length > 0 ? (
              <div>
                <p className="mb-2">Found {poets.length} poets:</p>
                <ul className="space-y-2">
                  {poets.map((poet) => (
                    <li key={poet._id} className="p-2 bg-gray-50 rounded">
                      <p>
                        <strong>{poet.name}</strong>
                      </p>
                      <p className="text-sm text-gray-600">ID: {poet._id}</p>
                      <p className="text-sm text-gray-600">Slug: {poet.slug?.current || "No slug"}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No poets found in the database.</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Poet References in Poems</h2>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            {error ? (
              <p className="text-red-600">{error}</p>
            ) : poetReferences.length > 0 ? (
              <div>
                <p className="mb-2">Found {poetReferences.length} poems with poet references:</p>
                <ul className="space-y-2">
                  {poetReferences.map((poem) => (
                    <li key={poem._id} className={`p-2 rounded ${poem.poetExists ? "bg-green-50" : "bg-red-50"}`}>
                      <p>
                        <strong>{poem.title}</strong>
                      </p>
                      <p className="text-sm text-gray-600">Poet ID: {poem.poetId}</p>
                      <p className={`text-sm ${poem.poetExists ? "text-green-600" : "text-red-600"}`}>
                        {poem.poetExists ? "Poet exists" : "Poet does not exist"}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No poems with poet references found.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Sample Poem with Poet</h2>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          {poemWithPoet ? (
            <div>
              <p>
                <strong>Poem:</strong> {poemWithPoet.title}
              </p>
              <p>
                <strong>Poet:</strong>{" "}
                {poemWithPoet.poet ? (
                  <>
                    {poemWithPoet.poet.name} (ID: {poemWithPoet.poet._id}, Slug:{" "}
                    {poemWithPoet.poet.slug?.current || "No slug"})
                  </>
                ) : (
                  "No poet data"
                )}
              </p>
              <pre className="mt-4 bg-gray-100 p-2 rounded text-xs overflow-auto">
                {JSON.stringify(poemWithPoet, null, 2)}
              </pre>
            </div>
          ) : (
            <p>No sample poem with poet found.</p>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Troubleshooting Steps</h2>
        <div className="bg-blue-50 p-4 rounded-lg">
          <ol className="list-decimal pl-5 space-y-2">
            <li>Make sure you have poets created in Sanity Studio</li>
            <li>Ensure each poet has a name and a valid slug</li>
            <li>Check that poems correctly reference poets</li>
            <li>Verify that the poet references in poems point to existing poet documents</li>
            <li>Try creating a new poet and a new poem that references that poet</li>
          </ol>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
