"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, XCircle, CheckCircle, AlertCircle, Calendar } from "lucide-react"
import Link from "next/link"

interface StatusCardProps {
  status: "pending" | "rejected" | "approved"
  rejectedAt?: string | null
  submittedAt?: string
}

export function StatusCard({ status, rejectedAt, submittedAt }: StatusCardProps) {
  const statusConfig = {
    pending: {
      icon: Clock,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-300",
      title: "Application Under Review",
      description: "Your application is being reviewed by our team. We'll notify you once the review is complete.",
      message: "Hang tight! Our team is carefully reviewing your application. This process typically takes 3-5 business days.",
    },
    rejected: {
      icon: XCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      badgeColor: "bg-red-100 text-red-800 border-red-300",
      title: "Application Not Approved",
      description: "Unfortunately, your application was not approved at this time.",
      message: "We appreciate your interest in joining our platform. You may reapply after 30 days with updated credentials.",
    },
    approved: {
      icon: CheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      badgeColor: "bg-green-100 text-green-800 border-green-300",
      title: "Application Approved! 🎉",
      description: "Congratulations! You are now an approved counselor on Career Compass.",
      message: "You can now start receiving bookings and helping students achieve their career goals.",
    },
  }

  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-gradient-to-br from-amber-50/50 via-stone-50 to-yellow-50/30">
      <Card className="max-w-2xl w-full border-amber-200 shadow-xl bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="flex justify-center">
            <div className={`flex items-center justify-center w-20 h-20 rounded-full ${config.iconBg} shadow-lg`}>
              <Icon className={`h-10 w-10 ${config.iconColor}`} />
            </div>
          </div>
          
          <div className="flex justify-center">
            <Badge variant="outline" className={`${config.badgeColor} px-4 py-1.5 text-sm font-medium`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>

          <CardTitle className="text-3xl font-bold text-amber-900">
            {config.title}
          </CardTitle>
          <CardDescription className="text-base text-amber-700">
            {config.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Message Box */}
          <div className={`p-6 rounded-lg border ${
            status === "pending" ? "bg-yellow-50/50 border-yellow-200" :
            status === "rejected" ? "bg-red-50/50 border-red-200" :
            "bg-green-50/50 border-green-200"
          }`}>
            <p className="text-sm text-amber-800 leading-relaxed">
              {config.message}
            </p>
          </div>

          {/* Timeline Information */}
          <div className="space-y-3">
            {submittedAt && (
              <div className="flex items-center gap-3 text-sm text-amber-700">
                <Calendar className="h-4 w-4" />
                <span>Submitted: {new Date(submittedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            )}
            {rejectedAt && status === "rejected" && (
              <div className="flex items-center gap-3 text-sm text-red-700">
                <AlertCircle className="h-4 w-4" />
                <span>Rejected: {new Date(rejectedAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4">
            {status === "rejected" && (
              <>
                <Link href="/counselor-application" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                  >
                    Reapply (Available after 30 days)
                  </Button>
                </Link>
                <Link href="/" className="w-full">
                  <Button variant="ghost" className="w-full text-amber-700 hover:bg-amber-50">
                    Return to Home
                  </Button>
                </Link>
              </>
            )}
            
            {status === "pending" && (
              <Button
                variant="outline"
                className="w-full border-amber-300 text-amber-700 hover:bg-amber-50"
                disabled
              >
                <Clock className="mr-2 h-4 w-4" />
                Awaiting Review
              </Button>
            )}

            {status === "approved" && (
              <Link href="/counselor-dashboard/bookings" className="w-full">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Go to Dashboard
                </Button>
              </Link>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
