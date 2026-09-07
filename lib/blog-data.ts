export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  author: string
  date: string
  readTime: string
  image: string
  tags: string[]
}

export function toSlug(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, "-")
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Complete Guide to Starting a Successful Blog in 2024",
    slug: "complete-guide-starting-blog-2024",
    excerpt:
      "Learn everything you need to know about starting a blog from scratch. From choosing a niche to monetization strategies.",
    content: "",
    category: "Tutorials",
    author: "E Tech Team",
    date: "Dec 5, 2024",
    readTime: "12 min read",
    image: "/person-blogging-on-laptop-with-coffee.jpg",
    tags: ["Blogging", "Beginner", "Monetization"],
  },
  {
    id: "2",
    title: "Top 10 Freelancing Platforms for Beginners in Ethiopia",
    slug: "top-freelancing-platforms-beginners",
    excerpt: "Discover the best platforms to start your freelancing career and earn money online from anywhere.",
    content: "",
    category: "Digital Skills",
    author: "E Tech Team",
    date: "Dec 3, 2024",
    readTime: "8 min read",
    image: "/freelancer-working-on-computer-at-home.jpg",
    tags: ["Freelancing", "Online Income", "Career"],
  },
  {
    id: "3",
    title: "How to Learn Programming for Free: A Complete Roadmap",
    slug: "learn-programming-free",
    excerpt:
      "Start your coding journey with these free resources. From HTML to Python, we cover the best learning paths.",
    content: "",
    category: "Technology",
    author: "E Tech Team",
    date: "Dec 1, 2024",
    readTime: "15 min read",
    image: "/code-on-computer-screen-programming.jpg",
    tags: ["Programming", "Coding", "Free Resources"],
  },
  {
    id: "4",
    title: "Best Passive Income Ideas for 2024: Start Earning While You Sleep",
    slug: "passive-income-ideas-2024",
    excerpt:
      "Explore proven passive income streams that can help you build wealth over time with minimal ongoing effort.",
    content: "",
    category: "Business",
    author: "E Tech Team",
    date: "Nov 28, 2024",
    readTime: "10 min read",
    image: "/money-growth-investment-chart.jpg",
    tags: ["Passive Income", "Investment", "Business"],
  },
  {
    id: "5",
    title: "Mastering SEO: A Beginner's Guide to Search Engine Optimization",
    slug: "mastering-seo-beginners-guide",
    excerpt: "Learn the fundamentals of SEO and how to rank your content higher on Google search results.",
    content: "",
    category: "Digital Skills",
    author: "E Tech Team",
    date: "Nov 25, 2024",
    readTime: "14 min read",
    image: "/seo-analytics-dashboard-computer.jpg",
    tags: ["SEO", "Marketing", "Traffic"],
  },
  {
    id: "6",
    title: "Essential Productivity Apps for Students and Professionals",
    slug: "productivity-apps-students-professionals",
    excerpt: "Boost your productivity with these must-have apps for note-taking, task management, and time tracking.",
    content: "",
    category: "Lifestyle",
    author: "E Tech Team",
    date: "Nov 22, 2024",
    readTime: "7 min read",
    image: "/smartphone-apps-productivity-tools.jpg",
    tags: ["Productivity", "Apps", "Tools"],
  },
]

export const categories = [
  { name: "Tutorials", slug: "tutorials", count: 15 },
  { name: "Technology", slug: "technology", count: 12 },
  { name: "Digital Skills", slug: "digital-skills", count: 18 },
  { name: "Business", slug: "business", count: 10 },
  { name: "Lifestyle", slug: "lifestyle", count: 8 },
]
