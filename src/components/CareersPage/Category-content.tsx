'use client'

import React from "react"

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowRight, Filter, Code, Database, Shield, Cloud, Palette, Zap, Cpu, Lightbulb, Award, Microscope, Smartphone, Brain, Network, Landmark, Users, TrendingUp, Briefcase } from 'lucide-react'
import Link from 'next/link'
import { careersData } from '@/lib/career-data'

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
  'GIS Analyst': <Map className="w-6 h-6" />,
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

// Import Map icon since it's not imported yet
import { Map } from 'lucide-react'

type CategoryPageContentProps = {
  categoryId: string
}

export default function CategoryPageContent({ categoryId }: CategoryPageContentProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const categoryId_num = parseInt(categoryId, 10)
  const category = careersData?.find((c) => c.id === categoryId_num)

  const filteredCareers = useMemo(() => {
    if (!category?.careers) return []
    const searchLower = searchTerm.toLowerCase()
    return category.careers.filter((career) => {
      const matchesSearch = career.name.toLowerCase().includes(searchLower)
      return matchesSearch
    })
  }, [searchTerm, category])

  if (!category) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Category Not Found</h1>
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
          <Link href="/careers" className="text-accent font-semibold mb-6 inline-flex items-center hover:opacity-80">
            ← Back to Categories
          </Link>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{category.category}</h1>
              <p className="text-lg text-muted-foreground">
                Explore {category.careers?.length || 0} exciting careers in {category.category.toLowerCase()}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="px-4 md:px-8 py-8 border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search careers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:border-accent text-foreground placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </section>

      {/* Careers Grid */}
      <section className="px-4 md:px-8 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          {filteredCareers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No careers found matching your search.</p>
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
                >
                  <Link href={`/careers/detail/${encodeURIComponent(career.name)}`}>
                    <div className="group h-full bg-card border border-border rounded-lg p-6 hover:border-accent hover:shadow-lg transition-all duration-300 cursor-pointer">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors flex-shrink-0">
                          <div className="text-accent">
                            {careerIconMap[career.name] || <Briefcase className="w-6 h-6" />}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                            {career.name}
                          </h3>
                        </div>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
                      </div>
                      <p className="text-sm text-muted-foreground">
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
      <section className="px-4 md:px-8 py-12 md:py-20 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-4xl font-bold text-accent mb-2">{category.careers?.length || 0}</div>
          <p className="text-lg text-muted-foreground">Total careers in {category.category}</p>
        </div>
      </section>
    </main>
  )
}
