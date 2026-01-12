import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { stackServerApp } from "@/stack/server"

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await stackServerApp.getUser()

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { status, rejectionReason, meetingLink } = await req.json()
    const { id } = await params

    // Verify counselor owns this booking
    const booking = await prisma.booking.findUnique({
      where: { id },
    })

    if (!booking) {
      return NextResponse.json({ success: false, error: "Booking not found" }, { status: 404 })
    }


    // Find counselor profile
    const counselorProfile = await prisma.counselorProfile.findUnique({
      where: { stackAuthId: user.id },
    })

    if (!counselorProfile || booking.counselorId !== counselorProfile.id) {
      return NextResponse.json(
        { success: false, error: "Not authorized to update this booking" },
        { status: 403 }
      )
    }

    // Update booking
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        status,
        ...(rejectionReason && { rejectionReason }),
        ...(meetingLink && { meetingLink }),
        updatedAt: new Date(),
      },
    })

    // If booking is completed, update counselor profile stats
    if (status === "completed" && booking.status !== "completed") {
      const sessionEarning = booking.duration === 30 
        ? (counselorProfile.pricePer30Min || 0) 
        : (counselorProfile.pricePer60Min || 0)

      await prisma.counselorProfile.update({
        where: { id: counselorProfile.id },
        data: {
          completedSessions: { increment: 1 },
          totalEarnings: { increment: sessionEarning },
          totalBookings: { increment: 1 },
        },
      })
    }

    // If booking is approved, increment total bookings
    if (status === "approved" && booking.status === "pending") {
      await prisma.counselorProfile.update({
        where: { id: counselorProfile.id },
        data: {
          totalBookings: { increment: 1 },
        },
      })
    }

    return NextResponse.json({
      success: true,
      booking: updatedBooking,
    })
  } catch (error) {
    console.error("[UPDATE_BOOKING_ERROR]", error)
    return NextResponse.json(
      { success: false, error: "Failed to update booking" },
      { status: 500 }
    )
  }
}
