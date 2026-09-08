import { ContentType, getPublishedCategories as getCategories, getPublishedContent as getContent } from "@/lib/db"

export async function getPublishedContent(type?: ContentType) {
  return getContent(type)
}

export async function getPublishedCategories() {
  return getCategories().map((category) => ({ ...category, _count: { posts: category.postCount || 0 } }))
}

export function contentTags(tags: string) {
  return tags.split(",").map((tag) => tag.trim()).filter(Boolean)
}

export function toBlogPost(content: Awaited<ReturnType<typeof getPublishedContent>>[number]) {
  return {
    id: content.id,
    title: content.title,
    slug: content.slug,
    excerpt: content.excerpt,
    content: content.body,
    category: content.category.name,
    author: content.author,
    date: content.publishedAt?.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) || "Draft",
    readTime: content.readTime,
    image: content.image,
    tags: contentTags(content.tags),
  }
}