"use client"

import type React from "react"

import { useState } from "react"
import { addComment } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
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
  const { toast } = useToast()

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value)
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to comment",
        variant: "destructive",
      })
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

      {user ? (
        <form onSubmit={handleSubmitComment} className="mb-8">
          <div className="space-y-2">
            <Textarea
              placeholder="Share your thoughts on this poem..."
              value={comment}
              onChange={handleCommentChange}
              className="min-h-[100px]"
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
          <p>Please sign in to leave a comment.</p>
        </div>
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b pb-4">
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
        ))}

        {comments.length === 0 && (
          <p className="text-center text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>
    </div>
  )
}
