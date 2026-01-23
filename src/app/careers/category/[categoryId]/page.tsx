import { Suspense } from 'react'
import CategoryPageContent from '@/components/CareersPage/Category-content'

export const metadata = {
  title: 'Career Category | Career Compass',
  description: 'Explore careers in this category',
}

type Props = {
  params: Promise<{ categoryId: string }>
}

export default async function CategoryPage({ params }: Props) {
  const { categoryId } = await params

  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}>
      <CategoryPageContent categoryId={categoryId} />
    </Suspense>
  )
}
