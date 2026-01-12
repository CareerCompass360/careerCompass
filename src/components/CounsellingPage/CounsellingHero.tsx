import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Users, Award, TrendingUp, CheckCircle, ArrowRight } from "lucide-react"

export function CounsellingHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50/50 via-stone-50 to-yellow-50/30 py-20 sm:py-32">
      <div className="absolute inset-0 bg-grid-amber-100/30 [mask-image:linear-gradient(0deg,#fafaf9,rgba(250,250,249,0.6))] -z-10" />

      {/* Professional floating elements */}
      <div className="absolute top-20 right-20 h-32 w-32 rounded-full bg-gradient-to-br from-amber-400/20 to-yellow-400/20 blur-2xl animate-pulse" />
      <div className="absolute top-40 left-20 h-24 w-24 rounded-full bg-gradient-to-br from-yellow-400/15 to-amber-400/15 blur-xl animate-bounce" />
      <div className="absolute bottom-20 right-40 h-40 w-40 rounded-full bg-gradient-to-br from-amber-200/20 to-yellow-200/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">

          <h1 className="text-4xl font-bold tracking-tight text-amber-800 sm:text-6xl lg:text-7xl text-balance">
            Connect with{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Expert Career Counselors
            </span>
          </h1>

          <p className="mt-6 text-xl leading-8 text-amber-800/80 max-w-3xl mx-auto text-pretty">
            Get personalized guidance from verified career experts. Book one-on-one sessions to plan your career path,
            prepare for interviews, and achieve your professional goals.
          </p>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-amber-100 shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 mb-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-amber-800">100+</div>
              <div className="text-sm text-amber-700 mt-1">Expert Counselors</div>
            </div>

            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-amber-100 shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 mb-3">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-amber-800">15+</div>
              <div className="text-sm text-amber-700 mt-1">Years Average Experience</div>
            </div>

            <div className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-amber-100 shadow-sm">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 mb-3">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-amber-800">50+</div>
              <div className="text-sm text-amber-700 mt-1">Career Domains Covered</div>
            </div>
          </div>

          {/* Key Features */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            {[
              "One-on-One Sessions",
              "Verified Experts",
              "Flexible Scheduling",
              "Multiple Languages",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3 p-4 bg-white/40 backdrop-blur-sm rounded-xl border border-amber-100">
                <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                <span className="text-sm font-medium text-amber-800">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => {
                const element = document.getElementById("counselors-section")
                element?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Browse Counselors
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
