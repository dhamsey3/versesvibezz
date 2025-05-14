import { getArtist } from "@/lib/sanity-utils"
import { urlFor } from "@/lib/sanity"
import { PortableText } from "@portabletext/react"
import Image from "next/image"
import Link from "next/link"

export default async function ArtistPage({ params }: { params: { slug: string } }) {
  const artist = await getArtist(params.slug)

  if (!artist) {
    return <div>Artist not found</div>
  }

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="relative h-80 w-full rounded-lg overflow-hidden">
            {artist.image ? (
              <Image
                src={urlFor(artist.image).url() || "/placeholder.svg"}
                alt={artist.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <span className="text-gray-500">No image</span>
              </div>
            )}
          </div>

          {artist.genres && artist.genres.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {artist.genres.map((genre) => (
                  <span key={genre} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{artist.name}</h1>

          {artist.bio && (
            <div className="prose max-w-none mb-8">
              <PortableText value={artist.bio} />
            </div>
          )}

          {artist.songs && artist.songs.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Songs</h2>
              <div className="space-y-4">
                {artist.songs.map((song) => (
                  <Link
                    key={song._id}
                    href={`/songs/${song.slug.current}`}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-100"
                  >
                    <div className="relative h-12 w-12 flex-shrink-0">
                      {song.coverArt ? (
                        <Image
                          src={urlFor(song.coverArt).url() || "/placeholder.svg"}
                          alt={song.title}
                          fill
                          className="object-cover rounded"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-500">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium">{song.title}</h3>
                      {song.duration && (
                        <p className="text-sm text-gray-600">
                          {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, "0")}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
