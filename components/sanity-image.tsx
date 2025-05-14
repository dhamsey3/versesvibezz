"use client"

import { useState } from "react"
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

  // Generate image URL or use fallback
  let imageUrl = fallbackImage

  try {
    if (image && !isError) {
      imageUrl = urlFor(image).url()
    }
  } catch (error) {
    console.error("Error generating image URL:", error)
    setIsError(true)
  }

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

  return (
    <>
      {fill ? (
        <Image
          src={isError ? fallbackImage : imageUrl}
          alt={alt}
          fill
          className={`${className} ${isLoading ? "animate-pulse bg-gray-200" : ""}`}
          onError={handleError}
          onLoad={handleLoad}
          priority={priority}
        />
      ) : (
        <Image
          src={isError ? fallbackImage : imageUrl}
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
