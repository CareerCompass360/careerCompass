import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Target, Brain, Users, TrendingUp } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50/50 via-stone-50 to-yellow-50/30 py-20 sm:py-32">
      <div className="absolute inset-0 bg-grid-amber-100/30 [mask-image:linear-gradient(0deg,#fafaf9,rgba(250,250,249,0.6))] -z-10" />

      {/* Professional floating elements */}
      <div className="absolute top-20 right-20 h-32 w-32 rounded-full bg-gradient-to-br from-amber-400/20 to-yellow-400/20 blur-2xl animate-pulse" />
      <div className="absolute top-40 left-20 h-24 w-24 rounded-full bg-gradient-to-br from-yellow-400/15 to-amber-400/15 blur-xl animate-bounce" />
      <div className="absolute bottom-20 right-40 h-40 w-40 rounded-full bg-gradient-to-br from-amber-200/20 to-yellow-200/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge
            variant="secondary"
            className="mb-6 bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-800 border-amber-800/30 px-5 py-2 shadow-sm"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            AI-Powered Career Discovery Platform
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight text-amber-800 sm:text-6xl lg:text-7xl text-balance">
            Discover Your Perfect Career with{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Career Compass
            </span>
          </h1>

          <p className="mt-6 text-xl leading-8 text-amber-800/80 max-w-3xl mx-auto text-pretty">
            Navigate through 500+ career paths with our AI-powered assessments, personalized strategies, and expert
            counselling. Your dream career is just one test away.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/handler/sign-up">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Brain className="mr-2 h-5 w-5" />
                Take AI Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/careers">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg border-2 border-amber-800/30 text-amber-800 hover:bg-amber-50 hover:border-amber-800 bg-stone-50 hover:scale-105 transition-all duration-300 shadow-sm"
              >
                <Target className="mr-2 h-5 w-5" />
                Explore 500+ Careers
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="group text-center p-8 rounded-2xl bg-stone-50/80 backdrop-blur-sm border border-amber-100/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-800/30">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-amber-600 to-amber-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-amber-800">AI Career Matching</h3>
              <p className="mt-4 text-amber-800/80 leading-relaxed">
                Advanced AI analyzes your personality, skills, and interests to match you with perfect career
                opportunities
              </p>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-stone-50/80 backdrop-blur-sm border border-amber-100/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-800/30">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-amber-800">Success Strategies</h3>
              <p className="mt-4 text-amber-800/80 leading-relaxed">
                Get personalized roadmaps and proven strategies to accelerate your career growth efficiently
              </p>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-stone-50/80 backdrop-blur-sm border border-amber-100/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-800/30">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-amber-700 to-amber-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-amber-800">Expert Counselling</h3>
              <p className="mt-4 text-amber-800/80 leading-relaxed">
                Connect with certified career counsellors for personalized guidance and professional mentorship
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
