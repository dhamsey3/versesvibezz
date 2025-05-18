import ClientPoemDisplay from "@/components/client-poem-display"

export default function PoemPage({ params }: { params: { slug: string } }) {
  return <ClientPoemDisplay slug={params.slug} />
}
