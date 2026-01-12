"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CounselorFormData } from "../CounselorApplicationForm"
import { Checkbox } from "@/components/ui/checkbox"

interface PlatformReadinessProps {
  formData: CounselorFormData
  updateFormData: (data: Partial<CounselorFormData>) => void
}

const modeOptions = ["Video Call", "Audio Call", "Chat/Text"]
const timeSlotOptions = [
  "Early Morning (6 AM - 9 AM)",
  "Morning (9 AM - 12 PM)",
  "Afternoon (12 PM - 3 PM)",
  "Evening (3 PM - 6 PM)",
  "Night (6 PM - 9 PM)",
  "Late Night (9 PM - 12 AM)"
]

export function PlatformReadiness({ formData, updateFormData }: PlatformReadinessProps) {
  const toggleArrayItem = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter(i => i !== item)
    }
    return [...array, item]
  }

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-lg mb-3 block">
          Are you willing to provide online counseling? *
        </Label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => updateFormData({ willingOnlineCounseling: true })}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
              formData.willingOnlineCounseling
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-stone-300 hover:border-amber-400'
            }`}
          >
            Yes, I'm ready!
          </button>
          <button
            type="button"
            onClick={() => updateFormData({ willingOnlineCounseling: false })}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
              !formData.willingOnlineCounseling
                ? 'border-red-500 bg-red-50 text-red-700'
                : 'border-stone-300 hover:border-amber-400'
            }`}
          >
            No
          </button>
        </div>
      </div>

      {formData.willingOnlineCounseling && (
        <>
          <div>
            <Label className="text-lg mb-3 block">Preferred Mode *</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {modeOptions.map((mode) => (
                <div key={mode} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-amber-50 transition-colors">
                  <Checkbox
                    id={`mode-${mode}`}
                    checked={formData.preferredMode.includes(mode)}
                    onCheckedChange={() => 
                      updateFormData({ 
                        preferredMode: toggleArrayItem(formData.preferredMode, mode) 
                      })
                    }
                  />
                  <label
                    htmlFor={`mode-${mode}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {mode}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="availableHoursPerWeek">Available Hours per Week *</Label>
              <Input
                id="availableHoursPerWeek"
                type="number"
                min="1"
                max="168"
                value={formData.availableHoursPerWeek}
                onChange={(e) => updateFormData({ availableHoursPerWeek: parseInt(e.target.value) })}
                placeholder="e.g., 10"
                required
              />
              <p className="text-xs text-stone-500 mt-1">
                How many hours per week can you dedicate to counseling?
              </p>
            </div>
            
            <div>
              <Label htmlFor="timeZone">Time Zone *</Label>
              <select
                id="timeZone"
                value={formData.timeZone}
                onChange={(e) => updateFormData({ timeZone: e.target.value })}
                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                required
              >
                <option value="">Select timezone</option>
                <option value="IST">IST (India)</option>
                <option value="PST">PST (US West)</option>
                <option value="EST">EST (US East)</option>
                <option value="GMT">GMT (UK)</option>
                <option value="CET">CET (Europe)</option>
                <option value="AEST">AEST (Australia)</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <Label className="text-lg mb-3 block">Preferred Time Slots *</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {timeSlotOptions.map((slot) => (
                <div key={slot} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-amber-50 transition-colors">
                  <Checkbox
                    id={`slot-${slot}`}
                    checked={formData.preferredTimeSlots.includes(slot)}
                    onCheckedChange={() => 
                      updateFormData({ 
                        preferredTimeSlots: toggleArrayItem(formData.preferredTimeSlots, slot) 
                      })
                    }
                  />
                  <label
                    htmlFor={`slot-${slot}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    {slot}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {!formData.willingOnlineCounseling && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">
            <strong>Note:</strong> Our platform currently operates online only. 
            Please consider if you can provide online counseling to proceed with the application.
          </p>
        </div>
      )}
    </div>
  )
}
