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
    <section className="py-24 sm:py-32 bg-gradient-to-b from-amber-50/30 to-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-amber-800 sm:text-4xl">
            Everything you need to navigate your career
          </h2>
          <p className="mt-4 text-lg text-amber-800/80 max-w-2xl mx-auto">
            From AI-powered assessments to expert counselling, we provide comprehensive tools to help you make informed
            career decisions.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const gradients = [
              "from-amber-600 to-amber-500",
              "from-amber-500 to-yellow-500", 
              "from-amber-700 to-amber-600",
              "from-amber-600 to-yellow-400"
            ];
            return (
              <div
                key={index}
                className="group bg-stone-50 rounded-2xl p-8 shadow-sm border border-amber-100/50 hover:shadow-xl hover:border-amber-800/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`h-14 w-14 bg-gradient-to-br ${gradients[index]} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-amber-800 mb-3">{feature.title}</h3>
                <p className="text-amber-800/80 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
