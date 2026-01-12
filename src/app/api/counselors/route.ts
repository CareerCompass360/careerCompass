import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Fetch all counselor applications with status "approved"
    const counselors = await prisma.counselorApplication.findMany({
      where: {
        status: "approved",
      },
      orderBy: [
        { totalYearsExperience: "desc" }, // More experienced counselors first
        { createdAt: "asc" }, // Then by registration date
      ],
    })

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
