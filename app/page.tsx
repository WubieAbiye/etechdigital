import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { BlogCard } from "@/components/blog-card"
import { CategoryBadge } from "@/components/category-badge"
import { Sidebar } from "@/components/sidebar"
import { db } from "@/lib/db"
import { toBlogPost } from "@/lib/content"

export default async function HomePage() {
  const content = await db.content.findMany({ where: { status: "PUBLISHED" }, include: { category: true }, orderBy: { publishedAt: "desc" } })
  const posts = content.map(toBlogPost)
  const featuredPost = posts[0]
  const recentPosts = posts.slice(1)
  const categories = await db.category.findMany({ orderBy: { name: "asc" }, include: { _count: { select: { posts: { where: { status: "PUBLISHED" } } } } } })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />

        {/* Categories Section */}
        <section className="py-8 border-b border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-muted-foreground">Browse:</span>
              {categories.map((category) => (
                <CategoryBadge
                  key={category.slug}
                  name={category.name}
                  count={category._count.posts}
                  href={`/category/${category.slug}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Blog Posts */}
              <div className="lg:col-span-2 space-y-8">
                {/* Featured Post */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Featured Article</h2>
                  {featuredPost && <BlogCard
                    title={featuredPost.title}
                    excerpt={featuredPost.excerpt}
                    category={featuredPost.category}
                    author={featuredPost.author}
                    date={featuredPost.date}
                    readTime={featuredPost.readTime}
                    slug={featuredPost.slug}
                    image={featuredPost.image}
                    featured
                  />}
                </div>

                {/* Recent Posts */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Recent Articles</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {recentPosts.map((post) => (
                      <BlogCard
                        key={post.id}
                        title={post.title}
                        excerpt={post.excerpt}
                        category={post.category}
                        author={post.author}
                        date={post.date}
                        readTime={post.readTime}
                        slug={post.slug}
                        image={post.image}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Sidebar />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
