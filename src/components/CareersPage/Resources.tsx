"use client"

import { motion } from "framer-motion"
import { BookOpen, Globe } from "lucide-react"

interface ResourcesProps {
  online?: string[]
  offline?: string[]
  careerName?: string
}

export default function ResourcesSection({ online, offline, careerName }: ResourcesProps) {
  const defaultOnline = [
    "Coursera - Specialized courses from top universities",
    "Udemy - Practical skill-based learning",
    "LinkedIn Learning - Industry-focused courses",
    "YouTube - Free educational channels",
    "edX - University-level programs",
  ]

  const defaultOffline = [
    "Books on industry fundamentals and advanced topics",
    "University degree or certification programs",
    "Industry workshops and conferences",
    "Mentorship programs with experienced professionals",
    "Networking events and professional associations",
  ]

  const displayOnline = (online && online.length > 0) ? online : defaultOnline
  const displayOffline = (offline && offline.length > 0) ? offline : defaultOffline
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
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-amber-700 tracking-widest uppercase">Learning Resources</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-amber-950 mb-4">
            Curated Resources for Growth
          </h2>
          <p className="text-lg text-amber-800 max-w-2xl mx-auto">
            Access the best online and offline resources to accelerate your learning journey
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Online Resources */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white border-2 border-yellow-200 rounded-xl p-8 hover:shadow-lg hover:border-yellow-400 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Globe className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="text-2xl font-bold text-amber-950">Online Resources</h3>
            </div>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
              {displayOnline && displayOnline.map((resource, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 hover:border-yellow-400 hover:bg-yellow-100/50 transition-all duration-300 cursor-pointer group"
                >
                  <p className="text-amber-950 font-medium text-sm group-hover:text-yellow-700 transition-colors">
                    {resource}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Offline Resources */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white border-2 border-yellow-200 rounded-xl p-8 hover:shadow-lg hover:border-yellow-400 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-amber-700" />
              </div>
              <h3 className="text-2xl font-bold text-amber-950">Books & Courses</h3>
            </div>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
              {displayOffline && displayOffline.map((resource, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="p-4 bg-yellow-50 rounded-lg border border-yellow-200 hover:border-yellow-400 hover:bg-yellow-100/50 transition-all duration-300 cursor-pointer group"
                >
                  <p className="text-amber-950 font-medium text-sm group-hover:text-yellow-700 transition-colors">
                    {resource}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
