import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, ArrowRight, TrendingUp, BarChart3 } from "lucide-react"

export default function AdminDashboard() {
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
          <Button disabled className="w-full h-10" variant="secondary">
            Coming Soon
          </Button>
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
            <div className="text-3xl font-bold text-slate-900 mb-1">-</div>
            <div className="text-xs font-medium text-slate-500 uppercase">Total Counselors</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-3xl font-bold text-slate-900 mb-1">-</div>
            <div className="text-xs font-medium text-slate-500 uppercase">Active Sessions</div>
          </div>
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="text-3xl font-bold text-slate-900 mb-1">-</div>
            <div className="text-xs font-medium text-slate-500 uppercase">Pending Applications</div>
          </div>
        </div>
        <p className="text-slate-500 text-xs text-center mt-6">
          Real-time statistics and metrics coming soon
        </p>
      </Card>
    </div>
  )
}
