import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, BookOpen, MessageCircle, TrendingUp } from "lucide-react"

const services = [
  {
    icon: Brain,
    title: "AI Career Test",
    description:
      "Take our intelligent assessment to discover which of 500+ careers match your personality, skills, and interests perfectly.",
    features: ["Personality analysis", "Skills assessment", "Interest mapping", "Career matching"],
    cta: "Take Test Now",
  },
  {
    icon: BookOpen,
    title: "Success Strategies",
    description:
      "Access proven strategies and actionable tips to become more efficient and successful in your chosen career field.",
    features: ["Efficiency techniques", "Goal setting", "Skill development", "Performance optimization"],
    cta: "View Strategies",
  },
  {
    icon: MessageCircle,
    title: "Expert Counselling",
    description:
      "Connect with experienced career counsellors for personalized guidance and one-on-one career planning sessions.",
    features: ["1-on-1 sessions", "Career planning", "Interview prep", "Resume review"],
    cta: "Book Session",
  },
  {
    icon: TrendingUp,
    title: "Career Guides",
    description:
      "Comprehensive guides for 500+ career paths with detailed requirements, salary ranges, and growth prospects.",
    features: ["500+ career options", "Salary insights", "Growth prospects", "Requirements"],
    cta: "Explore Careers",
  },
]

export function ServicesSection() {
  return (
    <section className="py-20 sm:py-32 bg-stone-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-amber-800 sm:text-4xl">Our Core Services</h2>
          <p className="mt-4 text-lg text-amber-800/80">
            Everything you need to discover, plan, and achieve your ideal career path
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {services.map((service, index) => {
            const gradients = [
              "from-amber-600 to-amber-500",
              "from-amber-500 to-yellow-500",
              "from-amber-700 to-amber-600", 
              "from-amber-600 to-yellow-400"
            ];
            return (
              <Card
                key={index}
                className="group bg-stone-50 border-amber-100/50 hover:border-amber-800/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${gradients[index]} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl text-amber-800">{service.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="text-amber-800/80 mt-3 leading-relaxed">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-amber-800/80">
                        <div className={`w-2 h-2 bg-gradient-to-r ${gradients[index]} rounded-full mr-3`}></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full bg-gradient-to-r ${gradients[index]} hover:opacity-90 text-white shadow-md hover:shadow-lg transition-all duration-200`}>
                    {service.cta}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
