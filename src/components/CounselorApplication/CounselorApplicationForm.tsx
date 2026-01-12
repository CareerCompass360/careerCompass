"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react"
import { BasicIdentity } from "./steps/BasicIdentity"
import { ProfessionalBackground } from "./steps/ProfessionalBackground"
import { CounselingExpertise } from "./steps/CounselingExpertise"
import { ExperienceProof } from "./steps/ExperienceProof"
import { DocumentsVerification } from "./steps/DocumentsVerification"
import { PlatformReadiness } from "./steps/PlatformReadiness"
import { Commercials } from "./steps/Commercials"
import { TrustEthics } from "./steps/TrustEthics"
import { toast } from "sonner"

export interface CounselorFormData {
  // Basic Identity
  fullName: string
  profilePhoto: string
  email: string
  mobileNumber: string
  dateOfBirth: string
  gender: string
  city: string
  country: string
  languagesSpoken: string[]
  linkedinProfile: string
  personalWebsite: string
  
  // Professional Background
  currentJobTitle: string
  currentOrganization: string
  totalYearsExperience: number
  primaryCareerDomain: string
  subSpecialization: string
  highestEducationLevel: string
  degreeName: string
  university: string
  yearOfGraduation: number
  
  // Career Counseling Expertise
  studentTypes: string[]
  careerAreasCanCounsel: string[]
  topicsCanHelp: string[]
  
  // Real Experience Proof
  hasFormedMentored: boolean
  numberOfPeopleGuided: number
  whereMentored: string
  successStory: string
  
  // Documents
  resumeUrl: string
  degreeCertificateUrl: string
  workExperienceProofUrl: string
  counselingCertUrl: string
  
  // Platform Readiness
  willingOnlineCounseling: boolean
  preferredMode: string[]
  availableHoursPerWeek: number
  preferredTimeSlots: string[]
  timeZone: string
  
  // Commercials
  wantToCharge: boolean
  pricePer30Min: number
  pricePer60Min: number
  openToRevenueSharing: boolean
  
  // Trust & Ethics
  whyJoinPlatform: string
  whatMakesQualified: string
  agreedToTerms: boolean
  digitalSignature: string
}

const steps = [
  { id: 1, name: "Basic Identity", description: "Personal information" },
  { id: 2, name: "Professional Background", description: "Work & education" },
  { id: 3, name: "Counseling Expertise", description: "Your specialization" },
  { id: 4, name: "Experience Proof", description: "Show your experience" },
  { id: 5, name: "Documents", description: "Upload certificates" },
  { id: 6, name: "Platform Readiness", description: "Availability & mode" },
  { id: 7, name: "Commercials", description: "Pricing & earnings" },
  { id: 8, name: "Trust & Ethics", description: "Final declaration" },
]

export function CounselorApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<CounselorFormData>({
    fullName: "",
    profilePhoto: "",
    email: "",
    mobileNumber: "",
    dateOfBirth: "",
    gender: "",
    city: "",
    country: "",
    languagesSpoken: [],
    linkedinProfile: "",
    personalWebsite: "",
    currentJobTitle: "",
    currentOrganization: "",
    totalYearsExperience: 0,
    primaryCareerDomain: "",
    subSpecialization: "",
    highestEducationLevel: "",
    degreeName: "",
    university: "",
    yearOfGraduation: new Date().getFullYear(),
    studentTypes: [],
    careerAreasCanCounsel: [],
    topicsCanHelp: [],
    hasFormedMentored: false,
    numberOfPeopleGuided: 0,
    whereMentored: "",
    successStory: "",
    resumeUrl: "",
    degreeCertificateUrl: "",
    workExperienceProofUrl: "",
    counselingCertUrl: "",
    willingOnlineCounseling: true,
    preferredMode: [],
    availableHoursPerWeek: 0,
    preferredTimeSlots: [],
    timeZone: "",
    wantToCharge: false,
    pricePer30Min: 0,
    pricePer60Min: 0,
    openToRevenueSharing: false,
    whyJoinPlatform: "",
    whatMakesQualified: "",
    agreedToTerms: false,
    digitalSignature: "",
  })

  const updateFormData = (data: Partial<CounselorFormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async () => {
    if (!formData.agreedToTerms) {
      toast.error("Please agree to the terms and conditions")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/counselor-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Application submitted successfully!")
        // Redirect to success page or home
        window.location.href = "/"
      } else {
        const error = await response.json()
        toast.error(error.message || "Failed to submit application")
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicIdentity formData={formData} updateFormData={updateFormData} />
      case 2:
        return <ProfessionalBackground formData={formData} updateFormData={updateFormData} />
      case 3:
        return <CounselingExpertise formData={formData} updateFormData={updateFormData} />
      case 4:
        return <ExperienceProof formData={formData} updateFormData={updateFormData} />
      case 5:
        return <DocumentsVerification formData={formData} updateFormData={updateFormData} />
      case 6:
        return <PlatformReadiness formData={formData} updateFormData={updateFormData} />
      case 7:
        return <Commercials formData={formData} updateFormData={updateFormData} />
      case 8:
        return <TrustEthics formData={formData} updateFormData={updateFormData} />
      default:
        return null
    }
  }

  const progress = (currentStep / steps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-amber-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-2">
            Become a Career Counselor
          </h1>
          <p className="text-stone-600 text-lg">
            Join our platform and help students shape their future
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="p-6 mb-6 bg-white/80 backdrop-blur shadow-lg">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-stone-700">
                Step {currentStep} of {steps.length}
              </span>
              <span className="text-sm font-medium text-amber-600">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {/* Step Indicator */}
          <div className="flex justify-between items-center mt-4 overflow-x-auto pb-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex flex-col items-center min-w-[80px] ${
                  step.id === currentStep ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-1 transition-all ${
                    step.id < currentStep
                      ? 'bg-green-500 text-white'
                      : step.id === currentStep
                      ? 'bg-amber-500 text-white'
                      : 'bg-stone-200 text-stone-500'
                  }`}
                >
                  {step.id < currentStep ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <span className="text-xs text-center font-medium text-stone-700 hidden md:block">
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Form Content */}
        <Card className="p-8 bg-white/90 backdrop-blur shadow-xl mb-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-amber-900 mb-1">
              {steps[currentStep - 1].name}
            </h2>
            <p className="text-stone-600">{steps[currentStep - 1].description}</p>
          </div>
          
          {renderStep()}
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          {currentStep < steps.length ? (
            <Button
              onClick={handleNext}
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
              <CheckCircle2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
