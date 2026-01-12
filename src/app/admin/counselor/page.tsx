"use client"

import { useEffect, useState } from "react"
import { CounselorCard } from "@/components/Admin/CounselorCard"
import { CounselorDetailDialog } from "@/components/Admin/CounselorDetailDialog"
import { Card } from "@/components/ui/card"
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle,
  Loader2,
  AlertCircle
} from "lucide-react"

interface Counselor {
  id: string
  fullName: string
  email: string
  city: string
  country: string
  currentJobTitle: string
  primaryCareerDomain: string
  totalYearsExperience: number
  highestEducationLevel: string
  status: string
  createdAt: Date
  rejectedAt?: Date
  removedAt?: Date
}

export default function CounselorManagementPage() {
  const [counselors, setCounselors] = useState<Counselor[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCounselor, setSelectedCounselor] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const fetchCounselors = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/counselor-application")
      if (response.ok) {
        const data = await response.json()
        setCounselors(data)
      }
    } catch (error) {
      console.error("Failed to fetch counselors:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCounselors()
  }, [])

  const handleViewDetails = async (counselorId: string) => {
    try {
      const response = await fetch(`/api/counselor-application?id=${counselorId}`)
      if (response.ok) {
        const data = await response.json()
        setSelectedCounselor(data)
        setDialogOpen(true)
      }
    } catch (error) {
      console.error("Failed to fetch counselor details:", error)
    }
  }

  const handleStatusUpdate = () => {
    fetchCounselors()
  }

  const approvedCounselors = counselors.filter(c => c.status === "approved")
  const pendingCounselors = counselors.filter(c => c.status === "pending")
  const rejectedRemovedCounselors = counselors.filter(
    c => c.status === "rejected" || c.status === "removed"
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
        <span className="ml-2 text-lg text-stone-600">Loading counselors...</span>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Counselor Management
        </h1>
        <p className="text-slate-600">
          Manage counselor applications, approvals, and removals
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-medium">Approved</p>
              <p className="text-3xl font-bold text-green-900">{approvedCounselors.length}</p>
            </div>
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-700 font-medium">Pending</p>
              <p className="text-3xl font-bold text-yellow-900">{pendingCounselors.length}</p>
            </div>
            <Clock className="h-12 w-12 text-yellow-600" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-700 font-medium">Rejected/Removed</p>
              <p className="text-3xl font-bold text-red-900">{rejectedRemovedCounselors.length}</p>
            </div>
            <XCircle className="h-12 w-12 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Pending Requests Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <Clock className="h-6 w-6 text-yellow-600" />
          <h2 className="text-2xl font-bold text-yellow-900">
            Pending Requests ({pendingCounselors.length})
          </h2>
        </div>
        {pendingCounselors.length === 0 ? (
          <Card className="p-8 text-center bg-yellow-50">
            <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-2" />
            <p className="text-yellow-700">No pending requests at the moment</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingCounselors.map((counselor) => (
              <CounselorCard
                key={counselor.id}
                counselor={counselor}
                onViewDetails={() => handleViewDetails(counselor.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Approved Counselors Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <CheckCircle className="h-6 w-6 text-green-600" />
          <h2 className="text-2xl font-bold text-green-900">
            Approved Counselors ({approvedCounselors.length})
          </h2>
        </div>
        {approvedCounselors.length === 0 ? (
          <Card className="p-8 text-center bg-green-50">
            <Users className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <p className="text-green-700">No approved counselors yet</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {approvedCounselors.map((counselor) => (
              <CounselorCard
                key={counselor.id}
                counselor={counselor}
                onViewDetails={() => handleViewDetails(counselor.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Rejected/Removed Section */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <XCircle className="h-6 w-6 text-red-600" />
          <h2 className="text-2xl font-bold text-red-900">
            Rejected / Removed ({rejectedRemovedCounselors.length})
          </h2>
        </div>
        <Card className="p-4 mb-4 bg-red-50 border-red-200">
          <p className="text-sm text-red-700">
            ⚠️ Counselors in this section will be automatically deleted after 7 days.
            You can recover or permanently delete them before that.
          </p>
        </Card>
        {rejectedRemovedCounselors.length === 0 ? (
          <Card className="p-8 text-center bg-red-50">
            <XCircle className="h-12 w-12 text-red-500 mx-auto mb-2" />
            <p className="text-red-700">No rejected or removed counselors</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rejectedRemovedCounselors.map((counselor) => (
              <CounselorCard
                key={counselor.id}
                counselor={counselor}
                onViewDetails={() => handleViewDetails(counselor.id)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Detail Dialog */}
      {selectedCounselor && (
        <CounselorDetailDialog
          counselor={selectedCounselor}
          open={dialogOpen}
          onClose={() => {
            setDialogOpen(false)
            setSelectedCounselor(null)
          }}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  )
}
