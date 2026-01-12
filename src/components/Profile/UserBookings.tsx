"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Video, Mic, MessageCircle, Loader2, AlertCircle } from "lucide-react"

interface Booking {
  id: string
  counselorName: string
  counselorEmail: string
  sessionDate: string
  sessionTime: string
  duration: number
  sessionType: string
  topic: string
  status: string
  createdAt: string
  meetingLink?: string | null
  rejectionReason?: string | null
}

export function UserBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings")
      const data = await response.json()

      if (data.success) {
        setBookings(data.bookings)
      } else {
        setError(data.error || "Failed to load bookings")
      }
    } catch (err) {
      console.error("Error fetching bookings:", err)
      setError("Failed to load bookings")
    } finally {
      setLoading(false)
    }
  }

  const sessionTypeIcon = {
    video: Video,
    audio: Mic,
    chat: MessageCircle,
  }

  const statusConfig = {
    pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-300", label: "Pending Approval" },
    approved: { color: "bg-green-100 text-green-800 border-green-300", label: "Approved" },
    rejected: { color: "bg-red-100 text-red-800 border-red-300", label: "Rejected" },
    completed: { color: "bg-blue-100 text-blue-800 border-blue-300", label: "Completed" },
    cancelled: { color: "bg-gray-100 text-gray-800 border-gray-300", label: "Cancelled" },
  }

  // Separate bookings
  const upcomingBookings = bookings.filter(b => 
    b.status === "pending" || b.status === "approved"
  )
  const pastBookings = bookings.filter(b => 
    b.status === "completed" || b.status === "rejected" || b.status === "cancelled"
  )

  const getCounselorInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Counseling Sessions</CardTitle>
          <CardDescription>View your booked and past sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Counseling Sessions</CardTitle>
          <CardDescription>View your booked and past sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-2 py-8 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <p>{error}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Counseling Sessions</CardTitle>
        <CardDescription>
          {bookings.length > 0 
            ? `You have ${upcomingBookings.length} upcoming and ${pastBookings.length} past sessions`
            : "No sessions booked yet"
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {bookings.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-amber-300 mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">No sessions booked yet</p>
            <p className="text-sm text-muted-foreground">
              Visit our <a href="/counselling" className="text-amber-600 hover:underline">counseling page</a> to book your first session!
            </p>
          </div>
        ) : (
          <>
            {/* Upcoming Bookings */}
            {upcomingBookings.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-amber-900 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Sessions ({upcomingBookings.length})
                </h3>
                <div className="space-y-3">
                  {upcomingBookings.map((booking) => {
                    const SessionIcon = sessionTypeIcon[booking.sessionType as keyof typeof sessionTypeIcon] || Video
                    return (
                      <div
                        key={booking.id}
                        className="p-4 rounded-lg border border-amber-200 bg-gradient-to-br from-amber-50/50 to-yellow-50/30 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border-2 border-amber-200">
                              <AvatarImage src="" alt={booking.counselorName} />
                              <AvatarFallback className="bg-gradient-to-br from-amber-400 to-yellow-400 text-white text-sm font-semibold">
                                {getCounselorInitials(booking.counselorName)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold text-amber-900">{booking.counselorName}</h4>
                              <p className="text-sm text-amber-700">{booking.topic}</p>
                            </div>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={statusConfig[booking.status as keyof typeof statusConfig]?.color}
                          >
                            {statusConfig[booking.status as keyof typeof statusConfig]?.label}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm text-amber-700">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(booking.sessionDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            <span>{booking.sessionTime} ({booking.duration} min)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <SessionIcon className="h-4 w-4" />
                            <span className="capitalize">{booking.sessionType}</span>
                          </div>
                        </div>

                        {booking.status === "approved" && booking.meetingLink && (
                          <div className="mt-3 pt-3 border-t border-amber-200">
                            <a 
                              href={booking.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-amber-600 hover:text-amber-800 hover:underline font-medium"
                            >
                              Join Meeting →
                            </a>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Past Bookings */}
            {pastBookings.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-gray-700 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Past Sessions ({pastBookings.length})
                </h3>
                <div className="space-y-3">
                  {pastBookings.map((booking) => {
                    const SessionIcon = sessionTypeIcon[booking.sessionType as keyof typeof sessionTypeIcon] || Video
                    return (
                      <div
                        key={booking.id}
                        className="p-4 rounded-lg border border-gray-200 bg-gray-50/50 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10 border-2 border-gray-200">
                              <AvatarImage src="" alt={booking.counselorName} />
                              <AvatarFallback className="bg-gradient-to-br from-gray-400 to-gray-500 text-white text-sm font-semibold">
                                {getCounselorInitials(booking.counselorName)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold text-gray-900">{booking.counselorName}</h4>
                              <p className="text-sm text-gray-600">{booking.topic}</p>
                            </div>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={statusConfig[booking.status as keyof typeof statusConfig]?.color}
                          >
                            {statusConfig[booking.status as keyof typeof statusConfig]?.label}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(booking.sessionDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <SessionIcon className="h-4 w-4" />
                            <span className="capitalize">{booking.sessionType}</span>
                          </div>
                        </div>

                        {booking.status === "rejected" && booking.rejectionReason && (
                          <div className="mt-3 pt-3 border-t border-red-200 bg-red-50/50 -mx-4 -mb-4 px-4 py-3 rounded-b-lg">
                            <p className="text-sm text-red-700">
                              <span className="font-semibold">Reason: </span>
                              {booking.rejectionReason}
                            </p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
