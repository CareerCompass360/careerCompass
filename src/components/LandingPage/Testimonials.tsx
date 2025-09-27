import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Developer",
    company: "TCS",
    image: "/professional-man-headshot.png",
    content:
      "The AI career test was spot-on! It recommended software development and the strategy guide helped me land my first job at TCS within 3 months.",
    rating: 5,
  },
  {
    name: "Priya Singh",
    role: "Digital Marketing Manager",
    company: "Flipkart",
    image: "/professional-woman-headshot.png",
    content:
      "Career Compass showed me 15 different marketing career paths I never knew existed. The counsellor helped me choose the perfect one for my skills.",
    rating: 5,
  },
  {
    name: "Arjun Patel",
    role: "Data Analyst",
    company: "Infosys",
    image: "/professional-man-data-analyst.png",
    content:
      "From 500+ careers, the AI test narrowed it down to 3 perfect matches. The efficiency strategies helped me get promoted faster than expected.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Success stories from our community
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See how professionals like you have transformed their careers with Career Compass
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group bg-white border-blue-100/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <blockquote className="text-muted-foreground mb-6 leading-relaxed italic">&ldquo;{testimonial.content}&rdquo;</blockquote>

                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12 border-2 border-blue-100">
                    <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-semibold">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
