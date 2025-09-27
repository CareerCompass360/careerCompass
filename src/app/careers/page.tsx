"use client"

import { useUser } from "@stackframe/stack"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Brain, Search, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function CareersPage() {
  const user = useUser()

  if (!user) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-amber-800 mb-4">
            Authentication Required
          </h1>
          <p className="text-amber-800/80 mb-6">
            Please sign in to access career exploration features
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/handler/sign-in">
              <Button className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white">
                Sign In
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-amber-800/30 text-amber-800">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-amber-800/80 hover:text-amber-700">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-800 mb-4">
            Welcome, {user.displayName || user.primaryEmail}!
          </h1>
          <p className="text-xl text-amber-800/80">
            Explore 500+ career paths tailored for you
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-stone-50 rounded-2xl p-8 border border-amber-100/50 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-amber-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-amber-800 mb-4">AI Career Test</h3>
            <p className="text-amber-800/80 mb-6">
              Take our comprehensive personality and skills assessment to discover your ideal career matches.
            </p>
            <Button className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white">
              Start Assessment
            </Button>
          </div>

          <div className="bg-stone-50 rounded-2xl p-8 border border-amber-100/50 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Search className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-amber-800 mb-4">Browse Careers</h3>
            <p className="text-amber-800/80 mb-6">
              Explore detailed information about different career paths, requirements, and growth prospects.
            </p>
            <Button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:opacity-90 text-white">
              Browse All Careers
            </Button>
          </div>

          <div className="bg-stone-50 rounded-2xl p-8 border border-amber-100/50 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-700 to-amber-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <TrendingUp className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-amber-800 mb-4">Success Strategies</h3>
            <p className="text-amber-800/80 mb-6">
              Get personalized strategies and tips to accelerate your career growth and achieve success.
            </p>
            <Button className="w-full bg-gradient-to-r from-amber-700 to-amber-600 hover:opacity-90 text-white">
              View Strategies
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
