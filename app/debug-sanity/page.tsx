import { client } from "@/lib/sanity-client"
import Link from "next/link"

export default async function DebugSanityPage() {
  let connectionStatus = "Unknown"
  let error = null
  let documents = []
  let poemTypes = []
  let schemas = []

  try {
    // Test connection
    const result = await client.fetch('*[_type == "sanity.document"][0...5]')
    connectionStatus = "Connected"
    documents = result

    // Check for poem documents
    const poems = await client.fetch('*[_type == "poem"][0...5]{_id, title, _type}')
    poemTypes = poems

    // Get schema information
    const schemaInfo = await client.fetch('*[_type == "sanity.documentType"]{name, title}')
    schemas = schemaInfo
  } catch (err: any) {
    connectionStatus = "Error"
    error = err.message
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Sanity Debug Page</h1>

      <div className="mb-4">
        <p>
          <strong>Project ID:</strong> 5npbo3eo
        </p>
        <p>
          <strong>Dataset:</strong> production
        </p>
      </div>

      <div className={`p-4 rounded mb-4 ${connectionStatus === "Connected" ? "bg-green-100" : "bg-red-100"}`}>
        <h2 className="font-semibold mb-2">Connection Status:</h2>
        <p>{connectionStatus}</p>
        {error && (
          <div className="mt-2">
            <p className="font-semibold">Error:</p>
            <p className="text-red-600">{error}</p>
          </div>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Documents in Database:</h2>
        {documents.length > 0 ? (
          <ul className="list-disc pl-5">
            {documents.map((doc: any) => (
              <li key={doc._id}>
                {doc._id} ({doc._type})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-red-600">No documents found</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Poem Documents:</h2>
        {poemTypes.length > 0 ? (
          <ul className="list-disc pl-5">
            {poemTypes.map((poem: any) => (
              <li key={poem._id}>
                {poem.title} ({poem._type})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-red-600">No poem documents found. Have you created any poems in Sanity Studio?</p>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Schema Types:</h2>
        {schemas.length > 0 ? (
          <ul className="list-disc pl-5">
            {schemas.map((schema: any) => (
              <li key={schema.name}>
                {schema.title} ({schema.name})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-yellow-600">No schema information available</p>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <Link href="/studio" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block">
          Go to Sanity Studio
        </Link>
      </div>
    </div>
  )
}
