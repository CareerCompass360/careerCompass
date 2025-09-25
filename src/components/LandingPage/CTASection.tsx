import { Button } from "@/components/ui/button"
import { ArrowRight, Brain } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 sm:py-32 bg-accent/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Ready to discover your perfect career?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Take our AI-powered career test and get personalized recommendations from 500+ career options. Connect with
            expert counsellors to plan your success strategy.
          </p>

          <div className="mt-8 flex items-center justify-center gap-x-6">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Brain className="mr-2 h-4 w-4" />
              Take AI Career Test
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="border-border hover:bg-muted bg-transparent">
              Book Counselling Session
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Free career test • Expert counselling available • 500+ career guides
          </p>
        </div>
      </div>
    </section>
  )
}
