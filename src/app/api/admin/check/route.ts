import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { stackServerApp } from "@/stack/server"

export async function GET() {
  try {
    const user = await stackServerApp.getUser()
    console.log("[ADMIN CHECK] Stack Auth user:", user)
    if (!user) {
      console.log("[ADMIN CHECK] No user found in Stack Auth session.")
      return NextResponse.json({ isAdmin: false }, { status: 401 })
    }

    // Check if user is admin in database
    const dbUser = await prisma.user.findUnique({
      where: { stackAuthId: user.id },
      select: { isAdmin: true, email: true, id: true },
    })
    console.log("[ADMIN CHECK] DB user:", dbUser)

    return NextResponse.json({ isAdmin: dbUser?.isAdmin || false })
  } catch (error) {
    console.error("Error checking admin status:", error)
    return NextResponse.json({ isAdmin: false }, { status: 500 })
  }
}
