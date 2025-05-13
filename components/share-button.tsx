"use client"

import { useState } from "react"
import { Share2, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface ShareButtonProps {
  poemId: string
  poemTitle: string
}

export function ShareButton({ poemId, poemTitle }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const getShareUrl = () => {
    return `${window.location.origin}/poems/${poemId}`
  }

  const handleCopyLink = async () => {
    const url = getShareUrl()

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast({
        title: "Link copied",
        description: "The poem link has been copied to your clipboard.",
      })

      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy link:", err)
      toast({
        title: "Error",
        description: "Failed to copy link. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Button variant="outline" size="sm" className="gap-1" onClick={handleCopyLink}>
      {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
      <span>{copied ? "Copied" : "Share"}</span>
    </Button>
  )
}
