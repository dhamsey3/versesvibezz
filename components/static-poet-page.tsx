import Link from "next/link"
import Image from "next/image"

interface StaticPoetPageProps {
  poet: {
    name: string
    birthDate?: string
    deathDate?: string
    styles?: string[]
    biography: string[]
    poems: Array<{
      title: string
      slug: string
      year?: number
    }>
  }
}

export default function StaticPoetPage({ poet }: StaticPoetPageProps) {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="relative h-64 w-full rounded-lg overflow-hidden">
              <Image
                src="/images/poet-default.png"
                alt={poet.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            <div className="mt-4 space-y-3">
              {poet.birthDate && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase">Born</h3>
                  <p>{poet.birthDate}</p>
                </div>
              )}

              {poet.deathDate && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase">Died</h3>
                  <p>{poet.deathDate}</p>
                </div>
              )}

              {poet.styles && poet.styles.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase">Poetic Styles</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {poet.styles.map((style) => (
                      <span key={style} className="px-3 py-1 bg-purple-100 rounded-full text-sm text-purple-700">
                        {style}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <h1 className="text-3xl font-serif font-bold mb-4">{poet.name}</h1>

            <div className="prose max-w-none mb-6">
              {poet.biography.map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ))}
            </div>

            {poet.poems && poet.poems.length > 0 ? (
              <div>
                <h2 className="text-2xl font-serif font-semibold mb-4">Poems by {poet.name}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {poet.poems.map((poem) => (
                    <Link key={poem.slug} href={`/static-poems/${poem.slug}`} className="group">
                      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="relative h-40">
                          <Image
                            src="/images/poetry-bg-1.jpg"
                            alt={poem.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105 duration-500"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-0 left-0 p-4 text-white">
                            <h3 className="text-lg font-serif font-semibold">{poem.title}</h3>
                            {poem.year && <p className="text-sm text-gray-200">{poem.year}</p>}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-600">No poems found for this poet.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <Link href="/static-poets" className="text-purple-600 hover:underline">
            ← Back to Poets
          </Link>
        </div>
      </div>
    </div>
  )
}
