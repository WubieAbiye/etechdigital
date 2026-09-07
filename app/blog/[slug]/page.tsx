import { notFound } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Sidebar } from "@/components/sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { toSlug } from "@/lib/blog-data"
import { db } from "@/lib/db"
import { contentTags, toBlogPost } from "@/lib/content"
import { Clock, User, Calendar, ArrowLeft, Share2, Bookmark, Facebook, Twitter, Linkedin } from "lucide-react"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const content = await db.content.findFirst({ where: { slug, status: "PUBLISHED" }, include: { category: true } })

  if (!content) {
    notFound()
  }

  const post = toBlogPost(content)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <article className="lg:col-span-2">
              {/* Breadcrumb */}
              <div className="mb-6">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Link>
              </div>

              {/* Article Header */}
              <header className="mb-8">
                <Badge className="mb-4">{post.category}</Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">{post.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" /> {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {post.readTime}
                  </span>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground mr-2">Share:</span>
                  <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 bg-transparent">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 ml-auto bg-transparent">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                </div>
              </header>

              {/* Featured Image */}
              <div className="aspect-video rounded-xl overflow-hidden mb-8">
                <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <p className="lead text-xl text-muted-foreground mb-6">{post.excerpt}</p>

                <h2>Introduction</h2>
                <p>
                  Welcome to this comprehensive guide! In this article, we will explore everything you need to know
                  about this topic. Whether you are a complete beginner or looking to expand your knowledge, this guide
                  has something for everyone.
                </p>

                <h2>Getting Started</h2>
                <p>
                  Before diving into the details, let us cover some basics. Understanding the fundamentals is crucial
                  for your success in this area. Take your time to absorb this information and do not hesitate to
                  revisit these concepts as needed.
                </p>

                <h3>Key Concepts</h3>
                <ul>
                  <li>Understanding the basics and terminology</li>
                  <li>Setting up your environment correctly</li>
                  <li>Following best practices from the start</li>
                  <li>Building a strong foundation for growth</li>
                </ul>

                <h2>Step-by-Step Guide</h2>
                <p>
                  Now that we have covered the basics, let us walk through the process step by step. Each step builds
                  upon the previous one, so make sure you understand each section before moving on.
                </p>

                <h3>Step 1: Planning</h3>
                <p>
                  Good planning is half the battle. Take time to outline your goals, identify potential challenges, and
                  create a realistic timeline for your project.
                </p>

                <h3>Step 2: Execution</h3>
                <p>
                  With your plan in place, it is time to take action. Start with small, manageable tasks and gradually
                  work your way up to more complex challenges.
                </p>

                <h2>Tips for Success</h2>
                <p>Here are some proven tips that will help you succeed:</p>
                <ol>
                  <li>Stay consistent with your efforts</li>
                  <li>Learn from your mistakes</li>
                  <li>Seek feedback and continuously improve</li>
                  <li>Network with others in your field</li>
                  <li>Never stop learning</li>
                </ol>

                <h2>Conclusion</h2>
                <p>
                  We hope this guide has been helpful in your journey. Remember, success does not happen overnight. Stay
                  patient, keep learning, and you will achieve your goals.
                </p>

                <p>
                  If you found this article helpful, please share it with others who might benefit. Do not forget to
                  subscribe to our newsletter for more tutorials and tips!
                </p>
              </div>

              {/* Tags */}
              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-foreground">Tags:</span>
                  {post.tags.map((tag) => (
                    <Link key={tag} href={`/tag/${toSlug(tag)}`}>
                      <Badge variant="secondary" className="hover:bg-primary hover:text-primary-foreground">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Author Box */}
              <div className="mt-8 p-6 rounded-xl bg-muted">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold">
                    ET
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">E Tech Digital Team</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      We are passionate about sharing knowledge and helping others succeed in the digital world. Our
                      team of experts creates high-quality content to help you learn and grow.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Sidebar />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
