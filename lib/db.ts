import Database from "better-sqlite3"
import bcrypt from "bcryptjs"
import { mkdirSync, chmodSync } from "node:fs"
import path from "node:path"
import { randomUUID } from "node:crypto"
import { blogPosts, categories, toSlug } from "@/lib/blog-data"

export type ContentType = "BLOG" | "NEWS" | "TUTORIAL" | "ANNOUNCEMENT" | "LINK" | "INFO" | "TIP" | "DV_LOTTERY"
export type ContentStatus = "DRAFT" | "PUBLISHED"

export type Category = { id: string; name: string; slug: string; postCount?: number }
export type Content = {
	id: string; title: string; slug: string; excerpt: string; body: string; type: ContentType; status: ContentStatus
	author: string; readTime: string; image: string; externalUrl: string | null; tags: string
	publishedAt: Date | null; createdAt: Date; updatedAt: Date; categoryId: string; category: Category
}

type ContentRow = Omit<Content, "publishedAt" | "createdAt" | "updatedAt" | "category"> & {
	publishedAt: string | null; createdAt: string; updatedAt: string; categoryName: string; categorySlug: string
}

const dataDirectory = path.join(process.cwd(), "data")
mkdirSync(dataDirectory, { recursive: true })
const databasePath = process.env.DB_PATH || path.join(dataDirectory, "etech.db")
const globalForDatabase = globalThis as unknown as { database?: Database.Database }
const sqlite = globalForDatabase.database ?? new Database(databasePath)
sqlite.pragma("journal_mode = WAL")
sqlite.pragma("foreign_keys = ON")
chmodSync(databasePath, 0o600)
if (process.env.NODE_ENV !== "production") globalForDatabase.database = sqlite

sqlite.exec(`
	CREATE TABLE IF NOT EXISTS categories (id TEXT PRIMARY KEY, name TEXT NOT NULL UNIQUE, slug TEXT NOT NULL UNIQUE, created_at TEXT NOT NULL);
	CREATE TABLE IF NOT EXISTS content (id TEXT PRIMARY KEY, title TEXT NOT NULL, slug TEXT NOT NULL UNIQUE, excerpt TEXT NOT NULL, body TEXT NOT NULL, type TEXT NOT NULL, status TEXT NOT NULL, author TEXT NOT NULL, read_time TEXT NOT NULL, image TEXT NOT NULL, external_url TEXT, tags TEXT NOT NULL, published_at TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, category_id TEXT NOT NULL REFERENCES categories(id));
	CREATE INDEX IF NOT EXISTS content_status_published_at ON content(status, published_at);
	CREATE INDEX IF NOT EXISTS content_category_id ON content(category_id);
	CREATE TABLE IF NOT EXISTS subscribers (id TEXT PRIMARY KEY, name TEXT, email TEXT NOT NULL UNIQUE, created_at TEXT NOT NULL);
	CREATE TABLE IF NOT EXISTS contact_messages (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, subject TEXT NOT NULL, message TEXT NOT NULL, status TEXT NOT NULL, created_at TEXT NOT NULL);
	CREATE TABLE IF NOT EXISTS admin_users (id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, created_at TEXT NOT NULL);
`)

const now = () => new Date().toISOString()
const mapContent = (row: ContentRow): Content => {
	const { categoryName, categorySlug, publishedAt, createdAt, updatedAt, ...content } = row
	return {
	...content,
	publishedAt: publishedAt ? new Date(publishedAt) : null,
	createdAt: new Date(createdAt),
	updatedAt: new Date(updatedAt),
	category: { id: content.categoryId, name: categoryName, slug: categorySlug },
	}
}

const contentSelect = `SELECT c.*, cat.name AS categoryName, cat.slug AS categorySlug FROM content c JOIN categories cat ON cat.id = c.category_id`

function seedDatabase() {
	const insertCategory = sqlite.prepare("INSERT OR IGNORE INTO categories (id, name, slug, created_at) VALUES (?, ?, ?, ?)")
	for (const category of categories) insertCategory.run(randomUUID(), category.name, category.slug, now())
	const insertContent = sqlite.prepare("INSERT OR IGNORE INTO content (id, title, slug, excerpt, body, type, status, author, read_time, image, external_url, tags, published_at, created_at, updated_at, category_id) SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, id FROM categories WHERE slug = ?")
	for (const post of blogPosts) insertContent.run(randomUUID(), post.title, post.slug, post.excerpt, post.content || post.excerpt, "BLOG", "PUBLISHED", post.author, post.readTime, post.image, null, post.tags.join(", "), new Date(post.date).toISOString(), now(), now(), toSlug(post.category))
	const email = (process.env.ADMIN_EMAIL || "admin@example.com").trim().toLowerCase()
	const password = process.env.ADMIN_PASSWORD || "change-this-password"
	const existingAdmin = sqlite.prepare("SELECT id FROM admin_users WHERE email = ?").get(email)
	if (!existingAdmin) sqlite.prepare("INSERT INTO admin_users (id, email, password_hash, created_at) VALUES (?, ?, ?, ?)").run(randomUUID(), email, bcrypt.hashSync(password, 12), now())
}
seedDatabase()

