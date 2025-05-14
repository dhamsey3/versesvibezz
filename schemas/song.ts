export default {
  name: "song",
  title: "Song",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "artist",
      title: "Artist",
      type: "reference",
      to: { type: "artist" },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "album",
      title: "Album",
      type: "reference",
      to: { type: "album" },
    },
    {
      name: "coverArt",
      title: "Cover Art",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "audioFile",
      title: "Audio File",
      type: "file",
      options: {
        accept: "audio/*",
      },
    },
    {
      name: "duration",
      title: "Duration (seconds)",
      type: "number",
    },
    {
      name: "releaseDate",
      title: "Release Date",
      type: "date",
    },
    {
      name: "lyrics",
      title: "Lyrics",
      type: "text",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "artist.name",
      media: "coverArt",
    },
  },
}
