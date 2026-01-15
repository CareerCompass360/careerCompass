-- AddForeignKey
ALTER TABLE "CounselorProfile" ADD CONSTRAINT "CounselorProfile_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "CounselorApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
