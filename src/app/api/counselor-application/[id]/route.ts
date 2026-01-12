import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const { action } = await request.json();

    let updateData: any = {};

    switch (action) {
      case "approve":
        updateData = {
          status: "approved",
          rejectedAt: null,
          removedAt: null,
        };
        break;
      case "reject":
        updateData = {
          status: "rejected",
          rejectedAt: new Date(),
        };
        break;
      case "remove":
        updateData = {
          status: "removed",
          removedAt: new Date(),
        };
        break;
      case "recover":
        updateData = {
          status: "pending",
          rejectedAt: null,
          removedAt: null,
        };
        break;
      default:
        return NextResponse.json(
          { message: "Invalid action" },
          { status: 400 }
        );
    }

    const updatedCounselor = await prisma.counselorApplication.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedCounselor);
  } catch (error) {
    console.error("Error updating counselor:", error);
    return NextResponse.json(
      { message: "Failed to update counselor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await prisma.counselorApplication.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Counselor deleted successfully" });
  } catch (error) {
    console.error("Error deleting counselor:", error);
    return NextResponse.json(
      { message: "Failed to delete counselor" },
      { status: 500 }
    );
  }
}