export function findAdminByEmail(email: string) {
	return sqlite.prepare("SELECT email, password_hash AS passwordHash FROM admin_users WHERE email = ?").get(email) as { email: string; passwordHash: string } | undefined
}

export function getPublishedContent(type?: ContentType) {
	const rows = sqlite.prepare(`${contentSelect} WHERE c.status = 'PUBLISHED' ${type ? "AND c.type = ?" : ""} ORDER BY c.published_at DESC`).all(...(type ? [type] : [])) as ContentRow[]
	return rows.map(mapContent)
}

export function getPublishedCategories() {
	return sqlite.prepare("SELECT cat.id, cat.name, cat.slug, COUNT(c.id) AS postCount FROM categories cat LEFT JOIN content c ON c.category_id = cat.id AND c.status = 'PUBLISHED' GROUP BY cat.id ORDER BY cat.name ASC").all() as Category[]
}

export function findPublishedContentBySlug(slug: string) {
	const row = sqlite.prepare(`${contentSelect} WHERE c.slug = ? AND c.status = 'PUBLISHED'`).get(slug) as ContentRow | undefined
	return row ? mapContent(row) : null
}

export function findCategoryBySlug(slug: string) {
	return sqlite.prepare("SELECT cat.id, cat.name, cat.slug, COUNT(c.id) AS postCount FROM categories cat LEFT JOIN content c ON c.category_id = cat.id AND c.status = 'PUBLISHED' WHERE cat.slug = ? GROUP BY cat.id").get(slug) as Category | undefined
}

export function getPublishedContentForCategory(categoryId: string) {
	const rows = sqlite.prepare(`${contentSelect} WHERE c.category_id = ? AND c.status = 'PUBLISHED' ORDER BY c.published_at DESC`).all(categoryId) as ContentRow[]
	return rows.map(mapContent)
}

export function getAllContent() {
	const rows = sqlite.prepare(`${contentSelect} ORDER BY c.published_at DESC, c.created_at DESC`).all() as ContentRow[]
	return rows.map(mapContent)
}

export function createContent(input: Record<string, unknown>) {
	const categoryName = String(input.category).trim()
	const categorySlug = toSlug(categoryName)
	const category = findCategoryBySlug(categorySlug)
	const categoryId = category?.id || randomUUID()
	if (!category) sqlite.prepare("INSERT INTO categories (id, name, slug, created_at) VALUES (?, ?, ?, ?)").run(categoryId, categoryName, categorySlug, now())
	const timestamp = now()
	const status = input.status === "DRAFT" ? "DRAFT" : "PUBLISHED"
	const id = randomUUID()
	sqlite.prepare("INSERT INTO content (id, title, slug, excerpt, body, type, status, author, read_time, image, external_url, tags, published_at, created_at, updated_at, category_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)").run(id, String(input.title).trim(), toSlug(String(input.slug || input.title)), String(input.excerpt || input.body || ""), String(input.body || ""), input.type || "BLOG", status, String(input.author || ""), String(input.readTime || ""), String(input.image || ""), input.externalUrl ? String(input.externalUrl) : null, String(input.tags || ""), status === "DRAFT" ? null : timestamp, timestamp, timestamp, categoryId)
	return getAllContent().find((item) => item.id === id)
}

export function createContactMessage(input: { name: string; email: string; subject: string; message: string }) {
	const id = randomUUID()
	sqlite.prepare("INSERT INTO contact_messages (id, name, email, subject, message, status, created_at) VALUES (?, ?, ?, ?, ?, 'NEW', ?)").run(id, input.name, input.email, input.subject, input.message, now())
	return { id }
}

export function saveSubscriber(input: { name?: string | null; email: string }) {
	sqlite.prepare("INSERT INTO subscribers (id, name, email, created_at) VALUES (?, ?, ?, ?) ON CONFLICT(email) DO UPDATE SET name = excluded.name").run(randomUUID(), input.name || null, input.email, now())
}
