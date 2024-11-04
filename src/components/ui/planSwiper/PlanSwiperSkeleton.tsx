'use client'

import Skeleton from 'react-loading-skeleton'

export function PlanSwiperSkeleton() {
  return (
    <div className='w-full h-fit flex justify-between gap-3 items-center'>
      <div className='w-full h-fit p-5 flex bg-gray_d3 flex-col gap-4 justify-between rounded-2xl'>
        <Skeleton
          containerClassName='flex-1 rounded-xl'
          height={26}
          width={60}
        />
        <div className='w-full flex justify-between items-end'>
          <Skeleton
            containerClassName='rounded-xl'
            height={24}
            width={100}
          />
          <Skeleton
            containerClassName='rounded-xl'
            height={16}
            width={100}
          />
        </div>
      </div>
    </div>
  )
}
