"use client"

import { useState, useEffect } from "react"

export default function DebugEnvPage() {
  const [envInfo, setEnvInfo] = useState<any>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getEnvironmentInfo() {
      try {
        // Collect basic environment information
        const info = {
          userAgent: window.navigator.userAgent,
          language: window.navigator.language,
          platform: window.navigator.platform,
          screenWidth: window.screen.width,
          screenHeight: window.screen.height,
          url: window.location.href,
          hostname: window.location.hostname,
          pathname: window.location.pathname,
          protocol: window.location.protocol,
          connectionType: (navigator as any).connection?.effectiveType || "unknown",
          memory: (navigator as any).deviceMemory ? `${(navigator as any).deviceMemory} GB` : "unknown",
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          timestamp: new Date().toISOString(),
        }

        setEnvInfo(info)
      } catch (error) {
        console.error("Error collecting environment info:", error)
        setEnvInfo({ error: "Failed to collect environment information" })
      } finally {
        setLoading(false)
      }
    }

    getEnvironmentInfo()
  }, [])

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Environment Debug Information</h1>

        {loading ? (
          <div className="text-center py-8">Loading environment information...</div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">Client Environment</h2>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-auto max-h-96 text-sm">
              {JSON.stringify(envInfo, null, 2)}
            </pre>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Navigation</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="/poems/the-battle-of-time"
                  className="block p-4 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  <h3 className="font-medium mb-1">View "The Battle of Time" Poem</h3>
                  <p className="text-sm text-gray-600">Test if the poem page is working</p>
                </a>
                <a href="/poems" className="block p-4 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors">
                  <h3 className="font-medium mb-1">View All Poems</h3>
                  <p className="text-sm text-gray-600">Test if the poems list page is working</p>
                </a>
                <a
                  href="/poets/anonymous"
                  className="block p-4 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  <h3 className="font-medium mb-1">View Anonymous Poet</h3>
                  <p className="text-sm text-gray-600">Test if the poet page is working</p>
                </a>
                <a href="/poets" className="block p-4 bg-purple-100 rounded-lg hover:bg-purple-200 transition-colors">
                  <h3 className="font-medium mb-1">View All Poets</h3>
                  <p className="text-sm text-gray-600">Test if the poets list page is working</p>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
