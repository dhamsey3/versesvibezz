"use client"

import { useState } from "react"
import Image from "next/image"

interface DebugImageProps {
  src: string
  alt: string
  fallbackSrc?: string
  fill?: boolean
  className?: string
}

export default function DebugImage({
  src,
  alt,
  fallbackSrc = "/placeholder.svg",
  fill = false,
  className = "",
}: DebugImageProps) {
  const [error, setError] = useState(false)

  const handleError = () => {
    console.error("Image failed to load:", src)
    setError(true)
  }

  const imageSrc = error ? fallbackSrc : src

  return fill ? (
    <Image src={imageSrc || "/placeholder.svg"} alt={alt} fill className={className} onError={handleError} />
  ) : (
    <Image
      src={imageSrc || "/placeholder.svg"}
      alt={alt}
      width={400}
      height={300}
      className={className}
      onError={handleError}
    />
  )
}
