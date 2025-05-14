export default {
  name: "poem",
  title: "Poem",
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "collection",
      title: "Collection",
      type: "reference",
      to: { type: "collection" },
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
      name: "content",
      title: "Poem Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Verse", value: "verse" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
          ],
        },
      ],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "featuredExcerpt",
      title: "Featured Excerpt",
      description: "A short excerpt to display when this poem is featured (optional)",
      type: "text",
    },
    {
      name: "themes",
      title: "Themes",
      type: "array",
      of: [
        {
          type: "reference",
          to: { type: "theme" },
        },
      ],
    },
    {
      name: "year",
      title: "Year Written",
      type: "number",
    },
    {
      name: "featured",
      title: "Featured Poem",
      type: "boolean",
      description: "Set to true to feature this poem on the homepage",
      initialValue: false,
    },
    {
      name: "featuredOrder",
      title: "Featured Order",
      description: "Lower numbers appear first in featured lists (1 is the spotlight poem)",
      type: "number",
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
