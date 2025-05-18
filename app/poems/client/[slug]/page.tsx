import ClientSidePoem from "@/components/client-side-poem"

export default function ClientSidePoemPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto py-8 px-4">
      <ClientSidePoem slug={params.slug} />
    </div>
  )
}
