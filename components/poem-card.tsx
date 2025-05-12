import Link from "next/link"
import { Heart, MessageCircle } from "lucide-react"

interface PoemCardProps {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  likes: number
  comments: number
}

export function PoemCard({ id, title, excerpt, author, date, likes, comments }: PoemCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border p-6 shadow transition-all hover:shadow-md">
      <div className="flex flex-col space-y-2">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="whitespace-pre-line text-gray-500 dark:text-gray-400">{excerpt}</p>
        <div className="pt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            By {author} • {date}
          </p>
        </div>
        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Heart className="h-4 w-4" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <MessageCircle className="h-4 w-4" />
            <span>{comments}</span>
          </div>
        </div>
        <Link href={`/poems/${id}`} className="absolute inset-0" aria-label={`Read ${title}`}>
          <span className="sr-only">Read poem</span>
        </Link>
      </div>
    </div>
  )
}
