"use client"

interface PathStep {
  level: string
  options: string[]
}

interface CareerPathVisualizationProps {
  path?: PathStep[]
  careerName: string
}

export default function CareerPathVisualization({
  path,
  careerName,
}: CareerPathVisualizationProps) {
  // Default progression path if none provided
  const defaultPath: PathStep[] = [
    {
      level: "Beginner",
      options: [
        "Complete foundational courses",
        "Learn core concepts",
        "Build basic projects",
        "Obtain relevant certifications",
      ],
    },
    {
      level: "Intermediate",
      options: [
        "Gain hands-on experience",
        "Work on real projects",
        "Develop specialized skills",
        "Contribute to open source",
      ],
    },
    {
      level: "Advanced",
      options: [
        "Master advanced techniques",
        "Lead technical initiatives",
        "Build complex systems",
        "Mentor junior professionals",
      ],
    },
    {
      level: "Expert",
      options: [
        "Become industry thought leader",
        "Drive innovation",
        "Influence industry standards",
        "Mentor and guide others",
      ],
    },
  ]

  const displayPath = path && path.length > 0 ? path : defaultPath
  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-yellow-500 rounded-full" />
            <span className="text-sm font-semibold text-amber-700 uppercase tracking-widest">
              Career Progression
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold text-amber-950 mb-4">
            Your Journey to Success
          </h2>

          <p className="text-lg text-amber-800 max-w-2xl">
            Navigate through key milestones to become a successful {careerName}.
          </p>
        </div>

        {/* Timeline Wrapper */}
        <div className="relative">
          {/* Continuous dotted vertical line */}
          <div
            className="absolute left-[39px] top-0 bottom-0 w-px"
            style={{
              backgroundImage:
                "repeating-linear-gradient(to bottom, #d97706 0 8px, transparent 8px 16px)",
            }}
          />

          <div className="space-y-14">
            {displayPath && displayPath.map((step, index) => (
              <div
                key={index}
                className="grid grid-cols-[80px_1fr] gap-6 items-start relative"
              >
                {/* Bullet */}
                <div className="flex justify-center">
                  <div className="z-10 w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold
                    bg-white text-yellow-600 border-4 border-yellow-500">
                    {index + 1}
                  </div>
                </div>

                {/* Card */}
                <div className="bg-white border-2 border-yellow-200 rounded-lg p-8 hover:border-yellow-400 hover:shadow-md transition-all duration-300">
                  <h3 className="text-2xl font-semibold text-amber-950 mb-6">
                    {step.level}
                  </h3>

                  <div className="space-y-3">
                    {step.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex gap-3">
                        <span className="mt-2 w-2 h-2 rounded-full bg-yellow-500 flex-shrink-0" />
                        <p className="text-sm text-amber-800">
                          {option}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
