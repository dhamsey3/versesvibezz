"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function DebugApiPage() {
  const [query, setQuery] = useState(`*[_type == "poem"][0...5] {
  _id,
  title,
  slug
}`)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [slug, setSlug] = useState("")
  const router = useRouter()

  const executeQuery = async () => {
    setLoading(true)
    setError(null)
    try {
      // Hardcoded Sanity configuration
      const projectId = "5npbo3eo"
      const dataset = "production"
      const apiVersion = "2023-05-03"

      // Construct the URL for the Sanity API
      const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(
        query,
      )}`

      // Fetch the data
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`Sanity API responded with status: ${response.status}`)
      }

      const data = await response.json()
      setResult(data.result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const goToDiagnostic = () => {
    if (slug) {
      router.push(`/poems/diagnostic/${slug}`)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Sanity API Debugger</h1>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">GROQ Query</label>
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-40 p-3 border rounded-lg font-mono text-sm"
          />
        </div>

        <div className="mb-6">
          <button
            onClick={executeQuery}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Executing..." : "Execute Query"}
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 rounded-lg">
            <p className="font-medium text-red-800">Error:</p>
            <pre className="mt-2 text-sm overflow-auto">{error}</pre>
          </div>
        )}

        {result && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Result:</h2>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto h-60 text-sm">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-8 pt-6 border-t">
          <h2 className="text-xl font-semibold mb-4">Poem Diagnostic Tool</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Enter poem slug"
              className="flex-1 p-2 border rounded"
            />
            <button onClick={goToDiagnostic} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
              Go to Diagnostic
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
