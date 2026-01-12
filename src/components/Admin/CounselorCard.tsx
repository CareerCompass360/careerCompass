"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  MapPin,
  Calendar,
  Eye
} from "lucide-react"

interface CounselorCardProps {
  counselor: {
    id: string
    fullName: string
    email: string
    city: string
    country: string
    currentJobTitle: string
    primaryCareerDomain: string
    totalYearsExperience: number
    highestEducationLevel: string
    status: string
    createdAt: Date
  }
  onViewDetails: () => void
}

export function CounselorCard({ counselor, onViewDetails }: CounselorCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "rejected":
        return "bg-red-500"
      case "removed":
        return "bg-gray-500"
      default:
        return "bg-stone-500"
    }
  }

  return (
    <Card className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-amber-300 bg-white">
      <div className="flex flex-col h-full">
        {/* Header with Status Badge */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
              {counselor.fullName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">{counselor.fullName}</h3>
              <p className="text-sm text-slate-600">{counselor.email}</p>
            </div>
          </div>
          <Badge className={`${getStatusColor(counselor.status)} text-white`}>
            {counselor.status.toUpperCase()}
          </Badge>
        </div>

        {/* Details Grid */}
        <div className="space-y-3 flex-grow">
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Briefcase className="h-4 w-4 text-blue-600" />
            <span className="font-medium">{counselor.currentJobTitle}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-700">
            <GraduationCap className="h-4 w-4 text-purple-600" />
            <span>{counselor.primaryCareerDomain} • {counselor.totalYearsExperience} years exp</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-700">
            <MapPin className="h-4 w-4 text-blue-600" />
            <span>{counselor.city}, {counselor.country}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Calendar className="h-4 w-4 text-purple-600" />
            <span>Applied: {new Date(counselor.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* View Details Button */}
        <Button
          onClick={onViewDetails}
          className="mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center justify-center gap-2"
        >
          <Eye className="h-4 w-4" />
          View Full Details
        </Button>
      </div>
    </Card>
  )
}
