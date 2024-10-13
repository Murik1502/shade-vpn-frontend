'use client'

import Skeleton from 'react-loading-skeleton'

import { useUser } from '@/hooks/useUser'

import s from './Profile.module.scss'
import { useTelegram } from '@/app/providers'

export function Profile() {
  const { data, isLoading } = useUser()

  const { webApp, rawInitData } = useTelegram()

  const handleClick = () => {
    navigator.clipboard
      .writeText(rawInitData!)
      .then(() => alert('Raw Init Data copied to clipboard!'))
      .catch(() => alert('Failed to copy Raw Init Data to clipboard!'))
  }

  const name = data?.username || data?.firstName

  return (
    <div className={s.avatar}>
      {isLoading ? (
        <div className='flex flex-row gap-3 h-fit items-start w-full'>
          <Skeleton
            height={30}
            width={30}
            circle
            containerClassName='flex'
          />
          <Skeleton
            height={20}
            width={120}
            containerClassName='flex-1 rounded-xl'
          />
        </div>
      ) : (
        <div
          className='flex items-center gap-3'
          onClick={handleClick}
        >
          <div className={s.icon}>{name?.charAt(0)}</div>

          <div className='text-right mr-3'>
            <p className={s.username}>{name}</p>
          </div>
        </div>
      )}
    </div>
  )
}
