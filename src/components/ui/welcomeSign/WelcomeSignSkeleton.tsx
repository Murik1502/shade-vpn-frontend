'use client'

import Skeleton from 'react-loading-skeleton'

export function WelcomeSignSkeleton() {
  return (
    <div className='w-full h-fit flex justify-between gap-3 items-center'>
      <div className='flex w-full h-fit gap-1 flex-col'>
        <Skeleton
          containerClassName='flex-1 rounded-xl'
          height={20}
        />
        <Skeleton
          containerClassName='flex-1 rounded-xl'
          height={36}
        />
      </div>
      <Skeleton
        width={80}
        height={66}
        containerClassName='flex-1 rounded-xl'
      />
    </div>
  )
}
