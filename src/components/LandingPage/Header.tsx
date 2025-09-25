import { Button } from "@/components/ui/button"
import { Compass } from "lucide-react"

export function Header() {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Compass className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">Career Compass</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#careers" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Careers
            </a>
            <a href="#ai-test" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              AI Test
            </a>
            <a href="#strategies" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Strategies
            </a>
            <a href="#counselling" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Counselling
            </a>
          </nav>

          <div className="flex items-center space-x-3">
            <Button variant="ghost" className="hidden md:inline-flex text-gray-600 hover:text-gray-900">
              Sign In
            </Button>
            <Button className="bg-black hover:bg-gray-800 text-white px-6">Get Started</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
