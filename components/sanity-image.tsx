"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { urlFor } from "@/lib/sanity"

interface SanityImageProps {
  image: any
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  fallbackImage?: string
  priority?: boolean
}

export default function SanityImage({
  image,
  alt,
  width,
  height,
  fill = false,
  className = "",
  fallbackImage = "/abstract-geometric-placeholder.png",
  priority = false,
}: SanityImageProps) {
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [imageUrl, setImageUrl] = useState<string>(fallbackImage)

  useEffect(() => {
    // Reset states when image prop changes
    setIsError(false)
    setIsLoading(true)

    // Generate image URL or use fallback
    if (image) {
      try {
        // Handle both direct URLs and Sanity image references
        if (typeof image === "string") {
          setImageUrl(image)
        } else if (image._ref || (image.asset && image.asset._ref)) {
          const url = urlFor(image).url()
          if (url) {
            setImageUrl(url)
          } else {
            console.error("Failed to generate URL from image reference:", image)
            setIsError(true)
          }
        } else {
          console.error("Unrecognized image format:", image)
          setIsError(true)
        }
      } catch (error) {
        console.error("Error generating image URL:", error)
        setIsError(true)
      }
    } else {
      setIsError(true)
    }
  }, [image, fallbackImage])

  // Handle image load error
  const handleError = () => {
    console.error("Image failed to load:", imageUrl)
    setIsError(true)
    setIsLoading(false)
  }

  // Handle image load success
  const handleLoad = () => {
    setIsLoading(false)
  }

  const finalImageUrl = isError ? fallbackImage : imageUrl

  return (
    <>
      {fill ? (
        <Image
          src={finalImageUrl || "/placeholder.svg"}
          alt={alt}
          fill
          className={`${className} ${isLoading ? "animate-pulse bg-gray-200" : ""}`}
          onError={handleError}
          onLoad={handleLoad}
          priority={priority}
        />
      ) : (
        <Image
          src={finalImageUrl || "/placeholder.svg"}
          alt={alt}
          width={width || 800}
          height={height || 600}
          className={`${className} ${isLoading ? "animate-pulse bg-gray-200" : ""}`}
          onError={handleError}
          onLoad={handleLoad}
          priority={priority}
        />
      )}
    </>
  )
}
