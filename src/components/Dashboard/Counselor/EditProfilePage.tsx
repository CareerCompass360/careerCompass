"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Lock, 
  Save, 
  AlertCircle, 
  Loader2,
  FileText,
  DollarSign,
  Globe,
  Briefcase
} from "lucide-react"

interface CounselorData {
  fullName: string
  email: string
  mobileNumber: string
  dateOfBirth: string
  profilePhoto?: string
  city: string
  country: string
  languagesSpoken: string[]
  linkedinProfile: string
  personalWebsite?: string
  currentJobTitle: string
  currentOrganization: string
  totalYearsExperience: number
  primaryCareerDomain: string
  subSpecialization: string
  topicsCanHelp: string[]
  studentTypes: string[]
  careerAreasCanCounsel: string[]
  availableHoursPerWeek: number
  preferredTimeSlots: string[]
  timeZone: string
  wantToCharge: boolean
  pricePer30Min?: number
  pricePer60Min?: number
  whyJoinPlatform: string
  whatMakesQualified: string
}

interface EditProfilePageProps {
  counselorData: CounselorData
  onSave: (data: Partial<CounselorData>) => Promise<void>
  onRequestEdit: (fields: string[], reason: string) => Promise<void>
}

export function EditProfilePage({ counselorData, onSave, onRequestEdit }: EditProfilePageProps) {
  const [formData, setFormData] = useState(counselorData)
  const [isSaving, setIsSaving] = useState(false)
  const [showRequestModal, setShowRequestModal] = useState(false)
  const [requestReason, setRequestReason] = useState("")
  const [requestFields, setRequestFields] = useState<string[]>([])

  // Fields that cannot be edited without admin approval
  const restrictedFields = ["fullName", "email", "mobileNumber", "dateOfBirth"]

  const handleChange = (field: keyof CounselorData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleArrayChange = (field: keyof CounselorData, value: string) => {
    const array = value.split(",").map((item) => item.trim()).filter(Boolean)
    setFormData((prev) => ({ ...prev, [field]: array }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // Only save non-restricted fields that have changed
      const changedData: any = {}
      Object.keys(formData).forEach((key) => {
        const field = key as keyof CounselorData
        if (!restrictedFields.includes(field) && formData[field] !== counselorData[field]) {
          changedData[field] = formData[field]
        }
      })
      await onSave(changedData)
    } finally {
      setIsSaving(false)
    }
  }

  const handleRequestEditPermission = (field: string) => {
    setRequestFields([field])
    setShowRequestModal(true)
  }

  const submitEditRequest = async () => {
    if (!requestReason.trim()) return
    setIsSaving(true)
    try {
      await onRequestEdit(requestFields, requestReason)
      setShowRequestModal(false)
      setRequestReason("")
      setRequestFields([])
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-amber-900">Edit Profile</h1>
        <p className="text-amber-700 mt-1">Update your counselor profile information</p>
      </div>

      {/* Restricted Fields Notice */}
      <Card className="border-amber-200 bg-amber-50/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-1">Restricted Fields</h3>
              <p className="text-sm text-amber-700">
                Name, Email, Phone, and Date of Birth cannot be edited directly. Request admin permission to modify
                these fields.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Basic Identity (Restricted) */}
      <Card className="border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-amber-600" />
            Basic Identity (Restricted)
          </CardTitle>
          <CardDescription>These fields require admin approval to edit</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-amber-900">Full Name</Label>
              <div className="flex gap-2">
                <Input value={formData.fullName} disabled className="bg-gray-50" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRequestEditPermission("fullName")}
                  className="border-amber-300 text-amber-700"
                >
                  Request Edit
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-amber-900">Email</Label>
              <div className="flex gap-2">
                <Input value={formData.email} disabled className="bg-gray-50" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRequestEditPermission("email")}
                  className="border-amber-300 text-amber-700"
                >
                  Request Edit
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-amber-900">Mobile Number</Label>
              <div className="flex gap-2">
                <Input value={formData.mobileNumber} disabled className="bg-gray-50" />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRequestEditPermission("mobileNumber")}
                  className="border-amber-300 text-amber-700"
                >
                  Request Edit
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-amber-900">Date of Birth</Label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={new Date(formData.dateOfBirth).toISOString().split("T")[0]}
                  disabled
                  className="bg-gray-50"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRequestEditPermission("dateOfBirth")}
                  className="border-amber-300 text-amber-700"
                >
                  Request Edit
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location & Languages */}
      <Card className="border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-amber-600" />
            Location & Languages
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-amber-900">City</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="border-amber-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="text-amber-900">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => handleChange("country", e.target.value)}
                className="border-amber-200"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="languages" className="text-amber-900">Languages Spoken (comma-separated)</Label>
              <Input
                id="languages"
                value={formData.languagesSpoken.join(", ")}
                onChange={(e) => handleArrayChange("languagesSpoken", e.target.value)}
                placeholder="English, Hindi, Spanish"
                className="border-amber-200"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Background */}
      <Card className="border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-amber-600" />
            Professional Background
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-amber-900">Current Job Title</Label>
              <Input
                id="jobTitle"
                value={formData.currentJobTitle}
                onChange={(e) => handleChange("currentJobTitle", e.target.value)}
                className="border-amber-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="organization" className="text-amber-900">Current Organization</Label>
              <Input
                id="organization"
                value={formData.currentOrganization}
                onChange={(e) => handleChange("currentOrganization", e.target.value)}
                className="border-amber-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience" className="text-amber-900">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                value={formData.totalYearsExperience}
                onChange={(e) => handleChange("totalYearsExperience", parseInt(e.target.value))}
                className="border-amber-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="domain" className="text-amber-900">Primary Career Domain</Label>
              <Input
                id="domain"
                value={formData.primaryCareerDomain}
                onChange={(e) => handleChange("primaryCareerDomain", e.target.value)}
                className="border-amber-200"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card className="border-amber-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-amber-600" />
            Pricing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              id="wantToCharge"
              checked={formData.wantToCharge}
              onChange={(e) => handleChange("wantToCharge", e.target.checked)}
              className="w-4 h-4 text-amber-600 border-amber-300 rounded focus:ring-amber-500"
            />
            <Label htmlFor="wantToCharge" className="text-amber-900">I want to charge for sessions</Label>
          </div>

          {formData.wantToCharge && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price30" className="text-amber-900">Price per 30 min (₹)</Label>
                <Input
                  id="price30"
                  type="number"
                  value={formData.pricePer30Min || ""}
                  onChange={(e) => handleChange("pricePer30Min", parseFloat(e.target.value))}
                  className="border-amber-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price60" className="text-amber-900">Price per 60 min (₹)</Label>
                <Input
                  id="price60"
                  type="number"
                  value={formData.pricePer60Min || ""}
                  onChange={(e) => handleChange("pricePer60Min", parseFloat(e.target.value))}
                  className="border-amber-200"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => setFormData(counselorData)}
          className="border-amber-300 text-amber-700"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>

      {/* Request Edit Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Request Edit Permission</CardTitle>
              <CardDescription>
                Provide a reason for why you need to edit {requestFields.join(", ")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <textarea
                value={requestReason}
                onChange={(e) => setRequestReason(e.target.value)}
                placeholder="Explain why you need to change this field..."
                className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none"
                rows={4}
              />
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowRequestModal(false)
                  setRequestReason("")
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={submitEditRequest}
                disabled={!requestReason.trim() || isSaving}
                className="flex-1 bg-amber-600 hover:bg-amber-700"
              >
                {isSaving ? "Submitting..." : "Submit Request"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
