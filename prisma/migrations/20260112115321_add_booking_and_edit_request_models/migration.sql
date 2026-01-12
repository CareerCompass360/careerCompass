-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userPhone" TEXT,
    "counselorId" TEXT NOT NULL,
    "counselorName" TEXT NOT NULL,
    "counselorEmail" TEXT NOT NULL,
    "sessionDate" TIMESTAMP(3) NOT NULL,
    "sessionTime" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "sessionType" TEXT NOT NULL,
    "userMessage" TEXT,
    "topic" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "rejectionReason" TEXT,
    "meetingLink" TEXT,
    "meetingNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CounselorEditRequest" (
    "id" TEXT NOT NULL,
    "counselorId" TEXT NOT NULL,
    "counselorEmail" TEXT NOT NULL,
    "counselorName" TEXT NOT NULL,
    "requestedFields" TEXT[],
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "adminResponse" TEXT,
    "respondedBy" TEXT,
    "respondedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CounselorEditRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Booking_counselorId_idx" ON "Booking"("counselorId");

-- CreateIndex
CREATE INDEX "Booking_userId_idx" ON "Booking"("userId");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "Booking"("status");

-- CreateIndex
CREATE INDEX "CounselorEditRequest_counselorEmail_idx" ON "CounselorEditRequest"("counselorEmail");

-- CreateIndex
CREATE INDEX "CounselorEditRequest_status_idx" ON "CounselorEditRequest"("status");
