"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Validate the password on the server side
      const response = await fetch("/api/validate-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (data.valid) {
        // Redirect to the studio access page with the key
        router.push(`/studio-access?key=${password}`)
      } else {
        setError("Invalid password")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Access</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Admin Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Enter admin password"
              required
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button type="submit" className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700">
            Access Studio
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <Link href="/" className="text-purple-600 hover:underline text-sm">
            Return to Home
          </Link>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>This page is for authorized administrators only.</p>
        <p>If you need access, please contact the site owner.</p>
      </div>
    </div>
  )
}
