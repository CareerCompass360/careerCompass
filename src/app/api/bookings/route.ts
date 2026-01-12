import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { stackServerApp } from "@/stack/server"

export async function POST(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const {
      counselorId,
      counselorName,
      counselorEmail,
      sessionDate,
      sessionTime,
      duration,
      sessionType,
      topic,
      userMessage,
      userPhone,
    } = body

    // Validate required fields
    if (!counselorId || !sessionDate || !sessionTime || !duration || !sessionType || !topic) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate duration
    if (![30, 60].includes(duration)) {
      return NextResponse.json({ error: "Duration must be 30 or 60 minutes" }, { status: 400 })
    }

    // Validate session type
    if (!["video", "audio", "chat"].includes(sessionType)) {
      return NextResponse.json({ error: "Invalid session type" }, { status: 400 })
    }

    // Check if counselor exists and is approved - counselorId should be CounselorProfile ID
    const counselorProfile = await prisma.counselorProfile.findUnique({
      where: { id: counselorId },
    })

    if (!counselorProfile) {
      return NextResponse.json({ error: "Counselor not found" }, { status: 404 })
    }

    if (!counselorProfile.isActive) {
      return NextResponse.json({ error: "Counselor is not available for bookings" }, { status: 400 })
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        // User info
        userId: user.id,
        userName: user.displayName || "User",
        userEmail: user.primaryEmail || "",
        userPhone: userPhone || null,

        // Counselor info
        counselorId,
        counselorName: counselorName || counselorProfile.fullName,
        counselorEmail: counselorEmail || counselorProfile.email,

        // Session details
        sessionDate: new Date(sessionDate),
        sessionTime,
        duration,
        sessionType,
        topic,
        userMessage: userMessage || null,

        // Status
        status: "pending",
      },
    })

    return NextResponse.json({
      success: true,
      booking,
      message: "Booking created successfully. The counselor will review your request.",
    })
  } catch (error) {
    console.error("[BOOKING_CREATE_ERROR]", error)
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get all bookings for this user
    const bookings = await prisma.booking.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({
      success: true,
      bookings,
    })
  } catch (error) {
    console.error("[BOOKING_FETCH_ERROR]", error)
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    )
  }
}
