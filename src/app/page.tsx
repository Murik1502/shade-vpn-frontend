'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { toast } from 'sonner'
import 'swiper/css'

import { BenefitsCard } from '@/components/ui/benefitsCard/BenefitsCard'
import { PlanSwiper } from '@/components/ui/planSwiper/PlanSwiper'
import { WelcomeSign } from '@/components/ui/welcomeSign/WelcomeSign'
import { WelcomeSignSkeleton } from '@/components/ui/welcomeSign/WelcomeSignSkeleton'

import { useSubs } from '@/hooks/useSubs'
import { useUser } from '@/hooks/useUser'

import { useTelegram } from './providers'
import { invoiceService } from '@/services/invoice.service'
import { subscriptionService } from '@/services/subscription.service'

export default function Home() {
  const { webApp } = useTelegram()
  const router = useRouter()
  const { data, isLoading } = useUser()
  const { data: subs, isLoading: subsLoading } = useSubs()

  const [activeTab, setActiveTab] = useState(1)

  const currentSub = subs?.[activeTab - 1].id || 0

  const handleCreateInvoice = (subType: number) => {
    console.log('handleCreateInvoice', subType)
    if (subType === 1) {
      return subscriptionService.getFreeSubscription()
    }

    invoiceService
      .getInvoice({
        subTypeId: subType
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
    <div className='pl-4 pr-4 flex flex-col w-full h-screen overflow-auto gap-3'>
      {isLoading ? <WelcomeSignSkeleton /> : <WelcomeSign />}
      <BenefitsCard />
      <div className='w-full h-fit flex justify-between items-center'>
        <span className='text-xl font-medium'>
          Выберите <br /> подходящий план
        </span>
        <span className='text-sm text-gray_d1'>
          {activeTab} / {subs?.length}
        </span>
      </div>

      {subsLoading ? (
        <div className='flex flex-row gap-3 h-fit items-start w-fit'>
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
        <PlanSwiper
          data={subs!}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}

      <button
        className={clsx(
          'w-full h-12 font-medium rounded-xl',
          currentSub > 1
            ? 'bg-primary text-white border-primary'
            : 'bg-transparent text-primary border-primary border'
        )}
        onClick={() => handleCreateInvoice(subs![activeTab - 1].id)}
      >
        {currentSub > 1 ? 'Подключить на месяц' : 'Отсавить базовый'}
      </button>
    </div>
  )
}
