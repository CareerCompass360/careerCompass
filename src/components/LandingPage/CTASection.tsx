import { Button } from "@/components/ui/button"
import { ArrowRight, Brain } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-20 sm:py-32 bg-gradient-to-br from-amber-50/50 via-stone-50 to-yellow-50/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-amber-800 sm:text-4xl text-balance">
            Ready to discover your perfect career?
          </h2>
          <p className="mt-6 text-lg text-amber-800/80 text-pretty leading-relaxed">
            Take our AI-powered career test and get personalized recommendations from 500+ career options. Connect with
            expert counsellors to plan your success strategy.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/handler/sign-up">
              <Button size="lg" className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Brain className="mr-2 h-5 w-5" />
                Take AI Career Test
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/handler/sign-up">
              <Button variant="outline" size="lg" className="border-2 border-amber-800/30 text-amber-800 hover:bg-amber-50 hover:border-amber-800 bg-stone-50 px-8 py-4 text-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                Book Counselling Session
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex items-center justify-center space-x-8 text-sm text-amber-800/80">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-amber-600 rounded-full mr-2"></div>
              Free career test
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
              Expert counselling available
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
              500+ career guides
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
