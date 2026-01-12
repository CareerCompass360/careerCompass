import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { stackServerApp } from "@/stack/server"

export async function POST(req: NextRequest) {
  try {
    const user = await stackServerApp.getUser()

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { requestedFields, reason } = await req.json()

    if (!requestedFields || !Array.isArray(requestedFields) || requestedFields.length === 0) {
      return NextResponse.json(
        { success: false, error: "Requested fields are required" },
        { status: 400 }
      )
    }

    if (!reason || reason.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Reason is required" },
        { status: 400 }
      )
    }

    // Find counselor application
    const counselorApplication = await prisma.counselorApplication.findUnique({
      where: { email: user.primaryEmail || "" },
    })

    if (!counselorApplication) {
      return NextResponse.json(
        { success: false, error: "Counselor application not found" },
        { status: 404 }
      )
    }

    // Create edit request
    const editRequest = await prisma.counselorEditRequest.create({
      data: {
        counselorId: counselorApplication.id,
        counselorEmail: counselorApplication.email,
        counselorName: counselorApplication.fullName,
        requestedFields,
        reason,
      },
    })

    return NextResponse.json({
      success: true,
      editRequest,
    })
  } catch (error) {
    console.error("[CREATE_EDIT_REQUEST_ERROR]", error)
    return NextResponse.json(
      { success: false, error: "Failed to create edit request" },
      { status: 500 }
    )
  }
}
