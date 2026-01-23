"use client"

import React from "react"
import { Code, BookOpen, Target, Briefcase, TrendingUp, Users, Sparkles, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { careersData } from "@/lib/career-data"

export default function LandingPageContentVariation1() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Extended */}
      <section className="relative px-4 md:px-8 py-16 md:py-32 overflow-hidden bg-gradient-to-b from-white to-yellow-50/30">
        <div className="relative max-w-7xl mx-auto">
          {/* Main Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-20">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 border border-yellow-300"
              >
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span className="text-sm font-semibold text-amber-900">Discover Your Path Forward</span>
              </motion.div>

              <h1 className="text-5xl md:text-6xl font-bold text-amber-950 leading-tight">
                Unlock Your Career Potential
              </h1>
              
              <p className="text-lg md:text-lg text-amber-800 leading-relaxed max-w-xl">
                Navigate through 470+ specialized careers across 15 diverse industries. From tech and business to healthcare and creative fields, find where your talents shine brightest and build a fulfilling career path.
              </p>

              <motion.a
                href="#features"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-semibold shadow-md transition-all duration-300"
              >
                Explore Careers
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </motion.div>

            {/* Right Column - Interactive Stats */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Briefcase, label: "Career Paths", value: "470+" },
                  { icon: TrendingUp, label: "Growth Options", value: "Diverse" },
                  { icon: Users, label: "Expert Resources", value: "100+" },
                  { icon: Sparkles, label: "Details", value: "Complete" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + idx * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="group"
                  >
                    <div className="bg-white border-2 border-yellow-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-yellow-400 transition-all h-full">
                      <item.icon className="w-8 h-8 text-amber-700 mb-3" />
                      <div className="text-2xl font-bold text-amber-950">{item.value}</div>
                      <div className="text-sm text-amber-700">{item.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Features Preview Section - Enhanced */}
          <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16 border-t border-yellow-200">
            {[
              { 
                icon: Code,
                title: "Career Pathways", 
                desc: "Step-by-step progression roadmaps from entry-level to leadership positions",
                features: ["Skill progression", "Timeline guidance", "Advancement tips"],
                color: "from-yellow-100 to-yellow-50"
              },
              { 
                icon: BookOpen,
                title: "Learning Resources", 
                desc: "Expert blogs, tutorials, and industry insights to accelerate your growth",
                features: ["Latest trends", "Expert guides", "Case studies"],
                color: "from-amber-100 to-amber-50"
              },
              { 
                icon: Target,
                title: "Skills & Support", 
                desc: "Required competencies, certifications, and answers to career questions",
                features: ["Core skills", "Certifications", "FAQs"],
                color: "from-yellow-100 to-yellow-50"
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15 }}
                className="group"
              >
                <div className={`bg-gradient-to-br ${feature.color} rounded-3xl border-2 border-yellow-200 group-hover:border-yellow-400 p-10 h-full transition-all duration-300 hover:shadow-lg`}>
                  <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-md group-hover:shadow-lg transition-all">
                    <feature.icon className="w-8 h-8 text-amber-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-amber-950 mb-3">{feature.title}</h3>
                  <p className="text-amber-800 text-base leading-relaxed mb-6">{feature.desc}</p>
                  
                  {/* Feature bullets */}
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <span className="text-sm text-amber-800">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section - Numbered List Layout */}
      <section id="categories" className="px-4 md:px-8 py-32 md:py-48 bg-gradient-to-b from-white via-yellow-50/40 to-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-24"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-amber-950 mb-6">
              Explore 15 Career Categories
            </h2>
            <p className="text-xl text-amber-800 max-w-3xl mx-auto">
              Each category opens doors to 30+ specialized career paths. Click any to discover opportunities.
            </p>
          </motion.div>

          {/* Numbered List - Enhanced with Metadata */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="space-y-7"
          >
            {careersData && careersData.map((category) => {
              const categoryIcons: Record<number, React.ReactNode> = {
                1: <Briefcase className="w-10 h-10" />,
                2: <TrendingUp className="w-10 h-10" />,
                3: <Users className="w-10 h-10" />,
                4: <Sparkles className="w-10 h-10" />,
                5: <Code className="w-10 h-10" />,
                6: <Target className="w-10 h-10" />,
                7: <BookOpen className="w-10 h-10" />,
                8: <Briefcase className="w-10 h-10" />,
                9: <Code className="w-10 h-10" />,
                10: <Target className="w-10 h-10" />,
                11: <BookOpen className="w-10 h-10" />,
                12: <Users className="w-10 h-10" />,
                13: <TrendingUp className="w-10 h-10" />,
                14: <Sparkles className="w-10 h-10" />,
                15: <Briefcase className="w-10 h-10" />,
              }

              const sampleJobs: Record<number, string[]> = {
                1: ["Project Manager", "Business Analyst"],
                2: ["Financial Analyst", "Investment Banker"],
                3: ["HR Specialist", "Recruiter"],
                4: ["Product Manager", "Strategy Lead"],
                5: ["Software Engineer", "Data Scientist"],
                6: ["UX Designer", "Creative Director"],
                7: ["Educator", "Trainer"],
                8: ["Cloud Architect", "DevOps Engineer"],
                9: ["Database Admin", "Data Engineer"],
                10: ["Research Scientist", "Lab Manager"],
                11: ["Psychologist", "Therapist"],
                12: ["Team Lead", "Community Manager"],
                13: ["Growth Manager", "Market Analyst"],
                14: ["Innovation Lead", "Tech Pioneer"],
                15: ["Entrepreneur", "Innovator"],
              }
              
              const categoryNumber = String(category.id).padStart(2, "0")
              
              return (
                <motion.div key={category.id} variants={itemVariants}>
                  <Link href={`/careers/category/${category.id}`}>
                    <div className="group relative bg-white rounded-3xl border-3 border-yellow-200 hover:border-yellow-500 transition-all duration-300 overflow-hidden hover:shadow-xl cursor-pointer">
                      <div className="flex flex-col md:flex-row items-stretch md:items-center p-8 md:p-10 gap-6 md:gap-8 min-h-40">
                        {/* Number Badge */}
                        <div className="flex-shrink-0">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-100 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-xl"></div>
                            <div className="relative w-20 h-20 bg-yellow-100 group-hover:bg-yellow-200 rounded-3xl flex items-center justify-center transition-all duration-300 border-2 border-yellow-300 group-hover:border-yellow-400">
                              <span className="text-3xl font-bold text-amber-700 group-hover:text-yellow-700">{categoryNumber}</span>
                            </div>
                          </div>
                        </div>

                        {/* Icon and Main Content */}
                        <div className="flex-grow flex gap-6">
                          <div className="p-4 bg-yellow-100 group-hover:bg-yellow-200 rounded-2xl transition-all text-amber-700 flex-shrink-0 h-fit">
                            {categoryIcons[category.id] || <Briefcase className="w-8 h-8" />}
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-2xl md:text-3xl font-bold text-amber-950 group-hover:text-yellow-700 transition-colors mb-2">
                              {category.category}
                            </h3>
                            <p className="text-amber-800 text-base leading-relaxed mb-4">
                              Explore diverse opportunities and career progression paths in this dynamic and growing industry sector.
                            </p>
                            
                            {/* Featured Roles */}
                            <div className="flex flex-wrap gap-2">
                              {sampleJobs[category.id]?.map((job, idx) => (
                                <span key={idx} className="text-xs px-3 py-1.5 bg-yellow-100 text-amber-800 rounded-full font-medium group-hover:bg-yellow-200 transition-colors">
                                  {job}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Section - Stats and Arrow */}
                        <div className="flex-shrink-0 flex flex-col items-end justify-between h-full min-h-28">
                          <div className="text-right">
                            <div className="text-3xl font-bold text-yellow-600">{category.careers?.length || 0}</div>
                            <p className="text-xs text-amber-700 font-semibold uppercase tracking-wider">Career Paths</p>
                          </div>
                          
                          <div className="flex flex-col items-end gap-2">
                            <div className="w-14 h-14 rounded-full bg-yellow-100 group-hover:bg-yellow-300 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-md">
                              <ArrowRight className="w-6 h-6 text-amber-700 group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-semibold text-amber-800">High Demand</p>
                              <p className="text-xs text-amber-700">Growing Field</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Top accent bar */}
                      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-yellow-500 to-amber-400 group-hover:h-4 transition-all duration-300"></div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
