// Fallback data to use when Sanity is unavailable

export const fallbackPoems = [
  {
    _id: "fallback-poem-1",
    title: "The Road Not Taken",
    slug: { current: "the-road-not-taken" },
    poet: "Robert Frost",
    poetSlug: "robert-frost",
    year: 1916,
    content: [
      {
        _type: "block",
        style: "verse",
        children: [{ _type: "span", text: "Two roads diverged in a yellow wood," }],
      },
      {
        _type: "block",
        style: "verse",
        children: [{ _type: "span", text: "And sorry I could not travel both" }],
      },
      {
        _type: "block",
        style: "verse",
        children: [{ _type: "span", text: "And be one traveler, long I stood" }],
      },
      {
        _type: "block",
        style: "verse",
        children: [{ _type: "span", text: "And looked down one as far as I could" }],
      },
      {
        _type: "block",
        style: "verse",
        children: [{ _type: "span", text: "To where it bent in the undergrowth;" }],
      },
    ],
  },
  {
    _id: "fallback-poem-2",
    title: "Hope is the thing with feathers",
    slug: { current: "hope-is-the-thing-with-feathers" },
    poet: "Emily Dickinson",
    poetSlug: "emily-dickinson",
    year: 1891,
    content: [
      {
        _type: "block",
        style: "verse",
        children: [{ _type: "span", text: "Hope is the thing with feathers" }],
      },
      {
        _type: "block",
        style: "verse",
        children: [{ _type: "span", text: "That perches in the soul," }],
      },
      {
        _type: "block",
        style: "verse",
        children: [{ _type: "span", text: "And sings the tune without the words," }],
      },
      {
        _type: "block",
        style: "verse",
        children: [{ _type: "span", text: "And never stops at all," }],
      },
    ],
  },
]

export const fallbackPoets = [
  {
    _id: "fallback-poet-1",
    name: "Robert Frost",
    slug: { current: "robert-frost" },
    birthDate: "1874-03-26",
    deathDate: "1963-01-29",
    styles: ["Nature", "Rural Life", "American"],
    biography: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Robert Frost was an American poet known for his realistic depictions of rural life and his command of American colloquial speech.",
          },
        ],
      },
    ],
  },
  {
    _id: "fallback-poet-2",
    name: "Emily Dickinson",
    slug: { current: "emily-dickinson" },
    birthDate: "1830-12-10",
    deathDate: "1886-05-15",
    styles: ["Lyric Poetry", "Romanticism", "American"],
    biography: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Emily Dickinson was an American poet who lived a largely introverted and reclusive life. She is known for her unconventional use of form and syntax.",
          },
        ],
      },
    ],
  },
]
