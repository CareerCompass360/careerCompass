"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Lightbulb, MessageCircle, BookOpen, ChevronDown } from "lucide-react"

interface BlogContent {
  question: string
  answer: string
}

interface BlogSectionProps {
  blog?: {
    title?: string
    quote?: string
    quoteAuth?: string
    author?: string
    data?: string
    content?: BlogContent[]
  }
  title?: string
  quote?: string
  quoteAuthor?: string
  author?: string
  content?: string
  faqData?: BlogContent[]
}

export default function BlogSection(props: BlogSectionProps) {
  const blog = props.blog
  const title = props.title || blog?.title || "Career Insights & Expertise"
  const quote = props.quote || blog?.quote || "Success comes to those who prepare for it."
  const quoteAuthor = props.quoteAuthor || blog?.quoteAuth || "Industry Expert"
  const author = props.author || blog?.author || "Career Coach"
  const content = props.content || blog?.data || "Explore the key aspects of this exciting career path and discover what it takes to succeed."
  const faqData = props.faqData || blog?.content || []
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  return (
    <div className="py-20 md:py-32 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 border border-yellow-300 mb-6">
            <Lightbulb className="w-4 h-4 text-amber-700" />
            <span className="text-sm font-semibold text-amber-900">Expert Insights</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-amber-950 mb-4">
            {title}
          </h2>
          <p className="text-lg text-amber-800 max-w-2xl mx-auto">
            Deep dive into career success factors, industry trends, and expert answers to your most pressing questions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* Left Column - Article & Quote */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-10"
          >
            {/* Featured Quote */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="relative bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 md:p-10 hover:border-yellow-400 transition-all hover:shadow-md">
                <div className="absolute -top-5 -left-5">
                  <div className="text-5xl text-yellow-300">"</div>
                </div>
                <p className="text-xl md:text-2xl font-semibold text-amber-950 italic mb-6 leading-relaxed">
                  {quote}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-yellow-200"></div>
                  <div>
                    <p className="font-bold text-amber-950">{quoteAuthor}</p>
                    <p className="text-sm text-amber-700">Industry Expert</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white border-2 border-yellow-200 rounded-2xl p-8 md:p-10 space-y-6 hover:border-yellow-300 transition-all"
            >
              <div className="space-y-6">
                {content.split("\n\n").map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="text-base md:text-lg leading-relaxed text-amber-900"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Key Takeaways & Author Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Author Card */}
            <div className="sticky top-24 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 hover:border-yellow-400 transition-all shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-yellow-200 flex items-center justify-center text-2xl">👨‍💼</div>
                <div>
                  <h4 className="font-bold text-amber-950">{author}</h4>
                  <p className="text-sm text-amber-700">Career Expert</p>
                </div>
              </div>
              <p className="text-sm text-amber-800 leading-relaxed">
                Industry veteran with deep insights into career development and success strategies
              </p>
            </div>

            {/* Quick Stats */}
            <div className="space-y-3">
              {[
                { icon: BookOpen, label: "Comprehensive Guide", value: "50+ Pages" },
                { icon: MessageCircle, label: "Expert Q&A", value: faqData.length > 0 ? `${faqData.length}+ FAQs` : "Extended" },
              ].map((item, idx) => (
                <div key={idx} className="bg-white border-2 border-yellow-200 rounded-lg p-4 hover:border-yellow-400 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon className="w-5 h-5 text-amber-700" />
                    <p className="text-sm font-semibold text-amber-950">{item.label}</p>
                  </div>
                  <p className="text-lg font-bold text-yellow-700">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* FAQ Section - Beautiful Accordion */}
        {faqData && faqData.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-20 pt-20 border-t-2 border-yellow-200"
          >
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-amber-950 mb-3">
                Frequently Asked Questions
              </h3>
              <p className="text-lg text-amber-800">Get answers to common career questions</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {faqData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full group"
                  >
                    <div className="bg-white border-2 border-yellow-200 rounded-2xl hover:border-yellow-400 transition-all duration-300 overflow-hidden hover:shadow-md">
                      <div className="flex items-center justify-between p-6 md:p-8 cursor-pointer">
                        <h4 className="text-lg md:text-xl font-bold text-amber-950 text-left group-hover:text-yellow-700 transition-colors">
                          {item.question}
                        </h4>
                        <motion.div
                          animate={{ rotate: openFAQ === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="ml-4 flex-shrink-0"
                        >
                          <ChevronDown className="w-6 h-6 text-amber-700 group-hover:text-yellow-700 transition-colors" />
                        </motion.div>
                      </div>

                      {/* Accordion Content */}
                      <AnimatePresence>
                        {openFAQ === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-yellow-200 bg-yellow-50/40">
                              <p className="text-amber-800 text-base leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}
