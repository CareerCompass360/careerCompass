"use client"

import { useEffect, useState } from "react"
import { useUser } from "@stackframe/stack"
import { useRouter } from "next/navigation"
import { ApplicationPrompt } from "@/components/Dashboard/Counselor/ApplicationPrompt"
import { StatusCard } from "@/components/Dashboard/Counselor/StatusCard"
import { CounselorNavbar } from "@/components/Dashboard/Counselor/CounselorNavbar"
import { DashboardOverview } from "@/components/Dashboard/Counselor/DashboardOverview"
import { Loader2, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CounselorDashboardPage() {
  const user = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isCounselor, setIsCounselor] = useState(false)
  const [applicationStatus, setApplicationStatus] = useState<any>(null)
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    completedSessions: 0,
    totalEarnings: 0,
  })
  const [recentBookings, setRecentBookings] = useState<any[]>([])

  useEffect(() => {
    async function initializeCounselor() {
      if (!user) return

      try {
        // Fetch application status
        const statusRes = await fetch("/api/counselor/status")
        const statusData = await statusRes.json()

        if (statusData.success) {
          setIsCounselor(statusData.isCounselor || false)
          setApplicationStatus(statusData)

          // If approved, fetch bookings and stats
          if (statusData.hasApplication && statusData.status === "approved") {
            const bookingsRes = await fetch("/api/counselor/bookings")
            const bookingsData = await bookingsRes.json()

            if (bookingsData.success) {
              const bookings = bookingsData.bookings
              setStats({
                totalBookings: bookings.length,
                pendingBookings: bookings.filter((b: any) => b.status === "pending").length,
                completedSessions: bookings.filter((b: any) => b.status === "completed").length,
                totalEarnings: 0, // Calculate based on completed sessions and pricing
              })
              setRecentBookings(bookings.slice(0, 5))
            }
          }
        }
      } catch (error) {
        console.error("Error initializing counselor dashboard:", error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      initializeCounselor()
    }
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50/50 via-stone-50 to-yellow-50/30">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-amber-600 mx-auto mb-4" />
          <p className="text-amber-700 text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50/50 via-stone-50 to-yellow-50/30">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-amber-600 mx-auto mb-4" />
          <p className="text-amber-700 text-lg">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  // No application - show prompt to apply
  if (!applicationStatus?.hasApplication) {
    return <ApplicationPrompt />
  }

  // Application pending or rejected - show status card
  if (applicationStatus.status === "pending" || applicationStatus.status === "rejected") {
    return (
      <StatusCard
        status={applicationStatus.status}
        rejectedAt={applicationStatus.application?.rejectedAt}
        submittedAt={applicationStatus.application?.createdAt}
      />
    )
  }

  // Approved - show full dashboard
  if (applicationStatus.status === "approved") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-stone-50 to-yellow-50/30">
        <CounselorNavbar
          counselorName={applicationStatus.application.fullName}
          counselorPhoto={applicationStatus.application.profilePhoto}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <DashboardOverview stats={stats} recentBookings={recentBookings} />
        </div>
      </div>
    )
  }

  return null
}
