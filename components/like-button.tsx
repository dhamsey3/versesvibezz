"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { likePoem } from "@/lib/actions"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth"

interface LikeButtonProps {
  poemId: string
  initialLikes: number
}

export function LikeButton({ poemId, initialLikes }: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes)
  const [isLiking, setIsLiking] = useState(false)
  const [hasLiked, setHasLiked] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()

  const handleLike = async () => {
    if (isLiking) return

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to like a poem",
        variant: "destructive",
      })
      return
    }

    setIsLiking(true)

    try {
      const result = await likePoem(poemId, user.id)

      if (result.liked) {
        setLikes((prev) => prev + 1)
        setHasLiked(true)
        toast({
          title: "Liked!",
          description: "You liked this poem",
        })
      } else {
        setLikes((prev) => prev - 1)
        setHasLiked(false)
        toast({
          title: "Unliked",
          description: "You unliked this poem",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to like the poem. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLiking(false)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className={`gap-1 ${hasLiked ? "text-rose-500 border-rose-200" : ""}`}
      onClick={handleLike}
      disabled={isLiking}
    >
      <Heart className={`h-4 w-4 ${hasLiked ? "fill-rose-500" : ""}`} />
      <span>{likes}</span>
    </Button>
  )
}
