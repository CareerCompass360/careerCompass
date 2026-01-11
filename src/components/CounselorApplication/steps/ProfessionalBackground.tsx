"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CounselorFormData } from "../CounselorApplicationForm"

interface ProfessionalBackgroundProps {
  formData: CounselorFormData
  updateFormData: (data: Partial<CounselorFormData>) => void
}

export function ProfessionalBackground({ formData, updateFormData }: ProfessionalBackgroundProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="currentJobTitle">Current Job Title *</Label>
          <Input
            id="currentJobTitle"
            value={formData.currentJobTitle}
            onChange={(e) => updateFormData({ currentJobTitle: e.target.value })}
            placeholder="e.g., Senior Software Engineer"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="currentOrganization">Current Organization *</Label>
          <Input
            id="currentOrganization"
            value={formData.currentOrganization}
            onChange={(e) => updateFormData({ currentOrganization: e.target.value })}
            placeholder="Company name"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="totalYearsExperience">Total Years of Work Experience *</Label>
          <Input
            id="totalYearsExperience"
            type="number"
            min="0"
            value={formData.totalYearsExperience}
            onChange={(e) => updateFormData({ totalYearsExperience: parseInt(e.target.value) })}
            placeholder="5"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="primaryCareerDomain">Primary Career Domain *</Label>
          <select
            id="primaryCareerDomain"
            value={formData.primaryCareerDomain}
            onChange={(e) => updateFormData({ primaryCareerDomain: e.target.value })}
            className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          >
            <option value="">Select domain</option>
            <option value="engineering">Engineering</option>
            <option value="medical">Medical</option>
            <option value="law">Law</option>
            <option value="mba">MBA</option>
            <option value="upsc">UPSC</option>
            <option value="design">Design</option>
            <option value="data-science">Data Science</option>
            <option value="finance">Finance</option>
            <option value="arts">Arts & Humanities</option>
            <option value="commerce">Commerce</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="subSpecialization">Sub-Specialization *</Label>
        <Input
          id="subSpecialization"
          value={formData.subSpecialization}
          onChange={(e) => updateFormData({ subSpecialization: e.target.value })}
          placeholder="e.g., Frontend Development, Cardiology, Corporate Law"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="highestEducationLevel">Highest Education Level *</Label>
          <select
            id="highestEducationLevel"
            value={formData.highestEducationLevel}
            onChange={(e) => updateFormData({ highestEducationLevel: e.target.value })}
            className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          >
            <option value="">Select level</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="master">Master's Degree</option>
            <option value="phd">PhD</option>
            <option value="professional">Professional Degree (MD, JD, CA, etc.)</option>
            <option value="diploma">Diploma / Certificate</option>
          </select>
        </div>
        
        <div>
          <Label htmlFor="degreeName">Degree Name *</Label>
          <Input
            id="degreeName"
            value={formData.degreeName}
            onChange={(e) => updateFormData({ degreeName: e.target.value })}
            placeholder="e.g., B.Tech in Computer Science"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="university">University / College *</Label>
          <Input
            id="university"
            value={formData.university}
            onChange={(e) => updateFormData({ university: e.target.value })}
            placeholder="Institution name"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="yearOfGraduation">Year of Graduation *</Label>
          <Input
            id="yearOfGraduation"
            type="number"
            min="1950"
            max={new Date().getFullYear()}
            value={formData.yearOfGraduation}
            onChange={(e) => updateFormData({ yearOfGraduation: parseInt(e.target.value) })}
            placeholder="2020"
            required
          />
        </div>
      </div>
    </div>
  )
}
