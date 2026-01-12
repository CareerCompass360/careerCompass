"use client"

import { useEffect, useState } from "react"
import { useUser } from "@stackframe/stack"
import { useRouter } from "next/navigation"
import { CounselorNavbar } from "@/components/Dashboard/Counselor/CounselorNavbar"
import { EditProfilePage } from "@/components/Dashboard/Counselor/EditProfilePage"
import { Loader2 } from "lucide-react"

export default function CounselorEditProfilePage() {
  const user = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [counselorData, setCounselorData] = useState<any>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const statusRes = await fetch("/api/counselor/status")
        const statusData = await statusRes.json()

        if (!statusData.success || !statusData.hasApplication || statusData.status !== "approved") {
          router.push("/counselor-dashboard")
          return
        }

        setCounselorData(statusData.application)
      } catch (error) {
        console.error("Error fetching counselor data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchData()
    }
  }, [user, router])

  const handleSave = async (updates: any) => {
    try {
      const res = await fetch("/api/counselor/profile/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      })

      const data = await res.json()

      if (data.success) {
        setCounselorData(data.application)
        alert("Profile updated successfully!")
      } else {
        alert("Failed to update profile")
      }
    } catch (error) {
      console.error("Error updating profile:", error)
      alert("Failed to update profile")
    }
  }

  const handleRequestEdit = async (fields: string[], reason: string) => {
    try {
      const res = await fetch("/api/counselor/edit-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestedFields: fields, reason }),
      })

      const data = await res.json()

      if (data.success) {
        alert("Edit request submitted! Admin will review your request.")
      } else {
        alert("Failed to submit edit request")
      }
    } catch (error) {
      console.error("Error submitting edit request:", error)
      alert("Failed to submit edit request")
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
        <EditProfilePage
          counselorData={counselorData}
          onSave={handleSave}
          onRequestEdit={handleRequestEdit}
        />
      </div>
    </div>
  )
}
