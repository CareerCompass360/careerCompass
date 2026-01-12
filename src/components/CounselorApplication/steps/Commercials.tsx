"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CounselorFormData } from "../CounselorApplicationForm"
import { DollarSign } from "lucide-react"

interface CommercialsProps {
  formData: CounselorFormData
  updateFormData: (data: Partial<CounselorFormData>) => void
}

export function Commercials({ formData, updateFormData }: CommercialsProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-lg mb-3 block">
          Do you want to charge students? *
        </Label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => updateFormData({ wantToCharge: true })}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
              formData.wantToCharge
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-stone-300 hover:border-amber-400'
            }`}
          >
            Yes, I want to charge
          </button>
          <button
            type="button"
            onClick={() => updateFormData({ wantToCharge: false })}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
              !formData.wantToCharge
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-stone-300 hover:border-amber-400'
            }`}
          >
            No, I'll counsel for free
          </button>
        </div>
      </div>

      {formData.wantToCharge && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="pricePer30Min" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Price per 30 min session *
              </Label>
              <Input
                id="pricePer30Min"
                type="number"
                min="0"
                step="50"
                value={formData.pricePer30Min}
                onChange={(e) => updateFormData({ pricePer30Min: parseFloat(e.target.value) })}
                placeholder="₹500"
                required
              />
              <p className="text-xs text-stone-500 mt-1">
                Suggested range: ₹300 - ₹1000
              </p>
            </div>
            
            <div>
              <Label htmlFor="pricePer60Min" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Price per 60 min session *
              </Label>
              <Input
                id="pricePer60Min"
                type="number"
                min="0"
                step="50"
                value={formData.pricePer60Min}
                onChange={(e) => updateFormData({ pricePer60Min: parseFloat(e.target.value) })}
                placeholder="₹900"
                required
              />
              <p className="text-xs text-stone-500 mt-1">
                Suggested range: ₹500 - ₹2000
              </p>
            </div>
          </div>

          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800 text-sm">
              <strong>💡 Pricing Tip:</strong> Consider your experience level and market rates. 
              Students are more likely to book sessions that offer good value.
            </p>
          </div>
        </>
      )}

      {!formData.wantToCharge && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">
            <strong>🙏 Thank you!</strong> Your willingness to provide free guidance is invaluable. 
            You're making education accessible to everyone.
          </p>
        </div>
      )}

      <div>
        <Label className="text-lg mb-3 block">
          Are you open to revenue sharing with platform? *
        </Label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => updateFormData({ openToRevenueSharing: true })}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
              formData.openToRevenueSharing
                ? 'border-green-500 bg-green-50 text-green-700'
                : 'border-stone-300 hover:border-amber-400'
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => updateFormData({ openToRevenueSharing: false })}
            className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
              !formData.openToRevenueSharing
                ? 'border-red-500 bg-red-50 text-red-700'
                : 'border-stone-300 hover:border-amber-400'
            }`}
          >
            No
          </button>
        </div>
        <p className="text-sm text-stone-600 mt-2">
          Platform typically charges 10-20% commission for handling payments, marketing, and support.
        </p>
      </div>
    </div>
  )
}
