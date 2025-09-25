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
    <section className="py-24 sm:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to navigate your career
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            From AI-powered assessments to expert counselling, we provide comprehensive tools to help you make informed
            career decisions.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                <feature.icon className="h-6 w-6 text-gray-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
