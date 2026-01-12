"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Award, CheckCircle, FileText, TrendingUp } from "lucide-react"
import Link from "next/link"

export function ApplicationPrompt() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gradient-to-br from-amber-50/50 via-stone-50 to-yellow-50/30">
      <Card className="max-w-2xl w-full border-amber-200 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 shadow-lg">
              <Award className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-amber-900">
            Become a Career Counselor
          </CardTitle>
          <CardDescription className="text-base text-amber-700">
            Join our platform and help students & professionals achieve their career goals
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Benefits Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-amber-50/50">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 mb-3">
                <TrendingUp className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="font-semibold text-amber-900 mb-1">Flexible Schedule</h3>
              <p className="text-sm text-amber-700">Work on your own time</p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-amber-50/50">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 mb-3">
                <FileText className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="font-semibold text-amber-900 mb-1">Set Your Rates</h3>
              <p className="text-sm text-amber-700">Choose your pricing</p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-lg bg-amber-50/50">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 mb-3">
                <CheckCircle className="h-6 w-6 text-amber-700" />
              </div>
              <h3 className="font-semibold text-amber-900 mb-1">Verified Badge</h3>
              <p className="text-sm text-amber-700">Build your credibility</p>
            </div>
          </div>

          {/* Requirements */}
          <div className="p-6 rounded-lg bg-gradient-to-br from-amber-50 to-yellow-50/50 border border-amber-200">
            <h3 className="font-semibold text-amber-900 mb-3">Requirements:</h3>
            <ul className="space-y-2 text-sm text-amber-800">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>Minimum 5 years of professional experience in your domain</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>Relevant educational qualifications and certifications</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>Prior experience in mentoring or counseling (preferred)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>Willingness to provide online counseling sessions</span>
              </li>
            </ul>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <Link href="/counselor-application" className="w-full">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <FileText className="mr-2 h-5 w-5" />
                Fill Application Form
              </Button>
            </Link>
            <p className="text-sm text-amber-700 text-center">
              Application review typically takes 3-5 business days
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
