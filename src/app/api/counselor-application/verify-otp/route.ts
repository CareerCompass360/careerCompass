import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json()

    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      )
    }

    // Find the OTP record
    const otpRecord = await prisma.emailOTP.findFirst({
      where: {
        email: email.toLowerCase(),
        otp: otp.trim(),
      },
    })

    if (!otpRecord) {
      return NextResponse.json(
        { error: "Invalid OTP. Please check and try again." },
        { status: 400 }
      )
    }

    // Check if OTP has expired
    const now = new Date()
    if (now > otpRecord.expiresAt) {
      // Delete expired OTP
      await prisma.emailOTP.delete({
        where: {
          id: otpRecord.id,
        },
      })

      return NextResponse.json(
        { error: "OTP has expired. Please request a new one." },
        { status: 400 }
      )
    }

    // OTP is valid - delete it immediately after successful verification
    await prisma.emailOTP.delete({
      where: {
        id: otpRecord.id,
      },
    })

    return NextResponse.json({
      message: "OTP verified successfully",
      verified: true,
    })
  } catch (error) {
    console.error("Error in verify-otp:", error)
    return NextResponse.json(
      { error: "An error occurred while verifying OTP" },
      { status: 500 }
    )
  }
}
