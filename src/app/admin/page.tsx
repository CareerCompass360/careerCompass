"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, ArrowRight, TrendingUp, BarChart3, Loader2 } from "lucide-react"

interface Stats {
  totalCounselors: number
  totalBookings: number
  pendingApplications: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalCounselors: 0,
    totalBookings: 0,
    pendingApplications: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats")
      const data = await response.json()
      if (data.success) {
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Admin Dashboard</span>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">
          Welcome Back, Admin
        </h1>
        <p className="text-slate-600 text-lg">
          Manage counselor applications, approve qualified professionals, and maintain platform quality.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all">
          <div className="flex items-start justify-between mb-6">
            <div className="h-12 w-12 rounded-lg bg-slate-900 flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Counselor Management
          </h2>
          <p className="text-slate-600 mb-6 text-sm">
            Review and approve counselor applications
          </p>
          <Link href="/admin/counselor">
            <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white h-10">
              Manage Counselors
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </Card>

        <Card className="p-6 bg-slate-50 border border-slate-200">
          <div className="flex items-start justify-between mb-6">
            <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-emerald-700" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Analytics
          </h2>
          <p className="text-slate-600 mb-6 text-sm">
            Track platform growth and performance
          </p>
          {loading ? (
            <div className="flex items-center justify-center h-10">
              <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600">Total Sessions:</span>
                <span className="font-bold text-slate-900">{stats.totalBookings}</span>
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6 bg-slate-50 border border-slate-200">
          <div className="flex items-start justify-between mb-6">
            <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-amber-700" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Reports
          </h2>
          <p className="text-slate-600 mb-6 text-sm">
            Generate detailed insights and reports
          </p>
          <Button disabled className="w-full h-10" variant="secondary">
            Coming Soon
          </Button>
        </Card>
      </div>

      {/* Stats Overview */}
      <Card className="p-6 bg-white border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          Platform Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {loading ? <Loader2 className="h-8 w-8 animate-spin text-slate-400" /> : stats.totalCounselors}
            </div>
            <div className="text-xs font-medium text-slate-500 uppercase">Total Counselors</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {loading ? <Loader2 className="h-8 w-8 animate-spin text-slate-400" /> : stats.totalBookings}
            </div>
            <div className="text-xs font-medium text-slate-500 uppercase">Total Sessions</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {loading ? <Loader2 className="h-8 w-8 animate-spin text-slate-400" /> : stats.pendingApplications}
            </div>
            <div className="text-xs font-medium text-slate-500 uppercase">Pending Applications</div>
          </div>
        </div>
        {!loading && (
          <p className="text-slate-500 text-xs text-center mt-6">
            Updated in real-time from platform data
          </p>
        )}
      </Card>
    </div>
  )
}
