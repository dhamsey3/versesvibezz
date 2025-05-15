"use client"

import Link from "next/link"

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Something Went Wrong</h2>
        <p className="mb-4">
          We're sorry, but we encountered an error while loading this page. This could be due to a temporary issue or
          network problem.
        </p>

        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p className="text-sm text-gray-700 mb-2">Error details:</p>
          <p className="text-xs text-gray-600 font-mono overflow-auto">{error.message}</p>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            onClick={() => reset()}
            className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
          <Link href="/" className="w-full py-2 text-center bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
