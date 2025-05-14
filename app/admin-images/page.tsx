import { headers } from "next/headers"
import ImageUploader from "@/components/image-uploader"
import Link from "next/link"

// Basic auth check
function isAuthenticated(): boolean {
  const headersList = headers()
  const authorization = headersList.get("authorization")

  if (!authorization) return false

  try {
    const [scheme, encoded] = authorization.split(" ")
    if (scheme !== "Basic") return false

    const buffer = Buffer.from(encoded, "base64")
    const [username, password] = buffer.toString().split(":")

    // Replace with your actual credentials check
    return username === "admin" && password === "your-secure-password"
  } catch (err) {
    return false
  }
}

export default function AdminImagesPage() {
  const authenticated = isAuthenticated()

  if (!authenticated) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <div className="mt-4">
          <Link href="/" className="text-blue-600 hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Image Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Upload New Image</h2>
          <p className="mb-4 text-gray-600">
            Upload images directly to your Sanity media library. These images can then be used in your poems, poets, and
            collections.
          </p>
          <ImageUploader />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Image Management Tips</h2>
          <ul className="space-y-3 text-gray-700">
            <li>• Images are automatically optimized by Sanity</li>
            <li>• You can crop and adjust images after uploading in Sanity Studio</li>
            <li>• For best results, upload high-resolution images</li>
            <li>• Recommended aspect ratio for poem covers: 3:2</li>
            <li>• Recommended aspect ratio for poet portraits: 1:1 (square)</li>
          </ul>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">Need to manage all images?</h3>
            <p className="text-blue-700 mb-2">
              For complete image management, including deleting and organizing images, use Sanity Studio.
            </p>
            <Link href="/studio" className="text-blue-600 hover:underline">
              Go to Sanity Studio →
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/image-guide" className="text-purple-700 hover:underline">
          View Complete Image Guide
        </Link>
      </div>
    </div>
  )
}
