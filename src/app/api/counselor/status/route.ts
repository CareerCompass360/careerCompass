import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { stackServerApp } from "@/stack/server"

export async function GET(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser()

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is a counselor
    const dbUser = await prisma.user.findUnique({
      where: { stackAuthId: user.id },
      select: { isCounselor: true }
    })

    // Find counselor application by user's stackAuthId or email
    let counselorApplication = await prisma.counselorApplication.findFirst({
      where: { 
        OR: [
          { stackAuthId: user.id },
          { email: user.primaryEmail || "" }
        ]
      },
    })

    // If found by email but not linked to stackAuthId, update it
    if (counselorApplication && !counselorApplication.stackAuthId) {
      counselorApplication = await prisma.counselorApplication.update({
        where: { id: counselorApplication.id },
        data: { stackAuthId: user.id },
      })
    }

    if (!counselorApplication) {
      return NextResponse.json({
        success: true,
        hasApplication: false,
        status: null,
        isCounselor: dbUser?.isCounselor || false,
      })
    }

    return NextResponse.json({
      success: true,
      hasApplication: true,
      status: counselorApplication.status,
      application: counselorApplication,
      isCounselor: dbUser?.isCounselor || false,
    })
  } catch (error) {
    console.error("[COUNSELOR_STATUS_ERROR]", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch counselor status" },
      { status: 500 }
    )
  }
}
