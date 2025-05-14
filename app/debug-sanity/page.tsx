export default function DebugSanityPage() {
  // Return a 404 page to hide this debug page from regular visitors
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <div className="mt-4">
        <a href="/" className="text-blue-600 hover:underline">
          Return to Home
        </a>
      </div>
    </div>
  )
}
