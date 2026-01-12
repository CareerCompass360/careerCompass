import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { stackServerApp } from "@/stack/server"

export async function GET(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin
    const dbUser = await prisma.user.findUnique({
      where: { stackAuthId: user.id },
      select: { isAdmin: true },
    })

    if (!dbUser?.isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    // Fetch stats
    const [totalCounselors, totalBookings, pendingApplications] = await Promise.all([
      prisma.counselorProfile.count({
        where: { isActive: true },
      }),
      prisma.booking.count(),
      prisma.counselorApplication.count({
        where: { status: "pending" },
      }),
    ])

    return NextResponse.json({
      success: true,
      stats: {
        totalCounselors,
        totalBookings,
        pendingApplications,
      },
    })
  } catch (error) {
    console.error("[ADMIN_STATS_ERROR]", error)
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    )
  }
}
