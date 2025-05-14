import { PortableText } from "@portabletext/react"

export default function TestPoemPage() {
  // Sample poem content in Portable Text format
  const samplePoemContent = [
    {
      _type: "block",
      style: "verse",
      children: [
        {
          _type: "span",
          text: "Roses are red,",
          marks: [],
        },
      ],
      markDefs: [],
    },
    {
      _type: "block",
      style: "verse",
      children: [
        {
          _type: "span",
          text: "Violets are blue,",
          marks: [],
        },
      ],
      markDefs: [],
    },
    {
      _type: "block",
      style: "verse",
      children: [
        {
          _type: "span",
          text: "This is a test poem,",
          marks: [],
        },
      ],
      markDefs: [],
    },
    {
      _type: "block",
      style: "verse",
      children: [
        {
          _type: "span",
          text: "Just for you.",
          marks: [],
        },
      ],
      markDefs: [],
    },
  ]

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test Poem Rendering</h1>

        <div className="prose max-w-none">
          <h2 className="text-xl font-semibold mb-4">Sample Poem Content:</h2>
          <PortableText
            value={samplePoemContent}
            components={{
              block: {
                verse: ({ children }) => <p className="whitespace-pre-wrap font-serif">{children}</p>,
              },
            }}
          />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Raw Content:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(samplePoemContent, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}
