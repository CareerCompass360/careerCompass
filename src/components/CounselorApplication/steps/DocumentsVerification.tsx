"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CounselorFormData } from "../CounselorApplicationForm"
import { Upload, FileText } from "lucide-react"

interface DocumentsVerificationProps {
  formData: CounselorFormData
  updateFormData: (data: Partial<CounselorFormData>) => void
}

export function DocumentsVerification({ formData, updateFormData }: DocumentsVerificationProps) {
  return (
    <div className="space-y-6">
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-800 text-sm">
          <strong>Note:</strong> Please upload your documents to a cloud storage service (Google Drive, Dropbox, etc.) 
          and share the public links here. Make sure the links are accessible.
        </p>
      </div>

      <div>
        <Label htmlFor="resumeUrl" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Resume / CV *
        </Label>
        <Input
          id="resumeUrl"
          type="url"
          value={formData.resumeUrl}
          onChange={(e) => updateFormData({ resumeUrl: e.target.value })}
          placeholder="https://drive.google.com/file/d/..."
          required
        />
        <p className="text-xs text-stone-500 mt-1">
          Upload your latest resume showing your professional experience
        </p>
      </div>

      <div>
        <Label htmlFor="degreeCertificateUrl" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Degree Certificate *
        </Label>
        <Input
          id="degreeCertificateUrl"
          type="url"
          value={formData.degreeCertificateUrl}
          onChange={(e) => updateFormData({ degreeCertificateUrl: e.target.value })}
          placeholder="https://drive.google.com/file/d/..."
          required
        />
        <p className="text-xs text-stone-500 mt-1">
          Your highest education degree certificate
        </p>
      </div>

      <div>
        <Label htmlFor="workExperienceProofUrl" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Work Experience Proof *
        </Label>
        <Input
          id="workExperienceProofUrl"
          type="url"
          value={formData.workExperienceProofUrl}
          onChange={(e) => updateFormData({ workExperienceProofUrl: e.target.value })}
          placeholder="https://drive.google.com/file/d/..."
          required
        />
        <p className="text-xs text-stone-500 mt-1">
          Offer letter, LinkedIn profile screenshot, Company ID, or experience letter
        </p>
      </div>

      <div>
        <Label htmlFor="counselingCertUrl" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Counseling Certification (Optional)
        </Label>
        <Input
          id="counselingCertUrl"
          type="url"
          value={formData.counselingCertUrl}
          onChange={(e) => updateFormData({ counselingCertUrl: e.target.value })}
          placeholder="https://drive.google.com/file/d/..."
        />
        <p className="text-xs text-stone-500 mt-1">
          Any formal counseling or mentorship certification (if available)
        </p>
      </div>

      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h4 className="font-semibold text-green-800 mb-2">How to share document links:</h4>
        <ol className="list-decimal list-inside space-y-1 text-sm text-green-700">
          <li>Upload your document to Google Drive or Dropbox</li>
          <li>Right-click on the file and select "Get link" or "Share"</li>
          <li>Change access to "Anyone with the link can view"</li>
          <li>Copy and paste the link here</li>
        </ol>
      </div>
    </div>
  )
}
