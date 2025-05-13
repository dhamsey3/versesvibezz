"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { deletePoem } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

type DeletePoemButtonProps = {
  poemId: string
  userId: string
}

export function DeletePoemButton({ poemId, userId }: DeletePoemButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleDelete = async () => {
    setIsDeleting(true)

    const formData = new FormData()
    formData.append("id", poemId)
    formData.append("authorId", userId)

    try {
      const result = await deletePoem(formData)
      if (result.success) {
        toast({
          title: "Success",
          description: "Poem deleted successfully",
        })
        router.push("/poems")
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to delete poem",
          variant: "destructive",
        })
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setShowConfirm(false)
    }
  }

  if (showConfirm) {
    return (
      <div className="mt-4 p-4 border rounded bg-red-50 dark:bg-red-950">
        <p className="mb-2">Are you sure you want to delete this poem? This action cannot be undone.</p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowConfirm(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Confirm Delete"}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Button variant="destructive" onClick={() => setShowConfirm(true)}>
      Delete Poem
    </Button>
  )
}
