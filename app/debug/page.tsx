export default function DebugPage() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Debug</h1>

      <div className="bg-gray-100 p-4 rounded mb-4">
        <h2 className="font-semibold mb-2">Client-Side Environment Variables:</h2>
        <p>These will be visible in the browser console when you load this page.</p>
      </div>

      <div className="bg-gray-100 p-4 rounded">
        <h2 className="font-semibold mb-2">Server-Side Environment Variables:</h2>
        <p>Project ID: {process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "Not set"}</p>
        <p>Dataset: {process.env.NEXT_PUBLIC_SANITY_DATASET || "Not set"}</p>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            console.log("Client-side environment variables:");
            console.log("NEXT_PUBLIC_SANITY_PROJECT_ID:", "${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "Not set"}");
            console.log("NEXT_PUBLIC_SANITY_DATASET:", "${process.env.NEXT_PUBLIC_SANITY_DATASET || "Not set"}");
          `,
        }}
      />
    </div>
  )
}
