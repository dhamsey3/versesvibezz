export default function StudioTestPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-4">Studio Test Page</h1>
      <p>If you can see this page, basic routing is working.</p>
      <p className="mt-4">
        <a href="/studio" className="text-blue-600 underline">
          Try accessing the Studio
        </a>
      </p>
    </div>
  )
}
