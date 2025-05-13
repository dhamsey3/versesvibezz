import { SimpleHeader } from "@/components/simple-header"
import { SiteFooter } from "@/components/site-footer"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SimpleHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">About VersesVibez</h1>

              <div className="prose prose-lg dark:prose-invert">
                <p>
                  Welcome to VersesVibez, a personal poetry blog where I share my creative writing and poetic
                  expressions.
                </p>

                <p>
                  This blog is a space for me to share poems that reflect my thoughts, experiences, and observations
                  about life. Poetry has always been a way for me to process emotions and connect with others through
                  the power of words.
                </p>

                <h2>The Journey</h2>

                <p>
                  I started writing poetry at a young age, finding comfort and expression in the rhythm and flow of
                  verses. Over the years, my style has evolved, but my love for this art form has remained constant.
                </p>

                <p>
                  Through VersesVibez, I hope to share this passion with readers who appreciate the beauty of poetry and
                  perhaps inspire others to explore their own creative writing.
                </p>

                <h2>Connect</h2>

                <p>
                  I'd love to hear your thoughts about my poems or connect with fellow poetry enthusiasts. Feel free to
                  reach out through the contact page.
                </p>

                <p>Thank you for visiting VersesVibez and taking the time to explore my poetic journey.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
