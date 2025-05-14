"use client"

import type React from "react"
import { useState } from "react"
import { clientSafe } from "@/lib/sanity-client-safe"

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setError(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload")
      return
    }

    setUploading(true)
    setError(null)

    try {
      // Create a new asset document from the file
      const asset = await clientSafe.assets.upload("image", file, {
        filename: file.name,
      })

      setUploadedImage(asset.url)
      setFile(null)
    } catch (err: any) {
      console.error("Upload failed:", err)
      setError(err.message || "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="border border-gray-200 rounded-lg p-6 max-w-md">
      <h2 className="text-xl font-semibold mb-4">Upload Image</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          disabled={uploading}
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </button>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {uploadedImage && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Uploaded Image</h3>
          <div className="relative h-48 w-full rounded-lg overflow-hidden">
            <img src={uploadedImage || "/placeholder.svg"} alt="Uploaded" className="object-cover w-full h-full" />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            This image has been uploaded to your Sanity media library and can now be used in your content.
          </p>
        </div>
      )}
    </div>
  )
}
