"use client"

import { Label } from "@/components/ui/label"
import { CounselorFormData } from "../CounselorApplicationForm"
import { Checkbox } from "@/components/ui/checkbox"

interface CounselingExpertiseProps {
  formData: CounselorFormData
  updateFormData: (data: Partial<CounselorFormData>) => void
}

const studentTypeOptions = [
  "Class 9-10",
  "Class 11-12",
  "College Students",
  "Working Professionals",
  "Career Switchers",
  "Recent Graduates"
]

const careerAreaOptions = [
  "Engineering",
  "Medical",
  "Commerce",
  "Law",
  "Government Exams",
  "MBA",
  "Abroad Studies",
  "Tech Careers",
  "Creative Careers",
  "Entrepreneurship",
  "Science & Research",
  "Finance & Banking",
  "Other"
]

const topicOptions = [
  "Career selection",
  "College selection",
  "Resume building",
  "Interview preparation",
  "Job switching",
  "Study abroad",
  "Exam strategy",
  "Skill roadmap",
  "Personal branding",
  "Networking tips"
]

export function CounselingExpertise({ formData, updateFormData }: CounselingExpertiseProps) {
  const toggleArrayItem = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item)
    }
    return [...array, item]
  }

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-lg mb-3 block">Which students can you guide? *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {studentTypeOptions.map((type) => (
            <div key={type} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-amber-50 transition-colors">
              <Checkbox
                id={`student-${type}`}
                checked={formData.studentTypes.includes(type)}
                onCheckedChange={() => 
                  updateFormData({ 
                    studentTypes: toggleArrayItem(formData.studentTypes, type) 
                  })
                }
              />
              <label
                htmlFor={`student-${type}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-lg mb-3 block">Career Areas You Can Counsel *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {careerAreaOptions.map((area) => (
            <div key={area} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-amber-50 transition-colors">
              <Checkbox
                id={`area-${area}`}
                checked={formData.careerAreasCanCounsel.includes(area)}
                onCheckedChange={() => 
                  updateFormData({ 
                    careerAreasCanCounsel: toggleArrayItem(formData.careerAreasCanCounsel, area) 
                  })
                }
              />
              <label
                htmlFor={`area-${area}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {area}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-lg mb-3 block">Topics You Can Help With *</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {topicOptions.map((topic) => (
            <div key={topic} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-amber-50 transition-colors">
              <Checkbox
                id={`topic-${topic}`}
                checked={formData.topicsCanHelp.includes(topic)}
                onCheckedChange={() => 
                  updateFormData({ 
                    topicsCanHelp: toggleArrayItem(formData.topicsCanHelp, topic) 
                  })
                }
              />
              <label
                htmlFor={`topic-${topic}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {topic}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
