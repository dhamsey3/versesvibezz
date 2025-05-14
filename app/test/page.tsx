export default function TestPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      <p>If you can see this page, basic routing is working correctly.</p>
      <div className="mt-4 space-y-2">
        <div>
          <a href="/studio" className="text-blue-600 underline block">
            Try accessing the Studio (App Router)
          </a>
        </div>
        <div>
          <a href="/studio-standalone" className="text-blue-600 underline block">
            Try accessing the Studio (Pages Router)
          </a>
        </div>
      </div>
    </div>
  )
}
