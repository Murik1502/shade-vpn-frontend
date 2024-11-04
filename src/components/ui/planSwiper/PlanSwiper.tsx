'use client'

import clsx from 'clsx'
import { FC } from 'react'
import 'swiper/css'
import 'swiper/css/virtual'
import { Virtual } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ISubscriptionResponse } from '@/types/subscription.types'

export type PlanSwiperProps = {
  data: ISubscriptionResponse[]
  activeTab: number
  setActiveTab: React.Dispatch<React.SetStateAction<number>>
}

export const PlanSwiper: FC<PlanSwiperProps> = ({
  data,
  activeTab,
  setActiveTab
}) => {
  return (
    <>
      <div className='w-full h-fit overflow-x-auto z-10'>
        <Swiper
          modules={[Virtual]}
          spaceBetween={20}
          slidesPerView={1}
          virtual
          onSlideChange={swiper => setActiveTab(swiper.activeIndex + 1)}
        >
          {data?.map((slideContent, index) => (
            <SwiperSlide
              key={slideContent.id}
              virtualIndex={index}
            >
              <div
                className={clsx(
                  'w-full h-fit p-5 flex flex-col gap-4 justify-between rounded-2xl',
                  index % 2 === 0 ? 'bg-gray_d3' : 'bg-primary'
                )}
              >
                <span className='text-xl font-medium'>
                  {slideContent.title}
                </span>
                <div className='flex justify-between items-end'>
                  <span
                    className='font-medium text-gray'
                    style={{ lineHeight: '11px', fontSize: 12 }}
                  >
                    объем трафика
                    <br />
                    <span className='text-base text-white'>
                      {slideContent.trafficVolume}GB
                    </span>
                  </span>
                  <span className='flex text-base text-white'>
                    {slideContent.price
                      ? `${slideContent.price / 100}₽`
                      : 'Бесплатно'}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}
