"use client"

import { NextStudio } from "next-sanity/studio"
import config from "@/sanity.config"
import { useEffect } from "react"

export default function StudioPage() {
  // Add a useEffect to log any errors
  useEffect(() => {
    console.log("Sanity Studio initializing with config:", config)
  }, [])

  return (
    <div style={{ height: "100vh" }}>
      <NextStudio config={config} />
    </div>
  )
}
