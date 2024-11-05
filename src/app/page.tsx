'use client'

import { QueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { toast } from 'sonner'
import 'swiper/css'

import { BenefitsCard } from '@/components/ui/benefitsCard/BenefitsCard'
import { ButtonSkeleton } from '@/components/ui/button/ButtonSkeleton'
import { PlanSwiper } from '@/components/ui/planSwiper/PlanSwiper'
import { PlanSwiperSkeleton } from '@/components/ui/planSwiper/PlanSwiperSkeleton'
import { WelcomeSign } from '@/components/ui/welcomeSign/WelcomeSign'
import { WelcomeSignSkeleton } from '@/components/ui/welcomeSign/WelcomeSignSkeleton'

import { useSubs } from '@/hooks/useSubs'
import { useUser } from '@/hooks/useUser'

import { useTelegram } from './providers'
import { invoiceService } from '@/services/invoice.service'
import { subscriptionService } from '@/services/subscription.service'

export default function Home() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity
      }
    }
  })

  const { webApp } = useTelegram()
  const router = useRouter()
  const { data, isLoading } = useUser()
  const { data: subs, isLoading: subsLoading } = useSubs()

  const [activeTab, setActiveTab] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  const currentSub = subs?.[activeTab - 1].id || 0

  const handleCreateInvoice = (subType: number) => {
    setIsProcessing(true)
    const toastId = toast.loading('Загрузка...')
    console.log('handleCreateInvoice', subType)
    if (subType === 1) {
      return subscriptionService.getFreeSubscription().then(resp => {
        queryClient.invalidateQueries({
          queryKey: ['user'],
          refetchType: 'active'
        })

        toast.success('Подписка успешно активирована!', {
          id: toastId
        })

        setIsProcessing(false)
      })
    }

    setIsProcessing(true)

    invoiceService
      .getInvoice({
        subTypeId: subType
      })
      .then(resp => {
        if (!resp.data.ok || !resp.data.result) {
          toast.error(resp.data.errorMessage, {
            id: toastId
          })
          return
        }

        webApp?.openInvoice(resp.data.result, invoiceClosed => {
          if (invoiceClosed === 'paid') {
            toast.success('Подписка успешно активирована!', {
              id: toastId
            })
            queryClient.invalidateQueries({
              queryKey: ['user'],
              refetchType: 'active'
            })
            return
          }

          if (invoiceClosed === 'failed') {
            toast.error('Произошла ошибка оплаты. Попробуйте ещё раз!!', {
              id: toastId
            })
          }

          setIsProcessing(false)
        })
      })
      .catch(e => {
        toast.error(e.message, {
          id: toastId
        })
      })
  }

  return (
    <div className='pl-4 pr-4 flex flex-col w-full h-screen overflow-auto gap-3'>
      {isLoading ? <WelcomeSignSkeleton /> : <WelcomeSign />}
      <BenefitsCard />
      <div className='w-full h-fit flex justify-between items-center'>
        <span className='text-xl font-medium'>
          Выберите <br /> подходящий план
        </span>
        <span className='text-sm text-gray_d1'>
          {subsLoading ? (
            <Skeleton
              width={50}
              height={20}
            />
          ) : (
            `${activeTab} / ${subs?.length}`
          )}
        </span>
      </div>

      {subsLoading ? (
        <PlanSwiperSkeleton />
      ) : (
        <PlanSwiper
          data={subs!}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}

      {subsLoading ? (
        <ButtonSkeleton />
      ) : (
        <button
          disabled={isProcessing}
          className={clsx(
            isProcessing && 'disabled:opacity-50',
            'w-full h-14 font-medium rounded-xl',
            currentSub > 1
              ? 'bg-primary text-white border-primary'
              : 'bg-transparent text-primary border-primary border'
          )}
          onClick={() => handleCreateInvoice(subs![activeTab - 1].id)}
        >
          {currentSub > 1 ? 'Подключить на месяц' : 'Оставить базовый'}
        </button>
      )}
    </div>
  )
}
