import { notFound } from "next/navigation"
import { staticPoems } from "@/lib/static-data"
import StaticPoemPage from "@/components/static-poem-page"

export default function StaticPoemDetailPage({ params }: { params: { slug: string } }) {
  const poem = staticPoems.find((p) => p.slug === params.slug)

  if (!poem) {
    notFound()
  }

  return <StaticPoemPage poem={poem} />
}
