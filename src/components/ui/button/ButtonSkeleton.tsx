'use client'

import Skeleton from 'react-loading-skeleton'

export function ButtonSkeleton() {
  return (
    <Skeleton
      height={56}
      containerClassName='flex-1 rounded-xl'
    />
  )
}
