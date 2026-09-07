import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, TrendingUp, Lightbulb } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
              Learn Digital Skills, <span className="text-primary">Build Your Future</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Discover practical tutorials, technology reviews, and online income strategies. Join thousands of learners
              building their digital success story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/category/tutorials">
                  Start Learning <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="p-6 rounded-xl bg-card border border-border shadow-sm">
                <BookOpen className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">50+ Tutorials</h3>
                <p className="text-sm text-muted-foreground">Step-by-step guides for beginners to advanced</p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border shadow-sm">
                <Lightbulb className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Digital Skills</h3>
                <p className="text-sm text-muted-foreground">Master essential tech skills for the modern world</p>
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="p-6 rounded-xl bg-card border border-border shadow-sm">
                <TrendingUp className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-1">Online Income</h3>
                <p className="text-sm text-muted-foreground">Ethical methods to earn money online</p>
              </div>
              <div className="p-6 rounded-xl bg-primary text-primary-foreground">
                <p className="text-3xl font-bold mb-1">10K+</p>
                <p className="text-sm opacity-90">Monthly Readers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
