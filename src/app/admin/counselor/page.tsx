"use client"

import { useEffect, useState } from "react"
import { CounselorCard } from "@/components/Dashboard/Admin/CounselorCard"
import { CounselorDetailDialog } from "@/components/Dashboard/Admin/CounselorDetailDialog"
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

type TabType = 'pending' | 'approved' | 'rejected'

export default function CounselorManagementPage() {
  const [counselors, setCounselors] = useState<Counselor[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCounselor, setSelectedCounselor] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<TabType>('pending')

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
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Counselor Management
        </h1>
        <p className="text-slate-600">
          Review, approve, and manage counselor applications
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-white border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase mb-2">Approved</p>
              <p className="text-4xl font-bold text-slate-900">{approvedCounselors.length}</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase mb-2">Pending Review</p>
              <p className="text-4xl font-bold text-slate-900">{pendingCounselors.length}</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase mb-2">Rejected/Removed</p>
              <p className="text-4xl font-bold text-slate-900">{rejectedRemovedCounselors.length}</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-rose-100 flex items-center justify-center">
              <XCircle className="h-6 w-6 text-rose-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-slate-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('pending')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'pending'
                ? 'border-amber-500 text-amber-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Pending
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeTab === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {pendingCounselors.length}
              </span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'approved'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Approved
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeTab === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {approvedCounselors.length}
              </span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('rejected')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'rejected'
                ? 'border-rose-500 text-rose-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <XCircle className="h-4 w-4" />
              Rejected/Removed
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeTab === 'rejected' ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600'
              }`}>
                {rejectedRemovedCounselors.length}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'pending' && (
        <section>
          {pendingCounselors.length === 0 ? (
            <Card className="p-12 text-center bg-white border border-slate-200">
              <AlertCircle className="h-16 w-16 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 font-medium text-lg">No pending requests</p>
              <p className="text-slate-500 text-sm mt-1">New applications will appear here for review</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      )}

      {activeTab === 'approved' && (
        <section>
          {approvedCounselors.length === 0 ? (
            <Card className="p-12 text-center bg-white border border-slate-200">
              <Users className="h-16 w-16 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 font-medium text-lg">No approved counselors yet</p>
              <p className="text-slate-500 text-sm mt-1">Approve pending applications to get started</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      )}

      {activeTab === 'rejected' && (
        <section>
          <Card className="p-4 mb-6 bg-rose-50 border border-rose-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-rose-900 mb-1">Auto-Deletion Policy</p>
                <p className="text-sm text-rose-700">
                  Counselors in this section will be automatically deleted after 7 days.
                  You can recover or permanently delete them before that.
                </p>
              </div>
            </div>
          </Card>
          {rejectedRemovedCounselors.length === 0 ? (
            <Card className="p-12 text-center bg-white border border-slate-200">
              <XCircle className="h-16 w-16 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600 font-medium text-lg">No rejected or removed counselors</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      )}

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
