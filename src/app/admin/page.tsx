import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, ArrowRight } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Admin Dashboard
        </h1>
        <p className="text-slate-600 text-lg">
          Welcome to CareerCompass Admin Panel
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 hover:shadow-xl transition-all duration-300 hover:border-purple-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Counselor Management
              </h2>
              <p className="text-slate-700">
                View, approve, and manage counselor applications
              </p>
            </div>
            <Users className="h-12 w-12 text-purple-600" />
          </div>
          <Link href="/admin/counselor">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white mt-4">
              Manage Counselors
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </Card>

        <Card className="p-8 bg-gradient-to-br from-stone-50 to-stone-100 border-2 border-stone-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 mb-2">
                More Features
              </h2>
              <p className="text-stone-700">
                Additional admin features coming soon...
              </p>
            </div>
          </div>
          <Button disabled className="w-full mt-4">
            Coming Soon
          </Button>
        </Card>
      </div>

      {/* Stats Overview */}
      <Card className="p-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Platform Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <p className="text-4xl font-bold text-green-600 mb-2">-</p>
            <p className="text-stone-700">Active Counselors</p>
          </div>
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <p className="text-4xl font-bold text-blue-600 mb-2">-</p>
            <p className="text-stone-700">Total Students</p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <p className="text-4xl font-bold text-purple-600 mb-2">-</p>
            <p className="text-stone-700">Sessions Completed</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
