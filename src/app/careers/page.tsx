import { Suspense } from 'react'
import LandingPageContent from '@/components/CareersPage/Careers-content'

export const metadata = {
  title: 'Careers | Career Compass',
  description: 'Explore different career paths and categories',
}

export default function CareerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading careers...</div>}>
      <LandingPageContent />
    </Suspense>
  )
}
