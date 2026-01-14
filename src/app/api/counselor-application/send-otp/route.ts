import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Check rate limiting: max 3 attempts in 6 hours
    const sixHoursAgo = new Date(Date.now() - 6 * 60 * 60 * 1000)
    
    const recentAttempts = await prisma.emailOTP.findMany({
      where: {
        email: email.toLowerCase(),
        lastSentAt: {
          gte: sixHoursAgo,
        },
      },
    })

    // Count total attempts in last 6 hours
    const totalAttempts = recentAttempts.reduce((sum: number, otp: any) => sum + otp.attemptCount, 0)

    if (totalAttempts >= 3) {
      return NextResponse.json(
        { 
          error: "Maximum OTP attempts reached. Please try again after 6 hours.",
          retryAfter: sixHoursAgo.getTime() + 6 * 60 * 60 * 1000
        },
        { status: 429 }
      )
    }

    // Delete any existing OTPs for this email
    await prisma.emailOTP.deleteMany({
      where: {
        email: email.toLowerCase(),
      },
    })

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Set expiry to 30 seconds from now
    const expiresAt = new Date(Date.now() + 30 * 1000)

    // Create new OTP record
    await prisma.emailOTP.create({
      data: {
        email: email.toLowerCase(),
        otp,
        expiresAt,
        attemptCount: 1,
        lastSentAt: new Date(),
      },
    })

    // Send email using Resend
    try {
      await resend.emails.send({
        from: "CareerCompass <onboarding@careercompass.namandadhich.dev>", // Change this to your verified domain
        to: email,
        subject: "Your OTP for Counselor Application",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #d97706;">CareerCompass - Counselor Application</h2>
            <p>Your OTP for verifying your counselor application is:</p>
            <div style="background-color: #f3f4f6; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
              <h1 style="color: #d97706; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
            </div>
            <p style="color: #ef4444; font-weight: bold;">This OTP will expire in 30 seconds.</p>
            <p style="color: #6b7280; font-size: 14px;">If you didn't request this OTP, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <p style="color: #9ca3af; font-size: 12px;">© 2026 CareerCompass. All rights reserved.</p>
          </div>
        `,
      })

      return NextResponse.json({
        message: "OTP sent successfully",
        expiresAt: expiresAt.toISOString(),
      })
    } catch (emailError) {
      console.error("Error sending email:", emailError)
      
      // Delete the OTP if email fails
      await prisma.emailOTP.deleteMany({
        where: {
          email: email.toLowerCase(),
          otp,
        },
      })

      return NextResponse.json(
        { error: "Failed to send OTP email. Please try again." },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error("Error in send-otp:", error)
    return NextResponse.json(
      { error: "An error occurred while sending OTP" },
      { status: 500 }
    )
  }
}
