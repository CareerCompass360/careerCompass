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
    <section className="py-20 sm:py-24 bg-gradient-to-b from-amber-50/30 to-stone-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-amber-800 sm:text-4xl">Proven Results That Speak</h2>
          <p className="mt-4 text-lg text-amber-800/80">
            Real impact on real careers - see why professionals choose Career Compass
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const gradients = [
              "from-amber-600 to-amber-500",
              "from-amber-500 to-yellow-500",
              "from-amber-700 to-amber-600",
              "from-amber-600 to-yellow-400"
            ];
            return (
              <Card
                key={index}
                className="group relative overflow-hidden bg-stone-50 border-amber-100/50 p-8 text-center hover:shadow-xl transition-all duration-300 hover:border-amber-800/30 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div
                  className={`relative mx-auto h-14 w-14 bg-gradient-to-br ${gradients[index]} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}
                >
                  <Icon className="h-7 w-7 text-white" />
                </div>
                <div className="relative text-4xl font-bold text-amber-800 mb-2">{stat.value}</div>
                <div className="relative text-sm font-semibold text-amber-800 mb-1">{stat.label}</div>
                <div className="relative text-xs text-amber-800/80">{stat.description}</div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
