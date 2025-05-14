import { getSongs } from "@/lib/sanity-utils"
import { urlFor } from "@/lib/sanity"
import Link from "next/link"
import Image from "next/image"

export default async function SongsPage() {
  const songs = await getSongs()

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Songs</h1>

      <div className="space-y-4">
        {songs.map((song) => (
          <Link
            key={song._id}
            href={`/songs/${song.slug.current}`}
            className="flex items-center p-4 rounded-lg hover:bg-gray-100"
          >
            <div className="relative h-16 w-16 flex-shrink-0">
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
            <div className="ml-4 flex-grow">
              <h3 className="font-medium">{song.title}</h3>
              <Link href={`/artists/${song.artistSlug}`} className="text-sm text-gray-600 hover:underline">
                {song.artist}
              </Link>
              {song.album && <p className="text-sm text-gray-500">{song.album}</p>}
            </div>
            {song.duration && (
              <div className="text-sm text-gray-600">
                {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, "0")}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
