import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { stackServerApp } from "@/stack/server"

export async function GET(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser()

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    // Find counselor profile
    const counselorProfile = await prisma.counselorProfile.findUnique({
      where: { stackAuthId: user.id },
    })

    if (!counselorProfile) {
      return NextResponse.json(
        { success: false, error: "Not an approved counselor" },
        { status: 403 }
      )
    }

    // Fetch bookings for this counselor using CounselorProfile ID
    const bookings = await prisma.booking.findMany({
      where: {
        counselorId: counselorProfile.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({
      success: true,
      bookings,
    })
  } catch (error) {
    console.error("[COUNSELOR_BOOKINGS_ERROR]", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch bookings" },
      { status: 500 }
    )
  }
}
