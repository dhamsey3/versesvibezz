"use client"

import { useState } from "react"
import Link from "next/link"

export default function StudioFallbackPage() {
  const [projectId, setProjectId] = useState("5npbo3eo")
  const [dataset, setDataset] = useState("production")

  const studioUrl = `https://${projectId}.sanity.studio/desk`

  return (
    <div className="container mx-auto py-10 px-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Sanity Studio Fallback</h1>

      <div className="bg-yellow-50 p-4 rounded-lg mb-8">
        <p className="text-yellow-800">
          If you're experiencing issues with the embedded Sanity Studio, you can use this fallback page to access your
          content.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Sanity Project</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project ID</label>
            <input
              type="text"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dataset</label>
            <input
              type="text"
              value={dataset}
              onChange={(e) => setDataset(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <a
            href={studioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 text-white text-center rounded hover:bg-blue-700"
          >
            Open Sanity Studio Directly
          </a>

          <a
            href={`https://sanity.io/manage/project/${projectId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-gray-200 text-gray-800 text-center rounded hover:bg-gray-300"
          >
            Manage Project in Sanity Dashboard
          </a>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Troubleshooting</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Make sure you're logged in to Sanity in your browser</li>
          <li>Check that your project ID and dataset are correct</li>
          <li>Try clearing your browser cache and cookies</li>
          <li>Ensure your browser is up to date</li>
          <li>Disable browser extensions that might interfere with the Studio</li>
        </ul>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
