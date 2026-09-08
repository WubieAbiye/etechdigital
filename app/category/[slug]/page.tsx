import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BlogCard } from "@/components/blog-card"
import { Sidebar } from "@/components/sidebar"
import { findCategoryBySlug, getPublishedContentForCategory } from "@/lib/db"
import { toBlogPost } from "@/lib/content"

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = findCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const categoryPosts = getPublishedContentForCategory(category.id).map(toBlogPost)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Category Header */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{category.name}</h1>
            <p className="text-muted-foreground">
              Browse all articles in the {category.name} category.
              {" "}{category.postCount || 0} {(category.postCount || 0) === 1 ? "article" : "articles"} available.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Posts Grid */}
            <div className="lg:col-span-2">
              {categoryPosts.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-6">
                  {categoryPosts.map((post) => (
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
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No articles found in this category yet. Check back soon!</p>
                </div>
              )}
            </div>

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
