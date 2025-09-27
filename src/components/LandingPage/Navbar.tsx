import { Button } from "@/components/ui/button"
import { Compass } from "lucide-react"

export function Navbar() {
  return (
    <header className="border-b border-border/50 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-md">
              <Compass className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground tracking-tight">Career Compass</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#careers" className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200 hover:scale-105">
              About
            </a>
            <a href="#careers" className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200 hover:scale-105">
              Careers
            </a>
            <a href="#ai-test" className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200 hover:scale-105">
              AI Test
            </a>
            <a href="#strategies" className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200 hover:scale-105">
              Strategies
            </a>
            <a href="#counselling" className="text-muted-foreground hover:text-primary font-medium transition-colors duration-200 hover:scale-105">
              Counselling
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="hidden md:inline-flex text-muted-foreground hover:text-primary hover:bg-accent/10">
              Sign In
            </Button>
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-6 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
