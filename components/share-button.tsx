"use client"

import { useState } from "react"
import { Share2, Twitter, Facebook, Copy, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

interface ShareButtonProps {
  poemId: string
  poemTitle: string
}

export function ShareButton({ poemId, poemTitle }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

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

  const handleTwitterShare = () => {
    const url = getShareUrl()
    const text = `Check out this poem: ${poemTitle} on VersesVibez`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(twitterUrl, "_blank")
  }

  const handleFacebookShare = () => {
    const url = getShareUrl()
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    window.open(facebookUrl, "_blank")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer">
          {copied ? <Check className="mr-2 h-4 w-4 text-green-600" /> : <Copy className="mr-2 h-4 w-4" />}
          <span>Copy Link</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleTwitterShare} className="cursor-pointer">
          <Twitter className="mr-2 h-4 w-4 text-[#1DA1F2]" />
          <span>Share on Twitter</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleFacebookShare} className="cursor-pointer">
          <Facebook className="mr-2 h-4 w-4 text-[#4267B2]" />
          <span>Share on Facebook</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
