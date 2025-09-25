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
    <section className="py-20 sm:py-32 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Our Core Services</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to discover, plan, and achieve your ideal career path
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-card border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <service.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                </div>
                <CardDescription className="text-muted-foreground mt-2">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">{service.cta}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
