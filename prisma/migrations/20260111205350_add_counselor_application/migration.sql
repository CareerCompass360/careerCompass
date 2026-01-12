-- CreateTable
CREATE TABLE "CounselorApplication" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "email" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" TEXT,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "languagesSpoken" TEXT[],
    "linkedinProfile" TEXT NOT NULL,
    "personalWebsite" TEXT,
    "currentJobTitle" TEXT NOT NULL,
    "currentOrganization" TEXT NOT NULL,
    "totalYearsExperience" INTEGER NOT NULL,
    "primaryCareerDomain" TEXT NOT NULL,
    "subSpecialization" TEXT NOT NULL,
    "highestEducationLevel" TEXT NOT NULL,
    "degreeName" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "yearOfGraduation" INTEGER NOT NULL,
    "studentTypes" TEXT[],
    "careerAreasCanCounsel" TEXT[],
    "topicsCanHelp" TEXT[],
    "hasFormedMentored" BOOLEAN NOT NULL,
    "numberOfPeopleGuided" INTEGER,
    "whereMentored" TEXT,
    "successStory" TEXT,
    "resumeUrl" TEXT NOT NULL,
    "degreeCertificateUrl" TEXT NOT NULL,
    "workExperienceProofUrl" TEXT NOT NULL,
    "counselingCertUrl" TEXT,
    "willingOnlineCounseling" BOOLEAN NOT NULL,
    "preferredMode" TEXT[],
    "availableHoursPerWeek" INTEGER NOT NULL,
    "preferredTimeSlots" TEXT[],
    "timeZone" TEXT NOT NULL,
    "wantToCharge" BOOLEAN NOT NULL,
    "pricePer30Min" DOUBLE PRECISION,
    "pricePer60Min" DOUBLE PRECISION,
    "openToRevenueSharing" BOOLEAN NOT NULL,
    "whyJoinPlatform" TEXT NOT NULL,
    "whatMakesQualified" TEXT NOT NULL,
    "agreedToTerms" BOOLEAN NOT NULL,
    "digitalSignature" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CounselorApplication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CounselorApplication_email_key" ON "CounselorApplication"("email");

-- CreateIndex
CREATE INDEX "CounselorApplication_email_idx" ON "CounselorApplication"("email");

-- CreateIndex
CREATE INDEX "CounselorApplication_status_idx" ON "CounselorApplication"("status");
