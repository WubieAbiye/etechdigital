import Link from "next/link"
import { Badge } from "@/components/ui/badge"

interface CategoryBadgeProps {
  name: string
  href: string
  count?: number
}

export function CategoryBadge({ name, href, count }: CategoryBadgeProps) {
  return (
    <Link href={href}>
      <Badge
        variant="outline"
        className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors cursor-pointer"
      >
        {name}
        {count !== undefined && <span className="ml-2 text-xs opacity-70">({count})</span>}
      </Badge>
    </Link>
  )
}
