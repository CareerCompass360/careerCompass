import { Suspense } from 'react'
import CareerDetailPageContent from '@/components/CareersPage/Career-detail-content'

export const metadata = {
  title: 'Career Details | Career Compass',
  description: 'Detailed information about this career path',
}

type Props = {
  params: Promise<{ careerName: string }>
}

export default async function CareerDetailPage({ params }: Props) {
  const { careerName } = await params

  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <CareerDetailPageContent careerName={careerName} />
    </Suspense>
  )
}
