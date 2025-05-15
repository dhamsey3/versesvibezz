"use client"

import { useState, useEffect } from "react"
import { client } from "@/lib/sanity-client-fixed"

export default function SanityCheckPage() {
  const [status, setStatus] = useState("Checking...")
  const [config, setConfig] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      // Get the client configuration
      const clientConfig = client.config()
      setConfig(clientConfig)

      // Test a simple query
      client
        .fetch('*[_type == "poet"][0...1]')
        .then(() => {
          setStatus("Connected")
        })
        .catch((err) => {
          setStatus("Error")
          setError(err.message)
        })
    } catch (err) {
      setStatus("Configuration Error")
      setError(err.message)
    }
  }, [])

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Sanity Configuration Check</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Status</h2>
        <div className={`p-4 rounded-lg ${status === "Connected" ? "bg-green-100" : "bg-red-100"}`}>
          <p className="font-medium">Connection Status: {status}</p>
          {error && (
            <div className="mt-2">
              <p className="font-medium">Error:</p>
              <pre className="text-sm bg-white p-2 rounded mt-1 overflow-auto">{error}</pre>
            </div>
          )}
        </div>
      </div>

      {config && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Client Configuration</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(config, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
