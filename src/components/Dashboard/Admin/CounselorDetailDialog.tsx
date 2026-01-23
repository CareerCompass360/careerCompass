"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Trash2,
  ExternalLink,
  User,
  Briefcase,
  GraduationCap,
  Calendar,
  Globe,
  FileText,
  Clock,
  DollarSign,
  Award,
  Target,
  X,
  CheckCircle,
  XCircle,
  RotateCcw,
  Heart,
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface CounselorDetailDialogProps {
  counselor: any
  open: boolean
  onClose: () => void
  onStatusUpdate: () => void
}

export function CounselorDetailDialog({ counselor, open, onClose, onStatusUpdate }: CounselorDetailDialogProps) {
  const [loading, setLoading] = useState(false)

  const handleAction = async (action: string) => {
    setLoading(true)
    try {
      const response = await fetch(`/api/counselor-application/${counselor.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      })

      if (response.ok) {
        toast.success(`Counselor ${action}ed successfully!`)
        onStatusUpdate()
        onClose()
      } else {
        toast.error("Failed to update counselor status")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to permanently delete this counselor?")) return

    setLoading(true)
    try {
      const response = await fetch(`/api/counselor-application/${counselor.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Counselor deleted permanently")
        onStatusUpdate()
        onClose()
      } else {
        toast.error("Failed to delete counselor")
      }
    } catch (error) {
      toast.error("An error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (!counselor) return null

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-slate-900 text-white"
      case "pending":
        return "bg-slate-500 text-white"
      case "rejected":
        return "bg-slate-700 text-white"
      case "removed":
        return "bg-slate-600 text-white"
      default:
        return "bg-slate-300 text-slate-900"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="max-w-5xl! max-h-[95vh] overflow-hidden flex flex-col bg-white p-0! rounded-2xl shadow-2xl">
        {/* Header Section */}
        <div className="shrink-0 border-b border-slate-100 px-8 py-7 flex items-start justify-between bg-linear-to-r from-slate-50 to-white">
          <div className="flex-1">
            <DialogTitle className="text-3xl font-bold text-slate-950 mb-3">{counselor.fullName}</DialogTitle>
            <div className="flex items-center gap-3 flex-wrap">
              <Badge
                className={`${getStatusStyle(counselor.status)} font-semibold px-3 py-1.5 text-xs uppercase tracking-wide`}
              >
                {counselor.status}
              </Badge>
              <span className="text-sm text-slate-500 font-medium flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-slate-400" />
                Applied{" "}
                {new Date(counselor.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors duration-200 hover:bg-slate-100 p-2 rounded-lg"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Main Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8">
          {/* Profile & Contact Section */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {counselor.profilePhoto && (
              <div className="shrink-0">
                <img
                  src={counselor.profilePhoto || "/placeholder.svg"}
                  alt={counselor.fullName}
                  className="w-40 h-40 rounded-xl object-cover border border-slate-200 shadow-md"
                />
              </div>
            )}

            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Email */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:border-slate-200 transition-all duration-200">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email</div>
                  <a
                    href={`mailto:${counselor.email}`}
                    className="text-sm text-slate-900 hover:text-slate-700 transition-colors duration-200 font-medium break-all"
                  >
                    {counselor.email}
                  </a>
                </div>

                {/* Phone */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:border-slate-200 transition-all duration-200">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone</div>
                  <div className="text-sm text-slate-900 font-medium">{counselor.mobileNumber}</div>
                </div>

                {/* Location */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:border-slate-200 transition-all duration-200">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Location</div>
                  <div className="text-sm text-slate-900 font-medium">
                    {counselor.city}, {counselor.country}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <section>
            <h3 className="text-lg font-bold text-slate-950 mb-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <User className="h-5 w-5 text-slate-700" />
              </div>
              Personal Information
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors duration-200">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Date of Birth</div>
                <div className="text-sm text-slate-900 font-medium">
                  {new Date(counselor.dateOfBirth).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors duration-200">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Gender</div>
                <div className="text-sm text-slate-900 font-medium">{counselor.gender || "—"}</div>
              </div>
            </div>

            {/* Languages */}
            <div className="mt-5">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Languages Spoken</div>
              <div className="flex flex-wrap gap-2">
                {counselor.languagesSpoken?.map((lang: string) => (
                  <span
                    key={lang}
                    className="bg-slate-900 text-white text-xs px-3.5 py-2 rounded-full font-medium hover:bg-slate-800 transition-colors duration-200 cursor-default"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* External Links */}
            <div className="mt-6 space-y-2">
              {counselor.linkedinProfile && (
                <a
                  href={counselor.linkedinProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200 bg-slate-50 px-4 py-2.5 rounded-lg hover:bg-slate-100 w-full md:w-auto"
                >
                  <Globe className="h-4 w-4" />
                  LinkedIn Profile
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              )}
              {counselor.personalWebsite && (
                <a
                  href={counselor.personalWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200 bg-slate-50 px-4 py-2.5 rounded-lg hover:bg-slate-100 w-full md:w-auto"
                >
                  <Globe className="h-4 w-4" />
                  Personal Website
                  <ExternalLink className="h-3 w-3 ml-auto" />
                </a>
              )}
            </div>
          </section>

          {/* Professional Background */}
          <section>
            <h3 className="text-lg font-bold text-slate-950 mb-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-slate-700" />
              </div>
              Professional Background
            </h3>

            {/* Current Role Card */}
            <div className="bg-linear-to-br from-slate-900 to-slate-800 text-white p-7 rounded-xl mb-5 shadow-sm">
              <div className="text-xl font-bold mb-1.5">{counselor.currentJobTitle}</div>
              <div className="text-slate-300 mb-5 font-medium">{counselor.currentOrganization}</div>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white text-slate-900 text-xs px-3.5 py-1.5 rounded-full font-bold">
                  {counselor.totalYearsExperience}+ years
                </span>
                <span className="border border-slate-400 text-white text-xs px-3.5 py-1.5 rounded-full font-medium">
                  {counselor.primaryCareerDomain}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors duration-200">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Specialization</div>
                <div className="text-sm text-slate-900 font-medium">{counselor.subSpecialization}</div>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors duration-200">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Education</div>
                <div className="text-sm text-slate-900 font-medium">{counselor.highestEducationLevel}</div>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors duration-200">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Degree</div>
                <div className="text-sm text-slate-900 font-medium">{counselor.degreeName}</div>
              </div>
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors duration-200">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Graduated</div>
                <div className="text-sm text-slate-900 font-medium">{counselor.yearOfGraduation}</div>
              </div>
              <div className="md:col-span-4 bg-slate-50 p-5 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors duration-200">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">University</div>
                <div className="text-sm text-slate-900 font-medium">{counselor.university}</div>
              </div>
            </div>
          </section>

          {/* Counseling Expertise */}
          <section>
            <h3 className="text-lg font-bold text-slate-950 mb-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <Target className="h-5 w-5 text-slate-700" />
              </div>
              Counseling Expertise
            </h3>

            <div className="space-y-5">
              {/* Student Types */}
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Student Types</div>
                <div className="flex flex-wrap gap-2">
                  {counselor.studentTypes?.map((type: string) => (
                    <span
                      key={type}
                      className="bg-slate-200 text-slate-900 text-xs px-3.5 py-2 rounded-full font-medium"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Career Areas */}
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Career Areas</div>
                <div className="flex flex-wrap gap-2">
                  {counselor.careerAreasCanCounsel?.map((area: string) => (
                    <span
                      key={area}
                      className="bg-slate-200 text-slate-900 text-xs px-3.5 py-2 rounded-full font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              {/* Topics */}
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                  Topics of Expertise
                </div>
                <div className="flex flex-wrap gap-2">
                  {counselor.topicsCanHelp?.map((topic: string) => (
                    <span
                      key={topic}
                      className="bg-slate-200 text-slate-900 text-xs px-3.5 py-2 rounded-full font-medium"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Mentoring Experience */}
          {counselor.hasFormedMentored && (
            <section>
              <h3 className="text-lg font-bold text-slate-950 mb-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Award className="h-5 w-5 text-slate-700" />
                </div>
                Mentoring Experience
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="bg-linear-to-br from-slate-900 to-slate-800 text-white p-6 rounded-xl text-center">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">People Guided</div>
                  <div className="text-4xl font-bold">{counselor.numberOfPeopleGuided}+</div>
                </div>
                <div className="bg-linear-to-br from-slate-900 to-slate-800 text-white p-6 rounded-xl text-center">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Platform</div>
                  <div className="text-xl font-bold">{counselor.whereMentored}</div>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Success Story</div>
                <p className="text-sm text-slate-700 leading-relaxed italic">"{counselor.successStory}"</p>
              </div>
            </section>
          )}

          {/* Documents & Certificates */}
          <section>
            <h3 className="text-lg font-bold text-slate-950 mb-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <FileText className="h-5 w-5 text-slate-700" />
              </div>
              Documents & Certificates
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => window.open(counselor.resumeUrl, "_blank")}
                className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-all duration-200 text-slate-900 group cursor-pointer"
              >
                <FileText className="h-8 w-8 text-slate-600 group-hover:text-slate-900 transition-colors duration-200" />
                <span className="text-xs font-bold text-center">Resume / CV</span>
              </button>

              <button
                onClick={() => window.open(counselor.degreeCertificateUrl, "_blank")}
                className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-all duration-200 text-slate-900 group cursor-pointer"
              >
                <GraduationCap className="h-8 w-8 text-slate-600 group-hover:text-slate-900 transition-colors duration-200" />
                <span className="text-xs font-bold text-center">Degree Certificate</span>
              </button>

              <button
                onClick={() => window.open(counselor.workExperienceProofUrl, "_blank")}
                className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-all duration-200 text-slate-900 group cursor-pointer"
              >
                <Briefcase className="h-8 w-8 text-slate-600 group-hover:text-slate-900 transition-colors duration-200" />
                <span className="text-xs font-bold text-center">Work Experience</span>
              </button>

              {counselor.counselingCertUrl && (
                <button
                  onClick={() => window.open(counselor.counselingCertUrl, "_blank")}
                  className="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300 transition-all duration-200 text-slate-900 group cursor-pointer"
                >
                  <Award className="h-8 w-8 text-slate-600 group-hover:text-slate-900 transition-colors duration-200" />
                  <span className="text-xs font-bold text-center">Counseling Cert</span>
                </button>
              )}
            </div>
          </section>

          {/* Platform Readiness */}
          <section>
            <h3 className="text-lg font-bold text-slate-950 mb-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-slate-700" />
              </div>
              Platform Readiness & Availability
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Online Counseling</div>
                <Badge className={counselor.willingOnlineCounseling ? "bg-slate-900 text-white" : "bg-slate-400 text-white"}>
                  {counselor.willingOnlineCounseling ? "✓ Willing" : "✗ Not Willing"}
                </Badge>
              </div>
              
              {counselor.availableHoursPerWeek && (
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-center">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Hours Per Week</div>
                  <div className="text-3xl font-bold text-slate-900">{counselor.availableHoursPerWeek}h</div>
                </div>
              )}
              
              {counselor.timeZone && (
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Time Zone</div>
                  <div className="text-sm text-slate-900 font-medium">{counselor.timeZone}</div>
                </div>
              )}
            </div>

            {/* Preferred Mode */}
            {counselor.preferredMode && counselor.preferredMode.length > 0 && (
              <div className="mb-5">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Preferred Mode</div>
                <div className="flex flex-wrap gap-2">
                  {counselor.preferredMode.map((mode: string) => (
                    <span
                      key={mode}
                      className="bg-slate-200 text-slate-900 text-xs px-3.5 py-2 rounded-full font-medium"
                    >
                      {mode}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Preferred Time Slots */}
            {counselor.preferredTimeSlots && counselor.preferredTimeSlots.length > 0 && (
              <div>
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Preferred Time Slots</div>
                <div className="flex flex-wrap gap-2">
                  {counselor.preferredTimeSlots.map((slot: string) => (
                    <span
                      key={slot}
                      className="bg-slate-200 text-slate-900 text-xs px-3.5 py-2 rounded-full font-medium"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Commercials & Pricing */}
          <section>
            <h3 className="text-lg font-bold text-slate-950 mb-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-slate-700" />
              </div>
              Pricing & Commercials
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Wants to Charge</div>
                <Badge className={counselor.wantToCharge ? "bg-slate-900 text-white" : "bg-slate-400 text-white"}>
                  {counselor.wantToCharge ? "✓ Yes" : "✗ No"}
                </Badge>
              </div>

              <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Revenue Sharing</div>
                <Badge className={counselor.openToRevenueSharing ? "bg-slate-900 text-white" : "bg-slate-400 text-white"}>
                  {counselor.openToRevenueSharing ? "✓ Open" : "✗ Not Open"}
                </Badge>
              </div>

              {counselor.pricePer30Min && (
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-center">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">30 Min Session</div>
                  <div className="text-3xl font-bold text-slate-900">₹{counselor.pricePer30Min}</div>
                </div>
              )}

              {counselor.pricePer60Min && (
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-center">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">60 Min Session</div>
                  <div className="text-3xl font-bold text-slate-900">₹{counselor.pricePer60Min}</div>
                </div>
              )}
            </div>
          </section>

          {/* Motivation & Qualifications */}
          {(counselor.whyJoinPlatform || counselor.whatMakesQualified) && (
            <section>
              <h3 className="text-lg font-bold text-slate-950 mb-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-slate-700" />
                </div>
                Motivation & Qualifications
              </h3>

              <div className="space-y-4">
                {counselor.whyJoinPlatform && (
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                      Why Join Our Platform
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-xl border border-slate-100">
                      {counselor.whyJoinPlatform}
                    </p>
                  </div>
                )}
                {counselor.whatMakesQualified && (
                  <div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                      What Makes Them Qualified
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-xl border border-slate-100">
                      {counselor.whatMakesQualified}
                    </p>
                  </div>
                )}

                {/* Terms & Signature */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                  {counselor.agreedToTerms !== undefined && (
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-center">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Terms Agreed</div>
                      <Badge
                        className={counselor.agreedToTerms ? "bg-slate-900 text-white" : "bg-slate-400 text-white"}
                      >
                        {counselor.agreedToTerms ? "✓ Accepted" : "✗ Not Accepted"}
                      </Badge>
                    </div>
                  )}
                  {counselor.digitalSignature && (
                    <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-center">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Digital Signature
                      </div>
                      <div className="text-lg font-bold text-slate-900 italic">{counselor.digitalSignature}</div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Footer with Action Buttons */}
        <div className="shrink-0 border-t border-slate-100 px-8 py-6 bg-linear-to-r from-slate-50 to-white flex gap-3 justify-end flex-wrap">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-100 bg-white transition-all duration-200 cursor-pointer"
          >
            Close
          </Button>

          {counselor.status === "pending" && (
            <>
              <Button
                onClick={() => handleAction("reject")}
                disabled={loading}
                className="bg-slate-600 hover:bg-slate-700 text-white transition-all duration-200 cursor-pointer"
              >
                <XCircle className="h-4 w-4 mr-2" />
                {loading ? "Loading..." : "Reject"}
              </Button>
              <Button
                onClick={() => handleAction("approve")}
                disabled={loading}
                className="bg-slate-900 hover:bg-slate-800 text-white transition-all duration-200 cursor-pointer"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                {loading ? "Loading..." : "Approve"}
              </Button>
            </>
          )}

          {counselor.status === "approved" && (
            <Button
              onClick={() => handleAction("remove")}
              disabled={loading}
              className="bg-slate-700 hover:bg-slate-800 text-white transition-all duration-200 cursor-pointer"
            >
              <XCircle className="h-4 w-4 mr-2" />
              {loading ? "Loading..." : "Remove"}
            </Button>
          )}

          {(counselor.status === "rejected" || counselor.status === "removed") && (
            <>
              <Button
                onClick={() => handleAction("recover")}
                disabled={loading}
                className="bg-slate-900 hover:bg-slate-800 text-white transition-all duration-200 cursor-pointer"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                {loading ? "Loading..." : "Restore"}
              </Button>
              <Button
                onClick={handleDelete}
                disabled={loading}
                className="bg-slate-600 hover:bg-slate-700 text-white transition-all duration-200 cursor-pointer"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {loading ? "Loading..." : "Delete"}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

