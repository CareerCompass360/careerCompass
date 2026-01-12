import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    // Delete rejected counselors older than 7 days
    const deletedRejected = await prisma.counselorApplication.deleteMany({
      where: {
        status: "rejected",
        rejectedAt: {
          lte: sevenDaysAgo,
        },
      },
    })

    // Delete removed counselors older than 7 days
    const deletedRemoved = await prisma.counselorApplication.deleteMany({
      where: {
        status: "removed",
        removedAt: {
          lte: sevenDaysAgo,
        },
      },
    })

    return NextResponse.json({
      message: "Cleanup completed successfully",
      deletedRejected: deletedRejected.count,
      deletedRemoved: deletedRemoved.count,
    })
  } catch (error) {
    console.error("Error in cleanup cron:", error)
    return NextResponse.json(
      { message: "Cleanup failed" },
      { status: 500 }
    )
  }
}
