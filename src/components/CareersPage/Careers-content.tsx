"use client"

import React from "react"
import { Code, BookOpen, Target, Briefcase, TrendingUp, Users, Sparkles, ArrowRight, Compass, Brain, Award, Lightbulb } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { careersData } from "@/lib/career-data"
import { Footer } from "../common/Footer"
import { Navbar } from "../common/Navbar"

const categoryIcons: Record<number, React.ReactNode> = {
  1: <Briefcase className="w-7 h-7" />,
  2: <TrendingUp className="w-7 h-7" />,
  3: <Users className="w-7 h-7" />,
  4: <Sparkles className="w-7 h-7" />,
  5: <Code className="w-7 h-7" />,
  6: <Target className="w-7 h-7" />,
  7: <BookOpen className="w-7 h-7" />,
  8: <Compass className="w-7 h-7" />,
  9: <Brain className="w-7 h-7" />,
  10: <Award className="w-7 h-7" />,
  11: <Lightbulb className="w-7 h-7" />,
  12: <Users className="w-7 h-7" />,
  13: <TrendingUp className="w-7 h-7" />,
  14: <Sparkles className="w-7 h-7" />,
  15: <Briefcase className="w-7 h-7" />,
}

const categoryDescriptions: Record<number, string> = {
  1: "Business management, strategy, and organizational leadership.",
  2: "Finance, investments, and economic planning.",
  3: "Talent, culture, and people operations.",
  4: "Innovation, product development, and strategic execution.",
  5: "Software, systems, and modern technology development.",
  6: "Design, creativity, and user-centered communication.",
  7: "Teaching, training, and knowledge development.",
  8: "Cloud, infrastructure, and IT operations.",
  9: "Data engineering, analytics, and information systems.",
  10: "Scientific discovery, experimentation, and research.",
  11: "Psychology, wellbeing, and behavioral sciences.",
  12: "Leadership, collaboration, and team effectiveness.",
  13: "Growth, market strategy, and business expansion.",
  14: "Emerging technology and future-focused innovation.",
  15: "Entrepreneurship, venture creation, and scaling.",
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

export default function LandingPageContentVariation1() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />

      <div className="pt-16">
        <section className="relative overflow-hidden bg-gradient-to-br from-amber-50/50 via-stone-50 to-yellow-50/30 px-4 md:px-8 py-20 sm:py-28">
          <div className="absolute inset-0 bg-grid-amber-100/30 [mask-image:linear-gradient(0deg,#fafaf9,rgba(250,250,249,0.6))] -z-10" />
          <div className="absolute top-20 right-20 h-32 w-32 rounded-full bg-gradient-to-br from-amber-400/20 to-yellow-400/20 blur-2xl animate-pulse" />
          <div className="absolute top-40 left-20 h-24 w-24 rounded-full bg-gradient-to-br from-yellow-400/15 to-amber-400/15 blur-xl animate-bounce" />
          <div className="absolute bottom-20 right-40 h-40 w-40 rounded-full bg-gradient-to-br from-amber-200/20 to-yellow-200/20 blur-3xl" />

          <div className="relative max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 shadow-sm">
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span className="text-sm font-semibold text-amber-800">Discover Your Path Forward</span>
              </div>

              <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-amber-800 text-balance">
                Explore{" "}
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                  Future-Ready Careers
                </span>
              </h1>

              <p className="mt-6 text-xl leading-8 text-amber-800/80 max-w-3xl mx-auto text-pretty">
                Navigate through 470+ specialized careers across 15 diverse industries. Find where your talents shine brightest and build a fulfilling path.
              </p>

              <div className="mt-10">
                <a
                  href="#categories"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Explore Careers
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: Briefcase, label: "Career Paths", value: "470+" },
                { icon: TrendingUp, label: "Industries", value: "15" },
                { icon: Users, label: "Guided Tracks", value: "Structured" },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-amber-100 shadow-sm">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-yellow-400 mb-3">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-amber-800">{item.value}</div>
                  <div className="text-sm text-amber-700 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 md:px-8 py-14 md:py-16 border-y border-amber-100 bg-white/60">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Code, title: "Career Pathways", desc: "Step-by-step progression roadmaps from entry-level to leadership roles." },
              { icon: BookOpen, title: "Learning Resources", desc: "Guides, articles, and practical learning resources for each role." },
              { icon: Target, title: "Skills & Support", desc: "Core skills, certifications, and practical preparation advice." },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl border border-amber-100 bg-white/90 p-6 shadow-sm"
              >
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50">
                  <feature.icon className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-2">{feature.title}</h3>
                <p className="text-amber-800/80 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="categories" className="px-4 md:px-8 py-16 md:py-20 bg-gradient-to-b from-stone-50 via-amber-50/30 to-stone-50">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-amber-800 mb-4">Explore 15 Career Categories</h2>
              <p className="text-lg text-amber-800/80 max-w-3xl mx-auto">
                Browse categories in a compact view and jump directly into the one that fits your goals.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {careersData?.map((category, idx) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03, duration: 0.35 }}
                  whileHover={{ y: -4 }}
                >
                  <Link href={`/careers/category/${category.id}`}>
                    <div className="group h-full rounded-2xl border border-amber-100 bg-white/90 backdrop-blur-sm p-5 shadow-sm hover:shadow-md hover:border-amber-300 transition-all">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-amber-50 text-amber-700">
                          {categoryIcons[category.id] || <Briefcase className="w-7 h-7" />}
                        </div>
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-700">
                          {String(category.id).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-amber-950 group-hover:text-amber-700 transition-colors leading-tight mb-2">
                        {category.category}
                      </h3>

                      <p className="text-xs text-amber-800/85 leading-relaxed mb-4">{categoryDescriptions[category.id]}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {sampleJobs[category.id]?.map((job, jobIdx) => (
                          <span key={jobIdx} className="text-[11px] px-2.5 py-1 bg-amber-50 text-amber-700 rounded-full font-medium">
                            {job}
                          </span>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-amber-100 flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold text-amber-800">{category.careers?.length || 0}</div>
                          <p className="text-[11px] font-semibold text-amber-700/80 uppercase tracking-wider">Careers</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-amber-700 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
