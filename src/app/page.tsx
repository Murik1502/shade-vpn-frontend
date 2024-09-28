'use client'

import { useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { toast } from 'sonner'

import { useUser } from '@/hooks/useUser'

import { useTelegram } from './providers'
import { invoiceService } from '@/services/invoice.service'

export default function Home() {
  const { webApp } = useTelegram()

  const [value, setValue] = useState(0)
  const { data, isLoading } = useUser()

  const handleCreateInvoice = () => {
    invoiceService
      .getInvoice({
        subscriptionId: value
      })
      .then(resp => {
        console.log(resp)

        if (!resp.data.ok) {
          toast.error(resp.data.errorMessage)
          return
        }

        webApp?.openInvoice(resp.data.result)
      })
      .catch(e => {
        toast.error(e.message)
      })
  }

  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-32 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <SkeletonTheme
          baseColor='#202020'
          highlightColor='#444'
        >
          <div className='flex w-full h-12'>
            {isLoading ? (
              <Skeleton
                containerClassName='flex-1'
                height={28}
                count={2}
              />
            ) : (
              <h1 className='text-3xl font-bold text-foreground'>
                Привет, {data?.username || data?.firstName}!
                <br />
                {data?.subscriptionId
                  ? `Твоя подписка - ${data.subscription.title}`
                  : 'У тебя нет подписки('}
              </h1>
            )}
          </div>
        </SkeletonTheme>
        <div className='flex gap-4 items-center flex-col sm:flex-row'>
          <input
            className='w-full p-2 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors bg-[#f2f2f2] dark:bg-[#1a1a1a] text-sm sm:text-base'
            type='number'
            placeholder='айди подписки'
            value={value}
            onChange={e => setValue(Number(e.target.value))}
          />
          <button
            className='w-full p-2 rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors bg-[#f2f2f2] dark:bg-[#1a1a1a] text-sm sm:text-base'
            onClick={handleCreateInvoice}
          >
            Подписка {value}
          </button>
        </div>
      </main>
    </div>
  )
}
