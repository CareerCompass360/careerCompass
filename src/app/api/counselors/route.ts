import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Only show counselors who are active and not removed/rejected for more than 7 days
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const counselorProfiles = await prisma.counselorProfile.findMany({
      where: {
        isActive: true,
        application: {
          OR: [
            { status: "approved" },
            { status: "removed", removedAt: { not: null, gte: sevenDaysAgo } },
            { status: "rejected", rejectedAt: { not: null, gte: sevenDaysAgo } },
          ],
        },
      },
      include: {
        application: true,
      },
      orderBy: [
        { yearsExperience: "desc" },
        { createdAt: "asc" },
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
