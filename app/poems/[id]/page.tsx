import Link from "next/link"
import { getPoemById, getCommentsByPoemId } from "@/lib/actions"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CommentSection } from "@/components/comment-section"
import { LikeButton } from "@/components/like-button"
import { ShareButton } from "@/components/share-button"

export default async function PoemPage({ params }: { params: { id: string } }) {
  const poem = await getPoemById(params.id)
  const comments = await getCommentsByPoemId(params.id)

  if (!poem) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1 container py-12">
          <div className="mb-4">
            <Link href="/poems" className="text-primary hover:underline">
              &larr; Back to Poems
            </Link>
          </div>
          <h1 className="text-2xl font-bold mb-6">Poem not found</h1>
          <p>The poem you're looking for doesn't exist or has been removed.</p>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const formattedDate = new Date(poem.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 container py-12 max-w-3xl">
        <div className="mb-4">
          <Link href="/poems" className="text-primary hover:underline">
            &larr; Back to Poems
          </Link>
        </div>

        <article className="prose prose-lg dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-2">{poem.title}</h1>
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              By {poem.author?.username || "Anonymous"} • {formattedDate} • {poem.category}
            </p>
            <div className="flex items-center gap-2">
              <LikeButton poemId={poem.id} initialLikes={poem.likes} />
              <ShareButton poemId={poem.id} poemTitle={poem.title} />
            </div>
          </div>
          <div className="whitespace-pre-line">{poem.content}</div>
        </article>

        <CommentSection poemId={poem.id} comments={comments} />
      </main>
      <SiteFooter />
    </div>
  )
}
