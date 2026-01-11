import { CounselorApplicationForm } from "@/components/CounselorApplication/CounselorApplicationForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Become a Counselor | CareerCompass",
  description: "Join our platform as a career counselor and help students shape their future",
}

export default function BecomeCounselorPage() {
  return <CounselorApplicationForm />
}
