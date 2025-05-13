import { SimpleHeader } from "@/components/simple-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SimpleHeader />
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md space-y-6 p-8">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Admin Login</h1>
            <p className="text-gray-500 dark:text-gray-400">Enter your credentials to access the admin area</p>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email">Email</label>
              <Input id="email" type="email" placeholder="admin@versesvibez.com" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="password">Password</label>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <p className="text-center text-sm text-gray-500">
            Note: This is a demo admin page. In a real application, this would connect to authentication.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
