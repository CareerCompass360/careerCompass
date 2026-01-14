import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    // Verify cron job authorization
    const authHeader = req.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Delete OTPs that expired more than 1 second ago
    const oneSecondAgo = new Date(Date.now() - 1000)

    const result = await prisma.emailOTP.deleteMany({
      where: {
        expiresAt: {
          lt: oneSecondAgo,
        },
      },
    })

    console.log(`Deleted ${result.count} expired OTPs`)

    return NextResponse.json({
      message: "Cleanup completed",
      deletedCount: result.count,
    })
  } catch (error) {
    console.error("Error in OTP cleanup:", error)
    return NextResponse.json(
      { error: "Cleanup failed" },
      { status: 500 }
    )
  }
}

// Allow running without auth in development
export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not allowed" }, { status: 403 })
  }

  try {
    const oneSecondAgo = new Date(Date.now() - 1000)

    const result = await prisma.emailOTP.deleteMany({
      where: {
        expiresAt: {
          lt: oneSecondAgo,
        },
      },
    })

    return NextResponse.json({
      message: "Cleanup completed (dev mode)",
      deletedCount: result.count,
    })
  } catch (error) {
    console.error("Error in OTP cleanup:", error)
    return NextResponse.json(
      { error: "Cleanup failed" },
      { status: 500 }
    )
  }
}
