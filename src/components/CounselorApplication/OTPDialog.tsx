"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { Loader2, Mail, Clock } from "lucide-react"

interface OTPDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  email: string
  onVerified: () => void
}

export function OTPDialog({ open, onOpenChange, email, onVerified }: OTPDialogProps) {
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [expiresAt, setExpiresAt] = useState<Date | null>(null)
  const [canResend, setCanResend] = useState(false)
  const [sendAttempts, setSendAttempts] = useState(1)

  useEffect(() => {
    if (open) {
      // Reset states when dialog opens
      setOtp("")
      setTimeLeft(30)
      setCanResend(false)
    }
  }, [open])

  useEffect(() => {
    if (!open || timeLeft <= 0) {
      if (timeLeft <= 0) {
        setCanResend(true)
      }
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [open, timeLeft])

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP")
      return
    }

    setIsVerifying(true)
    try {
      const response = await fetch("/api/counselor-application/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Email verified successfully!")
        onVerified()
        onOpenChange(false)
      } else {
        toast.error(data.error || "Invalid OTP")
        setOtp("")
      }
    } catch (error) {
      toast.error("Failed to verify OTP. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendOtp = async () => {
    if (sendAttempts >= 3) {
      toast.error("Maximum OTP attempts reached. Please try again after 6 hours.")
      return
    }

    setIsVerifying(true)
    try {
      const response = await fetch("/api/counselor-application/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("New OTP sent to your email")
        setTimeLeft(30)
        setCanResend(false)
        setOtp("")
        setSendAttempts((prev) => prev + 1)
        setExpiresAt(new Date(data.expiresAt))
      } else {
        toast.error(data.error || "Failed to send OTP")
        if (response.status === 429) {
          // Rate limited
          onOpenChange(false)
        }
      }
    } catch (error) {
      toast.error("Failed to resend OTP. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleOtpChange = (value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/\D/g, "").slice(0, 6)
    setOtp(numericValue)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-width-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-amber-900">
            <Mail className="h-5 w-5" />
            Verify Your Email
          </DialogTitle>
          <DialogDescription>
            We've sent a 6-digit OTP to <strong>{email}</strong>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => handleOtpChange(e.target.value)}
              placeholder="000000"
              className="text-center text-2xl tracking-widest font-bold"
              disabled={isVerifying || timeLeft === 0}
              autoComplete="off"
            />
          </div>

          {timeLeft > 0 ? (
            <div className="flex items-center justify-center gap-2 text-sm text-amber-600">
              <Clock className="h-4 w-4" />
              <span>OTP expires in {timeLeft} seconds</span>
            </div>
          ) : (
            <div className="text-center text-sm text-red-600 font-medium">
              OTP has expired. Please request a new one.
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Button
              onClick={handleVerifyOtp}
              disabled={isVerifying || otp.length !== 6 || timeLeft === 0}
              className="w-full bg-amber-600 hover:bg-amber-700"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify OTP"
              )}
            </Button>

            {canResend && (
              <Button
                onClick={handleResendOtp}
                variant="outline"
                disabled={isVerifying || sendAttempts >= 3}
                className="w-full"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  `Resend OTP ${sendAttempts >= 3 ? "(Max attempts reached)" : `(${sendAttempts}/3)`}`
                )}
              </Button>
            )}
          </div>

          {sendAttempts >= 3 && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm text-center">
                Maximum OTP attempts reached. Please try again after 6 hours.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
