import Link from "next/link"

export default function ImageGuidePage() {
  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">How to Add Pictures to Your Poetry Website</h1>

      <div className="prose max-w-none">
        <h2>1. Accessing Sanity Studio</h2>
        <p>
          First, you need to access your Sanity Studio. Press <kbd>Ctrl+Alt+A</kbd> on any page of your website to
          reveal the hidden admin link, or navigate directly to <code>/studio</code> and enter your credentials.
        </p>

        <h2>2. Adding Images to Poems</h2>
        <p>Each poem can have a cover image. Here's how to add one:</p>
        <ol>
          <li>In Sanity Studio, navigate to the "Poems" section</li>
          <li>Select an existing poem or create a new one</li>
          <li>Find the "Cover Image" field</li>
          <li>Click on it to open the image upload interface</li>
          <li>Either drag and drop an image or click to browse your files</li>
          <li>Once uploaded, you can adjust the "hotspot" to control how the image is cropped</li>
          <li>Save the poem</li>
        </ol>

        <div className="bg-gray-100 p-4 rounded-lg my-6">
          <h3 className="text-lg font-semibold mb-2">Image Requirements</h3>
          <ul>
            <li>Recommended size: 1200 × 800 pixels for cover images</li>
            <li>Supported formats: JPG, PNG, WebP, GIF</li>
            <li>Maximum file size: 10MB</li>
          </ul>
        </div>

        <h2>3. Adding Images to Poets</h2>
        <p>You can add profile images for poets following a similar process:</p>
        <ol>
          <li>Navigate to the "Poets" section in Sanity Studio</li>
          <li>Select a poet or create a new one</li>
          <li>Find the "Image" field</li>
          <li>Upload an image (preferably a portrait or headshot)</li>
          <li>Adjust the hotspot to focus on the face</li>
          <li>Save the poet</li>
        </ol>

        <h2>4. Adding Images to Collections</h2>
        <p>Poetry collections can also have cover images:</p>
        <ol>
          <li>Navigate to the "Collections" section</li>
          <li>Select or create a collection</li>
          <li>Upload an image to the "Cover Image" field</li>
          <li>Save the collection</li>
        </ol>

        <h2>5. Image Best Practices</h2>
        <ul>
          <li>Use high-quality, relevant images that enhance the poetry</li>
          <li>Consider the mood and theme of the poem when selecting images</li>
          <li>Optimize images for web before uploading (compress without losing quality)</li>
          <li>Use consistent aspect ratios for similar content types</li>
          <li>Add alt text for accessibility (in the "Alternative Text" field when uploading)</li>
        </ul>

        <h2>6. Managing Your Images</h2>
        <p>Sanity includes a built-in asset management system. To see all uploaded images and manage them:</p>
        <ol>
          <li>In Sanity Studio, look for "Content" in the main navigation</li>
          <li>Select "Files & Images" from the dropdown</li>
          <li>Here you can view, search, and delete images</li>
        </ol>

        <div className="bg-purple-100 p-4 rounded-lg my-6">
          <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
          <p>
            If you need more assistance with images or have questions about Sanity Studio, refer to the{" "}
            <a
              href="https://www.sanity.io/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-700 hover:underline"
            >
              Sanity documentation
            </a>
            .
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Link href="/" className="text-purple-700 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
