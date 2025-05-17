"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function SanityDebugPage() {
  const [projectInfo, setProjectInfo] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `${new Date().toISOString().split("T")[1].split(".")[0]}: ${message}`])
  }

  useEffect(() => {
    async function checkSanity() {
      try {
        addLog("Testing Sanity connection...")

        // Hardcoded Sanity configuration
        const projectId = "5npbo3eo"
        const dataset = "production"
        const apiVersion = "2023-05-03"

        addLog(`Using projectId: ${projectId}, dataset: ${dataset}`)

        // Construct the URL for the Sanity API
        const url = `https://${projectId}.api.sanity.io/v${apiVersion}/projects/${projectId}`

        addLog(`Fetching project info from: ${url}`)

        // Fetch project info
        const response = await fetch(url)

        if (!response.ok) {
          throw new Error(`Sanity API responded with status: ${response.status}`)
        }

        const data = await response.json()
        addLog(`Received project info response`)

        setProjectInfo(data)
        setLoading(false)
      } catch (err: any) {
        addLog(`Error: ${err.message}`)
        setError(err.message)
        setLoading(false)
      }
    }

    checkSanity()
  }, [])

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Sanity Studio Diagnostic Tool</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Connection Status</h2>
          <div className={`p-4 rounded-lg ${loading ? "bg-yellow-100" : error ? "bg-red-100" : "bg-green-100"}`}>
            <p className="font-medium">Status: {loading ? "Checking..." : error ? "Error" : "Connected"}</p>
            {error && (
              <div className="mt-2">
                <p className="font-medium">Error:</p>
                <pre className="text-sm bg-white p-2 rounded mt-1 overflow-auto">{error}</pre>
              </div>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Logs</h2>
            <div className="bg-gray-100 p-4 rounded-lg h-60 overflow-auto">
              {logs.map((log, index) => (
                <div key={index} className="text-xs font-mono mb-1">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Project Info</h2>
          <div className="bg-gray-100 p-4 rounded-lg h-60 overflow-auto">
            {loading ? (
              <p className="text-gray-500">Loading project info...</p>
            ) : projectInfo ? (
              <pre className="text-xs font-mono">{JSON.stringify(projectInfo, null, 2)}</pre>
            ) : (
              <p className="text-gray-500">No project info available</p>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Studio Options</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/studio" className="p-4 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors">
                <h3 className="font-medium mb-1">Standard Studio</h3>
                <p className="text-sm text-gray-600">Default embedded studio</p>
              </Link>

              <Link href="/studio-simple" className="p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
                <h3 className="font-medium mb-1">Simple Studio</h3>
                <p className="text-sm text-gray-600">Minimal configuration</p>
              </Link>

              <Link
                href="/external-studio"
                className="p-4 bg-green-100 rounded-lg hover:bg-green-200 transition-colors"
              >
                <h3 className="font-medium mb-1">External Studio</h3>
                <p className="text-sm text-gray-600">Open in separate window</p>
              </Link>

              <a
                href="https://5npbo3eo.sanity.studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-yellow-100 rounded-lg hover:bg-yellow-200 transition-colors"
              >
                <h3 className="font-medium mb-1">Direct Link</h3>
                <p className="text-sm text-gray-600">Open studio directly</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Troubleshooting Steps</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Check that your browser allows third-party cookies</li>
          <li>Try using a different browser</li>
          <li>Clear your browser cache and cookies</li>
          <li>Check if you're logged in to your Sanity account</li>
          <li>Verify that you have the correct permissions for this project</li>
          <li>Try using the external studio instead of the embedded one</li>
          <li>Check your network connection and any firewall settings</li>
        </ol>
      </div>
    </div>
  )
}
