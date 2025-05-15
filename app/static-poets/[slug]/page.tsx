import { notFound } from "next/navigation"
import { staticPoets } from "@/lib/static-data"
import StaticPoetPage from "@/components/static-poet-page"

export default function StaticPoetDetailPage({ params }: { params: { slug: string } }) {
  const poet = staticPoets.find((p) => p.slug === params.slug)

  if (!poet) {
    notFound()
  }

  return <StaticPoetPage poet={poet} />
}
