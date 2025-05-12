"use client"

import type React from "react"

import { useState } from "react"
import { Send } from "lucide-react"
import { useRouter } from "next/navigation"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { addComment } from "@/lib/actions"
import { useAuth } from "@/lib/auth"

interface CommentSectionProps {
  poemId: string
  comments: Array<{
    id: string
    content: string
    created_at: string
    user: {
      id: string
      username: string
      avatar_url: string | null
    }
  }>
}

export function CommentSection({ poemId, comments }: CommentSectionProps) {
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to sign in to comment on poems.",
      })

      router.push("/login")
      return
    }

    if (!comment.trim()) {
      toast({
        title: "Error",
        description: "Please enter a comment",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await addComment(poemId, user.id, comment)
      setComment("")
      toast({
        title: "Success",
        description: "Your comment has been posted",
      })

      // In a real app, we would update the comments list here
      // For now, we'll just reload the page to show the new comment
      window.location.reload()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post comment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage
              src={user?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || "guest"}`}
              alt={(user?.username || "Guest") + "'s avatar"}
            />
            <AvatarFallback>{user ? user.username.substring(0, 2).toUpperCase() : "GU"}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <Textarea
              placeholder={user ? "Share your thoughts on this poem..." : "Sign in to comment..."}
              value={comment}
              onChange={handleCommentChange}
              className="min-h-[100px]"
              disabled={!user}
            />
            <div className="flex justify-end">
              <Button type="submit" className="gap-1" disabled={isSubmitting || !user}>
                <Send className="h-4 w-4" />
                <span>{!user ? "Sign in to comment" : isSubmitting ? "Posting..." : "Post Comment"}</span>
              </Button>
            </div>
          </div>
        </div>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar>
              <AvatarImage
                src={
                  comment.user.avatar_url || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + comment.user.username
                }
                alt={`${comment.user.username}'s avatar`}
              />
              <AvatarFallback>{comment.user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{comment.user.username}</h3>
                <span className="text-sm text-muted-foreground">
                  {new Date(comment.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">{comment.content}</p>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <p className="text-center text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>
    </div>
  )
}
