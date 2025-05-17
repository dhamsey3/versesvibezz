"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { fetchSafely } from "@/lib/sanity-client"
import { staticPoems, staticPoets } from "@/lib/static-data"

type ContentSource = "sanity" | "static"

interface ContentContextType {
  source: ContentSource
  poems: any[]
  poets: any[]
  isLoading: boolean
  refreshContent: () => Promise<void>
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [source, setSource] = useState<ContentSource>("sanity")
  const [poems, setPoems] = useState<any[]>([])
  const [poets, setPoets] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  async function loadContent() {
    setIsLoading(true)

    // Try to load from Sanity
    const sanityPoems = await fetchSafely('*[_type == "poem"]', {}, null)
    const sanityPoets = await fetchSafely('*[_type == "poet"]', {}, null)

    if (sanityPoems && sanityPoets) {
      setPoems(sanityPoems)
      setPoets(sanityPoets)
      setSource("sanity")
    } else {
      // Fall back to static data
      setPoems(staticPoems)
      setPoets(staticPoets)
      setSource("static")
    }

    setIsLoading(false)
  }

  useEffect(() => {
    loadContent()
  }, [])

  return (
    <ContentContext.Provider
      value={{
        source,
        poems,
        poets,
        isLoading,
        refreshContent: loadContent,
      }}
    >
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const context = useContext(ContentContext)
  if (context === undefined) {
    throw new Error("useContent must be used within a ContentProvider")
  }
  return context
}
