"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CounselorFormData } from "../CounselorApplicationForm"
import { Checkbox } from "@/components/ui/checkbox"
import { Shield, CheckCircle2 } from "lucide-react"

interface TrustEthicsProps {
  formData: CounselorFormData
  updateFormData: (data: Partial<CounselorFormData>) => void
}

export function TrustEthics({ formData, updateFormData }: TrustEthicsProps) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="whyJoinPlatform">
          Why do you want to be a Career Counselor on this platform? *
        </Label>
        <textarea
          id="whyJoinPlatform"
          value={formData.whyJoinPlatform}
          onChange={(e) => updateFormData({ whyJoinPlatform: e.target.value })}
          placeholder="Share your motivation and vision..."
          className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[120px]"
          maxLength={1000}
          required
        />
        <p className="text-xs text-stone-500 mt-1">
          {formData.whyJoinPlatform.length} / 1000 characters
        </p>
      </div>

      <div>
        <Label htmlFor="whatMakesQualified">
          What makes you qualified to guide students? *
        </Label>
        <textarea
          id="whatMakesQualified"
          value={formData.whatMakesQualified}
          onChange={(e) => updateFormData({ whatMakesQualified: e.target.value })}
          placeholder="Highlight your expertise, achievements, and unique value..."
          className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 min-h-[120px]"
          maxLength={1000}
          required
        />
        <p className="text-xs text-stone-500 mt-1">
          {formData.whatMakesQualified.length} / 1000 characters
        </p>
      </div>

      <div className="border-2 border-amber-200 rounded-lg p-6 bg-amber-50/50">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-6 w-6 text-amber-600" />
          <h3 className="text-lg font-bold text-amber-900">Code of Ethics</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-stone-700">
              <strong>Honest Guidance:</strong> I will not provide fake or misleading career advice
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-stone-700">
              <strong>Student First:</strong> I will prioritize students' best interests over personal gain
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-stone-700">
              <strong>Confidentiality:</strong> I will maintain strict confidentiality of all student interactions
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-stone-700">
              <strong>Platform Rules:</strong> I will follow all platform guidelines and policies
            </p>
          </div>
          
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-stone-700">
              <strong>Professionalism:</strong> I will maintain professional conduct in all interactions
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center space-x-3 p-4 bg-white rounded-lg border-2 border-amber-300">
          <Checkbox
            id="agreedToTerms"
            checked={formData.agreedToTerms}
            onCheckedChange={(checked) => 
              updateFormData({ agreedToTerms: checked as boolean })
            }
            className="h-5 w-5"
          />
          <label
            htmlFor="agreedToTerms"
            className="text-sm font-medium leading-tight cursor-pointer"
          >
            I agree to all the terms mentioned above and confirm that I will uphold these ethical standards *
          </label>
        </div>
      </div>

      <div>
        <Label htmlFor="digitalSignature">
          Digital Signature (Full Name) *
        </Label>
        <Input
          id="digitalSignature"
          value={formData.digitalSignature}
          onChange={(e) => updateFormData({ digitalSignature: e.target.value })}
          placeholder="Type your full name as signature"
          required
          className="font-serif text-lg"
        />
        <p className="text-xs text-stone-500 mt-1">
          By typing your name, you are digitally signing this application
        </p>
      </div>

      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <h4 className="font-semibold text-green-800 mb-2">📋 Final Checklist</h4>
        <ul className="space-y-1 text-sm text-green-700">
          <li>✓ All information provided is accurate and truthful</li>
          <li>✓ Documents uploaded are genuine and verifiable</li>
          <li>✓ I understand this is a professional commitment</li>
          <li>✓ I'm ready to make a positive impact on students' lives</li>
        </ul>
      </div>

      <div className="text-center p-6 bg-gradient-to-r from-amber-100 to-amber-50 rounded-lg">
        <p className="text-lg font-semibold text-amber-900 mb-2">
          🎉 You're almost there!
        </p>
        <p className="text-stone-700">
          Click "Submit Application" below to complete your counselor application.
          We'll review your application within 3-5 business days.
        </p>
      </div>
    </div>
  )
}
