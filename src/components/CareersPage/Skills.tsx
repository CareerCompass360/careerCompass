"use client"

import { motion } from "framer-motion"
import { Award } from "lucide-react"

interface SkillsGridProps {
  skills?: string[]
  careerName?: string
}

export default function SkillsGrid({ skills, careerName }: SkillsGridProps) {
  // Default skills for any career if none provided
  const defaultSkills = [
    "Problem Solving",
    "Critical Thinking",
    "Communication",
    "Teamwork & Collaboration",
    "Adaptability",
    "Time Management",
    "Technical Foundation",
    "Continuous Learning",
    "Project Management",
    "Attention to Detail",
    "Creativity & Innovation",
    "Leadership Potential",
  ]

  const displaySkills = (skills && skills.length > 0) ? skills : defaultSkills
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  }

  // Categorize skills for better organization
  const technicalSkills = displaySkills.slice(0, Math.ceil(displaySkills.length / 2))
  const softSkills = displaySkills.slice(Math.ceil(displaySkills.length / 2))

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold text-accent tracking-widest uppercase">Competencies</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 flex items-center justify-center gap-3 text-balance">
            <Award className="w-8 h-8 text-accent" />
            Essential Skills Required
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master these core competencies to excel in your career path
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {displaySkills && displaySkills.map((skill, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="group"
            >
              <div className="bg-card border-2 border-border rounded-xl p-4 md:p-6 h-full flex items-center gap-4 hover:border-accent/50 hover:shadow-md transition-all duration-300 cursor-pointer">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <span className="text-lg font-bold text-accent">▸</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-sm md:text-base group-hover:text-accent transition-colors">
                    {skill}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
