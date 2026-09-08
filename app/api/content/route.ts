import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { isAdmin } from "@/lib/auth"
import { toSlug } from "@/lib/blog-data"

const allowedTypes = ["BLOG", "NEWS", "TUTORIAL", "ANNOUNCEMENT", "LINK", "INFO", "TIP", "DV_LOTTERY"] as const

export async function GET(request: Request) {
  const url = new URL(request.url)
  const rawType = url.searchParams.get("type")
  const type = rawType && allowedTypes.includes(rawType as (typeof allowedTypes)[number]) ? (rawType as (typeof allowedTypes)[number]) : undefined
  const adminRequest = url.searchParams.get("admin") === "true"
  const admin = adminRequest && (await isAdmin())

  const posts = await db.content.findMany({
    where: { ...(admin ? {} : { status: "PUBLISHED" }), ...(type ? { type: type as any } : {}) },
    include: { category: true },
    orderBy: { publishedAt: "desc" },
  })

  return NextResponse.json(posts)
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const input = await request.json()
  const type = allowedTypes.includes(input.type) ? input.type : "BLOG"
  const status = input.status === "DRAFT" ? "DRAFT" : "PUBLISHED"

  if (typeof input.title !== "string" || !input.title.trim() || typeof input.category !== "string" || !input.category.trim()) {
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
      title: input.title.trim(),
      slug: toSlug(input.slug || input.title),
      excerpt: typeof excerpt === "string" ? excerpt : "",
      body: typeof body === "string" ? body : "",
      type,
      status,
      author: typeof input.author === "string" ? input.author : "",
      readTime: typeof input.readTime === "string" ? input.readTime : "",
      image: typeof input.image === "string" ? input.image : "",
      externalUrl: typeof input.externalUrl === "string" && input.externalUrl ? input.externalUrl : null,
      tags: typeof input.tags === "string" ? input.tags : "",
      categoryId: category.id,
      publishedAt: status === "DRAFT" ? null : new Date(),
    },
    include: { category: true },
  })

  return NextResponse.json(post, { status: 201 })
}