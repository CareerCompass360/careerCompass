import { Brain, BookOpen, Users, Search } from "lucide-react"

const features = [
  {
    icon: Search,
    title: "500+ Career Paths",
    description:
      "Comprehensive database of career options with detailed insights, requirements, and growth prospects across all industries.",
  },
  {
    icon: Brain,
    title: "AI-Powered Assessment",
    description:
      "Advanced AI analyzes your skills, interests, and personality to provide personalized career recommendations.",
  },
  {
    icon: BookOpen,
    title: "Strategic Guidance",
    description:
      "Proven strategies and actionable insights to help you become more efficient and successful in your career.",
  },
  {
    icon: Users,
    title: "Expert Counselling",
    description: "Connect with experienced career counsellors for personalized guidance and professional development.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-blue-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to navigate your career
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            From AI-powered assessments to expert counselling, we provide comprehensive tools to help you make informed
            career decisions.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const gradients = [
              "from-primary to-accent",
              "from-teal-500 to-cyan-500", 
              "from-purple-500 to-indigo-500",
              "from-orange-500 to-red-500"
            ];
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-sm border border-blue-100/50 hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`h-14 w-14 bg-gradient-to-br ${gradients[index]} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
