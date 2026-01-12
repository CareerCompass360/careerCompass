"use client"

import { useEffect, useState } from "react"
import { useUser } from "@stackframe/stack"
import { useRouter } from "next/navigation"
import { CounselorNavbar } from "@/components/Dashboard/Counselor/CounselorNavbar"
import { BookingsPage } from "@/components/Dashboard/Counselor/BookingsPage"
import { Loader2 } from "lucide-react"

export default function CounselorBookingsPage() {
  const user = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [counselorData, setCounselorData] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        // Check if approved counselor
        const statusRes = await fetch("/api/counselor/status")
        const statusData = await statusRes.json()

        if (!statusData.success || !statusData.hasApplication || statusData.status !== "approved") {
          router.push("/counselor-dashboard")
          return
        }

        setCounselorData(statusData.application)

        // Fetch bookings
        const bookingsRes = await fetch("/api/counselor/bookings")
        const bookingsData = await bookingsRes.json()

        if (bookingsData.success) {
          setBookings(bookingsData.bookings)
        }
      } catch (error) {
        console.error("Error fetching bookings:", error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchData()
    }
  }, [user, router])

  const handleApprove = async (bookingId: string) => {
    try {
      const res = await fetch(`/api/counselor/booking/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" }),
      })

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, status: "approved" } : b))
        )
      }
    } catch (error) {
      console.error("Error approving booking:", error)
    }
  }

  const handleReject = async (bookingId: string, reason: string) => {
    try {
      const res = await fetch(`/api/counselor/booking/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "rejected", rejectionReason: reason }),
      })

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === bookingId ? { ...b, status: "rejected", rejectionReason: reason } : b
          )
        )
      }
    } catch (error) {
      console.error("Error rejecting booking:", error)
    }
  }

  const handleComplete = async (bookingId: string) => {
    try {
      const res = await fetch(`/api/counselor/booking/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed" }),
      })

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, status: "completed" } : b))
        )
      }
    } catch (error) {
      console.error("Error completing booking:", error)
    }
  }

  if (!user || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50/50 via-stone-50 to-yellow-50/30">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-amber-600 mx-auto mb-4" />
          <p className="text-amber-700 text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  if (!counselorData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/50 via-stone-50 to-yellow-50/30">
      <CounselorNavbar
        counselorName={counselorData.fullName}
        counselorPhoto={counselorData.profilePhoto}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BookingsPage
          bookings={bookings}
          onApprove={handleApprove}
          onReject={handleReject}
          onComplete={handleComplete}
        />
      </div>
    </div>
  )
}
