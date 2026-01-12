"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { 
  Calendar, 
  Clock, 
  Mail, 
  Phone, 
  MessageSquare, 
  CheckCircle, 
  XCircle,
  Video,
  Mic,
  MessageCircle,
  Loader2
} from "lucide-react"

interface BookingCardProps {
  booking: {
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
  onApprove?: (bookingId: string) => Promise<void>
  onReject?: (bookingId: string, reason: string) => Promise<void>
  onComplete?: (bookingId: string) => Promise<void>
}

export function BookingCard({ booking, onApprove, onReject, onComplete }: BookingCardProps) {
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)
  const [showRejectInput, setShowRejectInput] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const handleComplete = async () => {
    if (!onComplete) return
    setIsCompleting(true)
    try {
      await onComplete(booking.id)
    } finally {
      setIsCompleting(false)
    }
  }

  const statusConfig = {
    pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-300", label: "Pending" },
    approved: { color: "bg-green-100 text-green-800 border-green-300", label: "Approved" },
    rejected: { color: "bg-red-100 text-red-800 border-red-300", label: "Rejected" },
    completed: { color: "bg-blue-100 text-blue-800 border-blue-300", label: "Completed" },
    cancelled: { color: "bg-gray-100 text-gray-800 border-gray-300", label: "Cancelled" },
  }

  const sessionTypeIcon = {
    video: Video,
    audio: Mic,
    chat: MessageCircle,
  }

  const SessionIcon = sessionTypeIcon[booking.sessionType as keyof typeof sessionTypeIcon] || Video

  const initials = booking.userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const handleApprove = async () => {
    if (!onApprove) return
    setIsApproving(true)
    try {
      await onApprove(booking.id)
    } finally {
      setIsApproving(false)
    }
  }

  const handleReject = async () => {
    if (!onReject || !rejectionReason.trim()) return
    setIsRejecting(true)
    try {
      await onReject(booking.id, rejectionReason)
      setShowRejectInput(false)
      setRejectionReason("")
    } finally {
      setIsRejecting(false)
    }
  }

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-amber-100 bg-gradient-to-br from-white to-amber-50/20">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Avatar className="h-12 w-12 border-2 border-amber-200">
              <AvatarImage src="" alt={booking.userName} />
              <AvatarFallback className="bg-gradient-to-br from-amber-400 to-yellow-400 text-white font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-amber-900 text-lg">{booking.userName}</h3>
              <p className="text-sm text-amber-700">{booking.topic}</p>
            </div>
          </div>
          <Badge 
            variant="outline" 
            className={statusConfig[booking.status as keyof typeof statusConfig]?.color || statusConfig.pending.color}
          >
            {statusConfig[booking.status as keyof typeof statusConfig]?.label || "Pending"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pb-4">
        {/* Session Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm text-amber-700">
            <Calendar className="h-4 w-4 text-amber-600" />
            <span>{new Date(booking.sessionDate).toLocaleDateString('en-US', { 
              weekday: 'short',
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-amber-700">
            <Clock className="h-4 w-4 text-amber-600" />
            <span>{booking.sessionTime} ({booking.duration} min)</span>
          </div>
        </div>

        {/* Session Type */}
        <div className="flex items-center gap-2 text-sm text-amber-700">
          <SessionIcon className="h-4 w-4 text-amber-600" />
          <span className="capitalize">{booking.sessionType} Session</span>
        </div>

        {/* Contact Information */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-amber-700">
            <Mail className="h-4 w-4 text-amber-600" />
            <span>{booking.userEmail}</span>
          </div>
          {booking.userPhone && (
            <div className="flex items-center gap-2 text-sm text-amber-700">
              <Phone className="h-4 w-4 text-amber-600" />
              <span>{booking.userPhone}</span>
            </div>
          )}
        </div>

        {/* User Message */}
        {booking.userMessage && (
          <div className="p-3 rounded-lg bg-amber-50/50 border border-amber-100">
            <div className="flex items-start gap-2">
              <MessageSquare className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-amber-800 mb-1">Message from user:</p>
                <p className="text-sm text-amber-700">{booking.userMessage}</p>
              </div>
            </div>
          </div>
        )}

        {/* Reject Input */}
        {showRejectInput && (
          <div className="space-y-2 pt-2">
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Please provide a reason for rejection..."
              className="w-full p-3 text-sm border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none"
              rows={3}
            />
          </div>
        )}
      </CardContent>

      {booking.status === "pending" && (
        <CardFooter className="flex flex-col gap-2 pt-4 border-t border-amber-100 bg-amber-50/20">
          {showRejectInput ? (
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                onClick={() => {
                  setShowRejectInput(false)
                  setRejectionReason("")
                }}
                className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50"
                disabled={isRejecting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleReject}
                disabled={!rejectionReason.trim() || isRejecting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                {isRejecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Rejecting...
                  </>
                ) : (
                  <>
                    <XCircle className="mr-2 h-4 w-4" />
                    Confirm Reject
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 w-full">
              <Button
                variant="outline"
                onClick={() => setShowRejectInput(true)}
                className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
                disabled={isApproving}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
              <Button
                onClick={handleApprove}
                disabled={isApproving}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white"
              >
                {isApproving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Approving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </>
                )}
              </Button>
            </div>
          )}
        </CardFooter>
      )}

      {booking.status === "approved" && (
        <CardFooter className="flex flex-col gap-2 pt-4 border-t border-amber-100 bg-amber-50/20">
          <Button
            onClick={handleComplete}
            disabled={isCompleting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isCompleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Marking as Completed...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Completed
              </>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
