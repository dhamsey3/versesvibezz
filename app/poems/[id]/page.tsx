import Link from "next/link"
import { ArrowLeft, Calendar, Heart, Share2, User, Edit } from "lucide-react"
import { notFound } from "next/navigation"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CommentSection } from "@/components/comment-section"
import { LikeButton } from "@/components/like-button"
import { getCommentsByPoemId, getPoemById } from "@/lib/actions"
import { DeletePoemButton } from "@/components/delete-poem-button"

export default async function PoemPage({ params }: { params: { id: string } }) {
  // Fetch the poem from the database
  const poem = await getPoemById(params.id)

  // If the poem doesn't exist, show a 404 page
  if (!poem) {
    notFound()
  }

  // Fetch comments for this poem
  const comments = await getCommentsByPoemId(params.id)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <article className="container max-w-3xl py-12 md:py-20">
          <div className="mb-8">
            <Link href="/poems">
              <Button variant="ghost" size="sm" className="gap-1 mb-4">
                <ArrowLeft className="h-4 w-4" /> Back to Poems
              </Button>
            </Link>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{poem.title}</h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{poem.author?.username || "Unknown"}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={poem.created_at}>
                  {new Date(poem.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="h-4 w-4" />
                <span>{poem.likes} likes</span>
              </div>
            </div>
          </div>

          <div className="prose prose-gray max-w-none dark:prose-invert">
            <div className="whitespace-pre-line text-lg leading-relaxed">{poem.content}</div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-b py-4">
            <div className="flex items-center gap-2">
              <LikeButton poemId={poem.id} initialLikes={poem.likes} />
              <Button variant="outline" size="sm" className="gap-1">
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>

              {/* Add these buttons */}
              <Link href={`/poems/${poem.id}/edit`}>
                <Button variant="outline" size="sm" className="gap-1">
                  <Edit className="h-4 w-4" />
                  <span>Edit</span>
                </Button>
              </Link>
              <DeletePoemButton poemId={poem.id} />
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">{poem.category}</span>
            </div>
          </div>

          <CommentSection poemId={poem.id} comments={comments} />
        </article>
      </main>
      <SiteFooter />
    </div>
  )
}
