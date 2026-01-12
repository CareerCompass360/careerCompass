"use client"

import { useEffect, useState } from "react"
import { useUser } from "@stackframe/stack"
import { useRouter } from "next/navigation"
import { Loader2, ShieldAlert } from "lucide-react"

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const user = useUser()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAdminStatus = async () => {
      console.log("[AdminGuard] useUser() returned:", user)
      console.log("[AdminGuard] User ID:", user?.id)
      console.log("[AdminGuard] User email:", user?.primaryEmail)
      
      if (!user) {
        console.log("[AdminGuard] No user found, redirecting to sign-in")
        router.push("/handler/sign-in?redirectTo=/admin")
        return
      }

      try {
        // Check if user is admin from your database
        console.log("[AdminGuard] Calling /api/admin/check...")
        const response = await fetch("/api/admin/check")
        const data = await response.json()
        console.log("[AdminGuard] API response:", data)
        
        if (data.isAdmin) {
          console.log("[AdminGuard] User IS admin, granting access")
          setIsAdmin(true)
        } else {
          console.log("[AdminGuard] User is NOT admin, denying access")
          setIsAdmin(false)
        }
      } catch (error) {
        console.error("[AdminGuard] Error checking admin status:", error)
        setIsAdmin(false)
      } finally {
        setLoading(false)
      }
    }

    checkAdminStatus()
  }, [user, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-white text-lg">Verifying admin access...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
        <div className="text-center max-w-md p-8 bg-white rounded-xl shadow-2xl">
          <ShieldAlert className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-900 mb-2">Access Denied</h1>
          <p className="text-red-700 mb-6">
            You don't have permission to access the admin panel. 
            Please contact an administrator if you believe this is an error.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
