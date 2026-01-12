import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// This is a one-time setup endpoint - you should delete or protect it after use
export async function POST(request: Request) {
  try {
    const { email, isAdmin } = await request.json()

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      )
    }

    // Update user's admin status
    const user = await prisma.user.update({
      where: { email },
      data: { isAdmin: isAdmin ?? true },
    })

    return NextResponse.json({
      message: `User ${email} ${isAdmin ? 'granted' : 'revoked'} admin access`,
      user: { email: user.email, isAdmin: user.isAdmin },
    })
  } catch (error) {
    console.error("Error setting admin status:", error)
    return NextResponse.json(
      { message: "Failed to set admin status. User may not exist." },
      { status: 500 }
    )
  }
}
