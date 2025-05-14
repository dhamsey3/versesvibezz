"use client"

import { NextStudio } from "next-sanity/studio"
import config from "@/sanity.config"

export default function HiddenStudioPage() {
  return (
    <div style={{ height: "100vh" }}>
      <NextStudio config={config} />
    </div>
  )
}
