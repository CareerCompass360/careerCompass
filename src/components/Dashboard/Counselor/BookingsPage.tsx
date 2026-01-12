"use client"

import { useState } from "react"
import { BookingCard } from "./BookingCard"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Search, Calendar, Filter, X } from "lucide-react"

interface Booking {
  id: string
  userName: string
  userEmail: string
  userPhone?: string
  sessionDate: string
  sessionTime: string
  duration: number
  sessionType: string
  topic: string
  userMessage?: string
  status: string
  createdAt: string
}

interface BookingsPageProps {
  bookings: Booking[]
  onApprove: (bookingId: string) => Promise<void>
  onReject: (bookingId: string, reason: string) => Promise<void>
  onComplete?: (bookingId: string) => Promise<void>
}

export function BookingsPage({ bookings, onApprove, onReject, onComplete }: BookingsPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      searchQuery === "" ||
      booking.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.topic.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === null || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Group bookings by status
  const bookingsByStatus = {
    pending: filteredBookings.filter((b) => b.status === "pending"),
    approved: filteredBookings.filter((b) => b.status === "approved"),
    completed: filteredBookings.filter((b) => b.status === "completed"),
    rejected: filteredBookings.filter((b) => b.status === "rejected"),
    cancelled: filteredBookings.filter((b) => b.status === "cancelled"),
  }

  const statusOptions = [
    { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    { value: "approved", label: "Approved", color: "bg-green-100 text-green-800" },
    { value: "completed", label: "Completed", color: "bg-blue-100 text-blue-800" },
    { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800" },
    { value: "cancelled", label: "Cancelled", color: "bg-gray-100 text-gray-800" },
  ]

  const clearFilters = () => {
    setSearchQuery("")
    setStatusFilter(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-amber-900">My Bookings</h1>
          <p className="text-amber-700 mt-1">Manage your counseling session bookings</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-amber-100 text-amber-800 text-base px-4 py-2">
            {filteredBookings.length} Total
          </Badge>
          {bookingsByStatus.pending.length > 0 && (
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-base px-4 py-2">
              {bookingsByStatus.pending.length} Pending
            </Badge>
          )}
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-amber-500" />
            <Input
              type="text"
              placeholder="Search by name, email, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-6 border-amber-200 focus:border-amber-500 focus:ring-amber-500 text-base"
            />
          </div>

          {/* Filter Toggle Button */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={`border-amber-200 hover:bg-amber-50 hover:border-amber-300 transition-colors ${
              statusFilter ? "bg-amber-50 border-amber-300" : ""
            }`}
          >
            <Filter className="mr-2 h-4 w-4" />
            Status
            {statusFilter && (
              <Badge variant="secondary" className="ml-2 bg-amber-600 text-white">
                1
              </Badge>
            )}
          </Button>
        </div>

        {/* Status Filter Options */}
        {showFilters && (
          <div className="p-4 border border-amber-200 rounded-lg bg-amber-50/30 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-amber-900">Filter by Status</h3>
              {statusFilter && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-amber-700 hover:text-amber-900 hover:bg-amber-100"
                >
                  <X className="mr-1 h-3 w-3" />
                  Clear
                </Button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <Badge
                  key={option.value}
                  variant={statusFilter === option.value ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    statusFilter === option.value
                      ? "bg-amber-600 text-white hover:bg-amber-700"
                      : `${option.color} border-amber-300 hover:bg-amber-100`
                  }`}
                  onClick={() => setStatusFilter(statusFilter === option.value ? null : option.value)}
                >
                  {option.label}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        {(searchQuery || statusFilter) && (
          <div className="flex items-center justify-between text-sm text-amber-700">
            <span>
              Found <span className="font-semibold">{filteredBookings.length}</span> of{" "}
              <span className="font-semibold">{bookings.length}</span> bookings
            </span>
            <Button
              variant="link"
              onClick={clearFilters}
              className="text-amber-600 hover:text-amber-800 p-0 h-auto"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>

      {/* Bookings Grid */}
      {filteredBookings.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onApprove={onApprove}
              onReject={onReject}
              onComplete={onComplete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 mb-4">
            <Calendar className="h-8 w-8 text-amber-600" />
          </div>
          <h3 className="text-xl font-semibold text-amber-900 mb-2">
            {searchQuery || statusFilter ? "No bookings found" : "No bookings yet"}
          </h3>
          <p className="text-amber-700 mb-4">
            {searchQuery || statusFilter
              ? "Try adjusting your search or filters"
              : "You'll see booking requests from users here"}
          </p>
          {(searchQuery || statusFilter) && (
            <Button
              onClick={clearFilters}
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              Clear filters
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
