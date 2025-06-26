import SuccessPage from '@/components/SuccessPage'
import SuccessPageSkeleton from '@/components/SuccessPageSkeleton'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <Suspense fallback={<SuccessPageSkeleton/>}>
      <SuccessPage/>
    </Suspense>
  )
}

export default page
