"use server"

import { serverClient, fetchDraft } from "./sanity-server"
import { revalidatePath } from "next/cache"

// Example server action to create a new poem
export async function createPoem(formData: FormData) {
  try {
    // Extract data from the form
    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const poetId = formData.get("poetId") as string

    // Generate a slug from the title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .replace(/\s+/g, "-")

    // Create the document
    const result = await serverClient.create({
      _type: "poem",
      title,
      slug: { current: slug },
      poet: { _type: "reference", _ref: poetId },
      content: [
        {
          _type: "block",
          style: "verse",
          children: [{ _type: "span", text: content }],
        },
      ],
      // Add other fields as needed
    })

    // Revalidate the poems page to show the new poem
    revalidatePath("/poems")

    return { success: true, poemId: result._id }
  } catch (error) {
    console.error("Error creating poem:", error)
    return { success: false, error: String(error) }
  }
}

// Example server action to fetch draft poems
export async function getDraftPoems() {
  try {
    const poems = await fetchDraft<any[]>(
      `*[_type == "poem" && (_id in path("drafts.**"))] {
        _id,
        title,
        "poet": poet->name,
        "slug": slug.current
      }`,
    )

    return { success: true, poems }
  } catch (error) {
    console.error("Error fetching draft poems:", error)
    return { success: false, error: String(error) }
  }
}
