import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles, Target, Brain, Users, TrendingUp } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 py-20 sm:py-32">
      <div className="absolute inset-0 bg-grid-slate-100/30 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

      {/* Professional floating elements */}
      <div className="absolute top-20 right-20 h-32 w-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl animate-pulse" />
      <div className="absolute top-40 left-20 h-24 w-24 rounded-full bg-gradient-to-br from-accent/15 to-primary/15 blur-xl animate-bounce" />
      <div className="absolute bottom-20 right-40 h-40 w-40 rounded-full bg-gradient-to-br from-blue-200/20 to-indigo-200/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge
            variant="secondary"
            className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 text-primary border-primary/30 px-5 py-2 shadow-sm"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            AI-Powered Career Discovery Platform
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl text-balance">
            Discover Your Perfect Career with{" "}
            <span className="bg-gradient-to-r from-primary via-accent to-blue-600 bg-clip-text text-transparent">
              Career Compass
            </span>
          </h1>

          <p className="mt-6 text-xl leading-8 text-muted-foreground max-w-3xl mx-auto text-pretty">
            Navigate through 500+ career paths with our AI-powered assessments, personalized strategies, and expert
            counselling. Your dream career is just one test away.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Brain className="mr-2 h-5 w-5" />
              Take AI Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg border-2 border-primary/30 text-primary hover:bg-blue-50 hover:border-primary bg-white hover:scale-105 transition-all duration-300 shadow-sm"
            >
              <Target className="mr-2 h-5 w-5" />
              Explore 500+ Careers
            </Button>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="group text-center p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-blue-100/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-foreground">AI Career Matching</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Advanced AI analyzes your personality, skills, and interests to match you with perfect career
                opportunities
              </p>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-blue-100/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-foreground">Success Strategies</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Get personalized roadmaps and proven strategies to accelerate your career growth efficiently
              </p>
            </div>

            <div className="group text-center p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-blue-100/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30">
              <div className="mx-auto h-20 w-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="mt-6 text-2xl font-bold text-foreground">Expert Counselling</h3>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Connect with certified career counsellors for personalized guidance and professional mentorship
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
