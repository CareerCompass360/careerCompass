"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Briefcase, GraduationCap, Globe, Calendar, Star } from "lucide-react"
import { BookingDialog } from "./BookingDialog"

interface CounselorCardProps {
  counselor: {
    id: string
    fullName: string
    profilePhoto?: string | null
    email: string
    currentJobTitle: string
    currentOrganization: string
    totalYearsExperience: number
    primaryCareerDomain: string
    subSpecialization: string
    city: string
    country: string
    languagesSpoken: string[]
    topicsCanHelp: string[]
    studentTypes: string[]
    careerAreasCanCounsel: string[]
    wantToCharge: boolean
    pricePer30Min?: number | null
    pricePer60Min?: number | null
  }
}

export function CounselorCard({ counselor }: CounselorCardProps) {
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)

  const initials = counselor.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-amber-100 overflow-hidden bg-gradient-to-br from-white to-amber-50/30">
      {/* Header with Avatar and Basic Info */}
      <CardHeader className="pb-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-20 w-20 border-4 border-amber-100 shadow-md">
            <AvatarImage src={counselor.profilePhoto || ""} alt={counselor.fullName} />
            <AvatarFallback className="bg-gradient-to-br from-amber-400 to-yellow-400 text-white text-xl font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-amber-900 group-hover:text-amber-700 transition-colors">
              {counselor.fullName}
            </h3>
            <p className="text-sm font-medium text-amber-700 mt-1">
              {counselor.currentJobTitle}
            </p>
            <p className="text-xs text-amber-600/70 mt-0.5">
              {counselor.currentOrganization}
            </p>
          </div>

          <div className="flex flex-col items-end gap-1">
            <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
              <Star className="mr-1 h-3 w-3 fill-amber-500 text-amber-500" />
              Verified
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pb-4">
        {/* Location and Experience */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-amber-700">
            <MapPin className="h-4 w-4" />
            <span>{counselor.city}, {counselor.country}</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-700">
            <Briefcase className="h-4 w-4" />
            <span>{counselor.totalYearsExperience}+ years</span>
          </div>
        </div>

        {/* Specialization */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-800">Specialization</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
              {counselor.primaryCareerDomain}
            </Badge>
            <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-200">
              {counselor.subSpecialization}
            </Badge>
          </div>
        </div>

        {/* Languages */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-800">Languages</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {counselor.languagesSpoken.slice(0, 3).map((lang) => (
              <Badge key={lang} variant="secondary" className="bg-stone-100 text-stone-700 text-xs">
                {lang}
              </Badge>
            ))}
            {counselor.languagesSpoken.length > 3 && (
              <Badge variant="secondary" className="bg-stone-100 text-stone-700 text-xs">
                +{counselor.languagesSpoken.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Areas of Counseling */}
        <div className="space-y-2">
          <span className="text-sm font-semibold text-amber-800">Can help with</span>
          <div className="flex flex-wrap gap-1.5">
            {counselor.topicsCanHelp.slice(0, 4).map((topic) => (
              <Badge key={topic} variant="outline" className="bg-amber-50/50 text-amber-700 border-amber-200 text-xs">
                {topic}
              </Badge>
            ))}
            {counselor.topicsCanHelp.length > 4 && (
              <Badge variant="outline" className="bg-amber-50/50 text-amber-700 border-amber-200 text-xs">
                +{counselor.topicsCanHelp.length - 4}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-4 border-t border-amber-100 bg-amber-50/30">
        <div className="flex flex-col">
          {counselor.wantToCharge ? (
            <>
              <span className="text-xs text-amber-600">Starting from</span>
              <span className="text-lg font-bold text-amber-800">
                ₹{counselor.pricePer30Min || counselor.pricePer60Min}
                <span className="text-sm font-normal text-amber-600">
                  /{counselor.pricePer30Min ? "30min" : "60min"}
                </span>
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-green-700">Free Session</span>
          )}
        </div>
        
        <Button 
          onClick={() => setBookingDialogOpen(true)}
          className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Book Session
        </Button>
      </CardFooter>

      {/* Booking Dialog */}
      <BookingDialog
        open={bookingDialogOpen}
        onOpenChange={setBookingDialogOpen}
        counselor={counselor}
      />
    </Card>
  )
}
