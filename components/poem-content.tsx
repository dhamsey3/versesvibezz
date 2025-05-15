import { PortableText } from "@portabletext/react"

interface PoemContentProps {
  content: any
}

export default function PoemContent({ content }: PoemContentProps) {
  if (!content) {
    return (
      <div className="prose prose-sm sm:prose max-w-none">
        <p className="text-gray-500 italic">No content available for this poem.</p>
      </div>
    )
  }

  return (
    <div className="poem-content prose prose-sm sm:prose max-w-none font-serif">
      <PortableText
        value={content}
        components={{
          block: {
            normal: ({ children }) => <p className="my-3 md:my-4 text-base sm:text-lg leading-relaxed">{children}</p>,
            verse: ({ children }) => (
              <p className="whitespace-pre-wrap my-3 md:my-4 italic text-base sm:text-lg leading-relaxed">{children}</p>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl md:text-2xl font-semibold mt-6 md:mt-8 mb-3 md:mb-4">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-lg md:text-xl font-semibold mt-5 md:mt-6 mb-2 md:mb-3">{children}</h3>
            ),
          },
        }}
      />
    </div>
  )
}
