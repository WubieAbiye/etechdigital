import bcrypt from "bcryptjs"
import { PrismaClient, ContentType } from "@prisma/client"
import { blogPosts, categories, toSlug } from "../lib/blog-data"

const db = new PrismaClient()

async function main() {
  for (const category of categories) {
    await db.category.upsert({ where: { slug: category.slug }, update: { name: category.name }, create: { name: category.name, slug: category.slug } })
  }

  for (const post of blogPosts) {
    const category = await db.category.findUniqueOrThrow({ where: { slug: toSlug(post.category) } })
    await db.content.upsert({
      where: { slug: post.slug },
      update: { title: post.title, excerpt: post.excerpt, body: post.content || post.excerpt, author: post.author, readTime: post.readTime, image: post.image, tags: post.tags.join(", "), categoryId: category.id, publishedAt: new Date(post.date) },
      create: { title: post.title, slug: post.slug, excerpt: post.excerpt, body: post.content || post.excerpt, type: ContentType.BLOG, author: post.author, readTime: post.readTime, image: post.image, tags: post.tags.join(", "), categoryId: category.id, publishedAt: new Date(post.date) },
    })
  }

  const email = process.env.ADMIN_EMAIL || "admin@example.com"
  const password = process.env.ADMIN_PASSWORD || "change-this-password"
  await db.adminUser.upsert({ where: { email }, update: { passwordHash: await bcrypt.hash(password, 12) }, create: { email, passwordHash: await bcrypt.hash(password, 12) } })
}

main().finally(() => db.$disconnect())
