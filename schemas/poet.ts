export default {
  name: "poet",
  title: "Poet",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "biography",
      title: "Biography",
      type: "array",
      of: [
        {
          type: "block",
        },
      ],
    },
    {
      name: "birthDate",
      title: "Birth Date",
      type: "date",
    },
    {
      name: "deathDate",
      title: "Death Date",
      type: "date",
    },
    {
      name: "styles",
      title: "Poetic Styles",
      type: "array",
      of: [{ type: "string" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
    },
  },
}
