"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

interface SanityDiagnosticDisplayProps {
  slug: string
}

export default function SanityDiagnosticDisplay({ slug }: SanityDiagnosticDisplayProps) {
  const [status, setStatus] = useState("Loading...")
  const [poemData, setPoemData] = useState(null)
  const [error, setError] = useState(null)
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `${new Date().toISOString().split("T")[1].split(".")[0]}: ${message}`])
  }

  useEffect(() => {
    async function fetchPoemDirectly() {
      try {
        addLog("Starting direct fetch attempt")

        // Hardcoded Sanity configuration
        const projectId = "5npbo3eo"
        const dataset = "production"
        const apiVersion = "2023-05-03"

        addLog(`Using projectId: ${projectId}, dataset: ${dataset}`)

        // Construct the GROQ query
        const query = `*[_type == "poem" && slug.current == $slug][0]`
        const params = { slug }

        // Construct the URL for the Sanity API
        const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(
          query,
        )}&$slug="${encodeURIComponent(slug)}"`

        addLog(`Fetching from URL: ${url}`)

        // Fetch the data
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`Sanity API responded with status: ${response.status}`)
        }

        const data = await response.json()
        addLog(`Received response: ${JSON.stringify(data).substring(0, 100)}...`)

        if (data.result) {
          setPoemData(data.result)
          setStatus("Success")
        } else {
          setStatus("No Data")
          addLog("No poem data found in the response")
        }
      } catch (err) {
        addLog(`Error: ${err.message}`)
        setError(err.message)
        setStatus("Error")
      }
    }

    fetchPoemDirectly()
  }, [slug])

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Sanity Diagnostic: Poem "{slug}"</h1>

      <div className="mb-6">
        <div
          className={`p-4 rounded-lg ${status === "Success" ? "bg-green-100" : status === "Error" ? "bg-red-100" : "bg-yellow-100"}`}
        >
          <p className="font-medium">Status: {status}</p>
          {error && (
            <div className="mt-2">
              <p className="font-medium">Error:</p>
              <pre className="text-sm bg-white p-2 rounded mt-1 overflow-auto">{error}</pre>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Logs</h2>
          <div className="bg-gray-100 p-4 rounded-lg h-60 overflow-auto">
            {logs.map((log, index) => (
              <div key={index} className="text-xs font-mono mb-1">
                {log}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Poem Data</h2>
          <div className="bg-gray-100 p-4 rounded-lg h-60 overflow-auto">
            {poemData ? (
              <pre className="text-xs font-mono">{JSON.stringify(poemData, null, 2)}</pre>
            ) : (
              <p className="text-gray-500">No data available</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <h2 className="text-xl font-semibold">Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Refresh
          </button>
          <Link
            href={`/poems/static/${slug}`}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            View Static Version
          </Link>
          <Link href="/poems" className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Back to Poems
          </Link>
        </div>
      </div>
    </div>
  )
}
