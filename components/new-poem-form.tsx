"use client"

import { createPoem } from "@/lib/sanity-actions"
import { useState } from "react"

export default function NewPoemForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success?: boolean; error?: string; poemId?: string } | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setResult(null)

    try {
      const result = await createPoem(formData)
      setResult(result)
    } catch (error) {
      setResult({ success: false, error: String(error) })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="poetId" className="block text-sm font-medium text-gray-700 mb-1">
          Poet ID
        </label>
        <input
          type="text"
          id="poetId"
          name="poetId"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="e.g., poet-123"
        />
        <p className="text-xs text-gray-500 mt-1">Enter the Sanity document ID of the poet</p>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Poem Content
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400"
      >
        {isSubmitting ? "Creating..." : "Create Poem"}
      </button>

      {result && (
        <div className={`p-4 rounded-lg ${result.success ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {result.success ? <p>Poem created successfully! ID: {result.poemId}</p> : <p>Error: {result.error}</p>}
        </div>
      )}
    </form>
  )
}
