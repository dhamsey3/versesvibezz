import Link from "next/link"
import { Heart, MessageCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface FeaturedPoemProps {
  id: string
  title: string
  excerpt: string
  author: string
  date: string
  likes: number
  comments: number
}

export function FeaturedPoem({ id, title, excerpt, author, date, likes, comments }: FeaturedPoemProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="text-sm text-muted-foreground">
              By {author} • {date}
            </p>
          </div>
          <div className="prose prose-gray dark:prose-invert">
            <p className="whitespace-pre-line text-lg">{excerpt}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{comments}</span>
          </div>
        </div>
        <Link href={`/poems/${id}`}>
          <Button>Read More</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
