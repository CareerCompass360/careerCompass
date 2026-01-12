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

        // Get the application to find the stackAuthId
        const application = await prisma.counselorApplication.findUnique({
          where: { id },
          select: { stackAuthId: true, email: true, fullName: true, mobileNumber: true, city: true, country: true, currentJobTitle: true, currentOrganization: true, totalYearsExperience: true, primaryCareerDomain: true, availableHoursPerWeek: true, pricePer30Min: true, pricePer60Min: true, timeZone: true, languagesSpoken: true, profilePhoto: true }
        });

        // Set isCounselor = true when approving application
        if (application?.stackAuthId) {
          await prisma.user.update({
            where: { stackAuthId: application.stackAuthId },
            data: { isCounselor: true }
          });

          // Upsert CounselorProfile (update if exists, create if not)
          await prisma.counselorProfile.upsert({
            where: { applicationId: id },
            update: {
              stackAuthId: application.stackAuthId,
              fullName: application.fullName,
              email: application.email,
              mobileNumber: application.mobileNumber,
              profilePhoto: application.profilePhoto,
              city: application.city,
              country: application.country,
              jobTitle: application.currentJobTitle,
              organization: application.currentOrganization,
              yearsExperience: application.totalYearsExperience,
              specialization: application.primaryCareerDomain,
              availableHours: application.availableHoursPerWeek,
              pricePerHour: application.pricePer60Min || 0,
              pricePer30Min: application.pricePer30Min,
              pricePer60Min: application.pricePer60Min,
              timeZone: application.timeZone,
              languagesSpoken: application.languagesSpoken,
            },
            create: {
              applicationId: id,
              stackAuthId: application.stackAuthId,
              fullName: application.fullName,
              email: application.email,
              mobileNumber: application.mobileNumber,
              profilePhoto: application.profilePhoto,
              city: application.city,
              country: application.country,
              jobTitle: application.currentJobTitle,
              organization: application.currentOrganization,
              yearsExperience: application.totalYearsExperience,
              specialization: application.primaryCareerDomain,
              availableHours: application.availableHoursPerWeek,
              pricePerHour: application.pricePer60Min || 0,
              pricePer30Min: application.pricePer30Min,
              pricePer60Min: application.pricePer60Min,
              timeZone: application.timeZone,
              languagesSpoken: application.languagesSpoken,
            }
          });
        }
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
