import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Fetch all active counselor profiles where application status is 'approved'
    const counselorProfiles = await prisma.counselorProfile.findMany({
      where: {
        isActive: true,
        application: {
          status: "approved",
        },
      },
      include: {
        application: true,
      },
      orderBy: [
        { yearsExperience: "desc" }, // More experienced counselors first
        { createdAt: "asc" }, // Then by registration date
      ],
    })

    // Map to include fields expected by frontend
    const counselors = counselorProfiles.map(profile => ({
      id: profile.id, // CounselorProfile ID (used for bookings)
      fullName: profile.fullName,
      email: profile.email,
      profilePhoto: profile.profilePhoto,
      currentJobTitle: profile.jobTitle,
      currentOrganization: profile.organization,
      totalYearsExperience: profile.yearsExperience,
      primaryCareerDomain: profile.specialization,
      subSpecialization: profile.specialization,
      city: profile.city,
      country: profile.country,
      languagesSpoken: profile.languagesSpoken,
      topicsCanHelp: [], // Not in profile, empty array
      studentTypes: [], // Not in profile, empty array
      careerAreasCanCounsel: [], // Not in profile, empty array
      wantToCharge: profile.pricePerHour > 0,
      pricePer30Min: profile.pricePerHour ? profile.pricePerHour / 2 : null,
      pricePer60Min: profile.pricePerHour || null,
    }))

    // Return the counselors data
    return NextResponse.json({
      success: true,
      count: counselors.length,
      counselors,
    })
  } catch (error) {
    console.error("[COUNSELORS_GET_ERROR]", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch counselors",
      },
      { status: 500 }
    )
  }
}
