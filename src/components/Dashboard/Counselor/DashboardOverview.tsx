"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle, Clock, TrendingUp, Users, DollarSign } from "lucide-react"
import Link from "next/link"

interface DashboardOverviewProps {
  stats: {
    totalBookings: number
    pendingBookings: number
    completedSessions: number
    totalEarnings: number
  }
  recentBookings: Array<{
    id: string
    userName: string
    sessionDate: string
    status: string
  }>
}

export function DashboardOverview({ stats, recentBookings }: DashboardOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-amber-900">Dashboard</h1>
        <p className="text-amber-700 mt-1">Welcome back! Here's an overview of your counseling activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-amber-200 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-3">
            <CardDescription className="text-amber-700">Total Bookings</CardDescription>
            <CardTitle className="text-3xl text-amber-900">{stats.totalBookings}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-amber-600">
              <Calendar className="mr-2 h-4 w-4" />
              All time
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 hover:shadow-lg transition-shadow bg-yellow-50/30">
          <CardHeader className="pb-3">
            <CardDescription className="text-yellow-700">Pending</CardDescription>
            <CardTitle className="text-3xl text-yellow-900">{stats.pendingBookings}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-yellow-600">
              <Clock className="mr-2 h-4 w-4" />
              Awaiting response
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 hover:shadow-lg transition-shadow bg-green-50/30">
          <CardHeader className="pb-3">
            <CardDescription className="text-green-700">Completed</CardDescription>
            <CardTitle className="text-3xl text-green-900">{stats.completedSessions}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-green-600">
              <CheckCircle className="mr-2 h-4 w-4" />
              Sessions done
            </div>
          </CardContent>
        </Card>

        <Card className="border-amber-200 hover:shadow-lg transition-shadow bg-gradient-to-br from-amber-50 to-yellow-50/50">
          <CardHeader className="pb-3">
            <CardDescription className="text-amber-700">Total Earnings</CardDescription>
            <CardTitle className="text-3xl text-amber-900">₹{stats.totalEarnings.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-amber-600">
              <DollarSign className="mr-2 h-4 w-4" />
              Revenue generated
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="border-amber-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription className="mt-1">Your latest booking requests</CardDescription>
            </div>
            <Link href="/counselor-dashboard/bookings">
              <Button variant="outline" size="sm" className="border-amber-300 text-amber-700">
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {recentBookings.length > 0 ? (
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-amber-100 hover:bg-amber-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100">
                      <Users className="h-5 w-5 text-amber-700" />
                    </div>
                    <div>
                      <p className="font-medium text-amber-900">{booking.userName}</p>
                      <p className="text-sm text-amber-700">
                        {new Date(booking.sessionDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                        : booking.status === "approved"
                        ? "bg-green-100 text-green-800 border-green-300"
                        : "bg-gray-100 text-gray-800 border-gray-300"
                    }
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-amber-300 mx-auto mb-3" />
              <p className="text-amber-700">No bookings yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50/50 to-yellow-50/30">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Manage your counselor profile</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link href="/counselor-dashboard/bookings">
              <Button
                variant="outline"
                className="w-full justify-start border-amber-300 hover:bg-amber-100 h-auto py-4"
              >
                <Calendar className="mr-3 h-5 w-5 text-amber-600" />
                <div className="text-left">
                  <div className="font-semibold text-amber-900">View Bookings</div>
                  <div className="text-xs text-amber-700">Manage session requests</div>
                </div>
              </Button>
            </Link>
            <Link href="/counselor-dashboard/edit-profile">
              <Button
                variant="outline"
                className="w-full justify-start border-amber-300 hover:bg-amber-100 h-auto py-4"
              >
                <TrendingUp className="mr-3 h-5 w-5 text-amber-600" />
                <div className="text-left">
                  <div className="font-semibold text-amber-900">Edit Profile</div>
                  <div className="text-xs text-amber-700">Update your information</div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
