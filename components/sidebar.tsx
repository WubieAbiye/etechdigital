import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Tag } from "lucide-react"

const popularPosts = [
  {
    title: "Complete Guide to Starting a Blog in 2026",
    slug: "complete-guide-starting-blog-2026",
    views: "5.2K",
  },
  {
    title: "Top 10 Freelancing Platforms for Beginners",
    slug: "top-freelancing-platforms-beginners",
    views: "4.8K",
  },
  {
    title: "How to Learn Programming for Free",
    slug: "learn-programming-free",
    views: "4.1K",
  },
  {
    title: "Best Passive Income Ideas for 2026",
    slug: "passive-income-ideas-2024",
    views: "3.9K",
  },
]

const tags = ["Blogging", "Freelancing", "Programming", "SEO", "Marketing", "Design", "AI Tools", "Productivity"]

export function Sidebar() {
  return (
    <aside className="space-y-6">
      {/* Ad Placeholder */}
      <Card className="overflow-hidden">
        <div className="aspect-[4/3] bg-muted flex items-center justify-center">
          <p className="text-sm text-muted-foreground">Advertisement</p>
        </div>
      </Card>

      {/* Popular Posts */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-primary" />
            Popular Posts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {popularPosts.map((post, index) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="flex gap-3 group">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-semibold text-muted-foreground">
                {index + 1}
              </span>
              <div>
                <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{post.views} views</p>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Tags */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Tag className="h-5 w-5 text-primary" />
            Popular Tags
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link key={tag} href={`/tag/${tag.toLowerCase().replace(" ", "-")}`}>
                <Badge
                  variant="secondary"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Newsletter */}
      <Card className="bg-primary text-primary-foreground">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Stay Updated</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm opacity-90 mb-4">Get the latest tutorials and tips delivered to your inbox.</p>
          <input
            type="email"
            placeholder="Your email"
            className="w-full px-3 py-2 rounded-lg text-sm text-foreground bg-background mb-2"
          />
          <button className="w-full px-3 py-2 rounded-lg text-sm font-medium bg-background text-foreground hover:bg-background/90 transition-colors">
            Subscribe
          </button>
        </CardContent>
      </Card>
    </aside>
  )
}
