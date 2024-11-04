'use client'

import s from './benefitsCard.module.scss'

export function BenefitsCard() {
  return (
    <div className='flex flex-col w-full h-fit p-6 rounded-2xl bg-gray_d3 gap-4'>
      <label className='text-base font-medium'>Преимущества подписки</label>
      <div className='flex flex-col gap-2'>
        <div className='w-full h-fit flex gap-3 items-start'>
          <span className={s.protectionIcon}></span>
          <span className='text-xs font-medium text-gray pb-2 border-b border-gray_d2'>
            Защита интернет-трафика при помощи шифрования
          </span>
        </div>

        <div className='w-full h-fit flex gap-3 items-start'>
          <span className={s.speedIcon}></span>
          <span className='text-xs font-medium text-gray pb-2 border-b border-gray_d2'>
            Неограниченная пропускная способность
          </span>
        </div>

        <div className='w-full flex gap-3 items-center'>
          <span className={s.devicesIcon}></span>
          <span className='text-xs align-middle h-fit w-full font-medium text-gray pb-2'>
            Поддержка на всех устройствах
          </span>
        </div>
      </div>
      <div className='w-full h-fit flex gap-2 items-start'>
        <span className={s.infoIcon}></span>
        <span className='text-xs font-medium text-primary cursor-pointer'>
          Как пользоваться подпиской?
        </span>
      </div>
    </div>
  )
}
