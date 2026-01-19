"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, BookOpen, Target, Briefcase } from "lucide-react"
import { careersData } from "@/lib/career-data"
import { getCareerByName, getBlogForCareer } from "@/lib/firestore-utils"
import CareerPathVisualization from "@/components/CareersPage/Roadmap"
import SkillsGrid from "@/components/CareersPage/Skills"
import ResourcesSection from "@/components/CareersPage/Resources"
import BlogSection from "@/components/CareersPage/BlogSection"
import { motion } from "framer-motion"

type CareerDetailPageContentProps = {
  careerName: string
}

export default function CareerDetailPageContent({ careerName }: CareerDetailPageContentProps) {
  const [career, setCareer] = useState<any>(null)
  const [blog, setBlog] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const decodedCareerName = decodeURIComponent(careerName)

  // Find static category and career
  let category: any = null
  let careerInfo: any = null
  for (const cat of careersData || []) {
    const found = cat.careers?.find((c: any) => c.name === decodedCareerName)
    if (found) {
      category = cat
      careerInfo = found
      break
    }
  }

  useEffect(() => {
    const fetchCareerDetails = async () => {
      if (!category) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)

        // Try to fetch from Firestore
        const careerData = await getCareerByName(decodedCareerName)
        setCareer(careerData || {})

        // Fetch blog
        const blogData = await getBlogForCareer(decodedCareerName)
        setBlog(blogData)
      } catch (error) {
        console.error("Error fetching career details:", error)
        setCareer({})
      } finally {
        setLoading(false)
      }
    }

    fetchCareerDetails()
  }, [decodedCareerName, category])

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Career Not Found</h1>
          <Link href="/careers" className="text-accent font-semibold hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section className="px-4 md:px-8 py-12 md:py-20 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto">
          <Link
            href={`/careers/category/${category.id}`}
            className="text-accent font-semibold mb-6 inline-flex items-center hover:opacity-80"
          >
            ← Back to {category.category}
          </Link>

          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">{decodedCareerName}</h1>
            <p className="text-lg text-muted-foreground mb-6">
              A career in {decodedCareerName} within the {category?.category} field offers rewarding opportunities for professional growth.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="w-5 h-5 text-accent" />
                <span className="text-muted-foreground">{category?.category}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      {loading ? (
        <div className="px-4 md:px-8 py-20 flex items-center justify-center">
          <p className="text-muted-foreground">Loading career details...</p>
        </div>
      ) : (
        <div className="px-4 md:px-8 py-16 md:py-20 space-y-16">
          <div className="max-w-7xl mx-auto w-full">
            {/* Career Path */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Career Path & Progression</h2>
              <CareerPathVisualization careerName={decodedCareerName} path={career?.careerPath} />
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Required Skills</h2>
              <SkillsGrid careerName={decodedCareerName} skills={career?.skillsRequired} />
            </div>

            {/* Resources */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Learning Resources</h2>
              <ResourcesSection 
                careerName={decodedCareerName} 
                online={career?.resources?.online}
                offline={career?.resources?.offline}
              />
            </div>

            {/* Blog Section */}
            {blog ? (
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">Insights & FAQs</h2>
                <BlogSection blog={blog} />
              </div>
            ) : (
              <section className="border-t border-border pt-16">
                <div className="bg-card border border-border rounded-lg p-8 text-center">
                  <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Blog content coming soon for this career.</p>
                </div>
              </section>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
