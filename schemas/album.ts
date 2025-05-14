export default {
  name: "album",
  title: "Album",
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
      name: "coverArt",
      title: "Cover Art",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "releaseDate",
      title: "Release Date",
      type: "date",
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "genres",
      title: "Genres",
      type: "array",
      of: [{ type: "string" }],
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
