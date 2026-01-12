import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validate required fields
    if (!data.email || !data.fullName || !data.mobileNumber) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingApplication = await prisma.counselorApplication.findUnique({
      where: { email: data.email },
    })

    if (existingApplication) {
      return NextResponse.json(
        { message: "An application with this email already exists" },
        { status: 409 }
      )
    }

    // Create new counselor application
    const application = await prisma.counselorApplication.create({
      data: {
        // Basic Identity
        fullName: data.fullName,
        profilePhoto: data.profilePhoto || null,
        email: data.email,
        mobileNumber: data.mobileNumber,
        dateOfBirth: new Date(data.dateOfBirth),
        gender: data.gender || null,
        city: data.city,
        country: data.country,
        languagesSpoken: data.languagesSpoken,
        linkedinProfile: data.linkedinProfile,
        personalWebsite: data.personalWebsite || null,
        
        // Professional Background
        currentJobTitle: data.currentJobTitle,
        currentOrganization: data.currentOrganization,
        totalYearsExperience: data.totalYearsExperience,
        primaryCareerDomain: data.primaryCareerDomain,
        subSpecialization: data.subSpecialization,
        highestEducationLevel: data.highestEducationLevel,
        degreeName: data.degreeName,
        university: data.university,
        yearOfGraduation: data.yearOfGraduation,
        
        // Career Counseling Expertise
        studentTypes: data.studentTypes,
        careerAreasCanCounsel: data.careerAreasCanCounsel,
        topicsCanHelp: data.topicsCanHelp,
        
        // Real Experience Proof
        hasFormedMentored: data.hasFormedMentored,
        numberOfPeopleGuided: data.numberOfPeopleGuided || null,
        whereMentored: data.whereMentored || null,
        successStory: data.successStory || null,
        
        // Documents
        resumeUrl: data.resumeUrl,
        degreeCertificateUrl: data.degreeCertificateUrl,
        workExperienceProofUrl: data.workExperienceProofUrl,
        counselingCertUrl: data.counselingCertUrl || null,
        
        // Platform Readiness
        willingOnlineCounseling: data.willingOnlineCounseling,
        preferredMode: data.preferredMode,
        availableHoursPerWeek: data.availableHoursPerWeek,
        preferredTimeSlots: data.preferredTimeSlots,
        timeZone: data.timeZone,
        
        // Commercials
        wantToCharge: data.wantToCharge,
        pricePer30Min: data.pricePer30Min || null,
        pricePer60Min: data.pricePer60Min || null,
        openToRevenueSharing: data.openToRevenueSharing,
        
        // Trust & Ethics
        whyJoinPlatform: data.whyJoinPlatform,
        whatMakesQualified: data.whatMakesQualified,
        agreedToTerms: data.agreedToTerms,
        digitalSignature: data.digitalSignature,
        
        // Status
        status: "pending",
      },
    })

    return NextResponse.json(
      { 
        message: "Application submitted successfully",
        applicationId: application.id 
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Error creating counselor application:", error)
    return NextResponse.json(
      { message: "Failed to submit application. Please try again." },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")
    const id = searchParams.get("id")

    if (id) {
      const application = await prisma.counselorApplication.findUnique({
        where: { id },
      })
      return NextResponse.json(application)
    }

    if (email) {
      const application = await prisma.counselorApplication.findUnique({
        where: { email },
      })
      return NextResponse.json(application)
    }

    // Get all applications (for admin)
    const applications = await prisma.counselorApplication.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(applications)
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json(
      { message: "Failed to fetch applications" },
      { status: 500 }
    )
  }
}
