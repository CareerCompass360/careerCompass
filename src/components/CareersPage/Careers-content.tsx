"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { careersData } from "@/lib/career-data"
import { ArrowRight } from "lucide-react"

export default function LandingPageContent() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="px-4 md:px-8 py-20 md:py-32 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight">
                Discover Your Dream Career
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-md">
                Explore endless possibilities and find the perfect path that aligns with your passions and skills. Start
                your career journey with comprehensive guidance.
              </p>
              <motion.a
                href="#categories"
                whileHover={{ x: 4 }}
                className="inline-block px-8 py-4 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Browse Careers
              </motion.a>
            </motion.div>

            {/* Right Column - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-96 lg:h-full min-h-96 rounded-xl overflow-hidden bg-gradient-to-br from-accent/20 to-accent/5 border border-border"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl">🚀</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="px-4 md:px-8 py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Explore Career Categories</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose from 15 diverse career categories and discover your perfect professional path
            </p>
          </motion.div>

          {/* Categories Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {careersData && careersData.map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <Link href={`/careers/category/${category.id}`}>
                  <div className="group h-full bg-card border border-border rounded-lg overflow-hidden hover:border-accent transition-all duration-300 cursor-pointer hover:shadow-lg p-6">
                    {/* Category Info */}
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                      {category.category}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      Explore {category.careers?.length || 0} exciting career opportunities in {category.category.toLowerCase()}
                    </p>

                    {/* Career Count */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                        {category.careers?.length || 0} Careers
                      </span>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 md:px-8 py-20 md:py-32 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">15</div>
              <p className="text-lg text-muted-foreground">Career Categories</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                {careersData && careersData.reduce((acc, cat) => acc + (cat.careers?.length || 0), 0)}
              </div>
              <p className="text-lg text-muted-foreground">Career Paths</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent mb-2">∞</div>
              <p className="text-lg text-muted-foreground">Possibilities</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
