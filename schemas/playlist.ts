export default {
  name: "playlist",
  title: "Playlist",
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
      name: "description",
      title: "Description",
      type: "text",
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
      name: "songs",
      title: "Songs",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "song" },
        },
      ],
    },
    {
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "coverArt",
    },
  },
}
