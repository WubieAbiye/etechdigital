import { ContentType, Prisma } from "@prisma/client"
import { db } from "@/lib/db"

export const publicContentWhere: Prisma.ContentWhereInput = { status: "PUBLISHED" }

export async function getPublishedContent(type?: ContentType) {
  if (!process.env.DATABASE_URL) return []

  return db.content.findMany({ where: { ...publicContentWhere, ...(type ? { type } : {}) }, include: { category: true }, orderBy: { publishedAt: "desc" } })
}

export async function getPublishedCategories() {
  if (!process.env.DATABASE_URL) return []

  return db.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: { where: { status: "PUBLISHED" } } } } },
  })
}

export function contentTags(tags: string) {
  return tags.split(",").map((tag) => tag.trim()).filter(Boolean)
}

type ContentWithCategory = Prisma.ContentGetPayload<{ include: { category: true } }>

export function toBlogPost(content: ContentWithCategory) {
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