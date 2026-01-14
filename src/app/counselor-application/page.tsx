import { CounselorApplicationForm } from "@/components/CounselorApplication/CounselorApplicationForm"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { stackServerApp } from "@/stack/server"

export const metadata: Metadata = {
  title: "Become a Counselor | CareerCompass",
  description: "Join our platform as a career counselor and help students shape their future",
}

export default async function BecomeCounselorPage() {
  const user = await stackServerApp.getUser()

  if (!user) {
    redirect("/handler/sign-in?after=%2Fcounselor-application")
  }

  return <CounselorApplicationForm />
}
