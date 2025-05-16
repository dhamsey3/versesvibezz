import SanityDiagnosticDisplay from "@/components/sanity-diagnostic-display"

export default function PoemDiagnosticPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto py-8 px-4">
      <SanityDiagnosticDisplay slug={params.slug} />
    </div>
  )
}
