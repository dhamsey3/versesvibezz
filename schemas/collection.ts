export default {
  name: "collection",
  title: "Collection",
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
      name: "poet",
      title: "Poet",
      type: "reference",
      to: { type: "poet" },
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
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
      name: "publicationYear",
      title: "Publication Year",
      type: "number",
    },
    {
      name: "publisher",
      title: "Publisher",
      type: "string",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "poet.name",
      media: "coverImage",
    },
  },
}
