"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { deletePoem } from "@/lib/actions"
import { useAuth } from "@/lib/auth"

interface DeletePoemButtonProps {
  poemId: string
}

export function DeletePoemButton({ poemId }: DeletePoemButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const { user } = useAuth()

  if (!user) {
    return null // Don't show delete button if user is not logged in
  }

  const handleDelete = async () => {
    if (!user) return

    setIsDeleting(true)

    try {
      const result = await deletePoem(poemId, user.id)

      if (result.success) {
        toast({
          title: "Success!",
          description: "Your poem has been deleted.",
        })
        router.push("/poems")
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to delete your poem. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting poem:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-1 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
        >
          <Trash2 className="h-4 w-4" />
          <span>Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your poem and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600" disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
