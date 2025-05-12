import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About VersesVibez</h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our story, mission, and passion for poetry.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <div className="flex justify-center">
                  <Link href="/">
                    <Button variant="outline" size="sm" className="gap-1">
                      <ArrowLeft className="h-4 w-4" /> Back to Home
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mx-auto grid max-w-3xl gap-8 py-12">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Our Story</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  VersesVibez was born from a deep love for poetry and the desire to create a space where words could
                  dance freely. Founded in 2025, our platform aims to be a sanctuary for both established and emerging
                  poets, as well as for those who find solace and inspiration in the written word.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  What started as a small personal blog has grown into a vibrant community of poetry enthusiasts from
                  around the world. We believe in the power of poetry to connect, heal, and transform, transcending
                  boundaries of language, culture, and experience.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Our Mission</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  At VersesVibez, our mission is to celebrate the art of poetry in all its forms and to provide a
                  platform where poets can share their work with a wider audience. We strive to:
                </p>
                <ul className="list-disc pl-6 text-gray-500 dark:text-gray-400 space-y-2">
                  <li>Promote diverse voices and perspectives in poetry</li>
                  <li>Foster a supportive community for poets at all stages of their journey</li>
                  <li>Make poetry accessible and engaging for readers of all backgrounds</li>
                  <li>Preserve and honor poetic traditions while embracing innovation</li>
                  <li>Inspire creativity and self-expression through the written word</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">The Team</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Behind VersesVibez is a dedicated team of poetry lovers, writers, and creative minds who work
                  tirelessly to curate and maintain this space. While we come from different backgrounds and have
                  diverse tastes in poetry, we are united by our passion for words and their power to move, challenge,
                  and inspire.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  We are always open to feedback, suggestions, and collaborations. If you'd like to get in touch with
                  us, please visit our Contact page or reach out via social media.
                </p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Join Us</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Whether you're a poet looking to share your work, a reader seeking inspiration, or simply someone who
                  appreciates the beauty of well-crafted words, we invite you to become part of the VersesVibez
                  community. Subscribe to our newsletter, follow us on social media, or simply explore the poetry on our
                  site.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Thank you for visiting VersesVibez. We hope you find words that resonate, challenge, comfort, and
                  inspire.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
