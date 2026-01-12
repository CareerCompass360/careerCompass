"use client"

import { useState } from "react"
import { useUser } from "@stackframe/stack"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Video, Mic, MessageCircle, Loader2, CheckCircle, X } from "lucide-react"

interface BookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  counselor: {
    id: string
    fullName: string
    email: string
    profilePhoto?: string | null
    currentJobTitle: string
    currentOrganization: string
    primaryCareerDomain: string
    pricePer30Min?: number | null
    pricePer60Min?: number | null
  }
}

export function BookingDialog({ open, onOpenChange, counselor }: BookingDialogProps) {
  const user = useUser()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  // Form state
  const [sessionDate, setSessionDate] = useState("")
  const [sessionTime, setSessionTime] = useState("")
  const [duration, setDuration] = useState<30 | 60>(60)
  const [sessionType, setSessionType] = useState<"video" | "audio" | "chat">("video")
  const [topic, setTopic] = useState("")
  const [userMessage, setUserMessage] = useState("")
  const [userPhone, setUserPhone] = useState("")

  const initials = counselor.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const sessionTypes = [
    { value: "video", label: "Video Call", icon: Video },
    { value: "audio", label: "Audio Call", icon: Mic },
    { value: "chat", label: "Chat/Text", icon: MessageCircle },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      setError("Please sign in to book a session")
      return
    }

    if (!sessionDate || !sessionTime || !topic) {
      setError("Please fill in all required fields")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          counselorId: counselor.id,
          counselorName: counselor.fullName,
          counselorEmail: counselor.email,
          sessionDate,
          sessionTime,
          duration,
          sessionType,
          topic,
          userMessage: userMessage || undefined,
          userPhone: userPhone || undefined,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to book session")
      }

      setSuccess(true)
      
      // Reset form after 2 seconds and close dialog
      setTimeout(() => {
        setSuccess(false)
        setSessionDate("")
        setSessionTime("")
        setTopic("")
        setUserMessage("")
        setUserPhone("")
        onOpenChange(false)
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Failed to book session")
    } finally {
      setLoading(false)
    }
  }

  const selectedPrice = duration === 30 ? counselor.pricePer30Min : counselor.pricePer60Min

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {success ? (
          <div className="py-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-900 mb-2">Booking Successful!</h3>
            <p className="text-green-700">
              Your booking request has been sent to {counselor.fullName}.
              <br />
              You'll receive a confirmation once they approve it.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl text-amber-900">Book a Counseling Session</DialogTitle>
              <DialogDescription className="text-amber-700">
                Schedule a session with {counselor.fullName}
              </DialogDescription>
            </DialogHeader>

            {/* Counselor Info Card */}
            <div className="flex items-center gap-4 p-4 rounded-lg bg-gradient-to-br from-amber-50 to-yellow-50/30 border border-amber-200">
              <Avatar className="h-16 w-16 border-2 border-amber-300">
                <AvatarImage src={counselor.profilePhoto || ""} alt={counselor.fullName} />
                <AvatarFallback className="bg-gradient-to-br from-amber-400 to-yellow-400 text-white font-semibold text-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold text-amber-900 text-lg">{counselor.fullName}</h3>
                <p className="text-sm text-amber-700">{counselor.currentJobTitle}</p>
                <p className="text-xs text-amber-600">{counselor.currentOrganization}</p>
              </div>
              <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white">
                {counselor.primaryCareerDomain}
              </Badge>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Session Duration */}
              <div className="space-y-2">
                <Label className="text-amber-900 font-semibold">Session Duration *</Label>
                <div className="grid grid-cols-2 gap-3">
                  {[30, 60].map((min) => (
                    <button
                      key={min}
                      type="button"
                      onClick={() => setDuration(min as 30 | 60)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        duration === min
                          ? "border-amber-500 bg-amber-50 shadow-md"
                          : "border-amber-200 hover:border-amber-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <p className="font-semibold text-amber-900">{min} minutes</p>
                          {(min === 30 ? counselor.pricePer30Min : counselor.pricePer60Min) && (
                            <p className="text-sm text-amber-700">
                              ₹{min === 30 ? counselor.pricePer30Min : counselor.pricePer60Min}
                            </p>
                          )}
                        </div>
                        {duration === min && (
                          <CheckCircle className="h-5 w-5 text-amber-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Session Type */}
              <div className="space-y-2">
                <Label className="text-amber-900 font-semibold">Session Type *</Label>
                <div className="grid grid-cols-3 gap-3">
                  {sessionTypes.map((type) => {
                    const Icon = type.icon
                    return (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setSessionType(type.value as any)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          sessionType === type.value
                            ? "border-amber-500 bg-amber-50 shadow-md"
                            : "border-amber-200 hover:border-amber-300 bg-white"
                        }`}
                      >
                        <Icon className={`h-5 w-5 mx-auto mb-1 ${
                          sessionType === type.value ? "text-amber-600" : "text-amber-400"
                        }`} />
                        <p className={`text-sm font-medium ${
                          sessionType === type.value ? "text-amber-900" : "text-amber-700"
                        }`}>
                          {type.label}
                        </p>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sessionDate" className="text-amber-900 font-semibold">
                    <Calendar className="inline h-4 w-4 mr-1" />
                    Session Date *
                  </Label>
                  <Input
                    id="sessionDate"
                    type="date"
                    min={today}
                    value={sessionDate}
                    onChange={(e) => setSessionDate(e.target.value)}
                    className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sessionTime" className="text-amber-900 font-semibold">
                    <Clock className="inline h-4 w-4 mr-1" />
                    Session Time *
                  </Label>
                  <Input
                    id="sessionTime"
                    type="time"
                    value={sessionTime}
                    onChange={(e) => setSessionTime(e.target.value)}
                    className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                    required
                  />
                </div>
              </div>

              {/* Topic */}
              <div className="space-y-2">
                <Label htmlFor="topic" className="text-amber-900 font-semibold">
                  What would you like to discuss? *
                </Label>
                <Input
                  id="topic"
                  type="text"
                  placeholder="e.g., Career guidance, College selection, Resume review"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                  required
                />
              </div>

              {/* Phone Number (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="userPhone" className="text-amber-900">
                  Your Phone Number (Optional)
                </Label>
                <Input
                  id="userPhone"
                  type="tel"
                  placeholder="+91 9999999999"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="userMessage" className="text-amber-900">
                  Additional Message (Optional)
                </Label>
                <textarea
                  id="userMessage"
                  placeholder="Any specific questions or topics you'd like to prepare?"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  className="w-full p-3 text-sm border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 resize-none"
                  rows={3}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2">
                  <X className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Pricing Info */}
              {selectedPrice && (
                <div className="p-4 rounded-lg bg-gradient-to-br from-amber-50 to-yellow-50/30 border border-amber-200">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-900 font-medium">Session Fee:</span>
                    <span className="text-2xl font-bold text-amber-900">₹{selectedPrice}</span>
                  </div>
                  <p className="text-xs text-amber-600 mt-1">
                    Payment details will be shared after counselor approval
                  </p>
                </div>
              )}

              <DialogFooter className="gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={loading}
                  className="border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={loading || !user}
                  className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    "Book Session"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
