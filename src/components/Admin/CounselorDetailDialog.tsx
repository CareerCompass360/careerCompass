"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  CheckCircle, 
  XCircle, 
  Trash2, 
  RotateCcw,
  ExternalLink,
  User,
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Globe,
  FileText,
  Clock,
  DollarSign
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface CounselorDetailDialogProps {
  counselor: any
  open: boolean
  onClose: () => void
  onStatusUpdate: () => void
}

export function CounselorDetailDialog({ 
  counselor, 
  open, 
  onClose,
  onStatusUpdate 
}: CounselorDetailDialogProps) {
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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-amber-900 flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-lg">
              {counselor.fullName.charAt(0).toUpperCase()}
            </div>
            {counselor.fullName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Status Badge */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-stone-600">Status:</span>
            <Badge className={`
              ${counselor.status === 'approved' ? 'bg-green-500' : ''}
              ${counselor.status === 'pending' ? 'bg-yellow-500' : ''}
              ${counselor.status === 'rejected' ? 'bg-red-500' : ''}
              ${counselor.status === 'removed' ? 'bg-gray-500' : ''}
              text-white
            `}>
              {counselor.status.toUpperCase()}
            </Badge>
          </div>

          {/* Profile Photo */}
          {counselor.profilePhoto && (
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">Profile Photo</h3>
              <img 
                src={counselor.profilePhoto} 
                alt={counselor.fullName}
                className="w-32 h-32 rounded-lg object-cover border-2 border-amber-200"
              />
            </div>
          )}

          {/* Basic Identity */}
          <section className="bg-amber-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-amber-900 mb-3 flex items-center gap-2">
              <User className="h-5 w-5" />
              Basic Identity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div><Mail className="h-4 w-4 inline mr-2 text-amber-600" /><strong>Email:</strong> {counselor.email}</div>
              <div><Phone className="h-4 w-4 inline mr-2 text-amber-600" /><strong>Mobile:</strong> {counselor.mobileNumber}</div>
              <div><Calendar className="h-4 w-4 inline mr-2 text-amber-600" /><strong>DOB:</strong> {new Date(counselor.dateOfBirth).toLocaleDateString()}</div>
              <div><User className="h-4 w-4 inline mr-2 text-amber-600" /><strong>Gender:</strong> {counselor.gender || "N/A"}</div>
              <div><MapPin className="h-4 w-4 inline mr-2 text-amber-600" /><strong>Location:</strong> {counselor.city}, {counselor.country}</div>
              <div><Globe className="h-4 w-4 inline mr-2 text-amber-600" /><strong>Languages:</strong> {counselor.languagesSpoken.join(", ")}</div>
            </div>
            <div className="mt-3 space-y-1">
              <div className="text-sm">
                <Globe className="h-4 w-4 inline mr-2 text-amber-600" />
                <strong>LinkedIn:</strong> <a href={counselor.linkedinProfile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{counselor.linkedinProfile}</a>
              </div>
              {counselor.personalWebsite && (
                <div className="text-sm">
                  <Globe className="h-4 w-4 inline mr-2 text-amber-600" />
                  <strong>Website:</strong> <a href={counselor.personalWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{counselor.personalWebsite}</a>
                </div>
              )}
            </div>
          </section>

          {/* Professional Background */}
          <section className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-blue-900 mb-3 flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Professional Background
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div><strong>Job Title:</strong> {counselor.currentJobTitle}</div>
              <div><strong>Organization:</strong> {counselor.currentOrganization}</div>
              <div><strong>Experience:</strong> {counselor.totalYearsExperience} years</div>
              <div><strong>Domain:</strong> {counselor.primaryCareerDomain}</div>
              <div><strong>Specialization:</strong> {counselor.subSpecialization}</div>
              <div><GraduationCap className="h-4 w-4 inline mr-2 text-blue-600" /><strong>Education:</strong> {counselor.highestEducationLevel}</div>
              <div><strong>Degree:</strong> {counselor.degreeName}</div>
              <div><strong>University:</strong> {counselor.university}</div>
              <div><strong>Graduation Year:</strong> {counselor.yearOfGraduation}</div>
            </div>
          </section>

          {/* Counseling Expertise */}
          <section className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-green-900 mb-3">Counseling Expertise</h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Student Types:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {counselor.studentTypes.map((type: string) => (
                    <Badge key={type} variant="secondary">{type}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <strong>Career Areas:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {counselor.careerAreasCanCounsel.map((area: string) => (
                    <Badge key={area} variant="secondary">{area}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <strong>Topics:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {counselor.topicsCanHelp.map((topic: string) => (
                    <Badge key={topic} variant="secondary">{topic}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Experience Proof */}
          {counselor.hasFormedMentored && (
            <section className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-lg text-purple-900 mb-3">Mentoring Experience</h3>
              <div className="space-y-2 text-sm">
                <div><strong>People Guided:</strong> {counselor.numberOfPeopleGuided}</div>
                <div><strong>Where:</strong> {counselor.whereMentored}</div>
                <div>
                  <strong>Success Story:</strong>
                  <p className="mt-1 text-stone-700 italic">{counselor.successStory}</p>
                </div>
              </div>
            </section>
          )}

          {/* Documents */}
          <section className="bg-stone-100 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-stone-900 mb-3 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Documents
            </h3>
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => window.open(counselor.resumeUrl, '_blank')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Resume / CV
                <ExternalLink className="h-4 w-4 ml-auto" />
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => window.open(counselor.degreeCertificateUrl, '_blank')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Degree Certificate
                <ExternalLink className="h-4 w-4 ml-auto" />
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={() => window.open(counselor.workExperienceProofUrl, '_blank')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Work Experience Proof
                <ExternalLink className="h-4 w-4 ml-auto" />
              </Button>
              {counselor.counselingCertUrl && (
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.open(counselor.counselingCertUrl, '_blank')}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Counseling Certification
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </Button>
              )}
            </div>
          </section>

          {/* Platform Readiness */}
          <section className="bg-indigo-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-indigo-900 mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Platform Readiness
            </h3>
            <div className="space-y-2 text-sm">
              <div><strong>Available Hours/Week:</strong> {counselor.availableHoursPerWeek} hours</div>
              <div><strong>Time Zone:</strong> {counselor.timeZone}</div>
              <div>
                <strong>Preferred Mode:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {counselor.preferredMode.map((mode: string) => (
                    <Badge key={mode} variant="secondary">{mode}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <strong>Preferred Time Slots:</strong>
                <div className="flex flex-wrap gap-1 mt-1">
                  {counselor.preferredTimeSlots.map((slot: string) => (
                    <Badge key={slot} variant="secondary">{slot}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Commercials */}
          <section className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-yellow-900 mb-3 flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Pricing
            </h3>
            <div className="space-y-2 text-sm">
              <div><strong>Wants to Charge:</strong> {counselor.wantToCharge ? "Yes" : "No (Free)"}</div>
              {counselor.wantToCharge && (
                <>
                  <div><strong>30 Min Session:</strong> ₹{counselor.pricePer30Min}</div>
                  <div><strong>60 Min Session:</strong> ₹{counselor.pricePer60Min}</div>
                </>
              )}
              <div><strong>Revenue Sharing:</strong> {counselor.openToRevenueSharing ? "Yes" : "No"}</div>
            </div>
          </section>

          {/* Trust & Ethics */}
          <section className="bg-rose-50 p-4 rounded-lg">
            <h3 className="font-bold text-lg text-rose-900 mb-3">Trust & Ethics</h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Why Join Platform:</strong>
                <p className="mt-1 text-stone-700">{counselor.whyJoinPlatform}</p>
              </div>
              <div>
                <strong>What Makes Qualified:</strong>
                <p className="mt-1 text-stone-700">{counselor.whatMakesQualified}</p>
              </div>
              <div><strong>Agreed to Terms:</strong> {counselor.agreedToTerms ? "✓ Yes" : "✗ No"}</div>
              <div><strong>Digital Signature:</strong> {counselor.digitalSignature}</div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t-2 border-stone-200">
            {counselor.status === "pending" && (
              <>
                <Button
                  onClick={() => handleAction("approve")}
                  disabled={loading}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Accept
                </Button>
                <Button
                  onClick={() => handleAction("reject")}
                  disabled={loading}
                  variant="destructive"
                  className="flex-1"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </>
            )}

            {counselor.status === "approved" && (
              <Button
                onClick={() => handleAction("remove")}
                disabled={loading}
                variant="destructive"
                className="flex-1"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Remove Counselor
              </Button>
            )}

            {(counselor.status === "rejected" || counselor.status === "removed") && (
              <>
                <Button
                  onClick={() => handleAction("recover")}
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Recover
                </Button>
                <Button
                  onClick={handleDelete}
                  disabled={loading}
                  variant="destructive"
                  className="flex-1"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Permanently
                </Button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
