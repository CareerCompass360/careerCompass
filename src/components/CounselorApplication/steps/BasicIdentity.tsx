"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CounselorFormData } from "../CounselorApplicationForm"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useState } from "react"

interface BasicIdentityProps {
  formData: CounselorFormData
  updateFormData: (data: Partial<CounselorFormData>) => void
}

export function BasicIdentity({ formData, updateFormData }: BasicIdentityProps) {
  const [languageInput, setLanguageInput] = useState("")

  const addLanguage = () => {
    if (languageInput.trim() && !formData.languagesSpoken.includes(languageInput.trim())) {
      updateFormData({
        languagesSpoken: [...formData.languagesSpoken, languageInput.trim()]
      })
      setLanguageInput("")
    }
  }

  const removeLanguage = (lang: string) => {
    updateFormData({
      languagesSpoken: formData.languagesSpoken.filter(l => l !== lang)
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="your.email@example.com"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="mobileNumber">Mobile Number (WhatsApp) *</Label>
          <Input
            id="mobileNumber"
            type="tel"
            value={formData.mobileNumber}
            onChange={(e) => updateFormData({ mobileNumber: e.target.value })}
            placeholder="+91 1234567890"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="dateOfBirth">Date of Birth *</Label>
          <Input
            id="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="gender">Gender (Optional)</Label>
          <select
            id="gender"
            value={formData.gender}
            onChange={(e) => updateFormData({ gender: e.target.value })}
            className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>
        
        <div>
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => updateFormData({ city: e.target.value })}
            placeholder="Your city"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="country">Country *</Label>
          <Input
            id="country"
            value={formData.country}
            onChange={(e) => updateFormData({ country: e.target.value })}
            placeholder="Your country"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="linkedinProfile">LinkedIn Profile *</Label>
          <Input
            id="linkedinProfile"
            type="url"
            value={formData.linkedinProfile}
            onChange={(e) => updateFormData({ linkedinProfile: e.target.value })}
            placeholder="https://linkedin.com/in/yourprofile"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="personalWebsite">Personal Website / Portfolio (Optional)</Label>
        <Input
          id="personalWebsite"
          type="url"
          value={formData.personalWebsite}
          onChange={(e) => updateFormData({ personalWebsite: e.target.value })}
          placeholder="https://yourwebsite.com"
        />
      </div>

      <div>
        <Label>Languages Spoken *</Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={languageInput}
            onChange={(e) => setLanguageInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLanguage())}
            placeholder="Type a language and press Enter"
          />
          <button
            onClick={addLanguage}
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.languagesSpoken.map((lang) => (
            <Badge key={lang} variant="secondary" className="flex items-center gap-1">
              {lang}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => removeLanguage(lang)}
              />
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="profilePhoto">Profile Photo URL (Optional)</Label>
        <Input
          id="profilePhoto"
          type="url"
          value={formData.profilePhoto}
          onChange={(e) => updateFormData({ profilePhoto: e.target.value })}
          placeholder="https://example.com/your-photo.jpg"
        />
        <p className="text-xs text-stone-500 mt-1">Upload your photo to a service like Imgur or use a direct link</p>
      </div>
    </div>
  )
}
