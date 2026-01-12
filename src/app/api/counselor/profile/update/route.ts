import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { stackServerApp } from "@/stack/server"

export async function PATCH(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser()

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const updates = await req.json()

    // Find counselor application
    const counselorApplication = await prisma.counselorApplication.findUnique({
      where: { email: user.primaryEmail || "" },
    })

    if (!counselorApplication || counselorApplication.status !== "approved") {
      return NextResponse.json(
        { success: false, error: "Not an approved counselor" },
        { status: 403 }
      )
    }

    // Update counselor application (only non-restricted fields)
    const restrictedFields = ["fullName", "email", "mobileNumber", "dateOfBirth"]
    const allowedUpdates: any = {}

    Object.keys(updates).forEach((key) => {
      if (!restrictedFields.includes(key)) {
        allowedUpdates[key] = updates[key]
      }
    })

    const updatedApplication = await prisma.counselorApplication.update({
      where: { id: counselorApplication.id },
      data: {
        ...allowedUpdates,
        updatedAt: new Date(),
      },
    })

    return NextResponse.json({
      success: true,
      application: updatedApplication,
    })
  } catch (error) {
    console.error("[UPDATE_PROFILE_ERROR]", error)
    return NextResponse.json(
      { success: false, error: "Failed to update profile" },
      { status: 500 }
    )
  }
}
