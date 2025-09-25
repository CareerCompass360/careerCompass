import { Card } from "@/components/ui/card"
import { TrendingUp, Users, Award, Clock } from "lucide-react"

const stats = [
  {
    icon: TrendingUp,
    value: "500+",
    label: "Career Paths",
    description: "Comprehensive career guides",
    color: "from-primary to-primary/70",
  },
  {
    icon: Users,
    value: "50K+",
    label: "Success Stories",
    description: "Lives transformed",
    color: "from-accent to-accent/70",
  },
  {
    icon: Award,
    value: "98%",
    label: "Satisfaction Rate",
    description: "User satisfaction",
    color: "from-chart-3 to-chart-3/70",
  },
  {
    icon: Clock,
    value: "15 min",
    label: "Quick Assessment",
    description: "Get results fast",
    color: "from-chart-5 to-chart-5/70",
  },
]

export function StatsSection() {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Proven Results That Speak</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Real impact on real careers - see why professionals choose Career Compass
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card
                key={index}
                className="group relative overflow-hidden bg-card border-border/50 p-8 text-center hover:shadow-xl transition-all duration-300 hover:border-primary/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div
                  className={`relative mx-auto h-12 w-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="relative text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="relative text-sm font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="relative text-xs text-muted-foreground">{stat.description}</div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
