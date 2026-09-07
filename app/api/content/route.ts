import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { isAdmin } from "@/lib/auth"
import { toSlug } from "@/lib/blog-data"

const allowedTypes = ["BLOG", "NEWS", "TUTORIAL", "ANNOUNCEMENT", "LINK", "INFO", "TIP", "DV_LOTTERY"] as const

export async function GET(request: Request) {
  const url = new URL(request.url)
  const rawType = url.searchParams.get("type")
  const type = rawType && allowedTypes.includes(rawType as (typeof allowedTypes)[number]) ? (rawType as (typeof allowedTypes)[number]) : undefined

  const posts = await db.content.findMany({
    where: { status: "PUBLISHED", ...(type ? { type: type as any } : {}) },
    include: { category: true },
    orderBy: { publishedAt: "desc" },
  })

  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const input = await request.json()
  const type = allowedTypes.includes(input.type) ? input.type : "BLOG"

  if (!input.title || !input.category) {
    return NextResponse.json({ error: "Title and category are required" }, { status: 400 })
  }

  const excerpt = input.excerpt || input.body || ""
  const body = input.body || ""

  const category = await db.category.upsert({
    where: { slug: toSlug(input.category) },
    update: { name: input.category },
    create: { name: input.category, slug: toSlug(input.category) },
  })

  const post = await db.content.create({
    data: {
      title: input.title,
      slug: toSlug(input.slug || input.title),
      excerpt,
      body,
      type,
      status: input.status || "PUBLISHED",
      author: input.author || "E Tech Team",
      readTime: input.readTime || "5 min read",
      image: input.image || "/placeholder.svg",
      externalUrl: input.externalUrl || null,
      tags: input.tags || "",
      categoryId: category.id,
      publishedAt: input.status === "DRAFT" ? null : new Date(),
    },
    include: { category: true },
  })

  return NextResponse.json(post, { status: 201 })
}