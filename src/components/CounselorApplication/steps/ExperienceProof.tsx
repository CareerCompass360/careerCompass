"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CounselorFormData } from "../CounselorApplicationForm"

interface ExperienceProofProps {
  formData: CounselorFormData
  updateFormData: (data: Partial<CounselorFormData>) => void
}

export function ExperienceProof({ formData, updateFormData }: ExperienceProofProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-lg mb-3 block">
          Have you ever formally mentored or counseled someone? *
        </Label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => updateFormData({ hasFormedMentored: true })}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
              formData.hasFormedMentored
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-stone-300 hover:border-amber-400'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => updateFormData({ hasFormedMentored: false })}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
              !formData.hasFormedMentored
                ? 'border-red-500 bg-red-50 text-red-700'
                : 'border-stone-300 hover:border-amber-400'
            }`}
          >
            No
          </button>
        </div>
      </div>

      {formData.hasFormedMentored && (
        <>
          <div>
            <Label htmlFor="numberOfPeopleGuided">
              Number of people you have guided *
            </Label>
            <Input
              id="numberOfPeopleGuided"
              type="number"
              min="0"
              value={formData.numberOfPeopleGuided}
              onChange={(e) => updateFormData({ numberOfPeopleGuided: parseInt(e.target.value) })}
              placeholder="e.g., 15"
              required
            />
          </div>

          <div>
            <Label htmlFor="whereMentored">Where did you do it? *</Label>
            <select
              id="whereMentored"
              value={formData.whereMentored}
              onChange={(e) => updateFormData({ whereMentored: e.target.value })}
              className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            >
              <option value="">Select where</option>
              <option value="company">Company / Corporate</option>
              <option value="college">College / University</option>
              <option value="online">Online Platform</option>
              <option value="ngo">NGO / Community Service</option>
              <option value="private">Private Practice</option>
              <option value="informal">Informal / Personal Network</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <Label htmlFor="successStory">
              Your biggest success story *
              <span className="text-sm text-stone-500 block mt-1">
                Tell us about one student you helped & how (max 500 words)
              </span>
            </Label>
            <textarea
              id="successStory"
              value={formData.successStory}
              onChange={(e) => updateFormData({ successStory: e.target.value })}
              placeholder="Share a specific example of how you helped someone achieve their goals..."
              className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[150px]"
              maxLength={2000}
              required
            />
            <p className="text-xs text-stone-500 mt-1">
              {formData.successStory.length} / 2000 characters
            </p>
          </div>
        </>
      )}

      {!formData.hasFormedMentored && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-800">
            <strong>That's okay!</strong> We value your professional experience and expertise. 
            Please provide detailed information in the next steps to showcase your qualifications.
          </p>
        </div>
      )}
    </div>
  )
}
