import { client } from "@/lib/sanity"
import { urlFor } from "@/lib/sanity"
import Image from "next/image"
import Link from "next/link"

export default async function DebugImagesPage() {
  // Fetch a sample poem to test image rendering
  let poem = null
  let error = null
  let imageUrl = null
  let rawImageData = null

  try {
    // Try to fetch a poem with an image
    poem = await client.fetch(`*[_type == "poem" && defined(coverImage)][0]{
      _id,
      title,
      coverImage
    }`)

    if (poem && poem.coverImage) {
      rawImageData = JSON.stringify(poem.coverImage, null, 2)

      try {
        imageUrl = urlFor(poem.coverImage).url()
      } catch (err: any) {
        error = `Error generating URL: ${err.message}`
      }
    } else {
      error = "No poem with cover image found"
    }
  } catch (err: any) {
    error = `Error fetching poem: ${err.message}`
  }

  // Test default images
  const defaultImages = [
    "/images/poetry-bg-1.jpg",
    "/images/poetry-bg-2.jpg",
    "/images/poetry-bg-3.jpg",
    "/images/poetry-bg-4.jpg",
    "/images/poetry-bg-5.jpg",
    "/images/poet-default.png",
    "/images/collection-default.png",
  ]

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Image Debugging</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Sanity Image Test</h2>
          {error ? (
            <div className="bg-red-100 p-4 rounded-lg text-red-700 mb-4">{error}</div>
          ) : (
            <>
              {poem && (
                <div>
                  <p className="mb-2">
                    <strong>Poem:</strong> {poem.title}
                  </p>
                  <p className="mb-2">
                    <strong>Image URL:</strong> {imageUrl || "No URL generated"}
                  </p>
                  <div className="mb-4">
                    <strong>Raw Image Data:</strong>
                    <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto mt-1">{rawImageData}</pre>
                  </div>

                  {imageUrl && (
                    <div className="relative h-64 w-full rounded overflow-hidden">
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={poem.title || "Poem image"}
                        fill
                        className="object-cover"
                        onError={() => console.error("Image failed to load:", imageUrl)}
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Next.js Image Configuration</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="mb-2">
              <strong>Domains:</strong> cdn.sanity.io
            </p>
            <p className="mb-2">
              <strong>Unoptimized:</strong> true
            </p>
            <p>
              <strong>Remote Patterns:</strong> https://cdn.sanity.io/**
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Default Images Test</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {defaultImages.map((src, index) => (
            <div key={index} className="relative h-40 rounded overflow-hidden">
              <Image
                src={src || "/placeholder.svg"}
                alt={`Default image ${index + 1}`}
                fill
                className="object-cover"
                onError={() => console.error("Default image failed to load:", src)}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1">
                {src.split("/").pop()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Placeholder Test</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative h-40 rounded overflow-hidden">
            <Image src="/test-image.png" alt="Placeholder test" fill className="object-cover" />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-purple-700 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
