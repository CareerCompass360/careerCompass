'use client'

import React from "react"

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowRight, Code, Database, Shield, Cloud, Palette, Zap, Cpu, Lightbulb, Award, Microscope, Smartphone, Brain, Network, Landmark, Users, TrendingUp, Briefcase, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { careersData } from '@/lib/career-data'
import { Footer } from "../common/Footer"

// Icon mapping for careers
const careerIconMap: Record<string, React.ReactNode> = {
  'Software Engineer': <Code className="w-6 h-6" />,
  'Data Scientist': <Database className="w-6 h-6" />,
  'AI/ML Engineer': <Brain className="w-6 h-6" />,
  'Cybersecurity Analyst': <Shield className="w-6 h-6" />,
  'Cloud Engineer': <Cloud className="w-6 h-6" />,
  'DevOps Engineer': <Zap className="w-6 h-6" />,
  'UX/UI Designer': <Palette className="w-6 h-6" />,
  'Full Stack Developer': <Cpu className="w-6 h-6" />,
  'Blockchain Developer': <Lightbulb className="w-6 h-6" />,
  'IoT Specialist': <Zap className="w-6 h-6" />,
  'Systems Architect': <Award className="w-6 h-6" />,
  'Robotics Engineer': <Cpu className="w-6 h-6" />,
  'Network Engineer': <Network className="w-6 h-6" />,
  'Hardware Engineer': <Microscope className="w-6 h-6" />,
  'Technology Consultant': <Briefcase className="w-6 h-6" />,
  'Product Manager': <TrendingUp className="w-6 h-6" />,
  'Database Administrator': <Database className="w-6 h-6" />,
  'Game Developer': <Zap className="w-6 h-6" />,
  'Digital Transformation Specialist': <Lightbulb className="w-6 h-6" />,
  'Embedded Systems Engineer': <Cpu className="w-6 h-6" />,
  'Mobile App Developer': <Smartphone className="w-6 h-6" />,
  'Computer Vision Engineer': <Microscope className="w-6 h-6" />,
  'Virtual Reality Developer': <Brain className="w-6 h-6" />,
  'Machine Learning Researcher': <Brain className="w-6 h-6" />,
  'Big Data Engineer': <Database className="w-6 h-6" />,
  'Quantum Computing Researcher': <Lightbulb className="w-6 h-6" />,
  'Cyber Forensics Expert': <Shield className="w-6 h-6" />,
  'Ethical Hacker': <Shield className="w-6 h-6" />,
  'Bioinformatics Specialist': <Microscope className="w-6 h-6" />,
  'GIS Analyst': <Landmark className="w-6 h-6" />,
  'Telecommunications Engineer': <Network className="w-6 h-6" />,
  'IT Support Specialist': <Users className="w-6 h-6" />,
  'Technical Writer': <Code className="w-6 h-6" />,
  'Innovation Strategist': <Lightbulb className="w-6 h-6" />,
  'Data Engineer': <Database className="w-6 h-6" />,
  'Computer Programmer': <Code className="w-6 h-6" />,
  'Digital Marketing Specialist': <TrendingUp className="w-6 h-6" />,
  'RPA Developer': <Zap className="w-6 h-6" />,
  'AI Ethicist': <Award className="w-6 h-6" />,
  'Solutions Architect': <Award className="w-6 h-6" />,
  'Agile Coach': <Users className="w-6 h-6" />,
  'Information Security Officer': <Shield className="w-6 h-6" />,
}

type CategoryPageContentProps = {
  categoryId: string
}

