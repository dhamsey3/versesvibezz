import { client } from "@/lib/sanity-client"
import Link from "next/link"

export default async function SanityDiagnosticPage() {
  // Test the Sanity connection
  let connectionStatus = "Unknown"
  let error = null
  let projectInfo = null
  let testPoem = null

  try {
    // Try to fetch project info
    projectInfo = await client.request({ url: "/projects/5npbo3eo" })
    connectionStatus = "Connected"

    // Try to fetch a poem
    testPoem = await client.fetch('*[_type == "poem"][0...1]')
  } catch (err: any) {
    connectionStatus = "Error"
    error = err.message
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Sanity Diagnostic Tool</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          <div className={`p-4 rounded-lg ${connectionStatus === "Connected" ? "bg-green-100" : "bg-red-100"}`}>
            <p className="font-medium">Status: {connectionStatus}</p>
            {error && (
              <div className="mt-2">
                <p className="font-medium">Error:</p>
                <pre className="text-sm bg-white p-2 rounded mt-1 overflow-auto">{error}</pre>
              </div>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Configuration</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p>
                <strong>Project ID:</strong> 5npbo3eo
              </p>
              <p>
                <strong>Dataset:</strong> production
              </p>
              <p>
                <strong>API Version:</strong> 2023-05-03
              </p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Test Data</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            {testPoem ? (
              <div>
                <p className="font-medium">Successfully fetched a poem:</p>
                <pre className="text-xs bg-white p-2 rounded mt-2 overflow-auto h-60">
                  {JSON.stringify(testPoem, null, 2)}
                </pre>
              </div>
            ) : (
              <p>No poem data available. Check connection status.</p>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Project Info</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              {projectInfo ? (
                <pre className="text-xs bg-white p-2 rounded overflow-auto h-40">
                  {JSON.stringify(projectInfo, null, 2)}
                </pre>
              ) : (
                <p>No project info available. Check connection status.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <h2 className="text-xl font-semibold">Troubleshooting Steps</h2>
        <div className="bg-blue-50 p-4 rounded-lg">
          <ol className="list-decimal pl-5 space-y-2">
            <li>Check that your Sanity project ID is correct (5npbo3eo)</li>
            <li>Verify that your dataset name is correct (production)</li>
            <li>Make sure your SANITY_API_TOKEN environment variable is set correctly</li>
            <li>Try clearing your browser cache and cookies</li>
            <li>Check your network connection</li>
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
