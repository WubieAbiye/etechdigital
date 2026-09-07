import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User } from "lucide-react"

interface BlogCardProps {
  title: string
  excerpt: string
  category: string
  author: string
  date: string
  readTime: string
  slug: string
  image: string
  featured?: boolean
}

export function BlogCard({
  title,
  excerpt,
  category,
  author,
  date,
  readTime,
  slug,
  image,
  featured = false,
}: BlogCardProps) {
  if (featured) {
    return (
      <Link href={`/blog/${slug}`}>
        <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="aspect-video md:aspect-auto md:h-full overflow-hidden">
              <img
                src={image || "/placeholder.svg"}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-6 flex flex-col justify-center">
              <Badge variant="secondary" className="w-fit mb-3">
                {category}
              </Badge>
              <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors text-balance">
                {title}
              </h2>
              <p className="text-muted-foreground mb-4 line-clamp-3">{excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" /> {author}
                </span>
                <span>{date}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" /> {readTime}
                </span>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${slug}`}>
      <Card className="overflow-hidden group hover:shadow-lg transition-shadow h-full flex flex-col">
        <div className="aspect-video overflow-hidden">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4 flex-1">
          <Badge variant="secondary" className="mb-2">
            {category}
          </Badge>
          <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 text-balance">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{excerpt}</p>
        </CardContent>
        <CardFooter className="px-4 pb-4 pt-0">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{date}</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {readTime}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
