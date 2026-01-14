"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react"
import { BasicIdentity } from "./steps/BasicIdentity"
import { ProfessionalBackground } from "./steps/ProfessionalBackground"
import { CounselingExpertise } from "./steps/CounselingExpertise"
import { ExperienceProof } from "./steps/ExperienceProof"
import { DocumentsVerification } from "./steps/DocumentsVerification"
import { PlatformReadiness } from "./steps/PlatformReadiness"
import { Commercials } from "./steps/Commercials"
import { TrustEthics } from "./steps/TrustEthics"
import { OTPDialog } from "./OTPDialog"
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
  const [showOTPDialog, setShowOTPDialog] = useState(false)
  const [isOTPVerified, setIsOTPVerified] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
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

  const validateForm = (): { isValid: boolean; errors: string[] } => {
    const errors: string[] = []

    // Basic Identity validation
    if (!formData.fullName.trim()) errors.push("Full name is required")
    if (!formData.email.trim()) errors.push("Email is required")
    if (!formData.mobileNumber.trim()) errors.push("Mobile number is required")
    if (!formData.dateOfBirth) errors.push("Date of birth is required")
    if (!formData.gender) errors.push("Gender is required")
    if (!formData.city.trim()) errors.push("City is required")
    if (!formData.country.trim()) errors.push("Country is required")
    if (formData.languagesSpoken.length === 0) errors.push("At least one language is required")
    if (!formData.linkedinProfile.trim()) errors.push("LinkedIn profile is required")

    // Professional Background validation
    if (!formData.currentJobTitle.trim()) errors.push("Current job title is required")
    if (!formData.currentOrganization.trim()) errors.push("Current organization is required")
    if (formData.totalYearsExperience <= 0) errors.push("Years of experience must be greater than 0")
    if (!formData.primaryCareerDomain.trim()) errors.push("Primary career domain is required")
    if (!formData.subSpecialization.trim()) errors.push("Sub-specialization is required")
    if (!formData.highestEducationLevel.trim()) errors.push("Highest education level is required")
    if (!formData.degreeName.trim()) errors.push("Degree name is required")
    if (!formData.university.trim()) errors.push("University is required")
    if (!formData.yearOfGraduation) errors.push("Year of graduation is required")

    // Counseling Expertise validation
    if (formData.studentTypes.length === 0) errors.push("At least one student type is required")
    if (formData.careerAreasCanCounsel.length === 0) errors.push("At least one career area is required")
    if (formData.topicsCanHelp.length === 0) errors.push("At least one topic is required")

    // Experience Proof validation
    if (formData.hasFormedMentored && formData.numberOfPeopleGuided === 0) {
      errors.push("Number of people guided is required")
    }

    // Documents validation
    if (!formData.resumeUrl.trim()) errors.push("Resume is required")
    if (!formData.degreeCertificateUrl.trim()) errors.push("Degree certificate is required")
    if (!formData.workExperienceProofUrl.trim()) errors.push("Work experience proof is required")

    // Platform Readiness validation - CRITICAL CHECKS
    if (!formData.willingOnlineCounseling) {
      errors.push("❌ You must be willing to provide online counseling to join our platform")
    }
    if (formData.willingOnlineCounseling && formData.preferredMode.length === 0) {
      errors.push("At least one preferred mode is required")
    }
    if (formData.willingOnlineCounseling && formData.availableHoursPerWeek <= 0) {
      errors.push("Available hours per week must be greater than 0")
    }
    if (formData.willingOnlineCounseling && formData.preferredTimeSlots.length === 0) {
      errors.push("At least one time slot is required")
    }
    if (formData.willingOnlineCounseling && !formData.timeZone.trim()) {
      errors.push("Time zone is required")
    }

    // Commercials validation - CRITICAL CHECKS
    if (formData.wantToCharge && formData.pricePer30Min <= 0) {
      errors.push("Price for 30-minute session is required if you want to charge")
    }
    if (formData.wantToCharge && formData.pricePer60Min <= 0) {
      errors.push("Price for 60-minute session is required if you want to charge")
    }
    if (!formData.openToRevenueSharing) {
      errors.push("❌ You must be open to revenue sharing with the platform to join")
    }

    // Trust & Ethics validation
    if (!formData.whyJoinPlatform.trim()) errors.push("Reason for joining platform is required")
    if (!formData.whatMakesQualified.trim()) errors.push("Qualification statement is required")
    if (!formData.agreedToTerms) errors.push("You must agree to the terms and conditions")
    if (!formData.digitalSignature.trim()) errors.push("Digital signature is required")

    return {
      isValid: errors.length === 0,
      errors,
    }
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
    // Validate form
    const validation = validateForm()
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors)
      toast.error("Please fill all required fields correctly")
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    // Clear validation errors
    setValidationErrors([])

    // Show OTP dialog
    setShowOTPDialog(true)
    
    // Send OTP
    try {
      const response = await fetch("/api/counselor-application/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || "Failed to send OTP")
        setShowOTPDialog(false)
      } else {
        toast.success("OTP sent to your email")
      }
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.")
      setShowOTPDialog(false)
    }
  }

  const handleOTPVerified = async () => {
    setIsOTPVerified(true)
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/counselor-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Application submitted successfully!")
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

        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <Card className="p-4 mb-6 bg-red-50 border-red-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-900 mb-2">
                  Please fix the following errors:
                </h3>
                <ul className="space-y-1">
                  {validationErrors.map((error, index) => (
                    <li key={index} className="text-sm text-red-800">
                      • {error}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}

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

        {/* OTP Dialog */}
        <OTPDialog
          open={showOTPDialog}
          onOpenChange={setShowOTPDialog}
          email={formData.email}
          onVerified={handleOTPVerified}
        />
      </div>
    </div>
  )
}
