"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

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
  const title = props.title || blog?.title || "Career Insights"
  const quote = props.quote || blog?.quote || "Success comes to those who prepare for it."
  const quoteAuthor = props.quoteAuthor || blog?.quoteAuth || "Industry Expert"
  const author = props.author || blog?.author || "Career Coach"
  const content = props.content || blog?.data || "Explore the key aspects of this exciting career path and discover what it takes to succeed."
  const faqData = props.faqData || blog?.content || []
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className="py-20 md:py-28 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-20">
        {/* Blog Article Section - CHANGE: proper article layout with quote and full content */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Article Header */}
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3 text-balance">{title}</h2>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="text-sm font-semibold">By {author}</span>
            </div>
          </div>

          {/* Featured Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-accent/5 border-l-4 border-accent rounded-lg p-8 md:p-10 mb-12"
          >
            <p className="text-xl md:text-2xl font-semibold text-foreground italic mb-4 text-balance leading-relaxed">
              "{quote}"
            </p>
            <p className="text-muted-foreground font-semibold">— {quoteAuthor}</p>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <div className="text-lg leading-relaxed text-muted-foreground space-y-6">
              {content.split("\n\n").map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                  className="text-base md:text-lg leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>

        {/* FAQ Section - CHANGE: interactive card-based design with better visual hierarchy */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* FAQ Header */}
          <div className="mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Frequently Asked Questions</h3>
            <p className="text-muted-foreground">Get answers to common questions about this career path</p>
          </div>

          {/* FAQ Items - Interactive Accordion */}
          <div className="space-y-4">
            {faqData && faqData.length > 0 && faqData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.08 }}
                className="group"
              >
                <motion.button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="w-full text-left"
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative bg-card border-2 border-border rounded-xl p-6 md:p-8 hover:border-accent/50 transition-all duration-300 group-hover:bg-secondary/30 overflow-hidden">
                    {/* Background gradient on hover */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-hidden="true"
                    ></div>

                    {/* Content */}
                    <div className="relative flex items-start justify-between gap-4">
                      <div className="flex-1 flex items-start gap-4">
                        {/* Number indicator */}
                        <span className="text-lg font-bold text-accent flex-shrink-0 min-w-8">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {/* Question */}
                        <h4 className="text-lg md:text-xl font-bold text-foreground text-balance leading-relaxed group-hover:text-accent transition-colors">
                          {item.question}
                        </h4>
                      </div>
                      {/* Expand/Collapse Icon */}
                      <motion.div
                        animate={{ rotate: activeIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 mt-1 text-accent text-2xl"
                      >
                        ↓
                      </motion.div>
                    </div>
                  </div>
                </motion.button>

                {/* Answer - Expandable Content */}
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-secondary/20 border-2 border-t-0 border-border rounded-b-xl p-6 md:p-8">
                        <p className="text-base leading-relaxed text-muted-foreground text-balance">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}