export default function CategoryPageContent({ categoryId }: CategoryPageContentProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const categoryId_num = parseInt(categoryId, 10)
  const category = careersData?.find((c) => c.id === categoryId_num)

  const filteredCareers = useMemo(() => {
    if (!category?.careers) return []
    const searchLower = searchTerm.toLowerCase()
    let filtered = category.careers.filter((career) => {
      const matchesSearch = career.name.toLowerCase().includes(searchLower)
      return matchesSearch
    })

    // Sort alphabetically
    return filtered.sort((a, b) => {
      const comparison = a.name.localeCompare(b.name)
      return sortOrder === 'asc' ? comparison : -comparison
    })
  }, [searchTerm, sortOrder, category])

  if (!category) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-amber-950 mb-4">Category Not Found</h1>
          <Link href="/careers" className="text-yellow-600 font-semibold hover:text-yellow-700">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <section className="px-4 md:px-8 py-12 md:py-20 border-b border-yellow-200 bg-gradient-to-br from-yellow-50 to-white">
        <div className="max-w-7xl mx-auto">
          <Link href="/careers" className="text-amber-700 font-semibold mb-6 inline-flex items-center hover:text-yellow-600 transition-colors">
            ← Back to Categories
          </Link>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-amber-950 mb-2">{category.category}</h1>
              <p className="text-lg text-amber-800">
                Explore {category.careers?.length || 0} exciting careers in {category.category.toLowerCase()}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="px-4 md:px-8 py-6 border-b border-yellow-200 sticky top-0 bg-white/98 backdrop-blur-sm z-10 shadow-sm">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-700" />
            <input
              type="text"
              placeholder="Search careers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-yellow-50 border-2 border-yellow-200 rounded-lg focus:outline-none focus:border-yellow-400 focus:bg-white text-amber-950 placeholder:text-amber-600/50 font-medium transition-all"
            />
          </div>

          {/* Sort Dropdown Filter */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-amber-950">Sort by:</span>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-4 py-2 bg-white border-2 border-yellow-200 rounded-lg font-semibold text-amber-950 hover:border-yellow-400 transition-all inline-flex items-center gap-2"
              >
                {sortOrder === 'asc' ? 'A - Z' : 'Z - A'}
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-2 w-40 bg-white border-2 border-yellow-200 rounded-lg shadow-lg z-20"
                >
                  <button
                    onClick={() => {
                      setSortOrder('asc')
                      setIsDropdownOpen(false)
                    }}
                    className={`w-full text-left px-4 py-3 font-semibold transition-colors ${
                      sortOrder === 'asc'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'text-amber-950 hover:bg-yellow-50'
                    }`}
                  >
                    A - Z (Ascending)
                  </button>
                  <button
                    onClick={() => {
                      setSortOrder('desc')
                      setIsDropdownOpen(false)
                    }}
                    className={`w-full text-left px-4 py-3 font-semibold border-t border-yellow-200 transition-colors ${
                      sortOrder === 'desc'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'text-amber-950 hover:bg-yellow-50'
                    }`}
                  >
                    Z - A (Descending)
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Careers Grid */}
      <section className="px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          {filteredCareers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-amber-800">No careers found matching your search.</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredCareers.map((career, idx) => (
                <motion.div
                  key={`${career.name}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  whileHover={{ y: -4 }}
                >
                  <Link href={`/careers/detail/${encodeURIComponent(career.name)}`}>
                    <div className="group h-full bg-white border-2 border-yellow-200 rounded-xl p-6 hover:border-yellow-400 hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-yellow-100 rounded-lg group-hover:bg-yellow-200 transition-all flex-shrink-0">
                          <div className="text-amber-700">
                            {careerIconMap[career.name] || <Briefcase className="w-6 h-6" />}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-amber-950 group-hover:text-yellow-700 transition-colors leading-tight">
                            {career.name}
                          </h3>
                        </div>
                        <ArrowRight className="w-5 h-5 text-amber-700 group-hover:text-yellow-700 group-hover:translate-x-2 transition-all flex-shrink-0" />
                      </div>
                      <p className="text-sm text-amber-700">
                        Click to explore career details, skills, and pathways
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 md:px-8 py-12 md:py-20 bg-yellow-50 border-t border-yellow-200">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-4xl font-bold text-amber-950 mb-2">{category.careers?.length || 0}</div>
          <p className="text-lg text-amber-800">Total careers in {category.category}</p>
        </div>
      </section>
      <Footer/>
    </main>
  )
}
