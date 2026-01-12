"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/LandingPage/Navbar"
import { Footer } from "@/components/LandingPage/Footer"
import { CounsellingHero } from "@/components/CounsellingPage/CounsellingHero"
import { CounselorGrid } from "@/components/CounsellingPage/CounselorGrid"
import { Loader2 } from "lucide-react"

interface Counselor {
  id: string
  fullName: string
  profilePhoto?: string | null
  email: string
  currentJobTitle: string
  currentOrganization: string
  totalYearsExperience: number
  primaryCareerDomain: string
  subSpecialization: string
  city: string
  country: string
  languagesSpoken: string[]
  topicsCanHelp: string[]
  studentTypes: string[]
  careerAreasCanCounsel: string[]
  wantToCharge: boolean
  pricePer30Min?: number | null
  pricePer60Min?: number | null
}

export default function CounsellingPage() {
  const [counselors, setCounselors] = useState<Counselor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCounselors() {
      try {
        const response = await fetch("/api/counselors")
        const data = await response.json()

        if (data.success) {
          setCounselors(data.counselors)
        } else {
          setError(data.error || "Failed to load counselors")
        }
      } catch (err) {
        console.error("Error fetching counselors:", err)
        setError("Failed to load counselors. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchCounselors()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <CounsellingHero />
        
        {/* Counselors Section */}
        <section id="counselors-section" className="py-20 sm:py-32 bg-stone-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-amber-800 sm:text-4xl">
                Our Expert Counselors
              </h2>
              <p className="mt-4 text-lg text-amber-800/80">
                Browse through our verified career counselors and find the perfect match for your needs
              </p>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="h-12 w-12 animate-spin text-amber-600 mb-4" />
                <p className="text-amber-700 text-lg">Loading counselors...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-center max-w-md">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                    <span className="text-3xl">⚠️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">
                    Unable to load counselors
                  </h3>
                  <p className="text-amber-700 mb-4">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            ) : counselors.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-center max-w-md">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
                    <span className="text-3xl">👥</span>
                  </div>
                  <h3 className="text-xl font-semibold text-amber-900 mb-2">
                    No counselors available yet
                  </h3>
                  <p className="text-amber-700">
                    We're currently reviewing counselor applications. Please check back soon!
                  </p>
                </div>
              </div>
            ) : (
              <CounselorGrid counselors={counselors} />
            )}
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
