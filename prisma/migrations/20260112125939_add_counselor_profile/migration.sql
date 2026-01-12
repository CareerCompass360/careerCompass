-- CreateTable
CREATE TABLE "CounselorProfile" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "stackAuthId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "profilePhoto" TEXT,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "jobTitle" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "yearsExperience" INTEGER NOT NULL,
    "specialization" TEXT NOT NULL,
    "availableHours" INTEGER NOT NULL,
    "pricePerHour" DOUBLE PRECISION NOT NULL,
    "timeZone" TEXT NOT NULL,
    "languagesSpoken" TEXT[],
    "totalBookings" INTEGER NOT NULL DEFAULT 0,
    "completedSessions" INTEGER NOT NULL DEFAULT 0,
    "totalEarnings" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "averageRating" DOUBLE PRECISION,
    "lastMonthBookings" INTEGER NOT NULL DEFAULT 0,
    "lastMonthEarnings" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CounselorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CounselorProfile_applicationId_key" ON "CounselorProfile"("applicationId");

-- CreateIndex
CREATE UNIQUE INDEX "CounselorProfile_stackAuthId_key" ON "CounselorProfile"("stackAuthId");

-- CreateIndex
CREATE UNIQUE INDEX "CounselorProfile_email_key" ON "CounselorProfile"("email");

-- CreateIndex
CREATE INDEX "CounselorProfile_stackAuthId_idx" ON "CounselorProfile"("stackAuthId");

-- CreateIndex
CREATE INDEX "CounselorProfile_email_idx" ON "CounselorProfile"("email");

-- CreateIndex
CREATE INDEX "CounselorProfile_isActive_idx" ON "CounselorProfile"("isActive");
