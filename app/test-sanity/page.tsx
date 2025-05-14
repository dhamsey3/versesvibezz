import { client } from "@/lib/sanity-client"

export default async function TestSanityPage() {
  // Test the Sanity connection
  let connectionStatus = "Unknown"
  let error = null

  try {
    // Try to fetch a document to test the connection
    await client.fetch('*[_type == "poet"][0...1]')
    connectionStatus = "Connected"
  } catch (err: any) {
    connectionStatus = "Error"
    error = err.message
  }

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Sanity Connection Test</h1>

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

      <div className="mt-4">
        <a href="/studio" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Try Accessing Studio
        </a>
      </div>
    </div>
  )
}
